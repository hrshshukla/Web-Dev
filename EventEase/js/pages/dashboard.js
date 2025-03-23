/**
 * Dashboard page implementation
 * Displays event organizer dashboard with event management, ticket validation, and analytics
 */
const DashboardPage = {
  /**
   * Render the dashboard page
   */
  render(container) {
    // Check if user is logged in
    const user = Auth.getCurrentUser();
    if (!user) {
      Router.navigate('/auth');
      return;
    }
    
    // Get data needed for the page
    const events = Storage.getEventsByOrganizer(user.id);
    
    // Get tickets for all of the user's events
    let allTickets = [];
    events.forEach(event => {
      const eventTickets = Storage.getTicketsByEvent(event.id);
      allTickets.push(...eventTickets);
    });
    
    // Calculate statistics
    const totalEvents = events.length;
    const upcomingEvents = events.filter(event => {
      const eventDate = new Date(`${event.date} ${event.time}`);
      return eventDate >= new Date();
    }).length;
    
    const totalTicketsSold = allTickets.length;
    const totalRevenue = allTickets.reduce((sum, ticket) => sum + parseFloat(ticket.total), 0).toFixed(2);
    
    // Sort events by date (newest first)
    events.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Render HTML
    container.innerHTML = `
      <div class="bg-slate-50 py-8">
        <div class="container">
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-slate-900">Organizer Dashboard</h1>
            <a href="/create-event" data-link class="btn btn-primary">Create New Event</a>
          </div>
          
          <!-- Dashboard Stats -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center mb-2">
                <div class="bg-primary-100 text-primary rounded-full p-3 mr-3">
                  <i class="fas fa-calendar-alt"></i>
                </div>
                <h3 class="font-semibold">Total Events</h3>
              </div>
              <p class="text-3xl font-bold">${totalEvents}</p>
              <p class="text-sm text-slate-500">${upcomingEvents} upcoming</p>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center mb-2">
                <div class="bg-primary-100 text-primary rounded-full p-3 mr-3">
                  <i class="fas fa-ticket-alt"></i>
                </div>
                <h3 class="font-semibold">Tickets Sold</h3>
              </div>
              <p class="text-3xl font-bold">${totalTicketsSold}</p>
              <p class="text-sm text-slate-500">Across all events</p>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center mb-2">
                <div class="bg-primary-100 text-primary rounded-full p-3 mr-3">
                  <i class="fas fa-dollar-sign"></i>
                </div>
                <h3 class="font-semibold">Total Revenue</h3>
              </div>
              <p class="text-3xl font-bold">$${totalRevenue}</p>
              <p class="text-sm text-slate-500">From ticket sales</p>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center mb-2">
                <div class="bg-primary-100 text-primary rounded-full p-3 mr-3">
                  <i class="fas fa-chart-line"></i>
                </div>
                <h3 class="font-semibold">Conversion Rate</h3>
              </div>
              <p class="text-3xl font-bold">${totalEvents > 0 ? Math.round((totalTicketsSold / (totalEvents * 100)) * 100) : 0}%</p>
              <p class="text-sm text-slate-500">Tickets per capacity</p>
            </div>
          </div>
          
          <!-- Dashboard Tabs -->
          <div class="tabs">
            <div class="tabs-list">
              <div class="tab active" data-tab="events">My Events</div>
              <div class="tab" data-tab="validation">Ticket Validation</div>
              <div class="tab" data-tab="analytics">Analytics</div>
            </div>
            
            <div class="tab-content">
              <!-- My Events Tab -->
              <div class="tab-pane active" id="events-tab">
                <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                  <div class="p-4 border-b">
                    <div class="flex justify-between items-center">
                      <h3 class="font-semibold">Your Events</h3>
                      <div class="flex gap-2">
                        <select id="eventStatusFilter" class="form-select text-sm">
                          <option value="all">All Events</option>
                          <option value="upcoming">Upcoming</option>
                          <option value="past">Past</option>
                        </select>
                        <input 
                          type="text" 
                          id="eventSearch" 
                          placeholder="Search events" 
                          class="form-input text-sm"
                        >
                      </div>
                    </div>
                  </div>
                  
                  <div id="eventsList" class="divide-y">
                    ${events.length > 0 
                      ? events.map(event => {
                          const eventDate = new Date(`${event.date} ${event.time}`);
                          const isPast = eventDate < new Date();
                          const ticketsSold = Storage.getTicketsByEvent(event.id).length;
                          return `
                            <div class="p-4 hover:bg-slate-50">
                              <div class="md:flex justify-between items-center">
                                <div>
                                  <div class="flex items-center gap-2 mb-1">
                                    <h4 class="font-semibold">${event.title}</h4>
                                    ${event.isFeatured ? '<span class="badge badge-secondary text-xs">Featured</span>' : ''}
                                    ${isPast ? '<span class="badge badge-outline text-xs">Past</span>' : '<span class="badge badge-success text-xs">Upcoming</span>'}
                                  </div>
                                  <div class="text-sm text-slate-500 mb-2">
                                    <i class="fas fa-calendar mr-1"></i> ${formatDate(event.date)} • 
                                    <i class="fas fa-clock mr-1"></i> ${event.time} • 
                                    <i class="fas fa-map-marker-alt mr-1"></i> ${event.location}
                                  </div>
                                  <div class="text-sm">
                                    <span class="text-primary font-medium">${formatPrice(event.price)}</span> • 
                                    <span>${ticketsSold} tickets sold</span>
                                  </div>
                                </div>
                                <div class="mt-4 md:mt-0 flex gap-2">
                                  <a href="/event/${event.id}" data-link class="btn btn-sm btn-outline">View</a>
                                  <button class="btn btn-sm btn-outline edit-event-btn" data-id="${event.id}">Edit</button>
                                  <button class="btn btn-sm btn-outline manage-tickets-btn" data-id="${event.id}">Tickets</button>
                                  <button class="btn btn-sm btn-outline view-analytics-btn" data-id="${event.id}">Analytics</button>
                                </div>
                              </div>
                            </div>
                          `;
                        }).join('')
                      : `<div class="p-8 text-center">
                          <i class="fas fa-calendar-alt text-slate-300 text-5xl mb-4"></i>
                          <h3 class="text-xl font-semibold mb-2">No Events Yet</h3>
                          <p class="text-slate-500 mb-6">You haven't created any events yet.</p>
                          <a href="/create-event" data-link class="btn btn-primary">Create Your First Event</a>
                        </div>`
                    }
                  </div>
                </div>
              </div>
              
              <!-- Ticket Validation Tab -->
              <div class="tab-pane" id="validation-tab">
                <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 class="text-xl font-semibold mb-4">Ticket Validation</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- QR Code Scanner -->
                    <div>
                      <h4 class="font-semibold mb-4">Scan QR Code</h4>
                      <div class="bg-slate-50 rounded-lg p-4 mb-4">
                        <div class="text-center py-8">
                          <i class="fas fa-qrcode text-slate-400 text-5xl mb-4"></i>
                          <p class="mb-4">Scan a ticket QR code to validate</p>
                          <button id="startScanButton" class="btn btn-primary">
                            <i class="fas fa-camera mr-2"></i> Start Scanner
                          </button>
                        </div>
                      </div>
                      
                      <div id="scannerContainer" class="hidden mb-4">
                        <div class="bg-slate-800 rounded-lg aspect-video flex items-center justify-center mb-2">
                          <p class="text-white">Camera would appear here</p>
                        </div>
                        <button id="stopScanButton" class="btn btn-outline btn-block">
                          <i class="fas fa-times mr-2"></i> Stop Scanner
                        </button>
                      </div>
                      
                      <div class="form-group">
                        <label for="manualQrCode">Or enter QR code manually:</label>
                        <div class="flex">
                          <input 
                            type="text" 
                            id="manualQrCode" 
                            placeholder="Enter QR code value" 
                            class="form-input flex-1"
                          >
                          <button id="validateQrButton" class="btn btn-primary ml-2">Validate</button>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Validation Result -->
                    <div>
                      <h4 class="font-semibold mb-4">Validation Result</h4>
                      <div id="validationResult" class="bg-slate-50 rounded-lg p-6 text-center">
                        <i class="fas fa-ticket-alt text-slate-300 text-5xl mb-4"></i>
                        <p class="text-slate-600">Scan a ticket to see validation results</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Recent Validations -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                  <h3 class="font-semibold mb-4">Recent Validations</h3>
                  <div class="overflow-x-auto">
                    <table class="w-full">
                      <thead>
                        <tr>
                          <th class="text-left py-2 px-4">Ticket ID</th>
                          <th class="text-left py-2 px-4">Event</th>
                          <th class="text-left py-2 px-4">Validated At</th>
                          <th class="text-left py-2 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="py-2 px-4" colspan="4">No recent validations</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <!-- Analytics Tab -->
              <div class="tab-pane" id="analytics-tab">
                <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <h3 class="text-xl font-semibold">Analytics & Insights</h3>
                    <div class="mt-4 md:mt-0">
                      <select id="analyticsTimeRange" class="form-select">
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                        <option value="90days">Last 90 Days</option>
                        <option value="all">All Time</option>
                      </select>
                    </div>
                  </div>
                  
                  <!-- Chart Placeholders -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div class="bg-slate-50 rounded-lg p-4">
                      <h4 class="font-semibold mb-2">Ticket Sales</h4>
                      <div class="aspect-[4/3] flex items-center justify-center">
                        <div class="text-center">
                          <i class="fas fa-chart-bar text-slate-300 text-5xl mb-3"></i>
                          <p class="text-slate-500">Sales chart would appear here</p>
                        </div>
                      </div>
                    </div>
                    
                    <div class="bg-slate-50 rounded-lg p-4">
                      <h4 class="font-semibold mb-2">Revenue</h4>
                      <div class="aspect-[4/3] flex items-center justify-center">
                        <div class="text-center">
                          <i class="fas fa-chart-line text-slate-300 text-5xl mb-3"></i>
                          <p class="text-slate-500">Revenue chart would appear here</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Top Events Table -->
                  <h4 class="font-semibold mb-4">Top Performing Events</h4>
                  <div class="overflow-x-auto">
                    <table class="w-full">
                      <thead>
                        <tr>
                          <th class="text-left py-2 px-4">Event</th>
                          <th class="text-left py-2 px-4">Date</th>
                          <th class="text-left py-2 px-4">Tickets Sold</th>
                          <th class="text-left py-2 px-4">Revenue</th>
                          <th class="text-left py-2 px-4">Conversion Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${events.length > 0 
                          ? events.slice(0, 5).map(event => {
                              const eventTickets = Storage.getTicketsByEvent(event.id);
                              const ticketsSold = eventTickets.length;
                              const revenue = eventTickets.reduce((sum, ticket) => sum + parseFloat(ticket.total), 0).toFixed(2);
                              const conversionRate = event.capacity > 0 ? Math.round((ticketsSold / event.capacity) * 100) : 0;
                              
                              return `
                                <tr>
                                  <td class="py-2 px-4">${event.title}</td>
                                  <td class="py-2 px-4">${formatDate(event.date)}</td>
                                  <td class="py-2 px-4">${ticketsSold}</td>
                                  <td class="py-2 px-4">$${revenue}</td>
                                  <td class="py-2 px-4">${conversionRate}%</td>
                                </tr>
                              `;
                            }).join('')
                          : `<tr><td class="py-2 px-4" colspan="5">No events data available</td></tr>`
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add event listeners
    this.addEventListeners();
  },
  
  /**
   * Add event listeners for interactive elements
   */
  addEventListeners() {
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show the correct tab pane
        tabPanes.forEach(pane => {
          pane.classList.remove('active');
          if (pane.id === `${tabName}-tab`) {
            pane.classList.add('active');
          }
        });
      });
    });
    
    // Event status filter
    const eventStatusFilter = document.getElementById('eventStatusFilter');
    if (eventStatusFilter) {
      eventStatusFilter.addEventListener('change', () => {
        this.filterEvents();
      });
    }
    
    // Event search
    const eventSearch = document.getElementById('eventSearch');
    if (eventSearch) {
      eventSearch.addEventListener('input', () => {
        this.filterEvents();
      });
    }
    
    // Scanner buttons
    const startScanButton = document.getElementById('startScanButton');
    const stopScanButton = document.getElementById('stopScanButton');
    const scannerContainer = document.getElementById('scannerContainer');
    
    if (startScanButton && stopScanButton && scannerContainer) {
      startScanButton.addEventListener('click', () => {
        startScanButton.classList.add('hidden');
        scannerContainer.classList.remove('hidden');
        
        // In a real app, we'd initialize a QR scanner library here
        // For this demo, we'll just simulate the scanner
        showToast('Scanner Activated', 'QR code scanner is now active', 'info');
      });
      
      stopScanButton.addEventListener('click', () => {
        startScanButton.classList.remove('hidden');
        scannerContainer.classList.add('hidden');
        
        // In a real app, we'd stop the QR scanner here
        showToast('Scanner Stopped', 'QR code scanner has been stopped', 'info');
      });
    }
    
    // Manual QR validation
    const validateQrButton = document.getElementById('validateQrButton');
    const manualQrCode = document.getElementById('manualQrCode');
    
    if (validateQrButton && manualQrCode) {
      validateQrButton.addEventListener('click', () => {
        const qrCode = manualQrCode.value.trim();
        
        if (!qrCode) {
          showToast('Error', 'Please enter a QR code value', 'danger');
          return;
        }
        
        // Validate the QR code
        const result = Storage.validateTicketByQR(qrCode);
        
        // Update validation result
        const validationResult = document.getElementById('validationResult');
        if (validationResult) {
          if (result.valid) {
            validationResult.innerHTML = `
              <div class="text-center text-success mb-4">
                <i class="fas fa-check-circle text-4xl"></i>
                <h3 class="text-xl font-semibold mt-2">Valid Ticket</h3>
              </div>
              
              <div class="space-y-2 text-left">
                <div class="flex justify-between">
                  <span class="text-slate-600">Ticket #:</span>
                  <span class="font-medium">${result.ticket.id}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Event:</span>
                  <span class="font-medium">${result.ticket.event.title}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Date:</span>
                  <span>${formatDate(result.ticket.event.date)}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Time:</span>
                  <span>${result.ticket.event.time}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Quantity:</span>
                  <span>${result.ticket.quantity}</span>
                </div>
              </div>
              
              <div class="mt-4 pt-4 border-t border-slate-200">
                <p class="text-success font-medium">${result.message}</p>
              </div>
            `;
          } else {
            validationResult.innerHTML = `
              <div class="text-center text-danger mb-4">
                <i class="fas fa-times-circle text-4xl"></i>
                <h3 class="text-xl font-semibold mt-2">Invalid Ticket</h3>
              </div>
              
              <p class="text-danger font-medium">${result.message}</p>
              
              <div class="mt-6">
                <p class="text-slate-500">Please check the QR code and try again.</p>
              </div>
            `;
          }
        }
        
        // Clear input
        manualQrCode.value = '';
      });
    }
    
    // Edit event buttons
    const editEventButtons = document.querySelectorAll('.edit-event-btn');
    editEventButtons.forEach(button => {
      button.addEventListener('click', () => {
        const eventId = button.getAttribute('data-id');
        showToast('Feature Coming Soon', 'Event editing will be available soon', 'info');
      });
    });
    
    // Manage tickets buttons
    const manageTicketsButtons = document.querySelectorAll('.manage-tickets-btn');
    manageTicketsButtons.forEach(button => {
      button.addEventListener('click', () => {
        const eventId = button.getAttribute('data-id');
        showToast('Feature Coming Soon', 'Ticket management will be available soon', 'info');
      });
    });
    
    // View analytics buttons
    const viewAnalyticsButtons = document.querySelectorAll('.view-analytics-btn');
    viewAnalyticsButtons.forEach(button => {
      button.addEventListener('click', () => {
        const eventId = button.getAttribute('data-id');
        
        // Switch to analytics tab
        const analyticsTab = document.querySelector('.tab[data-tab="analytics"]');
        if (analyticsTab) {
          analyticsTab.click();
          
          // Scroll to analytics section
          const analyticsSection = document.getElementById('analytics-tab');
          if (analyticsSection) {
            analyticsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
    
    // Analytics time range filter
    const analyticsTimeRange = document.getElementById('analyticsTimeRange');
    if (analyticsTimeRange) {
      analyticsTimeRange.addEventListener('change', () => {
        showToast('Feature Coming Soon', 'Detailed analytics will be available soon', 'info');
      });
    }
  },
  
  /**
   * Filter events based on search term and status filter
   */
  filterEvents() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    const eventStatusFilter = document.getElementById('eventStatusFilter');
    const eventSearch = document.getElementById('eventSearch');
    const eventsList = document.getElementById('eventsList');
    
    if (!eventStatusFilter || !eventSearch || !eventsList) return;
    
    // Get filter values
    const statusFilter = eventStatusFilter.value;
    const searchTerm = eventSearch.value.trim().toLowerCase();
    
    // Get all events for the user
    let events = Storage.getEventsByOrganizer(user.id);
    
    // Apply status filter
    if (statusFilter === 'upcoming') {
      events = events.filter(event => {
        const eventDate = new Date(`${event.date} ${event.time}`);
        return eventDate >= new Date();
      });
    } else if (statusFilter === 'past') {
      events = events.filter(event => {
        const eventDate = new Date(`${event.date} ${event.time}`);
        return eventDate < new Date();
      });
    }
    
    // Apply search filter
    if (searchTerm) {
      events = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm) || 
        event.location.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort events by date (newest first)
    events.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Update the events list
    if (events.length > 0) {
      eventsList.innerHTML = events.map(event => {
        const eventDate = new Date(`${event.date} ${event.time}`);
        const isPast = eventDate < new Date();
        const ticketsSold = Storage.getTicketsByEvent(event.id).length;
        return `
          <div class="p-4 hover:bg-slate-50">
            <div class="md:flex justify-between items-center">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h4 class="font-semibold">${event.title}</h4>
                  ${event.isFeatured ? '<span class="badge badge-secondary text-xs">Featured</span>' : ''}
                  ${isPast ? '<span class="badge badge-outline text-xs">Past</span>' : '<span class="badge badge-success text-xs">Upcoming</span>'}
                </div>
                <div class="text-sm text-slate-500 mb-2">
                  <i class="fas fa-calendar mr-1"></i> ${formatDate(event.date)} • 
                  <i class="fas fa-clock mr-1"></i> ${event.time} • 
                  <i class="fas fa-map-marker-alt mr-1"></i> ${event.location}
                </div>
                <div class="text-sm">
                  <span class="text-primary font-medium">${formatPrice(event.price)}</span> • 
                  <span>${ticketsSold} tickets sold</span>
                </div>
              </div>
              <div class="mt-4 md:mt-0 flex gap-2">
                <a href="/event/${event.id}" data-link class="btn btn-sm btn-outline">View</a>
                <button class="btn btn-sm btn-outline edit-event-btn" data-id="${event.id}">Edit</button>
                <button class="btn btn-sm btn-outline manage-tickets-btn" data-id="${event.id}">Tickets</button>
                <button class="btn btn-sm btn-outline view-analytics-btn" data-id="${event.id}">Analytics</button>
              </div>
            </div>
          </div>
        `;
      }).join('');
      
      // Re-attach event listeners
      const editEventButtons = document.querySelectorAll('.edit-event-btn');
      const manageTicketsButtons = document.querySelectorAll('.manage-tickets-btn');
      const viewAnalyticsButtons = document.querySelectorAll('.view-analytics-btn');
      
      editEventButtons.forEach(button => {
        button.addEventListener('click', () => {
          const eventId = button.getAttribute('data-id');
          showToast('Feature Coming Soon', 'Event editing will be available soon', 'info');
        });
      });
      
      manageTicketsButtons.forEach(button => {
        button.addEventListener('click', () => {
          const eventId = button.getAttribute('data-id');
          showToast('Feature Coming Soon', 'Ticket management will be available soon', 'info');
        });
      });
      
      viewAnalyticsButtons.forEach(button => {
        button.addEventListener('click', () => {
          const eventId = button.getAttribute('data-id');
          
          // Switch to analytics tab
          const analyticsTab = document.querySelector('.tab[data-tab="analytics"]');
          if (analyticsTab) {
            analyticsTab.click();
            
            // Scroll to analytics section
            const analyticsSection = document.getElementById('analytics-tab');
            if (analyticsSection) {
              analyticsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });
    } else {
      eventsList.innerHTML = `
        <div class="p-8 text-center">
          <i class="fas fa-search text-slate-300 text-5xl mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">No Events Found</h3>
          <p class="text-slate-500 mb-6">No events match your current filters.</p>
          <button id="clearFiltersBtn" class="btn btn-primary">Clear Filters</button>
        </div>
      `;
      
      // Add clear filters button event listener
      const clearFiltersBtn = document.getElementById('clearFiltersBtn');
      if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
          eventStatusFilter.value = 'all';
          eventSearch.value = '';
          this.filterEvents();
        });
      }
    }
  }
};