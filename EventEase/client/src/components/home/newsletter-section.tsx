import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send the email to a server
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter!",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-white">Stay Updated with EventHub</h2>
        <p className="mt-3 text-primary-100">
          Subscribe to our newsletter for the latest events and exclusive offers.
        </p>
        <div className="mt-8 sm:flex sm:justify-center">
          <div className="sm:flex-1 sm:max-w-xl">
            <form onSubmit={handleSubmit} className="sm:flex">
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">Email address</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full px-4 py-3 rounded-l-md border-0 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/70"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-0">
                <Button 
                  type="submit" 
                  className="block w-full px-4 py-3 rounded-r-md bg-slate-900 text-white font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
            </form>
            <p className="mt-3 text-sm text-primary-100">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
