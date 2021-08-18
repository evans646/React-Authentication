import { v4 as uuid } from 'uuid';
import { sendEmail } from '../utils/sendEmails';
import { getDbConnection } from '../db';

export const forgotPasswordRoute = {
    path: '/api/forgot-password/:email',
    method: 'put',
    handler: async (req, res) => {
        const { email } = req.params;

        const db = getDbConnection('react-auth-db');
        const passwordResetCode = uuid();

        const { result } = await db.collection('users')
            .updateOne({ email }, { $set: { passwordResetCode } });

        if (result.nModified > 0) {
            try {
                await sendEmail({
                    to: email,
                    from: 'jw207740@gmail.com',
                    subject: 'Password Reset',
                    text: `
                        To reset your password, click this link:
                        https://mysterious-tor-36765.herokuapp.com/reset-password/${passwordResetCode}
                    `
                });//and update here too 
            } catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        }
        res.sendStatus(200);
    }
};