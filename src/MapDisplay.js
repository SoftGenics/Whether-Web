
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapDisplay = ({ initialLat, initialLng, initialZoom }) => {
    const [markerPosition, setMarkerPosition] = useState([initialLat, initialLng]);

    const handleMapClick = (e) => {
        if (e.originalEvent.shiftKey) {
            setMarkerPosition([e.latlng.lat, e.latlng.lng]);
        }
    };

    return (
        <MapContainer center={markerPosition} zoom={initialZoom} style={{ height: '400px', width: '100%' }} onClick={handleMapClick}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={markerPosition}>                                                                            
                <Popup>
                    Latitude: {markerPosition[0]}<br />
                    Longitude: {markerPosition[1]}
                    
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapDisplay;
