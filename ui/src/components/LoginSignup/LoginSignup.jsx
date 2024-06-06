import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

const Login = async (email, password) => {
    return fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
};

const SignUp = async (username, email, password) => {
    return fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });
};

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const SignIn = useSignIn();
    

    const handleSubmit = async () => {
        
        if (action === "Login") {
            const response = await Login(email, password);
            if (response.status === 200) {
                let object = await response.json();
                if(SignIn({
                    auth: {
                        token: object.token,
                        type: 'Bearer'
                    },
                    username: object.username,
                })){
                    console.log("Logged in")
                    window.location.href = '/'; // Redirect to home page
                }else {
                    //Throw error
                }
                
                

                window.location.href = '/'; // Redirect to home page
            } else {
                alert(response.data.message);
            }
        } else {
            const response = await SignUp(username, email, password);
            if (response.status === 201) {
                let object = await response.json();
                setAction("Login")
                handleSubmit();
            } else {
                alert(response.data.message);
            }
        }
        
    };

    return (
        <div className='contain'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? null : (
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                )}
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default LoginSignup;
