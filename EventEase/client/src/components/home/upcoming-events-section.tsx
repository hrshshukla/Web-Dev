import { useState } from "react";
import { Link } from "wouter";
import { Event } from "@shared/schema";
import EventListItem from "@/components/event/event-list-item";
import { Button } from "@/components/ui/button";
import { ArrowRight, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpcomingEventsSectionProps {
  events: Event[];
}

export default function UpcomingEventsSection({ events }: UpcomingEventsSectionProps) {
  const [filter, setFilter] = useState("all");
  const [displayCount, setDisplayCount] = useState(4);

  // Filter events based on selection
  const getFilteredEvents = () => {
    const now = new Date();
    
    switch (filter) {
      case "this-week":
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        return events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= now && eventDate <= nextWeek;
        });
      case "this-month":
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        return events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= now && eventDate <= nextMonth;
        });
      default:
        // Sort by date (most recent first)
        return [...events].sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }
  };

  const filteredEvents = getFilteredEvents();
  const displayEvents = filteredEvents.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 4);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Upcoming Events</h2>
            <p className="mt-2 text-slate-600">Explore our selection of upcoming events</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="sm:mr-2">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayEvents.length > 0 ? (
            displayEvents.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-slate-600">No upcoming events found for the selected filter.</p>
            </div>
          )}
        </div>

        {displayCount < filteredEvents.length && (
          <div className="text-center mt-10">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/5"
              onClick={handleLoadMore}
            >
              Load More Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
