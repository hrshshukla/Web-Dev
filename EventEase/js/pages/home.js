/**
 * Home page implementation
 * Displays the landing page with hero section, featured events, categories, and more
 */
const HomePage = {
  /**
   * Render the home page
   */
  render(container) {
    // Get data needed for the page
    const featuredEvents = Storage.getFeaturedEvents();
    const categories = Storage.getCategories();
    
    // Get upcoming events (not featured)
    const now = new Date();
    const allEvents = Storage.getEvents();
    
    const upcomingEvents = allEvents
      .filter(event => {
        const eventDate = new Date(`${event.date} ${event.time}`);
        return eventDate >= now && !event.isFeatured;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 6); // Get only 6 upcoming events
    
    // Render HTML
    container.innerHTML = `
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1>Find Events That Excite You</h1>
          <p>Discover events, buy tickets, and connect with organizers all in one place.</p>
          <div class="hero-search">
            <input type="text" id="heroSearch" placeholder="Search events, categories, or locations">
            <button id="heroSearchBtn" class="btn btn-primary">Search</button>
          </div>
          <div class="hero-tags">
            <span>Popular:</span>
            ${categories.slice(0, 5).map(category => `
              <a href="/events?category=${category.id}" data-link class="hero-tag">${category.name}</a>
            `).join('')}
          </div>
        </div>
      </section>
      
      <!-- Featured Events Section -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Featured Events</h2>
            <a href="/events" data-link class="section-link">View All <i class="fas fa-arrow-right"></i></a>
          </div>
          
          ${featuredEvents.length > 0 
            ? `<div class="events-grid">
                ${featuredEvents.map(event => createEventCard(event, true)).join('')}
              </div>`
            : `<div class="empty-state">
                <i class="fas fa-calendar-star"></i>
                <h3>No Featured Events</h3>
                <p>Check back soon for featured events</p>
              </div>`
          }
        </div>
      </section>
      
      <!-- Categories Section -->
      <section class="section bg-light">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Browse by Category</h2>
            <a href="/events" data-link class="section-link">All Categories <i class="fas fa-arrow-right"></i></a>
          </div>
          
          <div class="categories-grid">
            ${categories.map(category => `
              <a href="/events?category=${category.id}" data-link class="category-card">
                <div class="category-icon">
                  <i class="fas ${getCategoryIcon(category.name)}"></i>
                </div>
                <h3 class="category-name">${category.name}</h3>
                <p class="category-count">${countEventsByCategory(category.id)} events</p>
              </a>
            `).join('')}
          </div>
        </div>
      </section>
      
      <!-- Upcoming Events Section -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Upcoming Events</h2>
            <div class="date-filters">
              <a href="/events?date=today" data-link class="date-filter">Today</a>
              <a href="/events?date=this-weekend" data-link class="date-filter">This Weekend</a>
              <a href="/events?date=this-week" data-link class="date-filter">This Week</a>
            </div>
          </div>
          
          ${upcomingEvents.length > 0 
            ? `<div class="events-grid">
                ${upcomingEvents.map(event => createEventCard(event)).join('')}
              </div>
              
              <div class="text-center mt-8">
                <a href="/events" data-link class="btn btn-outline">
                  View All Events <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>`
            : `<div class="empty-state">
                <i class="fas fa-calendar"></i>
                <h3>No Upcoming Events</h3>
                <p>Check back soon for new events</p>
                <a href="/create-event" data-link class="btn btn-primary mt-4">Create Event</a>
              </div>`
          }
        </div>
      </section>
      
      <!-- App Promo Section -->
      <section class="section bg-primary-gradient">
        <div class="container">
          <div class="app-promo">
            <div class="app-promo-content">
              <h2>Get EventHub on Your Mobile</h2>
              <p>Download our mobile app to discover events, purchase tickets, and receive notifications on the go.</p>
              <div class="app-buttons">
                <a href="#" class="app-btn">
                  <i class="fab fa-apple"></i>
                  <span>
                    <small>Download on the</small>
                    App Store
                  </span>
                </a>
                <a href="#" class="app-btn">
                  <i class="fab fa-google-play"></i>
                  <span>
                    <small>GET IT ON</small>
                    Google Play
                  </span>
                </a>
              </div>
            </div>
            <div class="app-promo-image">
              <img src="img/app-mockup.png" alt="EventHub Mobile App" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x600?text=Mobile+App';">
            </div>
          </div>
        </div>
      </section>
      
      <!-- How It Works Section -->
      <section class="section">
        <div class="container">
          <h2 class="section-title text-center">How EventHub Works</h2>
          <p class="section-subtitle text-center">Simple, easy, and secure way to discover events and purchase tickets</p>
          
          <div class="steps">
            <div class="step">
              <div class="step-icon">
                <i class="fas fa-search"></i>
              </div>
              <h3>Discover</h3>
              <p>Find events that match your interests by searching or browsing categories</p>
            </div>
            <div class="step">
              <div class="step-icon">
                <i class="fas fa-ticket-alt"></i>
              </div>
              <h3>Purchase</h3>
              <p>Securely purchase tickets to your favorite events in just a few clicks</p>
            </div>
            <div class="step">
              <div class="step-icon">
                <i class="fas fa-qrcode"></i>
              </div>
              <h3>Attend</h3>
              <p>Show your digital ticket with QR code for seamless entry to the event</p>
            </div>
            <div class="step">
              <div class="step-icon">
                <i class="fas fa-heart"></i>
              </div>
              <h3>Enjoy</h3>
              <p>Have a great time at the event and discover more experiences</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Organizer CTA Section -->
      <section class="section bg-light">
        <div class="container">
          <div class="organizer-cta">
            <div class="organizer-cta-content">
              <h2>Become an Event Organizer</h2>
              <p>Create and manage your own events, sell tickets, and grow your audience with our all-in-one platform.</p>
              <ul class="organizer-features">
                <li><i class="fas fa-check-circle"></i> Easy event creation and management</li>
                <li><i class="fas fa-check-circle"></i> Secure payment processing</li>
                <li><i class="fas fa-check-circle"></i> Real-time analytics and reporting</li>
                <li><i class="fas fa-check-circle"></i> Promotional tools and marketing features</li>
              </ul>
              <a href="/create-event" data-link class="btn btn-primary">Create Your First Event</a>
            </div>
            <div class="organizer-cta-image">
              <img src="img/organizer-dashboard.png" alt="Event Organizer Dashboard" onerror="this.onerror=null; this.src='https://via.placeholder.com/500x300?text=Organizer+Dashboard';">
            </div>
          </div>
        </div>
      </section>
      
      <!-- Testimonials Section -->
      <section class="section">
        <div class="container">
          <h2 class="section-title text-center">What Our Users Say</h2>
          <div class="testimonials">
            <div class="testimonial">
              <div class="testimonial-rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <p class="testimonial-quote">"EventHub made it incredibly easy to find local events. The tickets were delivered instantly and the QR code scanner worked perfectly at the venue."</p>
              <div class="testimonial-author">
                <div class="testimonial-avatar">
                  <img src="img/avatar-1.png" alt="User Avatar" onerror="this.onerror=null; this.innerHTML='<i class=\'fas fa-user\'></i>';">
                </div>
                <div class="testimonial-info">
                  <h4>Sarah Johnson</h4>
                  <p>Event Attendee</p>
                </div>
              </div>
            </div>
            <div class="testimonial">
              <div class="testimonial-rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <p class="testimonial-quote">"As an event organizer, I've been able to reach a wider audience and manage ticket sales efficiently. The analytics are incredibly helpful for planning future events."</p>
              <div class="testimonial-author">
                <div class="testimonial-avatar">
                  <img src="img/avatar-2.png" alt="User Avatar" onerror="this.onerror=null; this.innerHTML='<i class=\'fas fa-user\'></i>';">
                </div>
                <div class="testimonial-info">
                  <h4>Michael Rodriguez</h4>
                  <p>Event Organizer</p>
                </div>
              </div>
            </div>
            <div class="testimonial">
              <div class="testimonial-rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>
              <p class="testimonial-quote">"The platform is intuitive and user-friendly. I particularly appreciate the ticket transfer feature, which allowed me to send a ticket to my friend when I couldn't attend."</p>
              <div class="testimonial-author">
                <div class="testimonial-avatar">
                  <img src="img/avatar-3.png" alt="User Avatar" onerror="this.onerror=null; this.innerHTML='<i class=\'fas fa-user\'></i>';">
                </div>
                <div class="testimonial-info">
                  <h4>Emily Chen</h4>
                  <p>Event Attendee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Newsletter Section -->
      <section class="section bg-light">
        <div class="container">
          <div class="newsletter">
            <div class="newsletter-content">
              <h2>Stay Updated with EventHub</h2>
              <p>Subscribe to our newsletter to receive updates on the newest events in your area and exclusive offers.</p>
            </div>
            <div class="newsletter-form">
              <form id="newsletterForm">
                <input type="email" id="newsletterEmail" placeholder="Enter your email" required>
                <button type="submit" class="btn btn-primary">Subscribe</button>
              </form>
              <p class="newsletter-privacy">We respect your privacy and will never share your information.</p>
            </div>
          </div>
        </div>
      </section>
    `;
    
    // Add event listeners
    this.addEventListeners();
  },
  
  /**
   * Add event listeners for interactive elements
   */
  addEventListeners() {
    // Hero search form
    const heroSearchBtn = document.getElementById('heroSearchBtn');
    const heroSearch = document.getElementById('heroSearch');
    
    if (heroSearchBtn && heroSearch) {
      heroSearchBtn.addEventListener('click', () => {
        const searchQuery = heroSearch.value.trim();
        if (searchQuery) {
          Router.navigate(`/events?q=${encodeURIComponent(searchQuery)}`);
        }
      });
      
      // Also submit when Enter key is pressed
      heroSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          heroSearchBtn.click();
        }
      });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('newsletterEmail').value.trim();
        if (email) {
          // In a real app, we'd send this to the server
          showToast('Success!', 'Thank you for subscribing to our newsletter.', 'success');
          newsletterForm.reset();
        }
      });
    }
  }
};

