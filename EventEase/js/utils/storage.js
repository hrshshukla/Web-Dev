/**
 * Storage utility for managing data in localStorage
 * This replaces our previous server-side storage with client-side localStorage
 */
const Storage = {
  // Default data structure that will be used if no data exists in localStorage
  defaultData: {
    users: [
      // Sample admin user
      {
        id: 1,
        username: 'admin',
        email: 'admin@eventhub.com',
        password: 'admin123', // In a real app, we'd use proper hashing
        isAdmin: true,
        createdAt: new Date().toISOString()
      }
    ],
    events: [],
    tickets: [],
    categories: [
      { id: 1, name: 'Music', icon: 'fa-music', count: 0 },
      { id: 2, name: 'Business', icon: 'fa-briefcase', count: 0 },
      { id: 3, name: 'Sports', icon: 'fa-basketball', count: 0 },
      { id: 4, name: 'Food', icon: 'fa-utensils', count: 0 },
      { id: 5, name: 'Art', icon: 'fa-palette', count: 0 },
      { id: 6, name: 'Technology', icon: 'fa-microchip', count: 0 }
    ],
    nextId: {
      users: 2,
      events: 1,
      tickets: 1,
      categories: 7
    }
  },

  /**
   * Initialize storage with default data if it doesn't exist
   */
  init() {
    if (!localStorage.getItem('eventHub')) {
      localStorage.setItem('eventHub', JSON.stringify(this.defaultData));
    }
  },

  /**
   * Get all data from localStorage
   */
  getData() {
    const data = JSON.parse(localStorage.getItem('eventHub'));
    return data || this.defaultData;
  },

  /**
   * Save data to localStorage
   */
  saveData(data) {
    localStorage.setItem('eventHub', JSON.stringify(data));
  },

  /**
   * Generate a new ID for a specific entity type
   */
  getNextId(entityType) {
    const data = this.getData();
    const id = data.nextId[entityType];
    data.nextId[entityType] += 1;
    this.saveData(data);
    return id;
  },

  // =====================
  // USER METHODS
  // =====================

  /**
   * Get a user by ID
   */
  getUser(id) {
    const data = this.getData();
    return data.users.find(user => user.id === id);
  },

  /**
   * Get a user by username
   */
  getUserByUsername(username) {
    const data = this.getData();
    return data.users.find(user => user.username === username);
  },

  /**
   * Create a new user
   */
  createUser(user) {
    const data = this.getData();
    const newUser = {
      ...user,
      id: this.getNextId('users'),
      createdAt: new Date().toISOString()
    };
    data.users.push(newUser);
    this.saveData(data);
    return newUser;
  },

  /**
   * Update a user
   */
  updateUser(id, updates) {
    const data = this.getData();
    const index = data.users.findIndex(user => user.id === id);
    if (index !== -1) {
      data.users[index] = { ...data.users[index], ...updates };
      this.saveData(data);
      return data.users[index];
    }
    return null;
  },

  // =====================
  // EVENT METHODS
  // =====================

  /**
   * Get all events
   */
  getEvents() {
    const data = this.getData();
    return data.events;
  },

  /**
   * Get featured events
   */
  getFeaturedEvents() {
    const data = this.getData();
    return data.events.filter(event => event.isFeatured);
  },

  /**
   * Get an event by ID
   */
  getEvent(id) {
    const data = this.getData();
    return data.events.find(event => event.id === id);
  },

  /**
   * Get events by category
   */
  getEventsByCategory(categoryId) {
    const data = this.getData();
    return data.events.filter(event => event.categoryId === categoryId);
  },

  /**
   * Get events by organizer (user ID)
   */
  getEventsByOrganizer(userId) {
    const data = this.getData();
    return data.events.filter(event => event.organizerId === userId);
  },

  /**
   * Create a new event
   */
  createEvent(event) {
    const data = this.getData();
    const newEvent = {
      ...event,
      id: this.getNextId('events'),
      isFeatured: false,
      createdAt: new Date().toISOString()
    };
    data.events.push(newEvent);
    this.saveData(data);
    return newEvent;
  },

  /**
   * Update an event
   */
  updateEvent(id, updates) {
    const data = this.getData();
    const index = data.events.findIndex(event => event.id === id);
    if (index !== -1) {
      data.events[index] = { ...data.events[index], ...updates };
      this.saveData(data);
      return data.events[index];
    }
    return null;
  },

  /**
   * Delete an event
   */
  deleteEvent(id) {
    const data = this.getData();
    const index = data.events.findIndex(event => event.id === id);
    if (index !== -1) {
      data.events.splice(index, 1);
      this.saveData(data);
      return true;
    }
    return false;
  },

  // =====================
  // TICKET METHODS
  // =====================

  /**
   * Get all tickets
   */
  getTickets() {
    const data = this.getData();
    return data.tickets;
  },

  /**
   * Get a ticket by ID
   */
  getTicket(id) {
    const data = this.getData();
    return data.tickets.find(ticket => ticket.id === id);
  },

  /**
   * Get tickets by user ID
   */
  getTicketsByUser(userId) {
    const data = this.getData();
    const tickets = data.tickets.filter(ticket => ticket.userId === userId);
    
    // Enhance tickets with event data
    return tickets.map(ticket => {
      const event = this.getEvent(ticket.eventId);
      return {
        ...ticket,
        event: event || { title: 'Unknown Event' }
      };
    });
  },

  /**
   * Get tickets by event ID
   */
  getTicketsByEvent(eventId) {
    const data = this.getData();
    return data.tickets.filter(ticket => ticket.eventId === eventId);
  },

  /**
   * Create a new ticket
   */
  createTicket(ticket) {
    const data = this.getData();
    
    // Generate QR code data
    const qrCodeData = btoa(JSON.stringify({
      type: 'ticket',
      id: this.getNextId('tickets'),
      eventId: ticket.eventId,
      userId: ticket.userId
    }));
    
    const newTicket = {
      ...ticket,
      id: data.nextId.tickets - 1, // We already incremented in getNextId
      qrCode: qrCodeData,
      isUsed: false,
      purchaseDate: new Date().toISOString()
    };
    
    data.tickets.push(newTicket);
    this.saveData(data);
    
    // Return ticket with event data
    const event = this.getEvent(ticket.eventId);
    return {
      ...newTicket,
      event: event || { title: 'Unknown Event' }
    };
  },

  /**
   * Update a ticket
   */
  updateTicket(id, updates) {
    const data = this.getData();
    const index = data.tickets.findIndex(ticket => ticket.id === id);
    if (index !== -1) {
      data.tickets[index] = { ...data.tickets[index], ...updates };
      this.saveData(data);
      return data.tickets[index];
    }
    return null;
  },

  /**
   * Validate a ticket
   */
  validateTicket(id) {
    const ticket = this.getTicket(id);
    if (!ticket) {
      return { valid: false, message: 'Ticket not found' };
    }
    
    if (ticket.isUsed) {
      return { valid: false, message: 'Ticket has already been used' };
    }
    
    const event = this.getEvent(ticket.eventId);
    if (!event) {
      return { valid: false, message: 'Event not found' };
    }
    
    // Check if event has passed
    const eventDate = new Date(`${event.date} ${event.time}`);
    if (eventDate < new Date()) {
      return { valid: false, message: 'Event has already passed' };
    }
    
    // Mark ticket as used
    this.updateTicket(id, { isUsed: true });
    
    return { 
      valid: true, 
      message: 'Ticket validated successfully', 
      ticket: {
        ...ticket,
        event
      }
    };
  },

  /**
   * Validate a ticket by QR code
   */
  validateTicketByQR(qrCode) {
    try {
      const decodedData = JSON.parse(atob(qrCode));
      
      if (decodedData.type !== 'ticket') {
        return { valid: false, message: 'Invalid QR code' };
      }
      
      return this.validateTicket(decodedData.id);
    } catch (error) {
      return { valid: false, message: 'Invalid QR code format' };
    }
  },

  // =====================
  // CATEGORY METHODS
  // =====================

  /**
   * Get all categories
   */
  getCategories() {
    const data = this.getData();
    return data.categories;
  },

  /**
   * Get a category by ID
   */
  getCategory(id) {
    const data = this.getData();
    return data.categories.find(category => category.id === id);
  },

  /**
   * Create a new category
   */
  createCategory(category) {
    const data = this.getData();
    const newCategory = {
      ...category,
      id: this.getNextId('categories')
    };
    data.categories.push(newCategory);
    this.saveData(data);
    return newCategory;
  },

  /**
   * Update a category
   */
  updateCategory(id, updates) {
    const data = this.getData();
    const index = data.categories.findIndex(category => category.id === id);
    if (index !== -1) {
      data.categories[index] = { ...data.categories[index], ...updates };
      this.saveData(data);
      return data.categories[index];
    }
    return null;
  }
};

// Initialize storage
Storage.init();