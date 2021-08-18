import { google } from 'googleapis';

export const oauthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `https://mysterious-tor-36765.herokuapp.com/auth/google/callback`,
);