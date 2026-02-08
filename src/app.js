require('dotenv').config();
const express = require('express');
const { connectDB } = require('./connections/mongoConn');
const router = require('./routers/index');
const app = express();
const PORT = process.env.PORT || 4000;


const startServer = async () => {
    try {
        await connectDB(); // Connect to DB first

        app.use(express.json());

        app.get('/health', (req, res) => {
            res.send("Notely project is up");
        });

        app.use('/api/v1', router);

        
        app.listen(PORT, () => {
            console.log("Server is listening on port ", PORT);
        });
        
    } catch (error) {
        console.log(error);
    }
};

startServer();