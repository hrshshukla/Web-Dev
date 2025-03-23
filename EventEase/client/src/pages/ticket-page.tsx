import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { QRCode } from "@/components/ui/qr-code";
import { useAuth } from "@/hooks/use-auth";
import { Calendar, Clock, MapPin, Ticket, User, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function TicketPage() {
  const { id } = useParams();
  const ticketId = parseInt(id);
  const [_, navigate] = useLocation();
  const { user } = useAuth();

  // Fetch ticket details
  const { data: ticket, isLoading, error } = useQuery({
    queryKey: [`/api/tickets/${ticketId}`],
  });

  useEffect(() => {
    if (error) {
      navigate("/not-found");
    }
  }, [error, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 bg-gradient-to-r from-primary to-secondary text-white">
                  <Skeleton className="h-8 w-3/4 bg-white/20" />
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className="flex items-center justify-center">
                      <Skeleton className="h-40 w-40 rounded-md" />
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : ticket ? (
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 bg-gradient-to-r from-primary to-secondary text-white">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Your Event Ticket</h1>
                    <div className="flex items-center">
                      <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">
                        {ticket.isUsed ? "Used" : "Valid"}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2">{ticket.event.title}</h2>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-slate-600">
                          <Calendar className="h-4 w-4 mr-2 text-primary" />
                          <span>{ticket.event.date}</span>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <span>{ticket.event.time}</span>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          <span>{ticket.event.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-slate-600 mb-2">
                        <Ticket className="h-4 w-4 mr-2 text-primary" />
                        <span>Ticket #{ticket.id}</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <User className="h-4 w-4 mr-2 text-primary" />
                        <span>{user?.name}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <QRCode 
                          value={ticket.qrCode} 
                          size={160} 
                          className="mb-2"
                        />
                        <p className="text-xs text-slate-500">Scan for entry</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Quantity</span>
                      <span className="font-medium">{ticket.quantity}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Purchase Date</span>
                      <span className="font-medium">
                        {new Date(ticket.purchaseDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Total Price</span>
                      <span className="font-bold text-primary">${ticket.total}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12">
              <p>Ticket not found or you don't have access to this ticket.</p>
              <Button 
                className="mt-4"
                variant="outline"
                onClick={() => navigate("/my-tickets")}
              >
                View Your Tickets
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
