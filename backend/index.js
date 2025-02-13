const { default: axios } = require("axios");
const { CronJob } = require("cron");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const emails = require('./emails');

dotenv.config();

const job = new CronJob(
    '0 8 * * * *',

    async function sendMotivationalQuotes() {
        console.log("Cron job is running");

        const response = await axios.get('https://zenquotes.io/api/today');

        const quote = response.data[0];

        console.log(quote.q);

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

        for(const email of emails) {
            const mailOptions = {
                from: process.env.ID,
                to: email,
                subject: 'Thought of the day',
                text: quote.q
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

    true,

    'Asia/Kolkata'
);