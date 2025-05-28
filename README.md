# 🧩 Portfolio Generator – Microservices Architecture

A full-stack, microservices-based web app that allows developers to create, manage, and export their personal portfolios and resumes with customizable templates and PDF export features.

## 🎯 Features

- 🛡️ **Authentication Service**
  - JWT-based login/signup
  - Secure password hashing
  - Token refresh and role management

- 👤 **Profile Service**
  - Personal details (name, bio, contact info, location)
  - Social links

- 📄 **Resume Service**
  - Work experience, education, certifications
  - Skills and technologies

- 📦 **Project History Service**
  - Showcase personal or professional projects
  - GitHub links, tech stacks, and screenshots

- 🎨 **Template Service**
  - Choose or customize portfolio layouts
  - Templates rendered for web or PDF

- 📄 **PDF Export Service**
  - Generate downloadable PDFs of the portfolio/resume
  - Based on selected template and user data

- ⚙️ **Settings Service**
  - UI/UX preferences (theme, layout)
  - Language and section toggles

- 📊 **Logs Service**
  - Track user activity and system events

- 🖼️ **Media Service** *(optional)*
  - Upload and serve profile or project images

- 📧 **Email Service** *(optional)*
  - Send confirmation emails, portfolio links, etc.

## 🏗️ Tech Stack

- **Backend:** Node.js (Express) / Spring Boot *(modular per service)*
- **Frontend:** React.js / Next.js + TailwindCSS
- **Database:** PostgreSQL / MongoDB (per service DB)
- **Auth:** JWT, bcrypt
- **PDF Generation:** Puppeteer / pdf-lib
- **DevOps:** Docker, Docker Compose, Git
- **Optional:** Redis, RabbitMQ, Cloudinary, SendGrid

## 🚀 Future Goals

- Public portfolio sharing via custom URLs
- Analytics dashboard (views, clicks, downloads)
- Admin panel for abuse/reporting control
- Stripe integration for premium templates

## 📦 Getting Started

```bash
# Clone this repo
git clone https://github.com/yourusername/portfolio-microservices.git
cd portfolio-microservices

# Install dependencies (per service)
cd auth-service
npm install

# Start developing
npm run dev
