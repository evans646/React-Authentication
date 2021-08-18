import { ObjectID } from "mongodb";//to find users in the database
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";



export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {
        const { verificationString } = req.body;
        const db = getDbConnection('react-auth-db');
        const result = await db.collection('users').findOne({
            verificationString,
        });
        //if there is no user found using the provided verification string
        if (!result) return res.status(401).json({ message: "The email verification code is incorrect" });
        //if there is  user
        const {_id: id, email, info } = result;
        
        await db.collection('users').updateOne({ _id: ObjectID(id) }, { $set: { isVerified: true } });
        
        //we need to send the information back to the user
        jwt.sign({ id, email, isVerified: true, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
            if (err) return res.sendStatus(500)
            res.status(200).json({ token })
        });
    }
};
