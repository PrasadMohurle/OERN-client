import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Components/Navbar';

const USER_NAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USER_EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = ({ setAuth }) => {
    const userRef = useRef();
    const errRef = useRef();

    const [user_name, setUser_Name] = useState('');
    const [validName, setValidName] = useState(false);
    const [user_nameFocus, setUser_NameFocus] = useState(false);

    const [user_email, setUser_Email] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [user_emailFocus, setUser_EmailFocus] = useState(false);

    const [user_password, setUser_Password] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const role = 'watcher';

    useEffect(() => {
        userRef.current.focus();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }, []);

    useEffect(() => {
        const result_user_name = USER_NAME_REGEX.test(user_name);
        console.log(result_user_name);
        console.log(user_name);
        setValidName(result_user_name);
    }, [user_name]);

    useEffect(() => {
        const result_user_email = USER_EMAIL_REGEX.test(user_email);
        console.log(result_user_email);
        console.log(user_email);
        setValidEmail(result_user_email);
    }, [user_email]);

    useEffect(() => {
        const result_user_password = PWD_REGEX.test(user_password);
        console.log(result_user_password);
        console.log(user_password);
        setValidPassword(result_user_password);
        const match = user_password === matchPassword;
        setValidMatch(match);
    }, [user_password, matchPassword]);

    useEffect(() => {
        setErrMsg('');
    }, [user_name, user_email, user_password, matchPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if button enabled with JS hack
        const v1 = USER_NAME_REGEX.test(user_name);
        const v2 = USER_EMAIL_REGEX.test(user_email);
        const v3 = PWD_REGEX.test(user_password);
        if (!v1 || !v2 || !v3) {
            setErrMsg('Invalid Entry');
            return;
        }

        
        try {
            const body = { user_name, user_email, user_password, role };
            const response = await fetch(
                'http://localhost:5000/auth/register',
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                }
            );
            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem('token', parseRes.token);
                localStorage.setItem('role', parseRes.user_role);
                setAuth(true);
            } else {
                setAuth(false);
                setErrMsg(parseRes);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <section>
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
                    {errMsg}
                </p>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    {/* -----USER NAME----- */}
                    <label htmlFor="user_name">
                        User Name:
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={validName ? 'valid' : 'hide'}
                        />
                        <FontAwesomeIcon
                            icon={faTimes}
                            className={
                                validName || !user_name ? 'hide' : 'invalid'
                            }
                        />
                    </label>
                    <input
                        type="text"
                        id="user_name"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser_Name(e.target.value)}
                        value={user_name}
                        required
                        onFocus={() => setUser_NameFocus(true)}
                        onBlur={() => setUser_NameFocus(false)}
                    />
                    <p
                        className={
                            user_nameFocus && user_name && !validName
                                ? 'instructions'
                                : 'offscreen'
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    {/* -----USER EMAIL----- */}
                    <label htmlFor="user_email">
                        Email ID:
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={validEmail ? 'valid' : 'hide'}
                        />
                        <FontAwesomeIcon
                            icon={faTimes}
                            className={
                                validEmail || !user_email ? 'hide' : 'invalid'
                            }
                        />
                    </label>
                    <input
                        type="email"
                        id="user_email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser_Email(e.target.value)}
                        value={user_email}
                        required
                        onFocus={() => setUser_EmailFocus(true)}
                        onBlur={() => setUser_EmailFocus(false)}
                    />
                    <p
                        className={
                            user_emailFocus && user_email && !validEmail
                                ? 'instructions'
                                : 'offscreen'
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must begin with a letter.
                        <br />
                        Must contain @.
                        <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    {/* -----PASSWORD----- */}
                    <label htmlFor="user_password">
                        Password:
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={validPassword ? 'valid' : 'hide'}
                        />
                        <FontAwesomeIcon
                            icon={faTimes}
                            className={
                                validPassword || !user_password
                                    ? 'hide'
                                    : 'invalid'
                            }
                        />
                    </label>
                    <input
                        type="password"
                        id="user_password"
                        onChange={(e) => setUser_Password(e.target.value)}
                        value={user_password}
                        required
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    <p
                        className={
                            passwordFocus && !validPassword
                                ? 'instructions'
                                : 'offscreen'
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.
                        <br />
                        Must include uppercase and lowercase letters, a number
                        and a special character.
                        <br />
                        Allowed special characters: ! @ # $ %
                    </p>

                    {/* -----MATCH PASSWORD----- */}
                    <label htmlFor="matchPassword">
                        Confirm Password:
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={
                                validMatch && matchPassword ? 'valid' : 'hide'
                            }
                        />
                        <FontAwesomeIcon
                            icon={faTimes}
                            className={
                                validMatch || !matchPassword
                                    ? 'hide'
                                    : 'invalid'
                            }
                        />
                    </label>
                    <input
                        type="password"
                        id="matchPassword"
                        onChange={(e) => setMatchPassword(e.target.value)}
                        value={matchPassword}
                        required
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p
                        className={
                            matchFocus && !validMatch
                                ? 'instructions'
                                : 'offscreen'
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>

                    <button
                        disabled={
                            !validName ||
                            !validEmail ||
                            !validPassword ||
                            !validMatch
                                ? true
                                : false
                        }
                    >
                        Register
                    </button>
                </form>

                <p>
                    Already registered?
                    <a href="/login"> Click to Login.</a>
                </p>
            </section>
        </>
    );
};

export default Register;
