import { Link } from "wouter";
import { Event } from "@shared/schema";
import { Calendar, MapPin, Users, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";

interface OrganizerEventItemProps {
  event: Event;
}

export default function OrganizerEventItem({ event }: OrganizerEventItemProps) {
  // Get tickets for this event
  const { data: eventTickets } = useQuery({
    queryKey: [`/api/events/${event.id}/tickets`],
    // This endpoint doesn't exist yet, but in a real app it would fetch tickets for this event
    enabled: false, // Disabled for now since the endpoint doesn't exist
  });
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Check if event is in the past
  const isPastEvent = () => {
    const eventDate = new Date(event.date);
    return eventDate < new Date();
  };
  
  // Calculate ticket sales (would be based on actual data in real app)
  const ticketsSold = eventTickets?.length || 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            {event.isFeatured && (
              <Badge variant="secondary" className="bg-secondary">Featured</Badge>
            )}
            {isPastEvent() && (
              <Badge variant="outline">Past</Badge>
            )}
          </div>
          
          <div className="flex items-center text-sm text-slate-600">
            <Calendar className="mr-2 h-4 w-4 text-primary/70" />
            <span>{formatDate(event.date)} • {event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-slate-600">
            <MapPin className="mr-2 h-4 w-4 text-primary/70" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex flex-col md:items-end">
            <div className="flex items-center text-sm text-slate-600">
              <Users className="mr-2 h-4 w-4" />
              <span>{ticketsSold} tickets sold</span>
            </div>
            <div className="text-sm text-slate-600">
              <span className="font-medium">${event.price}</span> per ticket
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link href={`/event/${event.id}`}>View</Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Event</DropdownMenuItem>
                <DropdownMenuItem>Manage Tickets</DropdownMenuItem>
                <DropdownMenuItem>View Analytics</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Cancel Event</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
