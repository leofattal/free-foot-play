'use client';

import { useEffect, useRef, useState } from 'react';

interface GoogleMapProps {
  latitude: number;
  longitude: number;
  markerTitle?: string;
  zoom?: number;
  height?: string;
}

export default function GoogleMap({
  latitude,
  longitude,
  markerTitle = 'Soccer Field',
  zoom = 15,
  height = '450px',
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError('Google Maps API key is not configured');
      setLoading(false);
      return;
    }

    const initMap = async () => {
      try {
        const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;

        if (!mapRef.current) return;

        const position = { lat: latitude, lng: longitude };

        // Create the map
        const map = new Map(mapRef.current, {
          center: position,
          zoom,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        // Add marker
        const marker = new google.maps.Marker({
          position,
          map,
          title: markerTitle,
          animation: google.maps.Animation.DROP,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #2E7D32;">
                ${markerTitle}
              </h3>
              <p style="margin: 0; font-size: 14px; color: #666;">
                Click for directions
              </p>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        // Auto-open info window
        infoWindow.open(map, marker);

        setLoading(false);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps. Please refresh the page.');
        setLoading(false);
      }
    };

    initMap();
  }, [latitude, longitude, markerTitle, zoom]);

  if (error) {
    return (
      <div
        className="w-full rounded-lg bg-red-50 border-2 border-red-200 flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center p-6">
          <svg
            className="w-12 h-12 text-red-400 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-red-700 font-semibold mb-2">{error}</p>
          <p className="text-red-600 text-sm">
            Use the address below to find directions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height }}>
      {loading && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-3"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full rounded-lg shadow-lg" />
    </div>
  );
}
