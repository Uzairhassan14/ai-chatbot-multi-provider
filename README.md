# 🤖 AI Chatbot (Multi-Provider)

A modern **AI Chatbot** built with **React (Vite + TailwindCSS)** and **Express.js**, supporting multiple AI providers:

- **OpenAI GPT (paid)**
- **Google Gemini (free)**
- **HuggingFace (free fallback)**

It supports **streaming responses**, **chat history**, and a clean UI similar to ChatGPT.

---

## 🚀 Features
- ✅ Sleek modern UI with **TailwindCSS**
- ✅ Chat history stored in React state
- ✅ Multiple AI providers (OpenAI / Gemini / HuggingFace)
- ✅ **Streaming responses** (word-by-word typing effect)
- ✅ Loading indicator while AI responds
- ✅ Error handling with retry option
- ✅ **Framer Motion animations** for smooth message bubbles
- ✅ One command runs **frontend + backend**

---

## 📂 Project Structure
```
ai-chatbot-multi-provider/
│── client/        # React (Vite + TailwindCSS) frontend
│── server/        # Express.js backend
│── .env           # API keys here
│── package.json   # Root package.json (runs both client + server)
```

---

## 🔑 Environment Variables
Create a `.env` file in the **root** of your project:

```env
# OpenAI (optional, paid)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx

# Google Gemini (free from https://aistudio.google.com/api-keys)
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxx

# HuggingFace (free, optional)
HF_API_KEY=hf_xxxxxxxxxxxxxxxxx
```

---

## 🛠 Installation

```bash
# Clone repo
git clone https://github.com/<your-username>/ai-chatbot-multi-provider.git
cd ai-chatbot-multi-provider

# Install dependencies (root + client + server)
npm install
```

---

## ▶️ Run Development (Frontend + Backend together)
```bash
npm run dev
```

- React Vite app → http://localhost:5173  
- Express backend → http://localhost:3001  

---

## 📦 Build for Production
```bash
cd client
npm run build
```

- Serve frontend build with your preferred static host (e.g. **Vercel, Netlify**)  
- Deploy backend (`server/`) on **Render / Railway / Heroku**  

---

## 📸 UI Preview
> *(Add screenshots or GIFs of the chatbot UI here for better presentation)*

---

## 🤝 Contributing
Pull requests are welcome!  
1. Fork the repo  
2. Create your feature branch (`git checkout -b feature-name`)  
3. Commit changes (`git commit -m 'Added feature'`)  
4. Push to branch (`git push origin feature-name`)  
5. Open a Pull Request  

---

## 📜 License
MIT License © 2025
