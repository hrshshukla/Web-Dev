import { storage } from "./storage";
import { hashPassword } from "./auth";
import { InsertCategory, InsertEvent, InsertUser } from "@shared/schema";

export async function seedDatabase() {
  console.log("Starting database seeding...");

  // Check if categories already exist
  const existingCategories = await storage.getCategories();
  if (existingCategories.length === 0) {
    console.log("Seeding categories...");
    const categories: InsertCategory[] = [
      { name: "Music", icon: "music" },
      { name: "Sports", icon: "flag" },
      { name: "Food & Drink", icon: "utensils" },
      { name: "Arts & Culture", icon: "palette" },
      { name: "Technology", icon: "laptop-code" },
      { name: "Business", icon: "briefcase" },
      { name: "Health & Wellness", icon: "heartbeat" },
      { name: "Family & Kids", icon: "child" }
    ];

    for (const category of categories) {
      await storage.createCategory(category);
    }
    console.log(`Created ${categories.length} categories`);
  }

  // Check if admin user exists
  let adminUser = await storage.getUserByUsername("admin");
  
  if (!adminUser) {
    console.log("Creating admin user...");
    const userData: InsertUser = {
      username: "admin",
      password: await hashPassword("password123"),
      email: "admin@example.com",
      name: "Admin User",
      isOrganizer: true
    };
    
    adminUser = await storage.createUser(userData);
    console.log("Admin user created");
  }

  // Create regular user if doesn't exist
  let regularUser = await storage.getUserByUsername("user");
  
  if (!regularUser) {
    console.log("Creating regular user...");
    const userData: InsertUser = {
      username: "user",
      password: await hashPassword("password123"),
      email: "user@example.com",
      name: "Regular User",
      isOrganizer: false
    };
    
    regularUser = await storage.createUser(userData);
    console.log("Regular user created");
  }

  // Check if events exist
  const existingEvents = await storage.getEvents();
  if (existingEvents.length === 0 && adminUser) {
    console.log("Seeding events...");
    
    // Get categories for references
    const categories = await storage.getCategories();
    const musicCategory = categories.find(c => c.name === "Music")?.id || 1;
    const sportsCategory = categories.find(c => c.name === "Sports")?.id || 2;
    const foodCategory = categories.find(c => c.name === "Food & Drink")?.id || 3;
    const techCategory = categories.find(c => c.name === "Technology")?.id || 5;
    
    // Create date helpers
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    const formatDateForInput = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const events: InsertEvent[] = [
      {
        title: "Summer Music Festival",
        description: "Join us for a weekend of amazing music performances from top artists. Food, drinks, and entertainment for all ages.",
        category: musicCategory.toString(),
        date: formatDateForInput(nextWeek),
        time: "14:00",
        location: "Central Park, New York",
        price: "49.99",
        organizerId: adminUser.id,
        imageUrl: null,
        isFeatured: true
      },
      {
        title: "Tech Conference 2023",
        description: "The biggest tech conference of the year. Network with industry professionals and learn about the latest technologies.",
        category: techCategory.toString(),
        date: formatDateForInput(nextMonth),
        time: "09:00",
        location: "Convention Center, San Francisco",
        price: "199.99",
        organizerId: adminUser.id,
        imageUrl: null,
        isFeatured: true
      },
      {
        title: "Food & Wine Festival",
        description: "Sample gourmet food and fine wines from local and international chefs and wineries.",
        category: foodCategory.toString(),
        date: formatDateForInput(tomorrow),
        time: "18:00",
        location: "Downtown Food Plaza, Chicago",
        price: "75.00",
        organizerId: adminUser.id,
        imageUrl: null,
        isFeatured: true
      },
      {
        title: "Marathon for Charity",
        description: "Run for a cause! Join our annual charity marathon and help raise funds for children in need.",
        category: sportsCategory.toString(),
        date: formatDateForInput(nextWeek),
        time: "07:00",
        location: "City Riverfront, Boston",
        price: "25.00",
        organizerId: adminUser.id,
        imageUrl: null,
        isFeatured: false
      },
      {
        title: "Jazz Night",
        description: "An evening of classic and contemporary jazz with the city's top musicians.",
        category: musicCategory.toString(),
        date: formatDateForInput(nextWeek),
        time: "20:00",
        location: "Blue Note Jazz Club, New Orleans",
        price: "35.00",
        organizerId: adminUser.id,
        imageUrl: null,
        isFeatured: false
      },
      {
        title: "Startup Pitch Night",
        description: "Watch innovative startups pitch their ideas to investors and industry experts.",
        category: techCategory.toString(),
        date: formatDateForInput(tomorrow),
        time: "18:30",
        location: "Innovation Hub, Austin",
        price: "15.00",
        organizerId: adminUser.id,
        imageUrl: null,
        isFeatured: false
      }
    ];
    
    for (const event of events) {
      await storage.createEvent(event);
    }
    console.log(`Created ${events.length} events`);
  }

  console.log("Database seeding completed");
}