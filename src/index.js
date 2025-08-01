import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";


dotenv.config({
    path: './.env'
});

const app = express();

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT  || 8000}`)
    })
})
.catch((err) => {
    console.log('MONGO db connection failed: ', err)
})





















// import express from "express";
// const app = express();


// ;( async () => {
//     try {
//         mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         })

//     } catch (error) {
//         throw error
//     }
// })()