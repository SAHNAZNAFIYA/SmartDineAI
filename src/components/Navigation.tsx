import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation as useRouterLocation } from "react-router-dom";
import {
  Home,
  Utensils,
  Mic,
  BarChart2,
  MapPin,
  Navigation2,
  X,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "@/contexts/LocationContext";

/* =========================================================
   NAV ITEMS
========================================================= */

const NAV_ITEMS = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/preferences", icon: Utensils, label: "Recommendations" },
  { path: "/surprise", icon: () => <span className="text-lg">🎰</span>, label: "Surprise Me" },
  { path: "/coach", icon: Mic, label: "AI Coach" },
  { path: "/dashboard", icon: BarChart2, label: "Dashboard" },
];

/* =========================================================
   COMPONENT
========================================================= */

const Navigation = () => {
  const routerLocation = useRouterLocation();
  const { location, setLocation, isLoading, getCurrentLocation } = useLocation();

  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  /* ================= FETCH AUTOCOMPLETE ================= */

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        setSearching(true);
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
          )}&format=json&addressdetails=1&limit=5`,
          {
            signal: controller.signal,
            headers: { "User-Agent": "SmartDineAI/1.0" },
          }
        );
        const data = await res.json();
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 400); // debounce

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [query]);

  /* ================= CURRENT LOCATION ================= */

  const handleUseCurrentLocation = async () => {
    try {
      await getCurrentLocation();
      setShowDropdown(false);
    } catch (err) {
      console.error("Location permission denied", err);
    }
  };

  /* ================= SELECT CITY ================= */

  const selectCity = (place: any) => {
    setLocation({
      city: place.display_name.split(",")[0],
      lat: parseFloat(place.lat),
      lon: parseFloat(place.lon),
    });
    setQuery("");
    setResults([]);
    setShowDropdown(false);
  };

  /* ================= CLICK OUTSIDE ================= */

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".location-dropdown")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🍽️
            </motion.span>
            <span className="font-display text-xl font-bold">
              SmartDine<span className="text-primary">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
              const active = routerLocation.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "relative px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Location Selector */}
          <div className="relative location-dropdown">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(!showDropdown);
              }}
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="max-w-[120px] truncate">
                {location?.city || "Set Location"}
              </span>
              <ChevronDown className={cn("w-3 h-3 transition", showDropdown && "rotate-180")} />
            </Button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-lg p-4 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Your location</span>
                    <X
                      className="w-4 h-4 cursor-pointer text-muted-foreground"
                      onClick={() => setShowDropdown(false)}
                    />
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 mb-3"
                    onClick={handleUseCurrentLocation}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Navigation2 className="w-4 h-4" />
                    )}
                    Use Current Location
                  </Button>

                  <Input
                    placeholder="Search city..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="mb-2"
                  />

                  {searching && (
                    <div className="text-xs text-muted-foreground mb-2">
                      Searching…
                    </div>
                  )}

                  {results.length > 0 && (
                    <div className="max-h-40 overflow-y-auto space-y-1">
                      {results.map((place, i) => (
                        <button
                          key={i}
                          onClick={() => selectCity(place)}
                          className="w-full text-left text-sm px-2 py-1 rounded hover:bg-secondary"
                        >
                          {place.display_name}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
