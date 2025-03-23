import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import CategoriesSection from "@/components/home/categories-section";
import FeaturedEventsSection from "@/components/home/featured-events-section";
import UpcomingEventsSection from "@/components/home/upcoming-events-section";
import CTASection from "@/components/home/cta-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import AppPromoSection from "@/components/home/app-promo-section";
import FAQSection from "@/components/home/faq-section";
import NewsletterSection from "@/components/home/newsletter-section";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { data: featuredEvents, isLoading: isFeaturedLoading } = useQuery({
    queryKey: ["/api/events/featured"],
  });

  const { data: events, isLoading: isEventsLoading } = useQuery({
    queryKey: ["/api/events"],
  });

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["/api/categories"],
  });

  // Sample testimonials data - typically would come from an API but used as static data here
  const testimonials = [
    {
      id: 1,
      quote: "I organized my company's annual conference through EventHub and it was a breeze. The ticketing system worked flawlessly and the analytics helped us plan better for next year.",
      name: "Sarah Johnson",
      title: "Event Organizer",
      rating: 5,
    },
    {
      id: 2,
      quote: "As an attendee, I love how easy it is to discover events in my area. The mobile tickets and QR codes make entry super smooth. No more printed tickets!",
      name: "David Chen",
      title: "Regular Attendee",
      rating: 5,
    },
    {
      id: 3,
      quote: "The payment processing is secure and fast. I received my funds quickly after my workshop sold out. Will definitely use EventHub for future events.",
      name: "Michael Rodriguez",
      title: "Workshop Facilitator",
      rating: 4,
    },
  ];

  // Sample FAQs data
  const faqs = [
    {
      id: 1,
      question: "How do I create an event?",
      answer: "Creating an event is easy! Simply click the \"Create Event\" button, fill out the event details form, set your ticket types and pricing, and publish. You can also save as draft if you're not ready to publish yet."
    },
    {
      id: 2,
      question: "How do payments work?",
      answer: "EventHub uses secure payment processors to handle all transactions. We support major credit cards, digital wallets, and bank transfers. Event organizers receive payouts according to their selected schedule, minus our service fee."
    },
    {
      id: 3,
      question: "Can I issue refunds to attendees?",
      answer: "Yes, organizers can issue full or partial refunds through their event dashboard up to 24 hours after the event has ended. Your refund policy should be clearly stated on your event page."
    },
    {
      id: 4,
      question: "How does QR code validation work?",
      answer: "Each ticket includes a unique QR code. Event organizers can use our mobile app or web interface to scan these codes at entry. The system instantly validates the ticket and prevents duplicate entries."
    },
    {
      id: 5,
      question: "Is there a mobile app available?",
      answer: "Yes! EventHub has mobile apps available for both iOS and Android. With our app, you can discover events, purchase tickets, and access your tickets offline. Organizers can also use the app to manage events and scan tickets."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        {isCategoriesLoading ? (
          <div className="py-10 bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <Skeleton className="h-8 w-64 mx-auto" />
                <Skeleton className="h-4 w-80 mx-auto mt-2" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array(6).fill(null).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <CategoriesSection categories={categories || []} />
        )}
        
        {isFeaturedLoading ? (
          <div className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-64 mt-2" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(3).fill(null).map((_, i) => (
                  <Skeleton key={i} className="h-96 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <FeaturedEventsSection events={featuredEvents || []} />
        )}
        
        {isEventsLoading ? (
          <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-64 mt-2" />
                </div>
                <div className="flex">
                  <Skeleton className="h-10 w-24 mr-2 rounded-md" />
                  <Skeleton className="h-10 w-32 rounded-md" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array(4).fill(null).map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full rounded-lg" />
                ))}
              </div>
              <div className="text-center mt-10">
                <Skeleton className="h-12 w-40 mx-auto rounded-md" />
              </div>
            </div>
          </div>
        ) : (
          <UpcomingEventsSection events={events || []} />
        )}
        
        <CTASection />
        <TestimonialsSection testimonials={testimonials} />
        <AppPromoSection />
        <FAQSection faqs={faqs} />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
