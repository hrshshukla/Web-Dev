import { 
  users, type User, type InsertUser,
  events, type Event, type InsertEvent,
  tickets, type Ticket, type InsertTicket,
  categories, type Category, type InsertCategory
} from "@shared/schema";
import session, { Store as SessionStore } from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Event methods
  getEvent(id: number): Promise<Event | undefined>;
  getEvents(): Promise<Event[]>;
  getFeaturedEvents(): Promise<Event[]>;
  getEventsByCategory(category: string): Promise<Event[]>;
  getEventsByOrganizer(organizerId: number): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Ticket methods
  getTicket(id: number): Promise<Ticket | undefined>;
  getTickets(): Promise<Ticket[]>;
  getTicketsByUser(userId: number): Promise<Ticket[]>;
  getTicketsByEvent(eventId: number): Promise<Ticket[]>;
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  validateTicket(id: number): Promise<Ticket | undefined>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Session store
  sessionStore: SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private events: Map<number, Event>;
  private tickets: Map<number, Ticket>;
  private categoriesMap: Map<number, Category>;
  sessionStore: SessionStore;
  
  userCurrentId: number;
  eventCurrentId: number;
  ticketCurrentId: number;
  categoryCurrentId: number;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.tickets = new Map();
    this.categoriesMap = new Map();
    
    this.userCurrentId = 1;
    this.eventCurrentId = 1;
    this.ticketCurrentId = 1;
    this.categoryCurrentId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24 hours
    });
    
    // Create default categories
    this.initializeCategories();
  }

  private initializeCategories() {
    const defaultCategories = [
      { name: "Music", icon: "music" },
      { name: "Technology", icon: "laptop-code" },
      { name: "Arts", icon: "palette" },
      { name: "Food & Drink", icon: "utensils" },
      { name: "Sports", icon: "dumbbell" },
      { name: "Business", icon: "briefcase" }
    ];
    
    defaultCategories.forEach(category => {
      this.createCategory(category);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Event methods
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getFeaturedEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).filter(event => event.isFeatured);
  }

  async getEventsByCategory(category: string): Promise<Event[]> {
    return Array.from(this.events.values()).filter(event => event.category === category);
  }

  async getEventsByOrganizer(organizerId: number): Promise<Event[]> {
    return Array.from(this.events.values()).filter(event => event.organizerId === organizerId);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.eventCurrentId++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }

  // Ticket methods
  async getTicket(id: number): Promise<Ticket | undefined> {
    return this.tickets.get(id);
  }

  async getTickets(): Promise<Ticket[]> {
    return Array.from(this.tickets.values());
  }

  async getTicketsByUser(userId: number): Promise<Ticket[]> {
    return Array.from(this.tickets.values()).filter(ticket => ticket.userId === userId);
  }

  async getTicketsByEvent(eventId: number): Promise<Ticket[]> {
    return Array.from(this.tickets.values()).filter(ticket => ticket.eventId === eventId);
  }

  async createTicket(insertTicket: InsertTicket): Promise<Ticket> {
    const id = this.ticketCurrentId++;
    const ticket: Ticket = { ...insertTicket, id };
    this.tickets.set(id, ticket);
    return ticket;
  }

  async validateTicket(id: number): Promise<Ticket | undefined> {
    const ticket = this.tickets.get(id);
    if (ticket && !ticket.isUsed) {
      const updatedTicket = { ...ticket, isUsed: true };
      this.tickets.set(id, updatedTicket);
      return updatedTicket;
    }
    return ticket;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categoriesMap.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categoriesMap.set(id, category);
    return category;
  }
}

export const storage = new MemStorage();
