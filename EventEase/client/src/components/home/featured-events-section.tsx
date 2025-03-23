import { Link } from "wouter";
import { Event } from "@shared/schema";
import EventCard from "@/components/event/event-card";
import { ChevronRight } from "lucide-react";

interface FeaturedEventsSectionProps {
  events: Event[];
}

export default function FeaturedEventsSection({ events }: FeaturedEventsSectionProps) {
  // Limit to show only 3 featured events
  const displayEvents = events.slice(0, 3);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Events</h2>
            <p className="mt-2 text-slate-600">Don't miss these popular upcoming events</p>
          </div>
          <Link 
            href="/?featured=true"
            className="text-primary hover:text-primary/80 font-medium flex items-center"
          >
            View all
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayEvents.length > 0 ? (
            displayEvents.map((event) => (
              <EventCard key={event.id} event={event} featured />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-slate-600">No featured events available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
