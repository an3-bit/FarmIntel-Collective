# Climate-Smart Soil Advisor 🌱

A modern, AI-powered farming application that helps farmers optimize their agricultural practices through intelligent crop recommendations, soil analysis, and weather forecasting.

## 🌟 Features

### Core Functionality
- **AI-Powered Crop Recommendations** - Get intelligent suggestions for the best crops to plant based on soil composition and local climate
- **Advanced Soil Analysis** - Upload soil test results or get AI predictions for NPK levels, pH balance, and soil health indicators
- **Weather Forecasting & Alerts** - 7-day weather predictions with rainfall alerts, temperature forecasts, and planting recommendations
- **Yield Analytics & Insights** - Track farm performance with detailed analytics, yield predictions, and actionable insights

### User Experience
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Dashboard** - Real-time data visualization and monitoring
- **Authentication System** - Secure sign-in and sign-up with email/password
- **Modern UI/UX** - Beautiful, intuitive interface built with modern design principles

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd yield-wise-aid
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
   Navigate to `http://localhost:8081` (or the port shown in your terminal)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── AuthModal.tsx   # Authentication modal
│   ├── Hero.tsx        # Landing page hero section
│   └── Navigation.tsx  # Navigation component
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Index.tsx       # Home page
│   ├── LearnMore.tsx   # Features page
│   ├── SignIn.tsx      # Sign-in page
│   └── NotFound.tsx    # 404 page
├── lib/                # Utility functions
├── hooks/              # Custom React hooks
├── App.tsx             # Main app component
└── main.tsx            # Application entry point
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing

### UI/UX
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications

### State Management
- **React Query (TanStack Query)** - Server state management
- **React Hooks** - Local state management

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Vite** - Build tool and dev server

## 🎨 Design System

The application uses a comprehensive design system built on:
- **Color Palette**: Green and emerald tones representing agriculture and growth
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Consistent, reusable UI components
- **Animations**: Smooth transitions and micro-interactions
- **Responsive Design**: Mobile-first approach

## 📱 Pages & Features

### Landing Page (`/`)
- Hero section with rotating background images
- Welcome message and key features overview
- Call-to-action buttons for sign-up and learn more
- Trust indicators and statistics

### Sign-In Page (`/signin`)
- Clean authentication interface
- Email and password fields
- Show/hide password functionality
- Loading states and validation

### Dashboard (`/dashboard`)
- Dark sidebar navigation
- Soil data visualization
- Crop recommendations
- Weather alerts and forecasts
- Soil improvement suggestions

### Learn More (`/learn-more`)
- Comprehensive feature explanations
- User testimonials
- Statistics and social proof
- Call-to-action sections

## 🔐 Authentication

The application includes a complete authentication system:
- **Sign In/Sign Up Modal** - Toggle between authentication modes
- **Form Validation** - Client-side validation with proper error handling
- **Loading States** - Visual feedback during authentication
- **Responsive Design** - Works on all device sizes

## 🎯 Key Features in Detail

### AI-Powered Insights
- Machine learning algorithms for crop recommendations
- Soil health analysis and predictions
- Weather pattern recognition
- Yield optimization suggestions

### Real-time Data
- Live weather updates
- Soil monitoring
- Crop health tracking
- Performance analytics

### User Experience
- Intuitive navigation
- Fast loading times
- Smooth animations
- Accessible design

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel** - Recommended for React applications
- **Netlify** - Great for static sites
- **GitHub Pages** - Free hosting for public repositories
- **AWS S3 + CloudFront** - Scalable cloud hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pexels** - Beautiful farming and agricultural images
- **shadcn/ui** - Excellent UI component library
- **Lucide** - Beautiful icon set
- **Tailwind CSS** - Amazing utility-first CSS framework

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for modern agriculture**
