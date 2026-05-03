# 💸 Salary Tracker

A personal expense tracking web app built with pure HTML, CSS, and JavaScript. Track your monthly salary, log daily expenses by category, view a dashboard with summaries, and export reports — all with Firebase authentication so your account works across any device.

---

## 🌐 Live Demo

> Deployed via GitHub Pages:
> `https://phanivardhanv7.github.io/Salary/login.html`

---

## 📁 Project Structure

```
salary-tracker/
├── login.html           # Login & Register page (Firebase Auth)
├── index.html           # Add Expense page (main tracker)
├── dashboard.html       # Dashboard with filters & summaries
├── firebase-config.js   # Firebase config reference (not used directly)
├── google-apps-script.js# Google Apps Script reference (optional)
├── firestore.rules      # Firestore security rules
└── README.md            # This file
```

---

## ✨ Features

### 🔐 Authentication
- Register with name, email, and password
- Login / Logout
- Forgot password (email reset)
- Each user gets a unique **6-digit User ID** generated on registration
- Powered by **Firebase Authentication**

### 💰 Expense Tracking
- Add expenses with description, amount, category, and date
- 8 categories: Food, Transport, Rent, Entertainment, Shopping, Bills, Health, Other
- Delete individual entries
- Clear all expenses
- Filter by category and month

### 📊 Dashboard
- Summary cards: Salary, Total Spent, Remaining, Entries, Avg/Day, Top Category
- Spending breakdown by category with progress bars
- Daily breakdown table
- All transactions table
- Filter by custom date range and category

### 📤 Export Options
- **CSV** — download as spreadsheet (opens in Excel / Google Sheets)
- **PDF** — opens a print-ready report in a new tab
- **Summary Image** — downloads a PNG card with Salary, Spent, Remaining
- All exports support **date range selection** (This Month, Last Month, 3 Months, 6 Months, This Year, All Time, or custom)

### 👤 Profile
- Profile photo upload (stored locally)
- View name, email, and 6-digit User ID
- Click the badge in the header to open the profile card

### 📱 Mobile Responsive
- Fully responsive on all screen sizes
- Sidebar stacks to a 2-column grid on mobile
- Export buttons move to the bottom on mobile
- Dashboard filters stack vertically on mobile

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/PhanivardhanV7/Salary.git
cd Salary
```

### 2. Open locally

```bash
open login.html
```

Or just double-click `login.html` in Finder.

---

## 🔥 Firebase Setup

This app uses Firebase for authentication and user data storage.

### Step 1 — Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it → click through
3. Click the **Web icon** (`</>`) → register app → copy the config

### Step 2 — Enable services

- **Authentication** → Build → Authentication → Get started → Enable **Email/Password**
- **Firestore** → Build → Firestore Database → Create database → **Test mode** → Enable

### Step 3 — Paste your config

Open `login.html` and find this section, replace with your values:

```js
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
```

### Step 4 — Set Firestore Rules

In Firebase Console → Firestore → Rules, paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Click **Publish**.

---

## 💾 Data Storage

| Data | Where |
|------|-------|
| Expenses | `localStorage` (browser) |
| Salary | `localStorage` (browser) |
| User accounts | Firebase Authentication |
| User profile + 6-digit ID | Firebase Firestore |
| Profile photo | `localStorage` (browser) |
| Login session | `sessionStorage` (clears on tab close) |

> **Note:** Expenses are stored locally in the browser. They do not sync across devices automatically. Use the CSV/PDF export to back up your data.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Auth | Firebase Authentication |
| Database | Firebase Firestore |
| Fonts | Google Fonts (Bebas Neue, Inter) |
| Hosting | GitHub Pages |
| Export | Canvas API (image), Blob API (CSV), Print API (PDF) |

---

## 📸 Screenshots

| Login | Add Expense | Dashboard |
|-------|-------------|-----------|
| Register / Login with Firebase | Add, filter, delete expenses | Summary cards, category breakdown, export |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT License — free to use and modify.

---

*Built with ❤️ using plain HTML, CSS, and JavaScript*
