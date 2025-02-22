const { CronJob } = require("cron");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./schema/userSchema.js");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    }
    catch(error) {
        console.log("Failed to connect to MongoDB");
        console.log(error);
    }
}

async function getUsers() {
    try {
        const users = await User.find();
        return users;
    }
    catch(error) {
        console.log("Error while fetching users from database", error);
    }
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const job = new CronJob(
    '0 8 * * *', // Runs everyday at 8:00 AM

    async function sendMotivationalQuotes() {
        console.log("Cron job is running");

        const result = await model.generateContent("Provide only one funny Hindi morning greetings in English script. Just text nothing else");
        const response = await result.response;
        const text = response.text();

        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.in',
            port: 465,
            secure: true,
            auth: {
                user: process.env.ID,
                pass: process.env.PASS
            },
            debug: true,
            logger: true
        });

        const emails = await getUsers();

        for(const email of emails) {
            const mailOptions = {
                from: process.env.ID,
                to: email.email,
                subject: 'Good Morning...',
                text: text
            };

            await transporter.sendMail(mailOptions, (error, info) => {
                if(error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: '+info.response);
                }
            });
        }
    },
    
    null,

    false,

    'Asia/Kolkata'
);

app.post('/register', async (req, res) => {
    try {
        const user = await User.create({ email: req.body.email });
        res.status(201).json({
            status: true,
            message: "Registered Successfully",
            data: user
        })
    }
    catch(error) {
        console.log("Error while registering user", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
    connectDB();
    job.start();
})