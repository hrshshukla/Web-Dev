import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  // Function to render the star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center text-primary">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'fill-current' : ''}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900">What People Are Saying</h2>
          <p className="mt-2 text-slate-600">Hear from our satisfied users</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-slate-700 mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 rounded-full mr-4">
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
