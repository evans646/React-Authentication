import { useHistory } from "react-router-dom";


export const EmailVerificationSuccess = () => {
    const history = useHistory();

    return (
        <div className="content-container">
            <h1>Success!</h1>
            <p>Thanks for verifying your email address, now you have access to all the application features.</p>
            <button onClick={() => history.push('/')}>Go to home</button>
        </div>
    );
};