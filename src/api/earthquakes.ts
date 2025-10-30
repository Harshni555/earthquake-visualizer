// ✅ Clean and working version for Earthquake Visualizer

export const getEarthquakes = async () => {
  try {
    // You can change this later dynamically (all_hour, all_day, all_week, all_month)
    const feedType = "all_day";

    const response = await fetch(
      `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${feedType}.geojson`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch earthquake data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching earthquake data:", error);
    return null;
  }
};
