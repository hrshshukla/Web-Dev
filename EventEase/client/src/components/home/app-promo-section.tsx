import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Ticket, 
  Bell, 
  MapPin, 
  Apple, 
  ShoppingBag 
} from "lucide-react";

export default function AppPromoSection() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Take EventHub With You</h2>
          <p className="text-lg text-slate-600 mb-6">
            Download our mobile app to discover events, purchase tickets, and access your tickets offline - all from your pocket.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary">
                  <Ticket className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-slate-900">Mobile Tickets</h3>
                <p className="mt-2 text-sm text-slate-500">Access your tickets anytime, even without internet connection.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary">
                  <Bell className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-slate-900">Event Notifications</h3>
                <p className="mt-2 text-sm text-slate-500">Get notified about upcoming events that match your interests.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-slate-900">Location-Based Discovery</h3>
                <p className="mt-2 text-sm text-slate-500">Find events happening near you with our smart location features.</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="default" className="bg-slate-900 hover:bg-slate-800">
              <Apple className="h-5 w-5 mr-2" />
              App Store
            </Button>
            <Button variant="default" className="bg-slate-900 hover:bg-slate-800">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Play Store
            </Button>
          </div>
        </div>
        
        <div className="mt-10 lg:mt-0 lg:w-1/2">
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative rounded-lg shadow-xl overflow-hidden">
              <div className="aspect-[3/4] w-full bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <div className="text-center p-6">
                  <Ticket className="h-16 w-16 mx-auto mb-4 text-primary-600" />
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">EventHub App</h3>
                  <p className="text-slate-600">Your events, tickets and more - all in one place</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-secondary text-white text-sm px-3 py-1 rounded-full transform rotate-12">
                New Feature
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
