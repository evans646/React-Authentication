import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { getDbConnection } from '../db';
import { sendEmail } from '../utils/sendEmails';


export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;
        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email });
        if (user) {
            res.sendStatus(409);
        } else {
            const salt = uuid();
            const pepper = process.env.PEPPER_STRING
    
            const passwordHash = await bcrypt.hash(salt + password + pepper, 10);
            const verificationString = uuid();
    
            const startingInfo = {
                hairColor: '',
                favoriteFood: '',
                bio: '',
            };
    
            const result = await db.collection('users').insertOne({
                email,
                passwordHash,
                salt,
                info: startingInfo,
                isVerified: false,
                verificationString,
            });
            const { insertedId } = result;
            //before we sign the jwt token and send it to the user we will use send the verification email with the function that we created previously 
            try {
                await sendEmail({
                    to: email,
                    from: 'jw207740@gmail.com',
                    subject: 'Email Verification',
                    text: `Thanks for signing up, click here to verify your email address :https://mysterious-tor-36765.herokuapp.com/verify-email/${verificationString}`,
                });
            } catch (e) {
                console.log(e)
                res.sendStatus(500)
              
            }
    
            jwt.sign({
                id: insertedId,
                email,
                info: startingInfo,
                isVerified: false,
            },
                process.env.JWT_SECRET,
                {
                    expiresIn: '2d',
                },
                (err, token) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(200).json({ token });
                });
            
        }
    }
};