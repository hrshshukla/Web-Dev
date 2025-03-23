import { Link } from "wouter";
import { Event } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export default function EventCard({ event, featured = false }: EventCardProps) {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      <div className="relative pb-[56.25%]">
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
        
        {featured && (
          <Badge className="absolute top-4 right-4 bg-secondary" variant="secondary">
            Featured
          </Badge>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-center text-sm text-slate-500 mb-2">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{formatDate(event.date)} • {event.time}</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-slate-900 line-clamp-1">
          {event.title}
        </h3>
        
        <div className="flex items-center text-sm text-slate-500 mb-4">
          <MapPin className="mr-2 h-4 w-4" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">${event.price}</span>
          <Button asChild size="sm">
            <Link href={`/event/${event.id}`}>Get Tickets</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
