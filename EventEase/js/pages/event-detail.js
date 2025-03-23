/**
 * Event Detail page implementation
 * Displays details about a specific event and allows ticket purchase
 */
const EventDetailPage = {
  /**
   * Render the event detail page
   */
  render(container, eventId) {
    // Get data needed for the page
    const eventIdInt = parseInt(eventId);
    const event = Storage.getEvent(eventIdInt);
    
    if (!event) {
      container.innerHTML = `
        <div class="container py-12">
          <div class="text-center">
            <h1 class="text-4xl font-bold mb-4">Event Not Found</h1>
            <p class="mb-6">The event you are looking for doesn't exist or has been removed.</p>
            <a href="/events" data-link class="btn btn-primary">Browse Events</a>
          </div>
        </div>
      `;
      return;
    }
    
    // Get related data
    const category = Storage.getCategory(event.categoryId);
    const organizer = Storage.getUser(event.organizerId);
    
    // Check if event is in the past
    const eventDate = new Date(`${event.date} ${event.time}`);
    const isPast = eventDate < new Date();
    
    // Render HTML
    container.innerHTML = `
      <div class="bg-slate-50 py-8">
        <div class="container">
          <div class="mb-6">
            <a href="/events" data-link class="text-primary inline-flex items-center">
              <i class="fas fa-arrow-left mr-2"></i> Back to Events
            </a>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="md:flex">
              <!-- Event Image / Main Info -->
              <div class="md:w-2/3">
                <div class="relative h-64 md:h-auto">
                  ${event.imageUrl 
                    ? `<img src="${event.imageUrl}" alt="${event.title}" class="w-full h-full object-cover">`
                    : `<div class="w-full h-full bg-slate-200 flex items-center justify-center">
                        <i class="fas fa-calendar-alt text-slate-400 text-6xl"></i>
                      </div>`
                  }
                  
                  <div class="absolute top-4 right-4 flex space-x-2">
                    ${event.isFeatured 
                      ? `<span class="bg-secondary text-white text-xs px-3 py-1 rounded-full">Featured</span>` 
                      : ''
                    }
                    <span class="bg-primary-100 text-primary text-xs px-3 py-1 rounded-full">
                      ${category ? category.name : 'Uncategorized'}
                    </span>
                  </div>
                  
                  ${isPast 
                    ? `<div class="absolute top-0 left-0 w-full h-full bg-slate-900 bg-opacity-50 flex items-center justify-center">
                        <div class="bg-white bg-opacity-90 px-6 py-3 rounded-lg">
                          <span class="text-xl font-bold text-danger">Event Has Ended</span>
                        </div>
                      </div>` 
                    : ''
                  }
                </div>
                
                <div class="p-6">
                  <h1 class="text-3xl font-bold text-slate-900 mb-4">${event.title}</h1>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="flex items-start">
                      <div class="bg-primary-50 rounded-full p-3 mr-3">
                        <i class="fas fa-calendar text-primary"></i>
                      </div>
                      <div>
                        <h3 class="font-medium">Date & Time</h3>
                        <p>${formatDate(event.date)}</p>
                        <p>${event.time}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start">
                      <div class="bg-primary-50 rounded-full p-3 mr-3">
                        <i class="fas fa-map-marker-alt text-primary"></i>
                      </div>
                      <div>
                        <h3 class="font-medium">Location</h3>
                        <p>${event.location}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start">
                      <div class="bg-primary-50 rounded-full p-3 mr-3">
                        <i class="fas fa-user text-primary"></i>
                      </div>
                      <div>
                        <h3 class="font-medium">Organizer</h3>
                        <p>${organizer ? organizer.username : 'Unknown'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="border-t border-slate-200 pt-6">
                    <h2 class="text-xl font-semibold mb-4">About This Event</h2>
                    <p class="text-slate-600 whitespace-pre-line">${event.description}</p>
                  </div>
                </div>
              </div>
              
              <!-- Ticket Purchase -->
              <div class="md:w-1/3 border-t md:border-t-0 md:border-l border-slate-200">
                <div class="p-6">
                  <div class="bg-slate-50 rounded-lg p-6 mb-6">
                    <div class="flex justify-between items-center mb-4">
                      <h3 class="text-xl font-semibold">Tickets</h3>
                      <span class="text-2xl font-bold text-primary">${formatPrice(event.price)}</span>
                    </div>
                    
                    ${!isPast ? `
                      <form id="ticketPurchaseForm" class="mb-4">
                        <div class="form-group">
                          <label for="ticketQuantity">Number of Tickets</label>
                          <input 
                            type="number" 
                            id="ticketQuantity" 
                            min="1" 
                            max="10" 
                            value="1" 
                            class="form-input"
                          >
                          <p class="help-text">Maximum 10 tickets per purchase</p>
                        </div>
                        
                        <div class="pt-4 border-t">
                          <div class="flex justify-between mb-2">
                            <span>Price per ticket:</span>
                            <span>${formatPrice(event.price)}</span>
                          </div>
                          
                          <div class="flex justify-between mb-2">
                            <span>Quantity:</span>
                            <span id="ticketQuantityDisplay">1</span>
                          </div>
                          
                          <div class="flex justify-between font-bold mt-2">
                            <span>Total:</span>
                            <span class="text-primary" id="ticketTotalDisplay">${formatPrice(event.price)}</span>
                          </div>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-block mt-6">
                          Purchase Tickets
                        </button>
                      </form>
                      
                      <p class="text-sm text-slate-500 text-center">
                        Secure checkout • Instant ticket delivery
                      </p>
                    ` : `
                      <div class="text-center py-4">
                        <p class="text-danger font-medium mb-2">This event has already passed</p>
                        <p class="text-sm text-slate-500">Tickets are no longer available for purchase</p>
                      </div>
                    `}
                  </div>
                  
                  <div class="space-y-4">
                    <div class="flex items-center">
                      <i class="fas fa-ticket-alt text-primary mr-3"></i>
                      <span>Ticket includes entry to the event</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-qrcode text-primary mr-3"></i>
                      <span>QR code ticket for easy access</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-calendar-check text-primary mr-3"></i>
                      <span>Access your tickets anytime</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-exchange-alt text-primary mr-3"></i>
                      <span>Easy ticket transfers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Share Section -->
          <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 class="text-xl font-semibold mb-4">Share This Event</h2>
            <div class="flex gap-2">
              <button class="btn btn-outline">
                <i class="fab fa-facebook mr-2"></i> Facebook
              </button>
              <button class="btn btn-outline">
                <i class="fab fa-twitter mr-2"></i> Twitter
              </button>
              <button class="btn btn-outline">
                <i class="fas fa-envelope mr-2"></i> Email
              </button>
              <button class="btn btn-outline" id="copyLinkBtn">
                <i class="fas fa-link mr-2"></i> Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add event listeners
    if (!isPast) {
      this.addEventListeners(event);
    }
  },
  
  /**
   * Add event listeners for interactive elements
   */
  addEventListeners(event) {
    // Ticket quantity input
    const ticketQuantityInput = document.getElementById('ticketQuantity');
    const ticketQuantityDisplay = document.getElementById('ticketQuantityDisplay');
    const ticketTotalDisplay = document.getElementById('ticketTotalDisplay');
    
    if (ticketQuantityInput && ticketQuantityDisplay && ticketTotalDisplay) {
      ticketQuantityInput.addEventListener('input', () => {
        let quantity = parseInt(ticketQuantityInput.value) || 1;
        
        // Enforce min/max limits
        if (quantity < 1) quantity = 1;
        if (quantity > 10) quantity = 10;
        
        ticketQuantityInput.value = quantity;
        ticketQuantityDisplay.textContent = quantity;
        
        // Calculate and display total
        const total = (parseFloat(event.price) * quantity).toFixed(2);
        ticketTotalDisplay.textContent = formatPrice(total);
      });
    }
    
    // Ticket purchase form
    const ticketPurchaseForm = document.getElementById('ticketPurchaseForm');
    if (ticketPurchaseForm) {
      ticketPurchaseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Check if user is logged in
        const user = Auth.getCurrentUser();
        if (!user) {
          showToast('Authentication Required', 'Please log in to purchase tickets', 'warning');
          
          // Show login modal
          const authModal = document.getElementById('authModal');
          const modalTabs = document.querySelectorAll('.modal-tab');
          const loginForm = document.getElementById('loginForm');
          const registerForm = document.getElementById('registerForm');
          
          if (authModal && modalTabs.length && loginForm && registerForm) {
            authModal.classList.add('show');
            modalTabs[0].classList.add('active');
            modalTabs[1].classList.remove('active');
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
          }
          
          return;
        }
        
        // Get quantity and calculate total
        const quantity = parseInt(ticketQuantityInput.value) || 1;
        const total = (parseFloat(event.price) * quantity).toFixed(2);
        
        // Create ticket
        const ticket = {
          eventId: event.id,
          userId: user.id,
          quantity,
          total
        };
        
        try {
          // Save ticket to storage
          const newTicket = Storage.createTicket(ticket);
          
          // Show success message
          showToast('Success', 'Ticket purchased successfully!', 'success');
          
          // Redirect to ticket detail page
          setTimeout(() => {
            Router.navigate(`/ticket/${newTicket.id}`);
          }, 1500);
        } catch (error) {
          showToast('Error', 'Failed to purchase ticket', 'danger');
          console.error('Error purchasing ticket:', error);
        }
      });
    }
    
    // Copy link button
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    if (copyLinkBtn) {
      copyLinkBtn.addEventListener('click', () => {
        const eventUrl = window.location.href;
        
        // Copy to clipboard
        navigator.clipboard.writeText(eventUrl).then(() => {
          showToast('Success', 'Event link copied to clipboard', 'success');
        }).catch(err => {
          console.error('Could not copy text: ', err);
          
          // Fallback for browsers that don't support clipboard API
          const textarea = document.createElement('textarea');
          textarea.value = eventUrl;
          textarea.style.position = 'fixed';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          
          try {
            document.execCommand('copy');
            showToast('Success', 'Event link copied to clipboard', 'success');
          } catch (err) {
            showToast('Error', 'Failed to copy link', 'danger');
          }
          
          document.body.removeChild(textarea);
        });
      });
    }
  }
};