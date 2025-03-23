/**
 * Helper functions used throughout the application
 */

/**
 * Format a date string (YYYY-MM-DD) to a more readable format
 */
function formatDate(dateString) {
  const options = { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

/**
 * Format a price to display with currency symbol
 */
function formatPrice(price) {
  if (price === '0' || price === 0) {
    return 'Free';
  }
  return `$${parseFloat(price).toFixed(2)}`;
}

/**
 * Generate a QR code as SVG string
 * This is a simple implementation for demonstration
 */
function generateQRCode(data, size = 200) {
  // Simple implementation that shows a placeholder
  // In a real app, we'd use a QR code library
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff" />
      <rect x="10%" y="10%" width="80%" height="80%" fill="#f3f4f6" />
      <text x="50%" y="50%" font-family="monospace" font-size="10" text-anchor="middle">
        [QR Code Placeholder]
      </text>
      <text x="50%" y="60%" font-family="monospace" font-size="8" text-anchor="middle">
        ${data.substring(0, 20)}...
      </text>
    </svg>
  `;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

/**
 * Check if an event has passed (is in the past)
 */
function isPastEvent(event) {
  const eventDate = new Date(`${event.date} ${event.time}`);
  return eventDate < new Date();
}

/**
 * Create and show a toast notification
 */
function showToast(title, message, type = 'info', duration = 3000) {
  const toastContainer = document.getElementById('toastContainer');
  
  if (!toastContainer) {
    console.error('Toast container not found');
    return;
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  // Set icon based on type
  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-check-circle';
  if (type === 'danger') icon = 'fa-exclamation-circle';
  if (type === 'warning') icon = 'fa-exclamation-triangle';
  
  // Create toast content
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas ${icon}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <div class="toast-close">
      <i class="fas fa-times"></i>
    </div>
  `;
  
  // Add toast to container
  toastContainer.appendChild(toast);
  
  // Add click handler to close button
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.remove();
  });
  
  // Auto-remove toast after duration
  setTimeout(() => {
    toast.classList.add('toast-hiding');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

/**
 * Create event card HTML
 */
function createEventCard(event, featured = false) {
  const eventDate = formatDate(event.date);
  const price = formatPrice(event.price);
  
  return `
    <div class="card event-card">
      ${featured ? '<div class="card-badge">Featured</div>' : ''}
      <div class="card-img-placeholder">
        ${event.imageUrl 
          ? `<img src="${event.imageUrl}" alt="${event.title}" class="card-img">`
          : `<div class="card-img-placeholder"><i class="fas fa-calendar-alt"></i></div>`
        }
      </div>
      <div class="card-body">
        <div class="event-meta">
          <i class="fas fa-calendar"></i>
          <span>${eventDate} • ${event.time}</span>
        </div>
        <h3 class="card-title">${event.title}</h3>
        <div class="event-meta">
          <i class="fas fa-map-marker-alt"></i>
          <span>${event.location}</span>
        </div>
        <p class="card-text">${event.description.substring(0, 100)}${event.description.length > 100 ? '...' : ''}</p>
      </div>
      <div class="card-footer">
        <div class="card-price">${price}</div>
        <a href="/event/${event.id}" data-link class="btn btn-primary btn-sm">Get Tickets</a>
      </div>
    </div>
  `;
}

/**
 * Create ticket card HTML
 */
function createTicketCard(ticket) {
  const isPast = isPastEvent(ticket.event);
  const badgeClass = ticket.isUsed 
    ? 'badge-danger' 
    : isPast 
    ? 'badge-outline' 
    : 'badge-success';
  const badgeText = ticket.isUsed 
    ? 'Used' 
    : isPast 
    ? 'Past' 
    : 'Valid';
  
  return `
    <div class="card">
      <div style="position: relative;">
        ${ticket.event.imageUrl 
          ? `<img src="${ticket.event.imageUrl}" alt="${ticket.event.title}" class="card-img">`
          : `<div class="card-img-placeholder"><i class="fas fa-ticket-alt"></i></div>`
        }
        <div style="position: absolute; top: 10px; right: 10px;">
          <span class="badge ${badgeClass}">${badgeText}</span>
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${ticket.event.title}</h3>
        <div class="event-meta">
          <i class="fas fa-calendar"></i>
          <span>${formatDate(ticket.event.date)}</span>
        </div>
        <div class="event-meta">
          <i class="fas fa-clock"></i>
          <span>${ticket.event.time}</span>
        </div>
        <div class="event-meta">
          <i class="fas fa-map-marker-alt"></i>
          <span>${ticket.event.location}</span>
        </div>
        <div class="mt-4">
          <div class="flex justify-between">
            <span>Quantity:</span>
            <span>${ticket.quantity}</span>
          </div>
          <div class="flex justify-between">
            <span>Total:</span>
            <span>${formatPrice(ticket.total)}</span>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <a href="/ticket/${ticket.id}" data-link class="btn btn-primary btn-block">View Ticket</a>
      </div>
    </div>
  `;
}

/**
 * Generate a sample event
 * This is for demonstration only - would not be used in a real app
 */
function generateSampleEvent(id, categoryId, organizerId) {
  const titles = [
    'Summer Music Festival',
    'Business Networking Mixer',
    'Tech Conference 2025',
    'Art Gallery Opening',
    'Charity Fundraiser Gala',
    'Food & Wine Tasting',
    'Comedy Night'
  ];
  
  const locations = [
    'Central Park, New York',
    'Convention Center, Chicago',
    'Millennium Hall, Boston',
    'Beach Resort, Miami',
    'Downtown Pavilion, Austin',
    'Golden Gate Park, San Francisco'
  ];
  
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 60) + 5);
  
  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const randomTime = () => {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.random() > 0.5 ? '00' : '30';
    const period = Math.random() > 0.5 ? 'AM' : 'PM';
    return `${hours}:${minutes} ${period}`;
  };
  
  return {
    id: id || 1,
    title: titles[Math.floor(Math.random() * titles.length)],
    description: 'Join us for an amazing event filled with entertainment, networking, and more. This is an event you won\'t want to miss!',
    date: formatDateForInput(futureDate),
    time: randomTime(),
    location: locations[Math.floor(Math.random() * locations.length)],
    price: (Math.random() * 100).toFixed(2),
    categoryId: categoryId || Math.floor(Math.random() * 6) + 1,
    organizerId: organizerId || 1,
    isFeatured: Math.random() > 0.7,
    capacity: Math.floor(Math.random() * 200) + 50,
    imageUrl: '',
    createdAt: new Date().toISOString()
  };
}