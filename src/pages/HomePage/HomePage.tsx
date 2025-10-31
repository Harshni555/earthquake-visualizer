import { useEffect, useState } from "react";
import { Map } from "../../components/Map/Map";
import TileLayers from "./TileLayers";
import { motion, AnimatePresence } from "framer-motion";
import EarthquakeCharts from "../../components/Charts/EarthquakeCharts";
import Skeleton from "../../components/ui/skeleton";


export default function HomePage() {
  const [filterMag, setFilterMag] = useState(0);
  const [selectedQuake, setSelectedQuake] = useState<any>(null);
  const [animationDirection, setAnimationDirection] = useState("right");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [feedType, setFeedType] = useState("all_day");
  const [earthquakeData, setEarthquakeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());
  const [showPlates, setShowPlates] = useState(true);
  const [searchByTab, setSearchByTab] = useState("days");
  const [numOfDays, setNumOfDays] = useState("1");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");



  // 🌗 Toggle theme
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const isDark = theme === "dark";

  // 🌍 Fetch live earthquake data
  useEffect(() => {
    let mounted = true;
    const fetchEarthquakes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${feedType}.geojson`
        );
        const data = await response.json();
        if (mounted) setEarthquakeData(data.features || []);
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchEarthquakes();

    // auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchEarthquakes();
      setRefreshKey(Date.now());
    }, 300000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [feedType]);

  // 🧮 Calculate Stats
  const total = earthquakeData.length;
  const magnitudes = earthquakeData.map((q) => q.properties.mag).filter(Boolean);
  const maxMag = magnitudes.length ? Math.max(...magnitudes).toFixed(1) : "--";
  const avgMag = magnitudes.length
    ? (magnitudes.reduce((a, b) => a + b, 0) / magnitudes.length).toFixed(1)
    : "--";

  // 🧠 Top 5 earthquakes by magnitude
  const top5 = [...earthquakeData]
    .map((f) => ({
      mag: f.properties.mag,
      place: f.properties.place,
      time: f.properties.time,
    }))
    .filter((x) => typeof x.mag === "number")
    .sort((a, b) => b.mag - a.mag)
    .slice(0, 5);

      // 🔍 Manual Search Handler
  const handleSearch = async () => {
    setLoading(true);
    try {
      let url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";

      if (searchByTab === "days") {
        const date = new Date();
        const startDate = new Date(
          date.getTime() - Number(numOfDays) * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0];
        url += `&starttime=${startDate}&endtime=${date.toISOString().split("T")[0]}`;
      } else if (searchByTab === "timePeriod") {
        if (startTime) url += `&starttime=${startTime}`;
        if (endTime) url += `&endtime=${endTime}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setEarthquakeData(data.features || []);
    } catch (error) {
      console.error("Error performing search:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className={`flex flex-col md:flex-row min-h-screen font-[Inter] ${
        isDark
          ? "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#f8fafc] text-gray-800"
      }`}
    >
      {/* 🌍 MAP SECTION */}
      <div className="flex-1 relative overflow-hidden h-[50vh] md:h-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={animationDirection}
            initial={
              animationDirection === "left"
                ? { x: -80, opacity: 0 }
                : animationDirection === "right"
                ? { x: 80, opacity: 0 }
                : { y: 50, opacity: 0 }
            }
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={
              animationDirection === "left"
                ? { x: 80, opacity: 0 }
                : animationDirection === "right"
                ? { x: -80, opacity: 0 }
                : { y: -50, opacity: 0 }
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="h-full w-full"
          >
            <Map
              filterMag={filterMag}
              onSelectQuake={(quake: any) => setSelectedQuake(quake)}
              refreshKey={refreshKey}
              feedType={feedType}
              showPlates={showPlates}
            />
            <TileLayers />
          </motion.div>
        </AnimatePresence>

        {/* Floating Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`absolute top-6 left-6 px-5 py-2 rounded-xl shadow-lg border backdrop-blur-md ${
            isDark
              ? "bg-white/10 border-white/20 text-white"
              : "bg-gray-200/70 border-gray-300 text-gray-900"
          }`}
        >
          <h1 className="text-lg font-semibold tracking-wide flex items-center gap-2">
            🌎 Earthquake Visualizer
          </h1>
        </motion.div>
      </div>

      {/* 📊 SIDEBAR */}
      <motion.div
  initial={{ x: 300, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.5 }}
  className={`w-full md:w-1/3 p-6 overflow-y-auto max-h-screen border-t md:border-l shadow-2xl backdrop-blur-lg transition-all duration-300 ${

        isDark
        ? "bg-gradient-to-br from-[#1e293b]/90 via-[#0f172a]/95 to-[#1e293b]/90 border-gray-700 text-white"
        : "bg-gradient-to-br from-white via-gray-100 to-gray-200 border-gray-300 text-gray-800"
      }`}
    >
        {/* Header */}
        <div className="sticky top-0 bg-opacity-80 backdrop-blur-md py-2 z-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
        Recent Earthquakes 🌍
        </h2>
        </div>


          {/* ☀️ / 🌙 Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600 text-yellow-300"
                : "bg-gray-300 hover:bg-gray-400 text-gray-900"
            }`}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>

        {/* 🕓 Feed Type Selector */}
        <div className="mb-6">
          <label
            className={`block text-sm mb-2 font-medium ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            🌍 Feed Type
          </label>
          <select
            value={feedType}
            onChange={(e) => setFeedType(e.target.value)}
            className={`w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "bg-gray-800 text-gray-200 border-gray-600"
                : "bg-white text-gray-800 border-gray-400"
            }`}
          >
            <option value="all_hour">Past Hour</option>
            <option value="all_day">Past Day</option>
            <option value="all_week">Past Week</option>
            <option value="all_month">Past Month</option>
          </select>
        </div>

        {/* 🔍 Manual Search Filter */}
<div className="mb-6">
  <h3 className="text-md font-semibold mb-3">🔍 Search Earthquakes</h3>

  {/* Search Mode */}
  <label className="block text-sm font-medium mb-1">Search By</label>
  <select
    value={searchByTab}
    onChange={(e) => setSearchByTab(e.target.value)}
    className={`w-full p-2 rounded-md border mb-3 ${
      isDark
        ? "bg-gray-800 text-gray-200 border-gray-600"
        : "bg-white text-gray-800 border-gray-400"
    }`}
  >
    <option value="days">Number of Days</option>
    <option value="timePeriod">Custom Time Period</option>
  </select>

  {/* Number of Days */}
  {searchByTab === "days" && (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">
        Past Days
      </label>
      <input
        type="number"
        min="1"
        max="30"
        value={numOfDays}
        onChange={(e) => setNumOfDays(e.target.value)}
        className={`w-full p-2 rounded-md border ${
          isDark
            ? "bg-gray-800 text-gray-200 border-gray-600"
            : "bg-white text-gray-800 border-gray-400"
        }`}
      />
    </div>
  )}

  {/* Custom Date Range */}
  {searchByTab === "timePeriod" && (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Start Time</label>
        <input
          type="date"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className={`w-full p-2 rounded-md border ${
            isDark
              ? "bg-gray-800 text-gray-200 border-gray-600"
              : "bg-white text-gray-800 border-gray-400"
          }`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">End Time</label>
        <input
          type="date"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className={`w-full p-2 rounded-md border ${
            isDark
              ? "bg-gray-800 text-gray-200 border-gray-600"
              : "bg-white text-gray-800 border-gray-400"
          }`}
        />
      </div>
    </div>
  )}

  {/* 🟢 Submit Button */}
  <button
    onClick={() => handleSearch()}
    className={`mt-4 w-full py-2 rounded-md font-semibold transition ${
      isDark
        ? "bg-blue-600 hover:bg-blue-500 text-white"
        : "bg-blue-500 hover:bg-blue-600 text-white"
    }`}
  >
    Search
  </button>
</div>


        {/* 📈 Live Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-xl p-4 border shadow-md mb-6 backdrop-blur-lg ${
            isDark
              ? "bg-white/10 border-gray-700"
              : "bg-gray-200 border-gray-300"
          }`}
        >
          <h3 className="text-lg font-semibold mb-3 text-blue-400">
            Earthquake Stats 📊
          </h3>
         {loading ? (
          <div className="space-y-3">
          <Skeleton height="18px" width="90%" />
          <Skeleton height="18px" width="70%" />
          <Skeleton height="18px" width="80%" />
        </div>
        ) : (

            <ul className="space-y-2 text-sm">
              <li>
                🌎 Total Earthquakes:{" "}
                <span className="font-medium text-white">{total}</span>
              </li>
              <li>
                💥 Highest Magnitude:{" "}
                <span className="font-medium text-red-400">{maxMag}</span>
              </li>
              <li>
                📊 Average Magnitude:{" "}
                <span className="font-medium text-green-400">{avgMag}</span>
              </li>
            </ul>
          )}
        </motion.div>

        {/* 📊 Earthquake Charts */}
        <EarthquakeCharts data={earthquakeData} />


        {/* 🧨 Top 5 Earthquakes */}
        <div className="mb-8">
          <h4 className="text-md font-semibold mb-2">Top 5 Strongest 💪</h4>
          {top5.length === 0 ? (
            <p className="text-gray-400 text-sm">No data</p>
          ) : (
            <ul className="text-sm space-y-2">
              {top5.map((t, i) => (
                <li key={i} className="flex justify-between">
                  <span className="truncate">{t.place}</span>
                  <span className="font-medium text-red-400">{t.mag.toFixed(1)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🎞 Animation Direction */}
        <div className="mb-6">
          <label
            className={`block text-sm mb-2 font-medium ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            🌀 Animation Direction
          </label>
          <select
            value={animationDirection}
            onChange={(e) => setAnimationDirection(e.target.value)}
            className={`w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "bg-gray-800 text-gray-200 border-gray-600"
                : "bg-white text-gray-800 border-gray-400"
            }`}
          >
            <option value="left">Slide from Left</option>
            <option value="right">Slide from Right</option>
            <option value="bottom">Slide from Bottom</option>
          </select>
        </div>

        {/* 🎚 Magnitude Filter */}
        <div className="mb-8">
          <label className="block text-sm mb-2 font-medium">
            Filter by Magnitude ≥ {filterMag}
          </label>
          <input
            type="range"
            min="0"
            max="8"
            step="0.5"
            value={filterMag}
            onChange={(e) => setFilterMag(Number(e.target.value))}
            className={`w-full cursor-pointer ${
              isDark ? "accent-blue-400" : "accent-blue-600"
            }`}
          />
        </div>

        {/* 🧾 Selected Earthquake Info */}
        {selectedQuake ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`rounded-2xl p-5 border shadow-lg backdrop-blur-lg ${
              isDark
                ? "bg-white/10 border-gray-600 text-gray-200"
                : "bg-gray-200 border-gray-300 text-gray-800"
            }`}
          >
            <p className="text-lg font-semibold mb-2">{selectedQuake.place}</p>
            <div className="space-y-2 text-sm">
              <p>
                💥 Magnitude:{" "}
                <span
                  className={`font-bold ${
                    isDark ? "text-red-400" : "text-red-600"
                  }`}
                >
                  {selectedQuake.mag}
                </span>
              </p>
              <p>⏰ {new Date(selectedQuake.time).toLocaleString()}</p>
              <p>
                📍 {selectedQuake.lat.toFixed(2)}, {selectedQuake.lon.toFixed(2)}
              </p>
            </div>
          </motion.div>
        ) : (
          <p
            className={`italic mb-4 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Click a marker to see details
          </p>
        )}

        {/* Footer */}
        <div
          className={`mt-8 border-t pt-4 text-xs text-center ${
            isDark
              ? "border-gray-700 text-gray-400"
              : "border-gray-300 text-gray-600"
          }`}
        >
          Data: USGS API <br />
          Built with ❤️ by{" "}
          <span className="font-medium text-blue-400">Harshini Gangula</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
