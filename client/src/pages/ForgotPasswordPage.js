import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const ForgotPasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [emailValue, setEmailValue,] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showSuccessMessage, showErrorMessage]);


    const onSubmitClicked = async () => {
        try {
            await axios.put(`/api/forgot-password/${emailValue}`);
            setSuccess(true);
            setShowSuccessMessage(true);
            setTimeout(() => {
                history.push('/login')
            },3000)
            
        } catch (e) {
            setErrorMessage(e.message)
            setShowErrorMessage(true)
            
        };
    };
    return success ? (
        <div className='content-container'>
 {showSuccessMessage && <div className='success'> Success!</div>}
            <p>Check your email for a verification link</p>
        </div>
    ) : (
        <div className='content-container'>
            {showErrorMessage && <div className='fail'> {errorMessage}</div>}
            <h1>Forgot password</h1>
            <p>Enter your email to receive  a reset link</p>
                <input
                    value={emailValue}
                    onChange={e => setEmailValue(e.target.value)}
                    placeholder="someone@gmail.com"
                />
                <button
                    disabled={!emailValue}
                    onClick={onSubmitClicked}
                >Send reset link</button>
        </div>
    )
};