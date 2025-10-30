import { MapContainer, TileLayer, GeoJSON, ScaleControl } from "react-leaflet"; 
import Earthquakes from "./Earthquakes"; 
import Legend from "./Legend"; 
import tectonicPlates from "./PB2002_boundaries.json"; 
import { useStore } from "../../hooks"; 
import { mapHeight, tectonicPlatesStyle } from "./constants"; 
import { tileLayers } from "../../constants"; 

type MapProps = { 
  onSelectQuake?: (quake: any) => void; 
  filterMag?: number; 
}; 


export function Map({ onSelectQuake, filterMag }: MapProps) { 
  const tectonicPlatesOn = useStore((state) => state.tectonicPlatesOn); 
  const tileLayer = useStore((state) => state.tileLayer); 
  
  const layer = tileLayers.find((layer) => layer.name === tileLayer); 
  return ( 
  <MapContainer center={[0, 0]} zoom={3} style={mapHeight}>
  {layer && <TileLayer attribution={layer.attribution} url={layer.url} />} 
  
  {tectonicPlatesOn && ( 
    <GeoJSON 
    data={tectonicPlates as GeoJSON.GeoJsonObject} 
    style={tectonicPlatesStyle} 
    /> 
  )} 
  
  {/* ✅ Pass props down to Earthquakes */} 
  
  <Earthquakes onSelectQuake={onSelectQuake} filterMag={filterMag} 
  /> 
  
  <ScaleControl /> 
  <Legend /> 
  </MapContainer> 
  ); 
}