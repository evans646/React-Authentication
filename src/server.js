import express from 'express';
import cors from 'cors';
import path from 'path';
import { routes } from './routes';
import { initializeDbConnection } from './db';

const PORT = process.env.PORT || 8080;

const app = express();


app.use(cors())
app.use(express.static(path.join(__dirname, '/build')));

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach(route => {
    app[route.method](route.path, route.handler);
});



app.get('*', (_req, res) => {  
    res.sendFile(path.join(__dirname + '/build/index.html'));
});
// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
initializeDbConnection()
    .then(() => console.log('DATABASE CONNECTED'))
    .then(() => {
        app.listen(PORT, () => {
            console.log(`APP IS LISTENING ON PORT ${PORT}`);
        });
    });
