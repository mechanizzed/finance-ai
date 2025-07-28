# FinanceAI

FinanceAI is a modern personal finance management application built with Next.js, Prisma, and React. It helps users track their income, expenses, and investments, categorize transactions, and gain insights into their financial health—including AI-powered reports.

## Features

- **Authentication**: Secure email and password login and registration.
- **Dashboard**: Visual summary of your finances, including:
  - Balance, income, expenses, and investments summary cards
  - Pie chart of transaction types
  - Expenses breakdown by category
  - List of recent transactions
  - AI-powered financial report with insights and tips (using OpenAI)
- **Transactions**: Add, edit, and delete financial transactions with fields for name, amount, type (deposit, expense, investment), category, payment method, and date.
- **Categories**: Create, edit, and delete custom categories with icons for better organization.
- **Responsive UI**: Clean, modern, and mobile-friendly interface.

## Technologies Used

- **Next.js** (App Router)
- **React** & **TypeScript**
- **Prisma ORM** (PostgreSQL)
- **Tailwind CSS**
- **React Hook Form** & **Zod** (form validation)
- **OpenAI API** (AI-powered reports)
- **Radix UI** (accessible UI components)
- **Recharts** (data visualization)
- **Better Auth** (authentication)

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up your environment:**

   - Copy `.env.example` to `.env` and fill in your database and OpenAI API keys.

3. **Run database migrations:**

   ```bash
   npx prisma migrate deploy
   # or
   npx prisma migrate dev
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Main Sections

- **Sign In / Sign Up**: Authenticate with email and password.
- **Dashboard**: Overview of your financial status, charts, and AI insights.
- **Transactions**: View, add, edit, and delete your financial transactions.
- **Categories**: Manage transaction categories and assign icons.

## Data Model

- **User**: Manages authentication and user profile.
- **Transaction**: Stores financial records (amount, type, category, payment method, date, etc.).
- **TransactionCategory**: Customizable categories for transactions.

## AI-Powered Reports

On the dashboard, you can generate a financial report powered by OpenAI. The AI analyzes your transactions for the selected month and provides personalized insights and tips to help you improve your financial health.

## License

This project is for educational and personal use. Feel free to fork and adapt it for your needs.
