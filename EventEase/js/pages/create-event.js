/**
 * Create Event page implementation
 * Allows users to create new events
 */
const CreateEventPage = {
  /**
   * Render the create event page
   */
  render(container) {
    // Check if user is logged in
    const user = Auth.getCurrentUser();
    if (!user) {
      Router.navigate('/auth');
      return;
    }
    
    // Get categories for the dropdown
    const categories = Storage.getCategories();
    
    // Get today's date in YYYY-MM-DD format for the min date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;
    
    // Render HTML
    container.innerHTML = `
      <div class="bg-slate-50 py-8">
        <div class="container">
          <div class="max-w-3xl mx-auto">
            <h1 class="text-3xl font-bold text-slate-900 mb-6">Create Event</h1>
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              <form id="createEventForm">
                <!-- Basic Information -->
                <div class="mb-8">
                  <h2 class="text-xl font-semibold mb-4">Basic Information</h2>
                  
                  <div class="form-group">
                    <label for="eventTitle">Event Title *</label>
                    <input 
                      type="text" 
                      id="eventTitle" 
                      placeholder="Give your event a title" 
                      class="form-input"
                      required
                    >
                  </div>
                  
                  <div class="form-group">
                    <label for="eventDescription">Event Description *</label>
                    <textarea 
                      id="eventDescription" 
                      placeholder="Describe your event" 
                      class="form-input" 
                      rows="5"
                      required
                    ></textarea>
                    <p class="help-text">Provide details about what attendees can expect.</p>
                  </div>
                  
                  <div class="form-group">
                    <label for="eventCategory">Category *</label>
                    <select id="eventCategory" class="form-input" required>
                      <option value="">Select Category</option>
                      ${categories.map(category => `
                        <option value="${category.id}">${category.name}</option>
                      `).join('')}
                    </select>
                  </div>
                </div>
                
                <!-- Date and Time -->
                <div class="mb-8">
                  <h2 class="text-xl font-semibold mb-4">Date & Time</h2>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-group">
                      <label for="eventDate">Event Date *</label>
                      <input 
                        type="date" 
                        id="eventDate" 
                        class="form-input" 
                        min="${minDate}"
                        required
                      >
                    </div>
                    
                    <div class="form-group">
                      <label for="eventTime">Event Time *</label>
                      <input 
                        type="time" 
                        id="eventTime" 
                        class="form-input"
                        required
                      >
                    </div>
                  </div>
                </div>
                
                <!-- Location -->
                <div class="mb-8">
                  <h2 class="text-xl font-semibold mb-4">Location</h2>
                  
                  <div class="form-group">
                    <label for="eventLocation">Location/Venue *</label>
                    <input 
                      type="text" 
                      id="eventLocation" 
                      placeholder="Enter the event location" 
                      class="form-input"
                      required
                    >
                    <p class="help-text">Provide the full address or venue name.</p>
                  </div>
                </div>
                
                <!-- Tickets -->
                <div class="mb-8">
                  <h2 class="text-xl font-semibold mb-4">Ticket Information</h2>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-group">
                      <label for="eventPrice">Ticket Price ($) *</label>
                      <input 
                        type="number" 
                        id="eventPrice" 
                        placeholder="0.00" 
                        class="form-input" 
                        step="0.01" 
                        min="0"
                        required
                      >
                      <p class="help-text">Set to 0 for free events.</p>
                    </div>
                    
                    <div class="form-group">
                      <label for="eventCapacity">Capacity *</label>
                      <input 
                        type="number" 
                        id="eventCapacity" 
                        placeholder="Maximum number of attendees" 
                        class="form-input" 
                        min="1"
                        required
                      >
                    </div>
                  </div>
                </div>
                
                <!-- Image Upload -->
                <div class="mb-8">
                  <h2 class="text-xl font-semibold mb-4">Event Image</h2>
                  
                  <div class="form-group">
                    <label for="eventImage">Event Image (Optional)</label>
                    <input 
                      type="file" 
                      id="eventImage" 
                      class="form-input" 
                      accept="image/*"
                    >
                    <p class="help-text">Upload an image for your event (max 2MB).</p>
                  </div>
                </div>
                
                <!-- Submit Buttons -->
                <div class="flex gap-4 justify-end mt-6">
                  <button type="button" id="cancelBtn" class="btn btn-outline">Cancel</button>
                  <button type="submit" class="btn btn-primary">Create Event</button>
                </div>
              </form>
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
    // Cancel button
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        // Confirm before canceling
        if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
          Router.navigate('/events');
        }
      });
    }
    
    // Form submission
    const createEventForm = document.getElementById('createEventForm');
    if (createEventForm) {
      createEventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const title = document.getElementById('eventTitle').value;
        const description = document.getElementById('eventDescription').value;
        const categoryId = parseInt(document.getElementById('eventCategory').value);
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;
        const location = document.getElementById('eventLocation').value;
        const price = document.getElementById('eventPrice').value;
        const capacity = document.getElementById('eventCapacity').value;
        
        // Get current user for organizer ID
        const user = Auth.getCurrentUser();
        
        // Image handling (simplified for demo)
        // In a real app, we'd upload the image to a server
        let imageUrl = '';
        const eventImageInput = document.getElementById('eventImage');
        if (eventImageInput && eventImageInput.files && eventImageInput.files[0]) {
          // For this demo, we'll just note that an image was selected
          // but won't actually use it since we can't upload it without a server
          imageUrl = ''; // Would be the URL to the uploaded image
        }
        
        // Create the event
        try {
          const event = Storage.createEvent({
            title,
            description,
            categoryId,
            date,
            time,
            location,
            price,
            capacity: parseInt(capacity),
            organizerId: user.id,
            imageUrl,
            isFeatured: false
          });
          
          // Show success message
          showToast('Success', 'Event created successfully!', 'success');
          
          // Redirect to the event detail page
          setTimeout(() => {
            Router.navigate(`/event/${event.id}`);
          }, 1500);
        } catch (error) {
          showToast('Error', 'Failed to create event', 'danger');
          console.error('Error creating event:', error);
        }
      });
    }
  }
};