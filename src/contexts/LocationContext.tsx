import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Location } from '@/types/smartdine';

interface LocationContextType {
  location: Location | null;
  setLocation: (location: Location | null) => void;
  isLoading: boolean;
  error: string | null;
  getCurrentLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const LOCATION_STORAGE_KEY = 'smartdine_location';
const LOCATION_TIMEOUT = 15000; // 15 seconds
const MAX_RETRIES = 2;

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocationState] = useState<Location | null>(() => {
    try {
      const saved = localStorage.getItem(LOCATION_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Persist location to localStorage
  useEffect(() => {
    if (location) {
      try {
        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
      } catch (e) {
        console.error('Failed to save location:', e);
      }
    }
  }, [location]);

  const setLocation = useCallback((newLocation: Location | null) => {
    setLocationState(newLocation);
    setError(null);
  }, []);

  // Retry-safe geolocation with timeout
  const getPositionWithTimeout = (options: PositionOptions): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Location request timed out'));
      }, options.timeout || LOCATION_TIMEOUT);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          resolve(position);
        },
        (err) => {
          clearTimeout(timeoutId);
          reject(err);
        },
        options
      );
    });
  };

  const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        { 
          headers: { 'User-Agent': 'SmartDineAI/1.0' },
          signal: AbortSignal.timeout(10000), // 10s timeout
        }
      );
      
      if (!response.ok) throw new Error('Geocoding failed');
      
      const data = await response.json();
      return data.address?.city || 
             data.address?.town || 
             data.address?.village ||
             data.address?.county ||
             data.address?.state ||
             'Your Location';
    } catch (e) {
      console.error('Reverse geocoding failed:', e);
      return 'Your Location';
    }
  };

  // IP-based fallback location
  const getLocationFromIP = async (): Promise<Location | null> => {
    try {
      console.log('Attempting IP-based location fallback...');
      const response = await fetch('https://ipapi.co/json/', {
        signal: AbortSignal.timeout(5000),
      });
      
      if (!response.ok) throw new Error('IP geolocation failed');
      
      const data = await response.json();
      if (data.latitude && data.longitude) {
        console.log('IP location success:', data.city);
        return {
          city: data.city || data.region || 'Your Location',
          lat: data.latitude,
          lon: data.longitude,
        };
      }
      return null;
    } catch (e) {
      console.error('IP geolocation failed:', e);
      return null;
    }
  };

  const getCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      // No geolocation support - try IP fallback
      setIsLoading(true);
      const ipLocation = await getLocationFromIP();
      if (ipLocation) {
        setLocation(ipLocation);
      } else {
        setError('Geolocation is not supported. Please enter your city manually.');
      }
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const position = await getPositionWithTimeout({
          enableHighAccuracy: attempt === 0, // Try high accuracy first
          timeout: 5000, // 5 second timeout per attempt
          maximumAge: 60000, // Accept cached position up to 1 minute old
        });

        const { latitude, longitude } = position.coords;
        const city = await reverseGeocode(latitude, longitude);

        setLocation({
          city,
          lat: latitude,
          lon: longitude,
        });
        
        setIsLoading(false);
        console.log('✅ Got browser location:', city);
        return; // Success!
        
      } catch (err) {
        lastError = err as Error;
        console.warn(`Location attempt ${attempt + 1} failed:`, err);
        
        // If it's a permission denied error, try IP fallback
        if (err instanceof GeolocationPositionError && err.code === 1) {
          break;
        }
        
        // Wait before retrying
        if (attempt < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }

    // Browser geolocation failed - try IP fallback
    console.log('Browser geolocation failed, trying IP fallback...');
    const ipLocation = await getLocationFromIP();
    if (ipLocation) {
      setLocation(ipLocation);
      setIsLoading(false);
      return;
    }

    // All methods failed
    setIsLoading(false);
    
    if (lastError instanceof GeolocationPositionError) {
      switch (lastError.code) {
        case 1:
          setError('Location permission denied. Please enter your city manually.');
          break;
        case 2:
          setError('Location unavailable. Please enter your city manually.');
          break;
        case 3:
          setError('Location request timed out. Please try again or enter manually.');
          break;
        default:
          setError('Unable to get location. Please enter your city manually.');
      }
    } else {
      setError('Unable to get location. Please enter your city manually.');
    }
  }, [setLocation]);

  return (
    <LocationContext.Provider value={{ location, setLocation, isLoading, error, getCurrentLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
