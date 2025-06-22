# CyberQuiz 🚀

A modern, interactive cybersecurity quiz application built with React and Vite. Test your knowledge of cybersecurity concepts with a terminal-style interface that provides an immersive learning experience.

![CyberQuiz Demo](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.5-purple)

## 🌟 Features

### 🎯 Core Functionality

- **Interactive Quiz Interface**: Terminal-style UI with cyberpunk aesthetics
- **Multiple Difficulty Levels**: Beginner, Intermediate, and Advanced questions
- **Real-time Timer**: Countdown timer with visual warnings
- **Progress Tracking**: Visual progress bar and question counter
- **Keyboard Navigation**: Full keyboard support for accessibility
- **Results Analysis**: Detailed score breakdown and performance metrics

### 🎨 User Experience

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Terminal Aesthetics**: Green-on-black theme with glowing effects
- **Smooth Animations**: CSS animations and transitions
- **Error Handling**: Graceful error handling with retry functionality
- **Accessibility**: Keyboard shortcuts and screen reader support

### 🔧 Technical Features

- **Modern React**: Built with React 19 and latest hooks
- **Vite Build System**: Fast development and optimized production builds
- **Tailwind CSS**: Utility-first styling with custom components
- **Axios Integration**: Robust API communication
- **JSON Server**: Mock API for development and testing

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd CyberQuiz
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5174` (or the port shown in your terminal)

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# API Server (if using JSON Server)
npx json-server --watch src/data/api/quiz.json --port 3000
```

## 🎮 How to Use

### Starting the Quiz

1. Navigate to the quiz page (`/quiz`)
2. Click the "Start Quiz" button or press `Enter`
3. The quiz will load questions from the API

### Navigation Controls

#### Mouse Controls

- **Select Answer**: Click on any option
- **Previous Question**: Click "← Previous" button
- **Next Question**: Click "Next →" button
- **Finish Quiz**: Click "Finish Quiz" button (on last question)

#### Keyboard Shortcuts

- **Space/Enter**: Select highlighted answer
- **Arrow Up/Down**: Navigate between options
- **Arrow Left**: Previous question
- **Arrow Right**: Next question
- **F**: Finish quiz (on last question)
- **Escape**: Close results modal

### Quiz Interface

#### Terminal Header

- Shows current question number and total questions
- Displays progress percentage
- Shows answered questions count

#### Timer Display

- Real-time countdown timer
- Visual warnings when time is running low
- Pulsing animation for urgency

#### Question Display

- Clear question text in terminal-style formatting
- Multiple choice options with letter indicators
- Selected answer highlighting

#### Navigation Bar

- Previous/Next buttons with keyboard shortcuts
- Finish button (appears on last question)
- Disabled states for unavailable actions

### Results Screen

- **Score Circle**: Visual representation of performance
- **Detailed Breakdown**: Correct answers, total questions, time used
- **Performance Message**: Encouraging feedback based on score
- **Action Buttons**: Retry quiz or return to home

## 📁 Project Structure

```
CyberQuiz/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Common components
│   │   ├── quiz/          # Quiz-specific components
│   │   └── ui/            # UI components (Button, Card, Modal)
│   ├── constants/         # Application constants
│   │   ├── api.js         # API configuration
│   │   ├── app.js         # App constants
│   │   └── routes.js      # Route definitions
│   ├── context/           # React context providers
│   ├── data/              # Mock data and API responses
│   │   └── api/
│   │       └── quiz.json  # Quiz questions data
│   ├── hooks/             # Custom React hooks
│   ├── layout/            # Layout components
│   │   ├── Footer/        # Footer component
│   │   └── Header/        # Header component
│   ├── pages/             # Page components
│   │   ├── Home/          # Home page
│   │   ├── Quiz/          # Quiz page with components
│   │   └── Results/       # Results page
│   ├── services/          # API services
│   ├── styles/            # Global styles
│   ├── types/             # TypeScript types (if applicable)
│   ├── utils/             # Utility functions
│   │   └── quizUtils.js   # Quiz-specific utilities
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Application entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🔧 Configuration

### API Configuration

The application uses a configurable API setup in `src/constants/api.js`:

```javascript
export const API_CONFIG = {
  BASE_URL: import.meta.env.REACT_API_BASE_URL || "http://localhost:3000",
  VERSION: "v1",
  TIMEOUT: 10000,
};
```

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_API_BASE_URL=http://localhost:3000
```

### Customizing Questions

Edit `src/data/api/quiz.json` to add or modify quiz questions:

```json
{
  "id": 1,
  "level": "beginner",
  "question": "Your question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "Correct Answer"
}
```

## 🎨 Styling

The application uses a combination of:

- **Tailwind CSS**: For utility classes and responsive design
- **CSS Modules**: For component-specific styling
- **Custom CSS**: For animations and terminal effects

### Terminal Theme Colors

- **Primary**: `#00ff00` (Green)
- **Background**: `#0a0a0a` (Dark)
- **Secondary**: `#1a1a1a` (Medium dark)
- **Text**: `#ffffff` (White)
- **Accent**: `#cccccc` (Light gray)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify
3. Or connect your GitHub repository

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm run lint`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**Port already in use**

```bash
# Kill the process using the port
npx kill-port 5174
# Or use a different port
npm run dev -- --port 3001
```

**API connection issues**

- Ensure JSON Server is running: `npx json-server --watch src/data/api/quiz.json --port 3000`
- Check API configuration in `src/constants/api.js`
- Verify network connectivity

**Build errors**

```bash
# Clear cache and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information

---

**Happy Quizzing! 🎯**
