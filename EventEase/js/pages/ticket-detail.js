/**
 * Ticket Detail page implementation
 * Displays details about a purchased ticket including QR code
 */
const TicketDetailPage = {
  /**
   * Render the ticket detail page
   */
  render(container, ticketId) {
    // Check if user is logged in
    const user = Auth.getCurrentUser();
    if (!user) {
      Router.navigate('/auth');
      return;
    }
    
    // Get data needed for the page
    const ticketIdInt = parseInt(ticketId);
    const ticket = Storage.getTicket(ticketIdInt);
    
    if (!ticket) {
      container.innerHTML = `
        <div class="container py-12">
          <div class="text-center">
            <h1 class="text-4xl font-bold mb-4">Ticket Not Found</h1>
            <p class="mb-6">The ticket you are looking for doesn't exist or has been removed.</p>
            <a href="/my-tickets" data-link class="btn btn-primary">My Tickets</a>
          </div>
        </div>
      `;
      return;
    }
    
    // Verify that the ticket belongs to the current user
    if (ticket.userId !== user.id) {
      container.innerHTML = `
        <div class="container py-12">
          <div class="text-center">
            <h1 class="text-4xl font-bold mb-4">Access Denied</h1>
            <p class="mb-6">You do not have permission to view this ticket.</p>
            <a href="/my-tickets" data-link class="btn btn-primary">My Tickets</a>
          </div>
        </div>
      `;
      return;
    }
    
    // Get event details
    const event = Storage.getEvent(ticket.eventId);
    if (!event) {
      container.innerHTML = `
        <div class="container py-12">
          <div class="text-center">
            <h1 class="text-4xl font-bold mb-4">Event Not Found</h1>
            <p class="mb-6">The event associated with this ticket no longer exists.</p>
            <a href="/my-tickets" data-link class="btn btn-primary">My Tickets</a>
          </div>
        </div>
      `;
      return;
    }
    
    // Check if event is in the past
    const eventDate = new Date(`${event.date} ${event.time}`);
    const isPast = eventDate < new Date();
    
    // Generate QR code (using our simple helper function for now)
    const qrCodeUrl = generateQRCode(ticket.qrCode);
    
    // Render HTML
    container.innerHTML = `
      <div class="bg-slate-50 py-8">
        <div class="container">
          <div class="mb-6">
            <a href="/my-tickets" data-link class="text-primary inline-flex items-center">
              <i class="fas fa-arrow-left mr-2"></i> Back to My Tickets
            </a>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="md:flex">
              <!-- Ticket Info -->
              <div class="md:w-2/3 p-6">
                <div class="flex justify-between items-center mb-6">
                  <h1 class="text-2xl font-bold text-slate-900">Ticket Details</h1>
                  <div>
                    ${ticket.isUsed 
                      ? '<span class="badge badge-danger">Used</span>' 
                      : isPast 
                        ? '<span class="badge badge-outline">Past</span>' 
                        : '<span class="badge badge-success">Valid</span>'
                    }
                  </div>
                </div>
                
                <div class="bg-slate-50 rounded-lg p-4 mb-6">
                  <h2 class="text-xl font-semibold mb-2">${event.title}</h2>
                  <div class="space-y-2">
                    <div class="flex items-center text-slate-700">
                      <i class="fas fa-calendar mr-2 text-primary"></i>
                      <span>${formatDate(event.date)}</span>
                    </div>
                    <div class="flex items-center text-slate-700">
                      <i class="fas fa-clock mr-2 text-primary"></i>
                      <span>${event.time}</span>
                    </div>
                    <div class="flex items-center text-slate-700">
                      <i class="fas fa-map-marker-alt mr-2 text-primary"></i>
                      <span>${event.location}</span>
                    </div>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 class="font-semibold mb-2">Ticket Information</h3>
                    <div class="space-y-2">
                      <div class="flex justify-between">
                        <span class="text-slate-600">Ticket #:</span>
                        <span>${ticket.id}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-slate-600">Purchase Date:</span>
                        <span>${formatDate(ticket.purchaseDate)}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-slate-600">Quantity:</span>
                        <span>${ticket.quantity}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-slate-600">Total Paid:</span>
                        <span class="font-semibold">${formatPrice(ticket.total)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="font-semibold mb-2">Attendee Information</h3>
                    <div class="space-y-2">
                      <div class="flex justify-between">
                        <span class="text-slate-600">Name:</span>
                        <span>${user.username}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-slate-600">Email:</span>
                        <span>${user.email || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <div class="flex items-start">
                    <i class="fas fa-info-circle text-info mt-1 mr-3"></i>
                    <div>
                      <h4 class="font-medium">Important Information</h4>
                      <p class="text-sm text-slate-600">Please arrive 15 minutes before the event starts. Have your ticket QR code ready for scanning at the entrance.</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <i class="fas fa-ban text-danger mt-1 mr-3"></i>
                    <div>
                      <h4 class="font-medium">Cancellation Policy</h4>
                      <p class="text-sm text-slate-600">Tickets are non-refundable. If you can't attend, you can transfer your ticket to someone else.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- QR Code -->
              <div class="md:w-1/3 border-t md:border-t-0 md:border-l border-slate-200 p-6">
                <div class="text-center">
                  <h2 class="text-xl font-semibold mb-4">Your Ticket QR Code</h2>
                  
                  <div class="qr-code-container mx-auto mb-6">
                    <div class="qr-code">
                      <img src="${qrCodeUrl}" alt="Ticket QR Code" class="mx-auto">
                    </div>
                    <div class="qr-code-info">
                      <p class="text-sm text-slate-600">Scan this QR code at the event entrance</p>
                      <p class="qr-code-id">Ticket #${ticket.id}</p>
                    </div>
                  </div>
                  
                  <div class="space-y-4">
                    <button id="downloadQrBtn" class="btn btn-primary btn-block">
                      <i class="fas fa-download mr-2"></i> Download QR Code
                    </button>
                    
                    <button id="printTicketBtn" class="btn btn-outline btn-block">
                      <i class="fas fa-print mr-2"></i> Print Ticket
                    </button>
                    
                    <button id="emailTicketBtn" class="btn btn-outline btn-block">
                      <i class="fas fa-envelope mr-2"></i> Email Ticket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add event listeners
    this.addEventListeners(ticket, qrCodeUrl);
  },
  
  /**
   * Add event listeners for interactive elements
   */
  addEventListeners(ticket, qrCodeUrl) {
    // Download QR Code button
    const downloadQrBtn = document.getElementById('downloadQrBtn');
    if (downloadQrBtn && qrCodeUrl) {
      downloadQrBtn.addEventListener('click', () => {
        // Create a temporary link
        const link = document.createElement('a');
        link.href = qrCodeUrl;
        link.download = `ticket-${ticket.id}-qr.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast('Success', 'QR code downloaded successfully', 'success');
      });
    }
    
    // Print ticket button
    const printTicketBtn = document.getElementById('printTicketBtn');
    if (printTicketBtn) {
      printTicketBtn.addEventListener('click', () => {
        window.print();
      });
    }
    
    // Email ticket button
    const emailTicketBtn = document.getElementById('emailTicketBtn');
    if (emailTicketBtn) {
      emailTicketBtn.addEventListener('click', () => {
        // In a real app, we'd send the ticket via email from the server
        // For this demo, we'll just show a success message
        showToast('Success', 'Ticket sent to your email', 'success');
      });
    }
  }
};