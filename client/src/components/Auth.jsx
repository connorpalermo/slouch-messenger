import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg'
import { InitialState } from 'stream-chat-react/dist/components/Channel/channelState';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: ''
}
const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [form, setForm] = useState(initialState);


const handleChange = (event) => {
    setForm({ ...form, [event.target.name] : event.target.value})
}

const handleSubmit = async (event) => {
    event.preventDefault(); // avoid reloading the page
    console.log(form)

    const { username, password, phoneNumber, avatarURL} = form; // gets values from keys in form. Removed fullName because it will be empty string on login

    const URL = 'https://slouch-messenger-oxleyrln6a-uc.a.run.app/auth'; // backend URL

    const { data: { fullName, token, userId, hashedPassword } } = await axios.post(`${URL}/${isSignUp ? 'signup' : 'login' }`,{
        username, password, fullName: form.fullName, phoneNumber, avatarURL
    }); // pass data to backend endpoint. We pass form ONLY on signup, and get fullName back so no empty string.

    cookies.set('token', token);
    cookies.set('username', username);
    cookies.set('fullName', fullName);
    cookies.set('userId', userId);

    if(isSignUp) { 
        cookies.set('phoneNumber', phoneNumber);
        cookies.set('avatarURL', avatarURL);
        cookies.set('hashedPassword',hashedPassword);
    }

    window.location.reload(); // reload our application with a filled auth token
}

const switchMode = () => {
    setIsSignUp((prevIsSignup) => !prevIsSignup)
}

  return (
    <div className="auth__form-container">
        <div className="auth__form-container_fields">
            <div className="auth__form-container_fields-content">
                <p>{isSignUp ? 'Sign Up' : 'Sign In'}</p>
                <form onSubmit={() => {}}>
                    {isSignUp && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor='fullName'>Full Name</label>
                            <input
                                name="fullName"
                                type="text"
                                placeholder='Full Name'
                                onChange={handleChange}
                                required
                                />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor='username'>Username</label>
                        <input
                            name="username"
                            type="text"
                            placeholder='Username'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {isSignUp && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor='phoneNumber'>Phone Number</label>
                            <input
                                name="phoneNumber"
                                type="text"
                                placeholder='Phone Number'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    {isSignUp && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor='avatarURL'>Avatar URL</label>
                            <input
                                name="avatarURL"
                                type="text"
                                placeholder='Avatar URL'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor='password'>Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder='Password'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {isSignUp && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input
                                name="confirmPassord"
                                type="password"
                                placeholder='Confirm Password'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                <div className="auth__form-container_fields-content_button">
                    <button onClick={handleSubmit}>{isSignUp ? "Sign Up" : "Sign In"}</button>
                </div>
                </form>
                <div className="auth__form-container_fields-account">
                        <p>
                            {isSignUp 
                            ? "Created an account already? "
                            : "Don't have an account? "
                            }
                            <span onClick={switchMode}>
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </span>
                        </p>
                </div>
            </div>
        </div>
        <div className="auth__form-container_image">
            <img src={signinImage} alt="sign in"/>
        </div>
    </div>
  )
}

export default Auth