import { MongoClient } from 'mongodb';

const dbUrl = process.env.DB_URL || 'mongodb+srv://react-auth:XvcwASoMWd2tQ4h0@auth.sv5ih.mongodb.net/';

let client;


export const initializeDbConnection = async() => { 
    client = await MongoClient.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

export const getDbConnection = dbName => {
    const db = client.db(dbName);
    return db;
};
 