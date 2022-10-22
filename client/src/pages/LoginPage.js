import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import GoogleButton from 'react-google-button';
import { useToken } from '../auth/useToken';
import { useQueryParams } from '../util/useQueryParams';

export const LogInPage = () => {
    const [,setToken] = useToken();

    const [errorMessage, setErrorMessage] = useState('');

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [googleOauthUrl, setGoogleOauthUrl] = useState('');
    const { token: oauthToken } = useQueryParams();

    const history = useHistory();

    useEffect(() => {
        if (showErrorMessage) {
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        };
    }, [showErrorMessage]);

    useEffect(() => {
        if (oauthToken) {
            setToken(oauthToken);
            history.push('/');
        };
    }, [oauthToken, setToken, history]);

    useEffect(() => {
        const loadOauthUrl = async () => {
            try {
                const response = await axios.get('/auth/google/url');
                const { url } = response.data;
                setGoogleOauthUrl(url);
            } catch (e) {
                console.log(e);
            };
        };
        loadOauthUrl();
    }, []);

    const onLogInClicked = async () => {
        try {
            const response = await axios.post('/api/login', {
                email: emailValue,
                password: passwordValue,
            });
            const { token } = response.data;
            setToken(token);
            history.push('/');
        } catch (e) {
            setErrorMessage(e.message);
            setShowErrorMessage(true)
        };
    };
    return (
        <div className="content-container">
            <h1>Sign In</h1>
            {showErrorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="someone@gmail.com" />
            <input
                type="password"
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                placeholder="password" />
            <hr />
            <button
                disabled={!emailValue || !passwordValue}
                onClick={onLogInClicked}>Sign In</button>
            <button onClick={() => history.push('/forgot-password')}>Forgot your password?</button>
            <button onClick={() => history.push('/signup')}>Don't have an account? Sign Up</button>
            <GoogleButton  disabled={!googleOauthUrl}
                onClick={() => { window.location.href = googleOauthUrl }} className="google-btn"/>
            {/* <button
                disabled={!googleOauthUrl}
                onClick={() => { window.location.href = googleOauthUrl }}
            >Log in with Google</button> */}
        </div>
    );
};