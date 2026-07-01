Mk-Global Express - Smart Logistics and Delivery Platform

Mk-Global Express is a modern, full-stack logistics and parcel delivery platform designed for speed, transparency, and reliability. Built with a focus on premium user experience and robust role-based management, the platform enables businesses to manage nationwide delivery needs efficiently.

Core Features
Landing Page
Hero Experience: High-performance interface with optimized animations.

Service Overview: Detailed breakdown of delivery solutions.

Coverage: Visualization of service reach.

Trust Indicators: Real-time statistics and customer feedback.

Rider Recruitment: Streamlined application process for delivery partners.

Role-Based Dashboards
Admin Dashboard: Manage user accounts, platform access, real-time parcel tracking, financial insights, rider applications, and system configurations.

Rider Dashboard: Manage assigned deliveries, provide status updates, track performance, and access internal support.

User Dashboard: Instant parcel booking, secure Stripe payment processing, end-to-end live tracking, and profile management.

Tech Stack
Frontend: Next.js 15+ (App Router), React 19

Styling: Tailwind CSS, DaisyUI

Animations: Framer Motion

Icons: Lucide React, React Icons

Backend: Next.js API Routes

Database: MongoDB

Authentication: NextAuth.js (Credentials and Google OAuth)

Payments: Stripe

Data Visualization: Recharts

Notifications: React Hot Toast, SweetAlert2

Getting Started
Prerequisites
Node.js 18.x or later

MongoDB instance

Google Cloud Console project (for OAuth)

Installation
Clone the repository:

Bash
git clone https://github.com/your-username/mk-global-express.git
cd mk-global-express
Install dependencies:

Bash
npm install
Create a .env.local file in the root directory and configure the following variables:

Code snippet
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
Start the development server:

Bash
npm run dev
Open http://localhost:3000 in your browser.

Deployment
This project is optimized for deployment on Vercel.

Push your code to a GitHub repository.

Import the project into Vercel.

Add the required Environment Variables in the Vercel dashboard.

Deploy.

Project Structure
src/app/: Next.js App Router (Routes and Pages)

src/Components/: Reusable UI and shared logic

src/UI/: Page-specific complex UI sections

src/Lib/: Core utilities, database connection, and authentication configuration

src/contexts/: React Context providers

src/assets/: Static assets and images

src/Providers/: Global provider wrappers

Contributing
Fork the project.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a pull request.

Developed by Mustapha Yusuf Isma'il (Azore)
