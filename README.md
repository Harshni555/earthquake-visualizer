# 🌍 Earthquake Visualizer

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-blue?logo=react" />
  <img src="https://img.shields.io/badge/Vite-6.0.1-purple?logo=vite" />
  <img src="https://img.shields.io/badge/Leaflet-Map-green?logo=leaflet" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel" />
</p>

> ⚡ **An interactive web app to visualize global earthquakes in real time** — built with React, Vite, and React Leaflet.

---

## 🚀 Live Demo
🔗 [**View Live Project Here**](https://earthquake-visualizer-xxhk-ee63iol1u-harshinigangulas-projects.vercel.app)

---

## 🧠 Features

✅ **Interactive Map** – View earthquakes across the world using React Leaflet  
✅ **Real-Time Data** – Fetches earthquake data from the [USGS API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)  
✅ **Dynamic Visualization** – Earthquakes displayed based on magnitude and depth  
✅ **Charts & Graphs** – Built-in visual analytics with Recharts  
✅ **Responsive Design** – Works on mobile, tablet, and desktop  
✅ **Fast Build** – Powered by Vite for lightning-fast performance  

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React, Vite |
| **Mapping** | React Leaflet, Leaflet.js |
| **Charts** | Recharts |
| **Styling** | Tailwind CSS / Custom CSS |
| **Deployment** | Vercel |
| **Data Source** | USGS Earthquake API |

---

## ⚙️ Installation Guide

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Harshni555/earthquake-visualizer.git


global-earthquakes/
│
├── public/                    # Static assets (favicon, etc.)
│   └── favicon.ico
│
├── src/                       # Application source code
│   ├── api/                   # API logic and services
│   │   ├── earthquakes.ts     # Fetches data from USGS API
│   │   └── httpService.ts     # Handles API requests
│   │
│   ├── components/            # Reusable UI and logic components
│   │   ├── Charts/            # Visualization components
│   │   │   ├── EarthquakeChart.tsx  # Earthquake data chart
│   │   │   └── utils.ts              # Chart-related utilities
│   │   │
│   │   ├── Map/               # Core map components
│   │   │   ├── Earthquakes.tsx       # Earthquake marker rendering
│   │   │   ├── models.ts             # Data models for map points
│   │   │   ├── PopupContent.tsx      # Popup info for earthquakes
│   │   │   └── Legend/               # Map legend components
│   │   │       ├── Legend.tsx
│   │   │       ├── index.tsx
│   │   │       └── constants.ts
│   │   │
│   │   ├── Navbar/            # Top navigation
│   │   │   ├── Navbar.tsx
│   │   │   └── MagnitudePaletteDialog.tsx
│   │   │
│   │   ├── ui/                # Reusable styled UI components
│   │   │   ├── AppButton.tsx
│   │   │   ├── AppInput.tsx
│   │   │   ├── AppSelect.tsx
│   │   │   ├── AppTabs.tsx
│   │   │   ├── AppSpinner.tsx
│   │   │   ├── AppPopover.tsx
│   │   │   ├── AppTooltip.tsx
│   │   │   └── skeleton.tsx
│   │
│   ├── pages/                 # Main app pages
│   │   ├── HomePage.tsx       # Homepage with map & stats
│   │   ├── TileLayers.tsx     # Handles base map layers
│   │   ├── Layout.tsx         # Page layout structure
│   │   └── ErrorPage.tsx      # Error handling page
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── useStore.tsx       # Global state management (Zustand)
│   │
│   ├── utils/                 # Utility and helper functions
│   │   ├── colorPalette.ts
│   │   └── queryClient.ts
│   │
│   ├── App.tsx                # Root component
│   ├── main.tsx               # App entry point
│   ├── index.css              # Global CSS (Tailwind)
│   ├── routes.tsx             # Defines routes for pages
│   └── types.ts               # Shared TypeScript types
│
├── .env                       # Environment variables
├── Dockerfile                 # For containerized deployment
├── docker-compose.yml         # Docker setup
├── vite.config.ts             # Vite configuration (build & server)
├── tailwind.config.js         # Tailwind setup
├── tsconfig.json              # TypeScript compiler options
├── package.json               # Project dependencies and scripts
└── README.md                  # Documentation file

# Clone the repository
git clone https://github.com/Harshni555/earthquake-visualizer.git
cd global-earthquakes

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

Harshini Gangula
GitHub
 | Vercel
