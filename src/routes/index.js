import {forgotPasswordRoute} from './forgotPasswordRoute';
import { logInRoute } from './logInRoute';
import { signUpRoute } from './signUpRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoute';
import {resetPasswordRoute} from './resetPasswordRoute';
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute';
import {googleOauthCallbackRoute } from './googleOauthCallbackRoute';
import {deleteProfileRoute} from './deleteProfileRoute';


export const routes = [
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute ,
    forgotPasswordRoute,
    deleteProfileRoute,
    logInRoute,
    resetPasswordRoute,
    signUpRoute,
    updateUserInfoRoute,
    verifyEmailRoute,
];