/**
 * Helper function to get an appropriate icon for a category
 */
function getCategoryIcon(categoryName) {
  const name = categoryName.toLowerCase();
  
  if (name.includes('music') || name.includes('concert')) return 'fa-music';
  if (name.includes('tech') || name.includes('technology')) return 'fa-laptop-code';
  if (name.includes('food') || name.includes('culinary')) return 'fa-utensils';
  if (name.includes('art') || name.includes('design')) return 'fa-palette';
  if (name.includes('sport') || name.includes('fitness')) return 'fa-running';
  if (name.includes('business') || name.includes('career')) return 'fa-briefcase';
  if (name.includes('education') || name.includes('learning')) return 'fa-graduation-cap';
  if (name.includes('health') || name.includes('wellness')) return 'fa-heartbeat';
  if (name.includes('family') || name.includes('kids')) return 'fa-child';
  if (name.includes('charity') || name.includes('community')) return 'fa-hands-helping';
  if (name.includes('film') || name.includes('movie')) return 'fa-film';
  if (name.includes('game') || name.includes('gaming')) return 'fa-gamepad';
  
  // Default icon
  return 'fa-calendar-alt';
}

/**
 * Helper function to count events in a specific category
 */
function countEventsByCategory(categoryId) {
  const events = Storage.getEvents();
  return events.filter(event => event.categoryId === categoryId).length;
}