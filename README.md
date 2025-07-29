# 🌐 OCR Frontend (Vite + React)

This is the frontend for the OCR Aadhaar reader application, built using **Vite** and **React**. It interacts with the backend OCR service to upload Aadhaar card images and display the extracted information.

---

## 🚀 Features

- 🔒 User Authentication (Login / Register)
- 🔗 Shorten long URLs
- 📋 View list of shortened URLs
- 🔁 Redirection using short ID
- 📊 Dashboard for managing links (optional)
- 🌍 CORS compatible with backend
- ⚡ Fast development with Vite + Tailwind CSS

---

## 🛠 Setup (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/SHIKHIL8137/URL-Shortener-Frontend.git
cd frontend
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Create a `.env` file

```env
VITE_FRONTEND_URL=http://localhost:2000
VITE_BACKEND_URL=http://localhost:3000
```

> This should match the backend URL (especially if it runs in Docker).

### 4. Start the development server

```bash
pnpm run dev
```

Visit [http://localhost:2000](http://localhost:2000) to open the app.

---

## 🔁 API Integration

The frontend sends a `POST` request to:

```ts
POST /api/url
Content-Type: multipart/form-data
GET /api/urls
To fetch all shortened URLs for the logged-in user.
GET /api/redirect/:shortId
To redirect to the original URL using short ID.
```

With `frontImage` and `backImage` as form-data fields.

You can use Axios like this:

```ts
const response = await axios.post(\`\${import.meta.env.VITE_API_BASE_URL}/api/url\`, formData);
```

---

## 📦 Production Build

To create a production-ready build:

```bash
pnpm run build
```

To locally preview the build:

```bash
pnpm run preview
```

---

## 🚀 Deployment

You can deploy this frontend easily using any static hosting service like:

- Vercel (Recommended)
- Netlify
- Render (Static Site)
- GitHub Pages

Set your `VITE_API_BASE_URL` in the host's environment variable settings for production.

---

## ✅ Vercel Rewrite Config
Create a vercel.json in the root with:
```bash
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

## ✍️ Author

Built with ❤️ by [Shikhil K S](https://github.com/SHIKHIL8137)

---

## 📄 License

This project is licensed under the MIT License.
