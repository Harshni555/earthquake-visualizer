export const tileLayers = [
  {
    id: 1,
    name: "🗺️ Light Map",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  },
  {
    id: 2,
    name: "🌍 Classic Map",
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  },
  {
    id: 3,
    name: "🚗 Google Streets",
    attribution: "&copy; Google",
    url: "http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
  },
  {
    id: 4,
    name: "🛰️ Satellite View",
    attribution: "&copy; Google",
    url: "http://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
  }
];
