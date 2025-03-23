import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-primary-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-3/5">
          <h2 className="text-3xl font-bold text-white">Create Your Own Event</h2>
          <p className="mt-3 text-lg text-primary-100">
            Ready to host your own event? Get started today and reach thousands of attendees.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button 
              variant="default" 
              className="bg-white text-primary-700 hover:bg-primary-50"
              asChild
            >
              <Link href="/create-event">Create Event</Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-primary-600"
              asChild
            >
              <Link href="/#faq">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="mt-10 lg:mt-0 lg:w-2/5">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="text-center">
                <div className="text-secondary text-2xl mb-2">★</div>
                <h3 className="text-lg font-medium text-slate-900">Benefits of Hosting</h3>
              </div>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <span className="text-slate-700">Reach thousands of potential attendees</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <span className="text-slate-700">Easy ticket management and sales</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <span className="text-slate-700">Real-time event analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <span className="text-slate-700">Secure payment processing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
