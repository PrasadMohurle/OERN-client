import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';

const Login = ({ setAuth }) => {
    const userRef = useRef();
    const errRef = useRef();

    const [user_email, setUser_Email] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [user_password, setUser_Password] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }, []);

    useEffect(() => {
        setValidEmail(user_email);
    }, [user_email]);

    useEffect(() => {
        setValidPassword(user_password);
    }, [user_password]);

    useEffect(() => {
        setErrMsg('');
    }, [user_email, user_password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const body = { user_email, user_password };
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const parseRes = await response.json();
            if (parseRes.token) {
                localStorage.setItem('token', parseRes.token);
                localStorage.setItem('role', parseRes.user_role);
                setAuth(true);
            } else {
                setErrMsg(parseRes.message);
                setAuth(false);  
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <section>
                <h1>Login</h1>
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
                    {errMsg}
                </p>
                <form onSubmit={handleSubmit}>
                    {/* -----USER EMAIL----- */}
                    <label htmlFor="user_email">Email ID:</label>
                    <input
                        type="email"
                        id="user_email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser_Email(e.target.value)}
                        value={user_email}
                        required
                    />

                    {/* -----PASSWORD----- */}
                    <label htmlFor="user_password">Password:</label>
                    <input
                        type="password"
                        id="user_password"
                        onChange={(e) => setUser_Password(e.target.value)}
                        value={user_password}
                        required
                    />

                    <button
                        disabled={!validEmail || !validPassword ? true : false}
                    >
                        Login
                    </button>
                </form>

                <p>
                    Dont have Credentials?
                    <a href="/register"> Click to Register.</a>
                </p>
            </section>
        </>
    );
};

export default Login;
