import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { OUAGA_CENTER } from '../data/mock';
import type { BusLine, LiveBus } from '../types';

const SATELLITE_URL =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const STREETS_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

function lineBadge(line: BusLine) {
  return line.kind === 'urbaine' ? `L${line.number}` : line.number;
}

function busIconHtml(line: BusLine, selected: boolean) {
  return `
    <div style="display:flex;flex-direction:column;align-items:center;">
      <span style="
        width:32px;height:32px;border-radius:9999px;background:${line.color};
        display:flex;align-items:center;justify-content:center;color:white;
        box-shadow:0 2px 8px rgba(0,0,0,0.4);
        outline:${selected ? '3px solid white' : 'none'};outline-offset:1px;
      ">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="3" y="6" width="18" height="11" rx="2"/></svg>
      </span>
      <span style="font-size:10px;font-weight:700;color:white;background:${line.color};border-radius:4px;padding:0 4px;margin-top:-2px;white-space:nowrap;">
        ${lineBadge(line)}
      </span>
    </div>
  `;
}

interface SatelliteMapProps {
  buses: LiveBus[];
  lines: BusLine[];
  selectedLineId: string;
  onSelectBus: (lineId: string) => void;
  focusRequestId: number;
}

export function SatelliteMap({ buses, lines, selectedLineId, onSelectBus, focusRequestId }: SatelliteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const layersRef = useRef<{ satellite: L.TileLayer; streets: L.TileLayer } | null>(null);
  const onSelectBusRef = useRef(onSelectBus);
  onSelectBusRef.current = onSelectBus;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: OUAGA_CENTER,
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });
    mapRef.current = map;

    const satellite = L.tileLayer(SATELLITE_URL, { maxZoom: 19 }).addTo(map);
    const streets = L.tileLayer(STREETS_URL, { maxZoom: 19, subdomains: 'abc' });
    layersRef.current = { satellite, streets };

    L.control.zoom({ position: 'topright' }).addTo(map);

    buses.forEach((bus) => {
      const line = lines.find((l) => l.id === bus.lineId);
      if (!line) return;
      const icon = L.divIcon({
        html: busIconHtml(line, bus.lineId === selectedLineId),
        className: 'sotraco-bus-icon',
        iconSize: [40, 44],
        iconAnchor: [20, 22],
      });
      const marker = L.marker([bus.lat, bus.lng], { icon }).addTo(map);
      marker.on('click', () => onSelectBusRef.current(bus.lineId));
      markersRef.current[bus.id] = marker;
    });

    const jitter = window.setInterval(() => {
      buses.forEach((bus) => {
        const marker = markersRef.current[bus.id];
        if (!marker) return;
        const dLat = (Math.random() - 0.5) * 0.0015;
        const dLng = (Math.random() - 0.5) * 0.0015;
        marker.setLatLng([bus.lat + dLat, bus.lng + dLng]);
      });
    }, 2500);

    return () => {
      window.clearInterval(jitter);
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Object.entries(markersRef.current).forEach(([busId, marker]) => {
      const bus = buses.find((b) => b.id === busId);
      const line = bus && lines.find((l) => l.id === bus.lineId);
      if (!bus || !line) return;
      marker.setIcon(
        L.divIcon({
          html: busIconHtml(line, bus.lineId === selectedLineId),
          className: 'sotraco-bus-icon',
          iconSize: [40, 44],
          iconAnchor: [20, 22],
        }),
      );
    });
  }, [selectedLineId, buses, lines]);

  useEffect(() => {
    if (focusRequestId === 0) return;
    const bus = buses.find((b) => b.lineId === selectedLineId);
    if (bus && mapRef.current) {
      mapRef.current.flyTo([bus.lat, bus.lng], 16, { duration: 0.8 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusRequestId]);

  const toggleView = (view: 'satellite' | 'streets') => {
    const layers = layersRef.current;
    const map = mapRef.current;
    if (!layers || !map) return;
    if (view === 'satellite') {
      if (!map.hasLayer(layers.satellite)) map.addLayer(layers.satellite);
      if (map.hasLayer(layers.streets)) map.removeLayer(layers.streets);
    } else {
      if (!map.hasLayer(layers.streets)) map.addLayer(layers.streets);
      if (map.hasLayer(layers.satellite)) map.removeLayer(layers.satellite);
    }
  };

  const recenter = () => {
    mapRef.current?.flyTo(OUAGA_CENTER, 14, { duration: 0.8 });
  };

  return (
    <div className="relative w-full h-full bg-[#dfe8e0]">
      <div ref={containerRef} className="absolute inset-0" />

      <div className="absolute top-3 left-3 z-[1000] flex bg-white/95 rounded-full shadow-md overflow-hidden text-[11px] font-semibold">
        <button onClick={() => toggleView('satellite')} className="px-3 py-1.5 hover:bg-neutral-100">
          Satellite
        </button>
        <button onClick={() => toggleView('streets')} className="px-3 py-1.5 hover:bg-neutral-100 border-l border-neutral-200">
          Plan
        </button>
      </div>

      <button
        onClick={recenter}
        aria-label="Recentrer"
        className="absolute bottom-3 right-3 z-[1000] w-9 h-9 rounded-full bg-white/95 shadow-md flex items-center justify-center text-sotraco-green-700"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M22 12h-3M5 12H2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
