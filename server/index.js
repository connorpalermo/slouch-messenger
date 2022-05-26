const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require("./routes/auth.js");
const app = express();
const PORT = process.env.PORT || 8080;

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require('twilio')(accountSid, authToken);

app.use(cors()); // allows CORS
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // allow sending of JSON payloads between client and server
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/', (req, res) => {
    const { message, user: sender, type, members } = req.body;

    if(type === 'message.new') {
        members
            .filter((member) => member.user !== sender.id)
            .forEach(({ user }) => {
                if(!user.online) { // only send alerts to people that are offline
                    twilioClient.message.create({
                        body: `You have a message from ${message.user.fullName} - ${message.text}`,
                        messagingServiceSid: messagingServiceSid,
                        to: user.phoneNumber
                    })
                    .then(() => console.log('Message Sent!'))
                    .catch((err) => console.log(err));
                }
            })
            return res.status(200).send('Message sent!');
}
return res.status(200).send('Not a new message request.')
})
app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server currently running on port ${PORT}`));
