// auth controllers
const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat; // also need to create instance
const crypto = require('crypto');
const { restart } = require('nodemon');

require('dotenv').config(); // need to explicitly require these variables

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
    try{
        const { fullName, username, password, phoneNumber } = req.body;

        const userId = crypto.randomBytes(16).toString('hex'); // random hexidecimal string

        const serverClient = connect(api_key, api_secret, app_id); // connect to the server

        const hashedPassword = await bcrypt.hash(password, 10); // 10 is passed as SALT as the level of encryption.

        const token = serverClient.createUserToken(userId); // create token for specified user

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber});
    } catch(error){
        console.log(error);

        res.status(500).json({ message : error});
    }
};

const login = async (req, res) => {
    try{

        const { username, password } = req.body;

        const serverClient = connect(api_key, api_secret, app_id); // connect to the server client
        const client = StreamChat.getInstance(api_key, api_secret); // create instance of streamchat

        const { users } = await client.queryUsers({ name: username}); // query to see if a user exists with this username

        if(!users.length) return res.status(400).json({ message: 'User not found'});

        const success = await bcrypt.compare(password, users[0].hashedPassword); // compare inputted password with hashed password
                                                                                 // recall, password hashes when we create user.
        const token = serverClient.createUserToken(users[0].id);

        if(success) {
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id});
        } else {
            res.status(500).json({ message: 'Wrong Password. Try again!'});
        }
    } catch(error){
        console.log(error);

        res.status(500).json({ message : error});
    }
};

module.exports = { signup, login } // export the controller functionalities for use