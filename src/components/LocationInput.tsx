import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Loader2, Search, X, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Location } from "@/types/smartdine";
import { cn } from "@/lib/utils";

interface LocationInputProps {
  location: Location | null;
  onLocationChange: (location: Location | null) => void;
  hasError?: boolean;
}

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
  name?: string;
}

const LocationInput = ({ location, onLocationChange, hasError = false }: LocationInputProps) => {
  const [query, setQuery] = useState(location?.city || "");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const searchLocations = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json&limit=5&addressdetails=1`,
        {
          headers: {
            "User-Agent": "SmartDineAI/1.0",
          },
        }
      );
      const data = await response.json();
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Location search error:", error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query && !location) {
        searchLocations(query);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, location, searchLocations]);

  const handleSelectLocation = (result: SearchResult) => {
    const cityName = result.name || result.display_name.split(",")[0];
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    
    // Validate coordinates before setting
    if (isFinite(lat) && isFinite(lon)) {
      onLocationChange({
        city: cityName,
        lat,
        lon,
      });
      setQuery(cityName);
      setShowResults(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
            {
              headers: {
                "User-Agent": "SmartDineAI/1.0",
              },
            }
          );
          const data = await response.json();
          const cityName =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            "Current Location";
          
          onLocationChange({
            city: cityName,
            lat,
            lon,
          });
          setQuery(cityName);
        } catch (error) {
          console.error("Reverse geocoding error:", error);
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsGettingLocation(false);
      }
    );
  };

  const clearLocation = () => {
    onLocationChange(null);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">
          Where are you?
        </h2>
        <p className="text-muted-foreground">
          Help us find restaurants near you
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {/* Location input with autocomplete */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for a city..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (location) onLocationChange(null);
              }}
              onFocus={() => results.length > 0 && setShowResults(true)}
              className={cn(
                "pl-10 pr-10 h-12 text-lg rounded-xl",
                location && "border-accent",
                hasError && !location && "border-destructive ring-2 ring-destructive/20"
              )}
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground animate-spin" />
            )}
            {location && !isSearching && (
              <button
                onClick={clearLocation}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          {/* Error message - only shown when hasError is true and no location */}
          {hasError && !location && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-2 text-destructive text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Please enter your location to continue</span>
            </motion.div>
          )}

          {/* Autocomplete dropdown */}
          <AnimatePresence>
            {showResults && results.length > 0 && !location && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-medium overflow-hidden z-50"
              >
                {results.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectLocation(result)}
                    className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-center gap-3"
                  >
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm truncate">{result.display_name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Or use current location */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <Button
          variant="glass"
          className="w-full h-12"
          onClick={handleGetCurrentLocation}
          disabled={isGettingLocation}
        >
          {isGettingLocation ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <MapPin className="w-5 h-5" />
          )}
          <span>Use Current Location</span>
        </Button>

        {/* Selected location display */}
        {location && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 justify-center text-accent"
          >
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{location.city}</span>
            <span className="text-muted-foreground text-sm">
              ({location.lat.toFixed(4)}, {location.lon.toFixed(4)})
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LocationInput;
