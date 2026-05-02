import React, { useState } from 'react';
import { Language } from '../../types';

export const LocationPicker: React.FC<{ value: string; onChange: (val: string) => void; language: Language }> = ({ value, onChange, language }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGetLocation = () => {
        setLoading(true);
        setError(null);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    try {
                        // Reverse geocoding using a free API like Nominatim
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                        const data = await response.json();
                        let locationStr = '';
                        if (data && data.address) {
                            const { city, state_district, state, country, town, village, county } = data.address;
                            const district = state_district || county || city || town || village || state;
                            locationStr = district ? `${district}, ${country || 'Bangladesh'}` : `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
                        } else {
                            locationStr = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
                        }
                        onChange(locationStr);
                    } catch (err) {
                        console.error('Geocoding error:', err);
                        onChange(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
                    } finally {
                        setLoading(false);
                    }
                },
                (err) => {
                    setLoading(false);
                    setError(language === 'en' ? 'Location permission denied or unavailable.' : 'অবস্থানের অনুমতি বা উপলব্ধ নয়।');
                }
            );
        } else {
            setLoading(false);
            setError(language === 'en' ? 'Geolocation not supported by your browser.' : 'আপনার ব্রাউজার জিওলোকেশন সমর্থন করে না।');
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 w-full">
                <input 
                    type="text" 
                    value={value || ''} 
                    onChange={e => onChange(e.target.value)}
                    placeholder={language === 'en' ? 'E.g. Dhaka, Bangladesh' : 'উদাঃ ঢাকা, বাংলাদেশ'}
                    className="w-full bg-white border-2 border-gray-200 rounded-xl py-3 px-4 text-base sm:text-lg focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition-all"
                />
                <button 
                    onClick={handleGetLocation}
                    type="button"
                    disabled={loading}
                    title={language === 'en' ? 'Use my location' : 'আমার অবস্থান ব্যবহার করুন'}
                    className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 p-3 sm:py-3 sm:px-4 rounded-xl border border-indigo-100 font-bold transition-colors flex items-center justify-center shrink-0 disabled:opacity-50"
                >
                    {loading ? (
                        <i className="fa-solid fa-circle-notch animate-spin"></i>
                    ) : (
                        <i className="fa-solid fa-location-crosshairs text-lg"></i>
                    )}
                    <span className="hidden sm:inline-block ml-2">{language === 'en' ? 'GPS' : 'জিপিএস'}</span>
                </button>
            </div>
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        </div>
    );
};
