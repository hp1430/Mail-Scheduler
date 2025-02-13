# Mail Scheduler

## 📌 Overview
Mail Scheduler is a Node.js-based application that allows users to schedule emails for a future date and time. It ensures reliable and timely email delivery using cron jobs and integrates with an email service provider (such as Nodemailer with SMTP, SendGrid, etc.).

## 🚀 Features
- Schedule emails to be sent at a specific time
- Supports multiple recipients
- Uses cron jobs for scheduling
- Integration with popular email services

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email Service**: Nodemailer
- **Scheduler**: Node-cron

## 📦 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/hp1430/Mail-Scheduler.git
   cd Mail-Scheduler
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the required configurations:
   ```sh
   SMTP_HOST=<your_smtp_host>
   SMTP_PORT=<your_smtp_port>
   SMTP_USER=<your_email>
   SMTP_PASS=<your_password>
   MONGO_URI=<your_mongo_database_url>
   ```

## 🚀 Usage
1. Start the server:
   ```sh
   npm start
   ```
2. Use API endpoints to schedule emails (Example: `/schedule-email`).
3. The application will automatically send scheduled emails at the specified time.

## 📌 API Endpoints
- `POST /schedule-email` → Schedule a new email
  ```json
  {
    "to": "recipient@example.com",
    "subject": "Scheduled Email",
    "message": "Hello, this is a scheduled email!",
    "scheduleTime": "2025-02-14T10:00:00Z"
  }
  ```
- `GET /emails` → Fetch all scheduled emails
- `DELETE /emails/:id` → Cancel a scheduled email

## 🛠️ Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.


## 📞 Contact
- **GitHub**: [hp1430](https://github.com/hp1430)
- **Email**: parasharhimanshu41@gmail.com

---
⭐ If you like this project, don't forget to star the repository!