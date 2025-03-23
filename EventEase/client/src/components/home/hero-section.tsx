import { useState } from "react";
import { useLocation } from "wouter";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [_, navigate] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would navigate to search results page with query params
    navigate(`/?search=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Discover Events That Match Your Passion
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 mb-8">
            Find and book tickets for concerts, workshops, conferences, and more - all in one place.
          </p>
          
          {/* Search Form */}
          <div className="max-w-2xl mx-auto">
            <form 
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-2 sm:gap-0 bg-white rounded-lg p-1 shadow-lg"
            >
              <div className="flex-grow">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 rounded-md text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-0 sm:text-sm border-0"
                    placeholder="Search events, categories, or keywords"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 rounded-md text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-0 sm:text-sm border-0 border-l sm:border-l border-slate-200"
                    placeholder="City or location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className="bg-primary hover:bg-primary/90 px-6 py-3">
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
