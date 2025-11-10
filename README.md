# 🌌 Astro Straits

**Astro Straits** is an advanced **AI-powered astrology chat platform**, inspired by *AstroTalk*.
Unlike traditional astrology apps that connect you with human astrologers, Astro Straits features **“Astro” — your intelligent AI astrologer** powered by **Google Gemini AI**.

Get instant astrological insights, personalized predictions, and cosmic guidance — all through seamless AI conversation.

---

## 🚀 Live Demo

🔗 **Website:** [https://astrostraits-ai.vercel.app](https://astrostraits-ai.vercel.app)
📂 **GitHub Repo:** [https://github.com/Vaibhu18/Astro-Straits](https://github.com/Vaibhu18/Astro-Straits)

---

## 🧠 Key Features

- 🤖 **AI Astrologer (Astro)** – Chat with an intelligent AI trained to provide astrological insights and personal guidance.
- 🔐 **Secure Authentication** – User login and signup powered by **NextAuth.js**.
- 💾 **Persistent Data** – All user data is securely stored in **MongoDB Atlas**.
- 🌙 **Personal Horoscope & Predictions** – Get predictions based on your date, time, and place of birth.
- 🎨 **Modern UI** – Beautiful, responsive interface built using **Shadcn/UI** and TailwindCSS.
- ⚡ **Fullstack Next.js Architecture** – Single unified codebase for both frontend and backend.
- 🔮 **Gemini AI Integration** – Uses **Google Gemini API** for generating responses and astrological insights.
- 🌍 **Deployed on Vercel** – Fast, scalable, and globally distributed deployment.

---

## 🏗️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | Next.js 14 (App Router) |
| **Backend** | Next.js API Routes (Fullstack) |
| **Database** | MongoDB (Mongoose ORM) |
| **Authentication** | NextAuth.js |
| **AI Engine** | Google Gemini API |
| **UI Components** | Shadcn/UI + TailwindCSS |
| **Deployment** | Vercel |

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Vaibhu18/Astro-Straits.git
cd Astro-Straits
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env.local` file in the project root and add the following:

```env
MONGODB_URI=mongodb://localhost:27017/astro-straits
NEXTAUTH_SECRET="v88hovxk9HjBSL4afxybqTg366CgHXkUhHZTZswfyVQ="
AI_API_KEY=YOUR_GEMINI_API_KEY
```

> ⚠️ **Note:** Never commit your `.env` file or expose your API keys publicly.
> Replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key.

### 4️⃣ Run the Development Server
```bash
npm run dev
```
Now visit 👉 [http://localhost:3000](http://localhost:3000)

---

## 🧩 Folder Structure

```
Astro-Straits/
│
├── app/                 # Next.js App Router pages and routes
├── components/          # Reusable UI components
├── lib/                 # Configurations (DB, Auth, AI)
├── models/              # MongoDB models (User, etc.)
├── public/              # Static assets
├── styles/              # Global styles
├── utils/               # Utility and helper functions
└── .env.local           # Environment variables (ignored by git)
```

---

## 🔐 Authentication (NextAuth)

- **Providers:** Credentials / Google
- **Session:** JWT-based
- **Security:** Uses `NEXTAUTH_SECRET` for encryption and session signing.

Example flow:
1. User signs up / logs in.
2. NextAuth creates a secure session.
3. User can chat with **Astro (AI)** after authentication.

---

## 🧘 AI Integration (Gemini)

Astro Straits integrates **Google Gemini API** to provide natural, context-aware responses.
The AI understands user birth details, questions, and preferences to offer personalized astrological advice.

Example prompt:

```javascript
const response = await ai.models.generateContent({
  model: "gemini-2.0-pro",
  contents: "Based on my birth chart, what can you tell me about my career?"
});
```

---

## 🖥️ Deployment

This app is live and deployed on **Vercel**.
To deploy your own version:

1. Push your project to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/).
3. Import your GitHub repo.
4. Add environment variables in the “Environment Variables” section.
5. Deploy 🚀

---

## 🧪 Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 🧑‍💻 Developer

**👤 Author:** [Vaibhav Shinde (vcode)](https://github.com/Vaibhu18)
**💬 Project Name:** Astro Straits
**🌠 AI Persona:** Astro (Powered by Gemini AI)

---

## 🪐 Future Enhancements

- Add **daily horoscope notifications** via email.
- Integrate **AI-generated birth chart visualization**.
- Introduce **multi-language support** for global accessibility.
- Enable **premium plan** for deeper, personalized astrological insights.

---

## 📜 License

This project is licensed under the **MIT License**.
Feel free to fork, modify, and use it responsibly.

---

### ⭐ If you like this project, don’t forget to star the repo on GitHub!
👉 [https://github.com/Vaibhu18/Astro-Straits](https://github.com/Vaibhu18/Astro-Straits)
