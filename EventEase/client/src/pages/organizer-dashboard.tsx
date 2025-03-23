import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import OrganizerEventItem from "@/components/event/organizer-event-item";
import EventValidation from "@/components/event/event-validation";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Plus, Search, Ticket } from "lucide-react";

export default function OrganizerDashboard() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: events, isLoading } = useQuery({
    queryKey: ["/api/organizer/events"],
  });
  
  // Filter events based on search query
  const filterEvents = (events: any[]) => {
    if (!searchQuery.trim()) return events;
    
    return events.filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // Separate upcoming and past events
  const getUpcomingEvents = (events: any[]) => {
    const now = new Date();
    return events.filter(event => new Date(event.date) >= now);
  };
  
  const getPastEvents = (events: any[]) => {
    const now = new Date();
    return events.filter(event => new Date(event.date) < now);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Organizer Dashboard</h1>
              <p className="text-slate-600 mt-1">
                Manage your events and validate tickets
              </p>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button asChild>
                <Link href="/create-event">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Link>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="validation">Ticket Validation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="mt-0">
              {!user?.isOrganizer && (
                <Alert className="mb-8">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>You're not registered as an organizer</AlertTitle>
                  <AlertDescription>
                    To create and manage events, you need to have an organizer account.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Upcoming Events</h2>
                {isLoading ? (
                  <div className="space-y-4">
                    {Array(3).fill(null).map((_, i) => (
                      <Skeleton key={i} className="h-24 w-full rounded-lg" />
                    ))}
                  </div>
                ) : events && events.length > 0 ? (
                  <div className="space-y-4">
                    {filterEvents(getUpcomingEvents(events)).map((event) => (
                      <OrganizerEventItem key={event.id} event={event} />
                    ))}
                    {filterEvents(getUpcomingEvents(events)).length === 0 && (
                      <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                        <p className="text-slate-600">No upcoming events found</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                    <Ticket className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">You haven't created any events yet</p>
                    <Button asChild className="mt-4">
                      <Link href="/create-event">Create Your First Event</Link>
                    </Button>
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Past Events</h2>
                {isLoading ? (
                  <div className="space-y-4">
                    {Array(2).fill(null).map((_, i) => (
                      <Skeleton key={i} className="h-24 w-full rounded-lg" />
                    ))}
                  </div>
                ) : events && events.length > 0 ? (
                  <div className="space-y-4">
                    {filterEvents(getPastEvents(events)).map((event) => (
                      <OrganizerEventItem key={event.id} event={event} />
                    ))}
                    {filterEvents(getPastEvents(events)).length === 0 && (
                      <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                        <p className="text-slate-600">No past events found</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                    <p className="text-slate-600">No past events to display</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="validation" className="mt-0">
              <EventValidation />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
