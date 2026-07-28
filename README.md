# 🎓 SuraEdu

**SuraEdu** adalah platform **Surat Pendidikan Digital** yang memudahkan pembuatan dokumen administrasi pendidikan secara cepat dan praktis. Pengguna cukup memilih template surat, mengisi data yang diperlukan, kemudian sistem akan menghasilkan dokumen yang siap digunakan tanpa harus membuat surat dari awal.

---
<img width="866" height="436" alt="image" src="https://github.com/user-attachments/assets/63cb34cb-570f-44e0-90c9-34ab3ea33398" />

## ✨ Fitur

* 📄 Koleksi template surat administrasi pendidikan
* 📝 Form dinamis untuk pengisian data surat
* ⚡ Pembuatan dokumen secara otomatis
* 🔍 Pencarian dan pengelompokan template surat
* 📱 Antarmuka modern dan responsif

---

## 📌 Roadmap

* [x] Google Authetication
* [ ] Manajemen template surat
* [ ] Tanda tangan digital
* [ ] QR Code verifikasi dokumen
* [ ] Dashboard

---

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* React
* TypeScript
* Tailwind CSS
* Shadcn Ui

### Backend

* **Express.js**
* REST API

### Database

* **SQLite**

### Authentication

* **Firebase**
  
  * Authentication

---

## 📂 Project Structure

```text
suraedu/
├── frontend/           # Next.js Frontend
├── backend/            # Express.js Backend
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/Alamabd/suraedu.git
cd suraedu
```

### 2. Install Dependencies

Frontend

```bash
cd frontend
npm install
```

Backend

```bash
cd ../backend
npm install
```

---

## ⚙️ Environment Variables

Buat file `.env` pada masing-masing project.

### Frontend (`frontend/.env.local`)

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (`backend/.env`)

```env
JWT_SECRET=super_secret_key_suraedu
JWT_EXPIRES=7d
```

---

## ▶️ Running the Project

Jalankan frontend

```bash
cd frontend
npm run dev
```

Jalankan backend New Terminal

```bash
cd backend
npm run dev
```

---

## 📖 Workflow

1. Pilih template surat.
2. Isi data yang diperlukan.
3. Sistem memvalidasi input.
4. Dokumen dibuat secara otomatis.
5. Surat siap diunduh.

---

## 🎯 Tujuan

SuraEdu dikembangkan untuk membantu sekolah, guru, tenaga kependidikan, maupun instansi pendidikan dalam mempercepat proses administrasi surat sehingga lebih efisien, konsisten, dan minim kesalahan.

---

## 🤝 Contributing

Kontribusi sangat terbuka. Silakan lakukan:

1. Fork repository
2. Buat branch baru
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

---

## 📄 License

Project ini menggunakan lisensi **MIT License**.
