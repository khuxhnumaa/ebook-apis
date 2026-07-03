import {config} from './src/config/config.js';
import exp_app from "./src/app.js";
import connectDB from './src/config/db.js';
const startServer = async() =>{

    await connectDB();
    
    const port = config.port || 3000;

    exp_app.listen(port, ()=>{
        console.log(`Listening on port : ${port}`);
    });
};

startServer();