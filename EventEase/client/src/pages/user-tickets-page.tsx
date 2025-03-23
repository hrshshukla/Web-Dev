import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import TicketCard from "@/components/event/ticket-card";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function UserTicketsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: tickets, isLoading } = useQuery({
    queryKey: ["/api/user/tickets"],
  });
  
  // Filter tickets based on search query
  const filterTickets = (tickets: any[]) => {
    if (!searchQuery.trim()) return tickets;
    
    return tickets.filter(ticket => 
      ticket.event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // Separate upcoming and past tickets
  const getUpcomingTickets = (tickets: any[]) => {
    const now = new Date();
    return tickets.filter(ticket => new Date(ticket.event.date) >= now);
  };
  
  const getPastTickets = (tickets: any[]) => {
    const now = new Date();
    return tickets.filter(ticket => new Date(ticket.event.date) < now);
  };
  
  // Get unused and used tickets (valid and used status)
  const getUnusedTickets = (tickets: any[]) => {
    return tickets.filter(ticket => !ticket.isUsed);
  };
  
  const getUsedTickets = (tickets: any[]) => {
    return tickets.filter(ticket => ticket.isUsed);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Tickets</h1>
              <p className="text-slate-600 mt-1">
                Manage and access your event tickets
              </p>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <Input
                placeholder="Search tickets..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="valid">Valid</TabsTrigger>
              <TabsTrigger value="used">Used</TabsTrigger>
            </TabsList>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(null).map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-lg" />
                ))}
              </div>
            ) : tickets && tickets.length > 0 ? (
              <>
                <TabsContent value="upcoming" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterTickets(getUpcomingTickets(tickets)).map((ticket) => (
                      <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                  </div>
                  {filterTickets(getUpcomingTickets(tickets)).length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                      <p className="text-slate-600">No upcoming tickets found</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="past" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterTickets(getPastTickets(tickets)).map((ticket) => (
                      <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                  </div>
                  {filterTickets(getPastTickets(tickets)).length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                      <p className="text-slate-600">No past tickets found</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="valid" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterTickets(getUnusedTickets(tickets)).map((ticket) => (
                      <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                  </div>
                  {filterTickets(getUnusedTickets(tickets)).length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                      <p className="text-slate-600">No valid tickets found</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="used" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterTickets(getUsedTickets(tickets)).map((ticket) => (
                      <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                  </div>
                  {filterTickets(getUsedTickets(tickets)).length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                      <p className="text-slate-600">No used tickets found</p>
                    </div>
                  )}
                </TabsContent>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-slate-600">You don't have any tickets yet</p>
                <p className="text-slate-500 mt-2">
                  Browse events and purchase tickets to see them here
                </p>
              </div>
            )}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
