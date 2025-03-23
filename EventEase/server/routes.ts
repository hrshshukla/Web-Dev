import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertEventSchema, insertTicketSchema } from "@shared/schema";
import crypto from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Get all events
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  // Get featured events
  app.get("/api/events/featured", async (req, res) => {
    try {
      const events = await storage.getFeaturedEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured events" });
    }
  });

  // Get events by category
  app.get("/api/events/category/:category", async (req, res) => {
    try {
      const events = await storage.getEventsByCategory(req.params.category);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events by category" });
    }
  });

  // Get single event
  app.get("/api/events/:id", async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const event = await storage.getEvent(eventId);
      
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });

  // Create new event (protected)
  app.post("/api/events", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const validatedData = insertEventSchema.parse(req.body);
      
      // Generate a unique identifier for QR code
      const eventCode = crypto.randomBytes(16).toString('hex');
      
      // Create QR code URL that can be used to check-in attendees
      // Format: /event/check-in/{eventCode}
      const qrCodeUrl = `/event/check-in/${eventCode}`;
      
      // Set the organizer ID to the current user and add QR code
      const eventData = {
        ...validatedData,
        organizerId: req.user.id,
        qrCodeUrl
      };
      
      const event = await storage.createEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: "Invalid event data" });
    }
  });

  // Get organizer events (protected)
  app.get("/api/organizer/events", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const events = await storage.getEventsByOrganizer(req.user.id);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch organizer events" });
    }
  });

  // Purchase ticket (protected)
  app.post("/api/tickets", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const eventId = parseInt(req.body.eventId);
      const event = await storage.getEvent(eventId);
      
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      // Generate QR code data (a unique hash)
      const qrCode = crypto.randomBytes(20).toString('hex');
      
      const ticketData = {
        eventId,
        userId: req.user.id,
        purchaseDate: new Date(),
        quantity: req.body.quantity || 1,
        total: req.body.total,
        qrCode,
        isUsed: false
      };
      
      const ticket = await storage.createTicket(ticketData);
      res.status(201).json(ticket);
    } catch (error) {
      res.status(400).json({ error: "Invalid ticket purchase data" });
    }
  });

  // Get user tickets (protected)
  app.get("/api/user/tickets", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const tickets = await storage.getTicketsByUser(req.user.id);
      
      // Fetch associated event data for each ticket
      const ticketsWithEvents = await Promise.all(tickets.map(async (ticket) => {
        const event = await storage.getEvent(ticket.eventId);
        return {
          ...ticket,
          event
        };
      }));
      
      res.json(ticketsWithEvents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user tickets" });
    }
  });

  // Get ticket by ID (protected)
  app.get("/api/tickets/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const ticketId = parseInt(req.params.id);
      const ticket = await storage.getTicket(ticketId);
      
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      
      if (ticket.userId !== req.user.id) {
        return res.status(403).json({ error: "Forbidden" });
      }
      
      const event = await storage.getEvent(ticket.eventId);
      
      res.json({
        ...ticket,
        event
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ticket" });
    }
  });

  // Validate ticket (protected, for organizers)
  app.post("/api/tickets/:id/validate", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const ticketId = parseInt(req.params.id);
      const ticket = await storage.getTicket(ticketId);
      
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      
      const event = await storage.getEvent(ticket.eventId);
      
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      
      if (event.organizerId !== req.user.id) {
        return res.status(403).json({ error: "Forbidden - Not the event organizer" });
      }
      
      if (ticket.isUsed) {
        return res.status(400).json({ error: "Ticket already used" });
      }
      
      const validatedTicket = await storage.validateTicket(ticketId);
      
      res.json({
        ...validatedTicket,
        event
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to validate ticket" });
    }
  });

  // Verify QR code (protected, for organizers)
  app.post("/api/tickets/verify-qr", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const { qrCode } = req.body;
      
      if (!qrCode) {
        return res.status(400).json({ error: "QR code required" });
      }
      
      // Find ticket by QR code
      const tickets = await storage.getTickets();
      const ticket = tickets.find(t => t.qrCode === qrCode);
      
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      
      const event = await storage.getEvent(ticket.eventId);
      
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      
      if (event.organizerId !== req.user.id) {
        return res.status(403).json({ error: "Forbidden - Not the event organizer" });
      }
      
      if (ticket.isUsed) {
        return res.status(400).json({ error: "Ticket already used" });
      }
      
      const validatedTicket = await storage.validateTicket(ticket.id);
      
      res.json({
        ...validatedTicket,
        event
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to validate QR code" });
    }
  });
  
  // Check-in via event QR code (protected)
  app.get("/api/events/check-in/:eventCode", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const { eventCode } = req.params;
      
      if (!eventCode) {
        return res.status(400).json({ error: "Event code required" });
      }
      
      // Find event by QR code URL
      const events = await storage.getEvents();
      const event = events.find(e => e.qrCodeUrl && e.qrCodeUrl.includes(eventCode));
      
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      
      res.json({
        event,
        message: "Event check-in successful"
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to check in to event" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
