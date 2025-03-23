/**
 * Events page implementation
 * Displays a list of all events with filtering and search capabilities
 */
const EventsPage = {
  /**
   * Render the events page
   */
  render(container) {
    // Get data needed for the page
    const events = Storage.getEvents();
    const categories = Storage.getCategories();
    
    // Get URL parameters for filters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    const dateFilter = urlParams.get('date');
    const searchQuery = urlParams.get('q');
    const sortBy = urlParams.get('sort') || 'date';
    
    // Filter events based on parameters
    let filteredEvents = [...events];
    
    // Apply category filter
    if (categoryFilter) {
      filteredEvents = filteredEvents.filter(event => 
        event.categoryId === parseInt(categoryFilter)
      );
    }
    
    // Apply date filter
    if (dateFilter) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const thisWeekend = new Date(today);
      const dayOfWeek = today.getDay();
      const daysUntilWeekend = dayOfWeek <= 5 ? 5 - dayOfWeek : 7 - dayOfWeek + 5;
      thisWeekend.setDate(today.getDate() + daysUntilWeekend);
      
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      
      const thisMonth = new Date(today);
      thisMonth.setMonth(thisMonth.getMonth() + 1);
      
      switch (dateFilter) {
        case 'today':
          filteredEvents = filteredEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === today.toDateString();
          });
          break;
        case 'tomorrow':
          filteredEvents = filteredEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === tomorrow.toDateString();
          });
          break;
        case 'this-weekend':
          filteredEvents = filteredEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today && eventDate <= thisWeekend;
          });
          break;
        case 'this-week':
          filteredEvents = filteredEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today && eventDate < nextWeek;
          });
          break;
        case 'this-month':
          filteredEvents = filteredEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today && eventDate < thisMonth;
          });
          break;
      }
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'date':
        filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'price-low':
        filteredEvents.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-high':
        filteredEvents.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'name':
        filteredEvents.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    
    // Remove past events
    const now = new Date();
    filteredEvents = filteredEvents.filter(event => {
      const eventDate = new Date(`${event.date} ${event.time}`);
      return eventDate >= now;
    });
    
    // Render HTML
    container.innerHTML = `
      <div class="bg-slate-50 py-8">
        <div class="container">
          <h1 class="text-3xl font-bold text-slate-900 mb-6">Discover Events</h1>
          
          <!-- Search and Filters -->
          <div class="bg-white rounded-lg shadow-sm mb-8">
            <div class="p-6">
              <form id="eventSearchForm" class="md:flex gap-4 items-end">
                <div class="form-group flex-1 mb-4 md:mb-0">
                  <label for="searchQuery">Search Events</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                      <i class="fas fa-search"></i>
                    </span>
                    <input 
                      type="text" 
                      id="searchQuery" 
                      placeholder="Search by name, description, or location" 
                      class="form-input pl-10"
                      value="${searchQuery || ''}"
                    >
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 md:mb-0">
                  <div class="form-group">
                    <label for="categoryFilter">Category</label>
                    <select id="categoryFilter" class="form-input">
                      <option value="">All Categories</option>
                      ${categories.map(category => `
                        <option value="${category.id}" ${categoryFilter == category.id ? 'selected' : ''}>
                          ${category.name}
                        </option>
                      `).join('')}
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label for="dateFilter">When</label>
                    <select id="dateFilter" class="form-input">
                      <option value="">Any Date</option>
                      <option value="today" ${dateFilter === 'today' ? 'selected' : ''}>Today</option>
                      <option value="tomorrow" ${dateFilter === 'tomorrow' ? 'selected' : ''}>Tomorrow</option>
                      <option value="this-weekend" ${dateFilter === 'this-weekend' ? 'selected' : ''}>This Weekend</option>
                      <option value="this-week" ${dateFilter === 'this-week' ? 'selected' : ''}>This Week</option>
                      <option value="this-month" ${dateFilter === 'this-month' ? 'selected' : ''}>This Month</option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label for="sortBy">Sort By</label>
                    <select id="sortBy" class="form-input">
                      <option value="date" ${sortBy === 'date' ? 'selected' : ''}>Date (Soonest)</option>
                      <option value="price-low" ${sortBy === 'price-low' ? 'selected' : ''}>Price (Low to High)</option>
                      <option value="price-high" ${sortBy === 'price-high' ? 'selected' : ''}>Price (High to Low)</option>
                      <option value="name" ${sortBy === 'name' ? 'selected' : ''}>Name (A-Z)</option>
                    </select>
                  </div>
                </div>
                
                <div class="flex gap-2">
                  <button type="submit" class="btn btn-primary">
                    <i class="fas fa-filter mr-2"></i> Apply Filters
                  </button>
                  <button type="button" id="clearFiltersBtn" class="btn btn-outline">
                    <i class="fas fa-times mr-2"></i> Clear
                  </button>
                </div>
              </form>
            </div>
            
            <!-- Active Filters -->
            ${(categoryFilter || dateFilter || searchQuery) ? `
              <div class="border-t border-slate-100 px-6 py-3 flex flex-wrap gap-2 items-center">
                <span class="text-sm text-slate-500">Active Filters:</span>
                ${categoryFilter ? `
                  <div class="filter-tag">
                    <span>Category: ${categories.find(c => c.id === parseInt(categoryFilter))?.name || 'Unknown'}</span>
                    <button class="filter-tag-close" data-remove="category">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                ` : ''}
                ${dateFilter ? `
                  <div class="filter-tag">
                    <span>Date: ${dateFilter.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    <button class="filter-tag-close" data-remove="date">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                ` : ''}
                ${searchQuery ? `
                  <div class="filter-tag">
                    <span>Search: "${searchQuery}"</span>
                    <button class="filter-tag-close" data-remove="q">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>
          
          <!-- Events Results -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold">
                ${filteredEvents.length} Events Found
                ${categoryFilter ? ` in ${categories.find(c => c.id === parseInt(categoryFilter))?.name || 'Selected Category'}` : ''}
              </h2>
              <div class="flex items-center text-sm">
                <span class="mr-2">View as:</span>
                <button class="view-btn view-grid active" data-view="grid">
                  <i class="fas fa-th-large"></i>
                </button>
                <button class="view-btn view-list" data-view="list">
                  <i class="fas fa-list"></i>
                </button>
              </div>
            </div>
            
            <div id="eventsContainer">
              ${filteredEvents.length > 0 
                ? `<div class="events-grid">
                    ${filteredEvents.map(event => createEventCard(event)).join('')}
                  </div>`
                : `<div class="bg-white rounded-lg shadow-sm p-8 text-center">
                    <i class="fas fa-calendar-times text-slate-300 text-5xl mb-4"></i>
                    <h3 class="text-xl font-semibold mb-2">No Events Found</h3>
                    <p class="text-slate-500 mb-6">No events match your current filters.</p>
                    <button id="resetFiltersBtn" class="btn btn-primary">Reset Filters</button>
                  </div>`
              }
            </div>
          </div>
          
          <!-- Call to Action -->
          <div class="bg-primary-50 rounded-lg p-8 text-center">
            <h2 class="text-2xl font-bold mb-4">Want to host your own event?</h2>
            <p class="text-slate-600 max-w-2xl mx-auto mb-6">
              Create and manage your own events on our platform. It's easy to set up, promote, and sell tickets to your audience.
            </p>
            <a href="/create-event" data-link class="btn btn-primary">
              <i class="fas fa-plus-circle mr-2"></i> Create Event
            </a>
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
    // Search form
    const eventSearchForm = document.getElementById('eventSearchForm');
    if (eventSearchForm) {
      eventSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.applyFilters();
      });
    }
    
    // Clear filters button
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        this.clearFilters();
      });
    }
    
    // Reset filters button (shows when no results)
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        this.clearFilters();
      });
    }
    
    // Individual filter tag close buttons
    const filterTagCloseButtons = document.querySelectorAll('.filter-tag-close');
    filterTagCloseButtons.forEach(button => {
      button.addEventListener('click', () => {
        const paramToRemove = button.getAttribute('data-remove');
        if (paramToRemove) {
          const urlParams = new URLSearchParams(window.location.search);
          urlParams.delete(paramToRemove);
          
          // Update URL and reload page
          window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
          Router.check();
        }
      });
    });
    
    // View toggle buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    const eventsContainer = document.getElementById('eventsContainer');
    
    if (viewButtons.length && eventsContainer) {
      viewButtons.forEach(button => {
        button.addEventListener('click', () => {
          const viewType = button.getAttribute('data-view');
          
          // Update active button
          viewButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Update view
          const eventsHTML = eventsContainer.querySelector('.events-grid, .events-list');
          if (eventsHTML) {
            const events = Storage.getEvents();
            
            // Get current filters
            const urlParams = new URLSearchParams(window.location.search);
            const categoryFilter = urlParams.get('category');
            const dateFilter = urlParams.get('date');
            const searchQuery = urlParams.get('q');
            const sortBy = urlParams.get('sort') || 'date';
            
            // Filter events
            let filteredEvents = [...events];
            
            // Apply category filter
            if (categoryFilter) {
              filteredEvents = filteredEvents.filter(event => 
                event.categoryId === parseInt(categoryFilter)
              );
            }
            
            // Apply date filter
            if (dateFilter) {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              
              const tomorrow = new Date(today);
              tomorrow.setDate(tomorrow.getDate() + 1);
              
              const thisWeekend = new Date(today);
              const dayOfWeek = today.getDay();
              const daysUntilWeekend = dayOfWeek <= 5 ? 5 - dayOfWeek : 7 - dayOfWeek + 5;
              thisWeekend.setDate(today.getDate() + daysUntilWeekend);
              
              const nextWeek = new Date(today);
              nextWeek.setDate(today.getDate() + 7);
              
              const thisMonth = new Date(today);
              thisMonth.setMonth(thisMonth.getMonth() + 1);
              
              switch (dateFilter) {
                case 'today':
                  filteredEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate.toDateString() === today.toDateString();
                  });
                  break;
                case 'tomorrow':
                  filteredEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate.toDateString() === tomorrow.toDateString();
                  });
                  break;
                case 'this-weekend':
                  filteredEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate >= today && eventDate <= thisWeekend;
                  });
                  break;
                case 'this-week':
                  filteredEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate >= today && eventDate < nextWeek;
                  });
                  break;
                case 'this-month':
                  filteredEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate >= today && eventDate < thisMonth;
                  });
                  break;
              }
            }
            
            // Apply search query
            if (searchQuery) {
              const query = searchQuery.toLowerCase();
              filteredEvents = filteredEvents.filter(event => 
                event.title.toLowerCase().includes(query) || 
                event.description.toLowerCase().includes(query) ||
                event.location.toLowerCase().includes(query)
              );
            }
            
            // Apply sorting
            switch (sortBy) {
              case 'date':
                filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
              case 'price-low':
                filteredEvents.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
              case 'price-high':
                filteredEvents.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
              case 'name':
                filteredEvents.sort((a, b) => a.title.localeCompare(b.title));
                break;
            }
            
            // Remove past events
            const now = new Date();
            filteredEvents = filteredEvents.filter(event => {
              const eventDate = new Date(`${event.date} ${event.time}`);
              return eventDate >= now;
            });
            
            if (viewType === 'grid') {
              eventsContainer.innerHTML = `
                <div class="events-grid">
                  ${filteredEvents.map(event => createEventCard(event)).join('')}
                </div>
              `;
            } else {
              eventsContainer.innerHTML = `
                <div class="events-list">
                  ${filteredEvents.map(event => `
                    <div class="event-list-item">
                      <div class="event-list-image">
                        ${event.imageUrl 
                          ? `<img src="${event.imageUrl}" alt="${event.title}" class="w-full h-full object-cover">`
                          : `<div class="w-full h-full bg-slate-200 flex items-center justify-center">
                              <i class="fas fa-calendar-alt text-slate-400 text-4xl"></i>
                            </div>`
                        }
                      </div>
                      <div class="event-list-content">
                        <h3 class="event-list-title">
                          <a href="/event/${event.id}" data-link>${event.title}</a>
                        </h3>
                        <div class="event-list-meta">
                          <div class="event-list-date">
                            <i class="fas fa-calendar"></i> ${formatDate(event.date)}
                          </div>
                          <div class="event-list-time">
                            <i class="fas fa-clock"></i> ${event.time}
                          </div>
                          <div class="event-list-location">
                            <i class="fas fa-map-marker-alt"></i> ${event.location}
                          </div>
                        </div>
                        <p class="event-list-description">${event.description.substring(0, 150)}${event.description.length > 150 ? '...' : ''}</p>
                      </div>
                      <div class="event-list-actions">
                        <div class="event-list-price">${formatPrice(event.price)}</div>
                        <a href="/event/${event.id}" data-link class="btn btn-primary">View Details</a>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `;
            }
          }
        });
      });
    }
    
    // Add event handlers for category and direct date filters
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryId = link.getAttribute('data-id');
        
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('category', categoryId);
        
        // Update URL and reload page
        window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
        Router.check();
      });
    });
    
    const dateLinks = document.querySelectorAll('.date-link');
    dateLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const dateFilter = link.getAttribute('data-date');
        
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('date', dateFilter);
        
        // Update URL and reload page
        window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
        Router.check();
      });
    });
  },
  
  /**
   * Apply selected filters and update the URL
   */
  applyFilters() {
    const searchQuery = document.getElementById('searchQuery').value.trim();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    const sortBy = document.getElementById('sortBy').value;
    
    const urlParams = new URLSearchParams();
    
    if (searchQuery) urlParams.set('q', searchQuery);
    if (categoryFilter) urlParams.set('category', categoryFilter);
    if (dateFilter) urlParams.set('date', dateFilter);
    if (sortBy !== 'date') urlParams.set('sort', sortBy);
    
    // Update URL and reload page
    window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    Router.check();
  },
  
  /**
   * Clear all filters and reload page
   */
  clearFilters() {
    window.history.pushState({}, '', window.location.pathname);
    Router.check();
  },
  
  /**
   * Apply sorting to event list
   */
  applySorting(sortOption) {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (sortOption === 'date') {
      urlParams.delete('sort');
    } else {
      urlParams.set('sort', sortOption);
    }
    
    // Update URL and reload page
    window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    Router.check();
  }
};