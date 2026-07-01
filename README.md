# 🚚 Mk-Global Express - Smart Logistics & Delivery Platform

Mk-Global Express is a modern, full-stack logistics and parcel delivery platform designed for speed, transparency, and reliability. Built with a focus on premium user experience and robust role-based management, Join thousands of businesses that trust Mk-Global Express for their nationwide delivery needs.
ystem.

## ✨ Core Features

### 🌐 Landing Page (Interactive & Dynamic)

- **Hero Experience**: Captivating animations using Framer Motion.
- **Service Mastery**: Detailed breakdown of delivery solutions.
- **Nationwide Coverage**: Visualizing service reach across Bangladesh.
- **Trust Indicators**: Real-time stats and verified customer reviews.
- **Rider Recruitment**: Streamlined application flow for delivery partners.

### 🛡️ Secure Dashboards (Role-Based)

#### **👨‍💼 Admin Dashboard**

- **User Orchestration**: Manage accounts, roles, and platform access.
- **Logistics Control**: Real-time overview of all parcels and delivery statuses.
- **Financial Insights**: Monitor platform balance and transactions.
- **Partner Management**: Review and approve rider applications.
- **Configurable Settings**: Fine-tune platform parameters and zones.

#### **🏍️ Rider Dashboard**

- **Job Nexus**: View and accept assigned deliveries.
- **Status Updates**: Real-time tracking of delivery milestones.
- **Performance History**: Track completed deliveries and earnings.
- **Direct Support**: Integrated communication channel for assistance.

#### **👤 User Dashboard**

- **Instant Booking**: Create parcels with a few clicks.
- **Premium Payments**: Secure checkout experience powered by **Stripe**.
- **Live Tracking**: End-to-end visibility of parcel journey.
- **Personalized Space**: Manage profiles, delivery addresses, and notifications.

## 🚀 Tech Stack

- **Frontend**: [Next.js 15+](https://nextjs.org/) (App Router), [React 19](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Backend**: [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- **Database**: [MongoDB](https://www.mongodb.com/) (Native Driver)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Credentials & Google OAuth)
- **Payments**: [Stripe](https://stripe.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/), [SweetAlert2](https://sweetalert2.github.io/)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- MongoDB Atlas account or local instance
- Google Cloud Console project (for OAuth)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/mk-global-express.git
   cd mk-global-express
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add the following:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Stripe
   STRIPE_PUBLIC_KEY=your_stripe_public_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the magic.

## 📦 Deployment

The project is optimized for **Vercel**.

1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add the Environment Variables in the Vercel dashboard.
4. Deploy!

## 📜 Project Structure

```text
src/
├── app/               # Next.js App Router (Routes & Pages)
├── Components/        # Reusable UI & Shared logic
├── UI/                # Page-specific complex UI sections
├── Lib/               # Core utilities, DB connection, Auth config
├── contexts/          # React Context providers (Auth, Theme, etc.)
├── assets/            # Static assets and images
└── Providers/         # Global provider wrappers
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Developed by Mustapha Yusuf Isma'il (Azore)
