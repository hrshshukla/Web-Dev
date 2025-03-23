import { Link } from "wouter";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface TicketCardProps {
  ticket: {
    id: number;
    eventId: number;
    userId: number;
    purchaseDate: string;
    quantity: number;
    total: string;
    qrCode: string;
    isUsed: boolean;
    event: {
      id: number;
      title: string;
      date: string;
      time: string;
      location: string;
      imageUrl?: string;
    };
  };
}

export default function TicketCard({ ticket }: TicketCardProps) {
  // Format date for display
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
    const eventDate = new Date(`${ticket.event.date} ${ticket.event.time}`);
    return eventDate < new Date();
  };

  return (
    <Card className="overflow-hidden h-full">
      <div className="relative h-40">
        {ticket.event.imageUrl ? (
          <img 
            src={ticket.event.imageUrl} 
            alt={ticket.event.title} 
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
            <Ticket className="h-8 w-8 text-primary/50" />
          </div>
        )}
        
        <div className="absolute top-3 right-3">
          <Badge variant={ticket.isUsed ? "destructive" : isPastEvent() ? "outline" : "default"}>
            {ticket.isUsed ? "Used" : isPastEvent() ? "Past" : "Valid"}
          </Badge>
        </div>
      </div>
      
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-3 line-clamp-1">{ticket.event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-slate-600">
            <Calendar className="mr-2 h-4 w-4 text-primary/70" />
            <span>{formatDate(ticket.event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Clock className="mr-2 h-4 w-4 text-primary/70" />
            <span>{ticket.event.time}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <MapPin className="mr-2 h-4 w-4 text-primary/70" />
            <span className="line-clamp-1">{ticket.event.location}</span>
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Quantity:</span>
          <span className="font-medium">{ticket.quantity}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Total:</span>
          <span className="font-medium">${ticket.total}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-6">
        <Button variant="default" className="w-full" asChild>
          <Link href={`/ticket/${ticket.id}`}>View Ticket</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
