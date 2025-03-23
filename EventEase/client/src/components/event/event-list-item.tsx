import { Link } from "wouter";
import { Event } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

interface EventListItemProps {
  event: Event;
}

export default function EventListItem({ event }: EventListItemProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-200">
      <div className="w-1/3 relative">
        {event.imageUrl ? (
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="absolute h-full w-full object-cover"
          />
        ) : (
          <div className="absolute h-full w-full bg-slate-200 flex items-center justify-center">
            <span className="text-slate-400">{event.title}</span>
          </div>
        )}
      </div>
      
      <div className="w-2/3 p-5">
        <div className="flex items-center text-sm text-slate-500 mb-2">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{formatDate(event.date)} • {event.time}</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-slate-900 line-clamp-1">
          {event.title}
        </h3>
        
        <div className="flex items-center text-sm text-slate-500 mb-3">
          <MapPin className="mr-2 h-4 w-4" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-primary font-bold">
            {event.price === "0" ? "Free" : `$${event.price}`}
          </span>
          <Button asChild size="sm">
            <Link href={`/event/${event.id}`}>Get Tickets</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
