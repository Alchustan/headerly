# Headerly 🚀

Headerly is a modern, developer-centric tool designed to instantly view and inspect HTTP request headers. Built with a focus on privacy and a premium "Technical-Warmth" aesthetic, it provides a clean interface for developers to debug and analyze their browser's communication with the server.

![Headerly Hero](public/screenshot.png)

## 🌟 Key Features

- **Live Header Inspection**: Instantly view all HTTP headers sent by your browser.
- **Dual View Modes**:
  - **Pretty View**: A clean, organized list with detailed descriptions and MDN documentation links for common headers.
  - **Raw View**: A syntax-highlighted JSON representation for quick copying or debugging.
- **Privacy First**: Headers are processed server-side in real-time and are **never stored** in any database or logs. What you see is only visible to you.
- **Developer Tools**:
  - **One-Click Copy**: Copy individual header values or the entire JSON payload.
  - **Download JSON**: Save your headers as a `.json` file for later use.
  - **Instant Refresh**: Re-fetch headers without a full page reload.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile viewing.
- **Dark & Light Mode**: A premium UI that respects your system preferences.

## 🛠️ Tech Stack

Headerly is built using the latest modern web technologies:

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theming**: [Next Themes](https://github.com/pacocoursey/next-themes)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.x or later
- **npm** or **pnpm** or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Alchustan/headerly.git
   cd headerly
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

### Production Build

To create an optimized production build:
```bash
npm run build
npm start
```

## 📂 Project Structure

```text
headerly/
├── app/                # Next.js App Router (pages & layouts)
│   ├── privacy/        # Privacy policy page
│   ├── terms/          # Terms of service page
│   └── page.tsx        # Main application entry point
├── components/         # React components
│   ├── ui/             # Reusable UI components (Shadcn)
│   └── ...             # Feature-specific components (HeaderCard, etc.)
├── lib/                # Utility functions and shared logic
│   ├── header-info.ts  # Database of header descriptions and MDN links
│   └── utils.ts        # Tailwind merge utilities
├── public/             # Static assets (images, icons)
├── hooks/              # Custom React hooks
└── ...                 # Configuration files (TS, ESLint, Tailwind, etc.)
```

## 🤝 Contributing

Contributions are welcome! If you'd like to improve Headerly, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Barış Yıldızoğlu](https://github.com/Alchustan)
