import { useHistory } from "react-router-dom";


export const EmailVerificationFail = () => {
    const history = useHistory();

    return (
        <div className="content-container">
            <h1>Uh no...</h1>
            <p>Email verification failed, something went wrong while trying to verify your email</p>
            <button onClick={() => history.push('/signup')}>Back to sign Up</button>
        </div>
    );
};