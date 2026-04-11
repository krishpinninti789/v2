access website with the link provided below-
https://ndms-eduhub-tech.vercel.app/

# 🏫 No Due Management System

The No Due Management System is a secure and user-friendly web app designed for colleges and universities to manage student fee dues, track payments, and generate digital invoices. With role-based dashboards for both students and admins, the system streamlines due collection and status monitoring, including secure online payments via Razorpay.

---

## 🚀 Features

### 🎓 Student Dashboard

- View total due amount and individual due entries
- Pay securely through Razorpay
- View payment status and download receipts
- Secure login via **Auth.js**

### 👨‍💼 Admin Dashboard

- View all students and their due/payment history
- Add, edit, or delete dues for students
- Track pending, partial, and completed payments
- Generate downloadable PDF invoices
- Payment analytics dashboard

---

## 🛠 Tech Stack

| Layer        | Technology                                     |
| ------------ | ---------------------------------------------- |
| **Frontend** | Next.js 15, Tailwind CSS, shadcn/ui            |
| **Backend**  | Server Actions (Edge), MongoDB (or PostgreSQL) |
| **Payments** | Razorpay Integration                           |
| **Auth**     | Auth.js (OAuth/JWT)                            |
| **PDF**      | pdf-lib / html-to-pdf                          |

---

## 📂 Project Structure

/app ├── auth/ # Auth.js routes and middleware ├── dashboard/admin/ # Admin-specific pages ├── dashboard/student/ # Student-specific pages ├── dues/ # Due creation, status, and history └── api/ # API routes for payments, dues, auth /components ├── ui/ # Shared shadcn UI components ├── table/ # Due tables and history └── charts/ # Payment analytics /lib ├── auth.ts # Auth config ├── razorpay.ts # Razorpay server-side utility └── db.ts # DB connection logic /types └── index.ts # Shared types for users, dues, payments

---

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/no-due-management.git
cd no-due-management

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env.local file with:

AUTH_SECRET=your_auth_secret
AUTH_TRUST_HOST=true

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

DATABASE_URL=your_mongodb_or_postgres_url

4. Run the App

npm run dev

Go to http://localhost:3000


---

💳 Payment Workflow

1. Student logs in using Auth.js


2. Views dues and clicks “Pay Now”


3. Razorpay popup handles secure payment


4. Upon success:

Payment entry is logged

Due is marked as cleared

PDF invoice is generated and downloadable





---

📈 Admin Features

Add/update/delete dues

Filter students by due status

Generate invoices on demand

View payment timeline and stats

Monitor total collection and pending amounts



---

🔒 Security

Auth.js handles role-based access

Only authorized users can access respective dashboards

Razorpay handles PCI-compliant secure payments

Server-side validations on all sensitive actions



---

📦 Future Enhancements

[ ] SMS/email payment reminders

[ ] Mobile responsive PWA

[ ] Student comment/appeal portal



---

📜 License

MIT License. See LICENSE for more information.


---

🙌 Acknowledgements

Razorpay

shadcn/ui

Auth.js

pdf-lib

Next.js



---

> Built to simplify and secure college due collection for students and institutions alike.

 # Test credentials for use

 username = "22bq1a05h3@vvit.net"
 password = 'vvit123cse'




```
