const express = require('express');
const cors = require('cors')

const authRoutes = require("./routes/auth.js");
const app = express();
const PORT = process.env.PORT || 5001;

require('dotenv').config();

app.use(cors()); // allows CORS
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // allow sending of JSON payloads between client and server

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/auth', authRoutes)

app.listen(PORT, () => console.log(`Server currently running on port ${PORT}`));
