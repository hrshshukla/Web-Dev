import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import EventPage from "@/pages/event-page";
import CreateEventPage from "@/pages/create-event-page";
import UserTicketsPage from "@/pages/user-tickets-page";
import OrganizerDashboard from "@/pages/organizer-dashboard";
import TicketPage from "@/pages/ticket-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/event/:id" component={EventPage} />
      <ProtectedRoute path="/create-event" component={CreateEventPage} />
      <ProtectedRoute path="/my-tickets" component={UserTicketsPage} />
      <ProtectedRoute path="/ticket/:id" component={TicketPage} />
      <ProtectedRoute path="/organizer-dashboard" component={OrganizerDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
