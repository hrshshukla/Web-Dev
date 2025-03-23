import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import TicketPurchaseForm from "@/components/event/ticket-purchase-form";
import { useAuth } from "@/hooks/use-auth";
import { Calendar, Clock, MapPin, Share2, Heart, User } from "lucide-react";
import { QRCode } from "@/components/ui/qr-code";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EventPage() {
  const { id } = useParams();
  const eventId = parseInt(id);
  const { user } = useAuth();
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [_, navigate] = useLocation();

  const { data: event, isLoading, error } = useQuery({
    queryKey: [`/api/events/${eventId}`],
  });

  useEffect(() => {
    if (error) {
      navigate("/not-found");
    }
  }, [error, navigate]);

  const handlePurchaseClick = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setIsPurchaseModalOpen(true);
  };

  // Function to format date string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {isLoading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-[400px] w-full rounded-lg mb-8" />
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-6" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-8" />
                <Skeleton className="h-8 w-40 mb-4" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-6 w-1/2 mb-8" />
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-6 w-full mb-8" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </div>
          </div>
        ) : event ? (
          <>
            {/* Event Banner */}
            <div className="w-full bg-slate-100 h-[300px] md:h-[400px] relative overflow-hidden">
              {event.imageUrl ? (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-primary-100 to-secondary-100 flex items-center justify-center">
                  <h1 className="text-4xl font-bold text-slate-700">{event.title}</h1>
                </div>
              )}
              {event.isFeatured && (
                <Badge className="absolute top-4 right-4 bg-secondary" variant="secondary">
                  Featured
                </Badge>
              )}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Event Details */}
                <div className="lg:col-span-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{event.title}</h1>
                  
                  <div className="flex flex-wrap gap-6 mb-8">
                    <div className="flex items-center text-slate-600">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none">
                      {event.category}
                    </Badge>
                    <div className="prose max-w-none">
                      <p className="text-slate-700 whitespace-pre-line">{event.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 mb-8">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                  
                  <div className="mt-12">
                    <h2 className="text-xl font-semibold mb-4">Organizer</h2>
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-slate-500" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">Event Organizer</p>
                        <p className="text-sm text-slate-500">Organizer ID: {event.organizerId}</p>
                      </div>
                    </div>
                    
                    {/* Show QR code if user is the organizer */}
                    {user && user.id === event.organizerId && event.qrCodeUrl && (
                      <div className="mt-8 p-6 border border-slate-200 rounded-lg bg-white">
                        <h3 className="text-lg font-medium mb-4">Event QR Code</h3>
                        <div className="flex flex-col items-center">
                          <QRCode 
                            value={event.qrCodeUrl} 
                            size={200}
                            className="mb-4" 
                          />
                          <p className="text-sm text-slate-500 text-center max-w-md">
                            Use this QR code at the entrance to quickly verify attendees.
                            Attendees can scan this code to check-in to the event.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Ticket Purchase Box */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                    <h2 className="text-xl font-bold mb-2">Tickets</h2>
                    <p className="text-2xl font-bold text-primary mb-6">${event.price}</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Date</span>
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Time</span>
                        <span className="font-medium">{event.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Location</span>
                        <span className="font-medium">{event.location}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handlePurchaseClick}
                    >
                      Get Tickets
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Purchase Dialog */}
            <Dialog open={isPurchaseModalOpen} onOpenChange={setIsPurchaseModalOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Purchase Tickets for {event.title}</DialogTitle>
                  <DialogDescription>
                    Complete your purchase details below.
                  </DialogDescription>
                </DialogHeader>
                <TicketPurchaseForm 
                  event={event} 
                  onSuccess={() => setIsPurchaseModalOpen(false)} 
                />
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-[50vh]">
            <p>Event not found</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
