import { Link } from "wouter";
import { Category } from "@shared/schema";
import { 
  Music, 
  Code, 
  Palette, 
  Utensils, 
  Dumbbell, 
  Briefcase
} from "lucide-react";

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  // Map category names to their respective icons
  const getCategoryIcon = (iconName: string) => {
    const iconProps = { className: "text-xl" };
    switch (iconName) {
      case "music":
        return <Music {...iconProps} />;
      case "laptop-code":
        return <Code {...iconProps} />;
      case "palette":
        return <Palette {...iconProps} />;
      case "utensils":
        return <Utensils {...iconProps} />;
      case "dumbbell":
        return <Dumbbell {...iconProps} />;
      case "briefcase":
        return <Briefcase {...iconProps} />;
      default:
        return <Music {...iconProps} />;
    }
  };

  return (
    <section className="py-10 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Browse By Category</h2>
          <p className="mt-2 text-slate-600">Explore events by what interests you most</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/?category=${encodeURIComponent(category.name)}`}
              className="flex flex-col items-center p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary mb-3">
                {getCategoryIcon(category.icon)}
              </div>
              <span className="text-slate-800 font-medium text-sm">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
