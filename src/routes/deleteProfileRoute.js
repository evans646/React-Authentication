import jwt from 'jsonwebtoken';
import { ObjectID } from 'mongodb';
import { getDbConnection } from '../db';


export const deleteProfileRoute = {
  path: '/api/users/:userId/delete',
  method: "delete",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;
    if (!authorization) {
      return res.status(401).json({ message: 'No authorization header sent'});
    }
    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res.status(401).json({ message: 'Unable to verify token' });
        const { id } = decoded;

      if (id !== userId)return res.status(403).json({ message: "Not allowed to delete  user's account"});
      const db = getDbConnection("react-auth-db");

      await db.collection("users").findOneAndDelete({ _id: ObjectID(id) });
      
      jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) {
            return res.sendStatus(200);
          }
          res.sendStatus(202); //trying out to see how this works out.
        }
      );
    });
  },
};