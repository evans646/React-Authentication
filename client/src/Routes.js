import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import {ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { LogInPage } from './pages/LoginPage';
import { EmailVerificationLandingPage } from './pages/EmailVerificationLandingPage';
import { SignUpPage } from './pages/SignUpPage';
import { PrivateRoute } from './auth/PrivateRoutes';
import { PleaseVerifyEmailPage } from './pages/PleaseVerifyEmail';
import {PasswordResetLandingPage} from './pages/PasswordResetLandingPage';
import {ProfilePage} from './pages/ProfilePage'

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/" exact>
                    <UserInfoPage />
                </PrivateRoute>
                <Route path="/verify-email/:verificationString">
                    <EmailVerificationLandingPage />
                </Route>
                <Route path="/forgot-password">
                    <ForgotPasswordPage />
                </Route>
                <Route path="/reset-password/:passwordResetCode">
                    <PasswordResetLandingPage />
                </Route>
                <Route path="/login" exact>
                    <LogInPage/>
                </Route>
                <Route path="/please-verify">
                    <PleaseVerifyEmailPage />
                </Route>
                <Route path="/signup" exact>
                    <SignUpPage />
                </Route>
                <Route path="/profile" exact>
                    <ProfilePage/>
                </Route>
            </Switch>
        </Router>
    );
};