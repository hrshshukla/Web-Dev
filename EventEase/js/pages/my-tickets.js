/**
 * My Tickets page implementation
 * Displays all tickets purchased by the current user
 */
const MyTicketsPage = {
  /**
   * Render the my tickets page
   */
  render(container) {
    // Check if user is logged in
    const user = Auth.getCurrentUser();
    if (!user) {
      Router.navigate('/auth');
      return;
    }
    
    // Get data needed for the page
    const tickets = Storage.getTicketsByUser(user.id);
    
    // Separate tickets by upcoming and past
    const now = new Date();
    const upcomingTickets = [];
    const pastTickets = [];
    
    tickets.forEach(ticket => {
      const eventDate = new Date(`${ticket.event.date} ${ticket.event.time}`);
      if (eventDate >= now) {
        upcomingTickets.push(ticket);
      } else {
        pastTickets.push(ticket);
      }
    });
    
    // Sort upcoming tickets by date (soonest first)
    upcomingTickets.sort((a, b) => new Date(a.event.date) - new Date(b.event.date));
    
    // Sort past tickets by date (most recent first)
    pastTickets.sort((a, b) => new Date(b.event.date) - new Date(a.event.date));
    
    // Render HTML
    container.innerHTML = `
      <div class="bg-slate-50 py-8">
        <div class="container">
          <h1 class="text-3xl font-bold text-slate-900 mb-6">My Tickets</h1>
          
          <div class="tabs">
            <div class="tabs-list">
              <div class="tab active" data-tab="upcoming">Upcoming (${upcomingTickets.length})</div>
              <div class="tab" data-tab="past">Past (${pastTickets.length})</div>
            </div>
            
            <div class="tab-content">
              <div class="tab-pane active" id="upcoming-tickets">
                ${upcomingTickets.length > 0 
                  ? `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      ${upcomingTickets.map(ticket => createTicketCard(ticket)).join('')}
                    </div>`
                  : `<div class="bg-white rounded-lg shadow-sm p-8 text-center">
                      <i class="fas fa-ticket-alt text-slate-300 text-5xl mb-4"></i>
                      <h3 class="text-xl font-semibold mb-2">No Upcoming Tickets</h3>
                      <p class="text-slate-500 mb-6">You don't have any upcoming event tickets.</p>
                      <a href="/events" data-link class="btn btn-primary">Browse Events</a>
                    </div>`
                }
              </div>
              
              <div class="tab-pane" id="past-tickets">
                ${pastTickets.length > 0 
                  ? `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      ${pastTickets.map(ticket => createTicketCard(ticket)).join('')}
                    </div>`
                  : `<div class="bg-white rounded-lg shadow-sm p-8 text-center">
                      <i class="fas fa-history text-slate-300 text-5xl mb-4"></i>
                      <h3 class="text-xl font-semibold mb-2">No Past Tickets</h3>
                      <p class="text-slate-500 mb-6">You don't have any past event tickets.</p>
                      <a href="/events" data-link class="btn btn-primary">Browse Events</a>
                    </div>`
                }
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
          if (pane.id === `${tabName}-tickets`) {
            pane.classList.add('active');
          }
        });
      });
    });
  }
};