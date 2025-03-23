/**
 * Main application entry point
 * Initializes the router and sets up routes
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize modules
  Storage.init();
  Auth.init();
  
  // Initialize router
  Router.config({
    mode: 'hash',
    root: '/'
  });
  
  // Set up routes
  Router.add('/', () => {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      HomePage.render(appContainer);
    }
  });
  
  Router.add('/events', () => {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      EventsPage.render(appContainer);
    }
  });
  
  Router.add('/event/:id', (params) => {
    const appContainer = document.getElementById('app');
    if (appContainer && params.id) {
      EventDetailPage.render(appContainer, params.id);
    }
  });
  
  Router.add('/create-event', () => {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      Router.checkAuth(() => {
        CreateEventPage.render(appContainer);
      });
    }
  });
  
  Router.add('/my-tickets', () => {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      Router.checkAuth(() => {
        MyTicketsPage.render(appContainer);
      });
    }
  });
  
  Router.add('/ticket/:id', (params) => {
    const appContainer = document.getElementById('app');
    if (appContainer && params.id) {
      Router.checkAuth(() => {
        TicketDetailPage.render(appContainer, params.id);
      });
    }
  });
  
  Router.add('/dashboard', () => {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      Router.checkAuth(() => {
        DashboardPage.render(appContainer);
      });
    }
  });
  
  Router.add('/auth', () => {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      // If user is already logged in, redirect to home
      if (Auth.getCurrentUser()) {
        Router.navigate('/');
        return;
      }
      
      appContainer.innerHTML = `
        <div class="auth-page">
          <div class="auth-container">
            <div class="auth-tabs">
              <div class="auth-tab active" data-tab="login">Login</div>
              <div class="auth-tab" data-tab="register">Register</div>
            </div>
            
            <div class="auth-forms">
              <!-- Login Form -->
              <form id="loginForm" class="auth-form">
                <div class="form-group">
                  <label for="loginUsername">Username</label>
                  <input type="text" id="loginUsername" class="form-input" required>
                </div>
                
                <div class="form-group">
                  <label for="loginPassword">Password</label>
                  <input type="password" id="loginPassword" class="form-input" required>
                </div>
                
                <div class="form-footer">
                  <button type="submit" class="btn btn-primary btn-block">Login</button>
                </div>
              </form>
              
              <!-- Register Form -->
              <form id="registerForm" class="auth-form hidden">
                <div class="form-group">
                  <label for="registerName">Full Name</label>
                  <input type="text" id="registerName" class="form-input" required>
                </div>
                
                <div class="form-group">
                  <label for="registerUsername">Username</label>
                  <input type="text" id="registerUsername" class="form-input" required>
                </div>
                
                <div class="form-group">
                  <label for="registerEmail">Email</label>
                  <input type="email" id="registerEmail" class="form-input" required>
                </div>
                
                <div class="form-group">
                  <label for="registerPassword">Password</label>
                  <input type="password" id="registerPassword" class="form-input" required>
                </div>
                
                <div class="form-group">
                  <label for="registerPasswordConfirm">Confirm Password</label>
                  <input type="password" id="registerPasswordConfirm" class="form-input" required>
                </div>
                
                <div class="form-group">
                  <label class="checkbox-label">
                    <input type="checkbox" id="registerOrganizer">
                    <span>Register as an Event Organizer</span>
                  </label>
                </div>
                
                <div class="form-footer">
                  <button type="submit" class="btn btn-primary btn-block">Register</button>
                </div>
              </form>
            </div>
          </div>
          
          <div class="auth-hero">
            <div class="auth-hero-content">
              <h1>Welcome to EventHub</h1>
              <p>Your one-stop platform for discovering events, purchasing tickets, and managing your events.</p>
              
              <div class="auth-features">
                <div class="auth-feature">
                  <i class="fas fa-search"></i>
                  <span>Find events near you</span>
                </div>
                <div class="auth-feature">
                  <i class="fas fa-ticket-alt"></i>
                  <span>Secure ticket purchasing</span>
                </div>
                <div class="auth-feature">
                  <i class="fas fa-qrcode"></i>
                  <span>Digital tickets with QR codes</span>
                </div>
                <div class="auth-feature">
                  <i class="fas fa-calendar-plus"></i>
                  <span>Create and manage your own events</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Add event listeners for auth page
      const authTabs = document.querySelectorAll('.auth-tab');
      const loginForm = document.getElementById('loginForm');
      const registerForm = document.getElementById('registerForm');
      
      // Tab switching
      authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const tabType = tab.getAttribute('data-tab');
          
          // Update active tab
          authTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          
          // Show the correct form
          if (tabType === 'login') {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
          } else {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
          }
        });
      });
      
      // Login form submission
      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const username = document.getElementById('loginUsername').value.trim();
          const password = document.getElementById('loginPassword').value;
          
          if (!username || !password) {
            showToast('Error', 'Please fill in all fields', 'danger');
            return;
          }
          
          try {
            Auth.login(username, password);
          } catch (error) {
            showToast('Error', error.message, 'danger');
          }
        });
      }
      
      // Register form submission
      if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const name = document.getElementById('registerName').value.trim();
          const username = document.getElementById('registerUsername').value.trim();
          const email = document.getElementById('registerEmail').value.trim();
          const password = document.getElementById('registerPassword').value;
          const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
          const isOrganizer = document.getElementById('registerOrganizer').checked;
          
          if (!name || !username || !email || !password || !passwordConfirm) {
            showToast('Error', 'Please fill in all fields', 'danger');
            return;
          }
          
          if (password !== passwordConfirm) {
            showToast('Error', 'Passwords do not match', 'danger');
            return;
          }
          
          try {
            Auth.register(username, email, password, passwordConfirm, name, isOrganizer);
          } catch (error) {
            showToast('Error', error.message, 'danger');
          }
        });
      }
    }
  });
  
  // Catch-all route for 404
  Router.add('', () => {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      appContainer.innerHTML = `
        <div class="not-found-page">
          <div class="container text-center py-12">
            <div class="not-found-icon">
              <i class="fas fa-map-signs"></i>
            </div>
            <h1 class="not-found-title">Page Not Found</h1>
            <p class="not-found-message">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <a href="/" data-link class="btn btn-primary mt-6">
              <i class="fas fa-home mr-2"></i> Back to Home
            </a>
          </div>
        </div>
      `;
    }
  });
  
  // Initialize the router
  Router.listen();
  
  // Handle links with data-link attribute
  Router.handleLinks();
  
  // Initialize sample data if needed
  initializeSampleData();
});

/**
 * Initialize sample data if the application is empty
 */
function initializeSampleData() {
  // Check if any categories exist
  const categories = Storage.getCategories();
  if (categories.length === 0) {
    // Create categories
    const categoryData = [
      { name: 'Music & Concerts' },
      { name: 'Sports & Fitness' },
      { name: 'Food & Drinks' },
      { name: 'Arts & Culture' },
      { name: 'Technology' },
      { name: 'Business & Career' },
      { name: 'Health & Wellness' },
      { name: 'Family & Kids' }
    ];
    
    categoryData.forEach(category => {
      Storage.createCategory(category);
    });
  }
  
  // Check if any users exist
  const users = Storage.getData().users;
  if (users.length === 0 || users.length === 1) {
    // Create sample users (only if none exist)
    const userData = [
      {
        name: 'Admin User',
        username: 'admin',
        email: 'admin@example.com',
        password: 'password123',
        isOrganizer: true
      },
      {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
        isOrganizer: true
      },
      {
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'jane@example.com',
        password: 'password123',
        isOrganizer: false
      }
    ];
    
    userData.forEach(user => {
      try {
        Storage.createUser(user);
      } catch (error) {
        console.log(`User ${user.username} already exists`);
      }
    });
  }
  
  // Check if any events exist
  const events = Storage.getEvents();
  if (events.length === 0) {
    // Get categories and users for references
    const createdCategories = Storage.getCategories();
    const createdUsers = Storage.getData().users;
    
    if (createdCategories.length > 0 && createdUsers.length > 0) {
      // Find organizer users
      const organizers = createdUsers.filter(user => user.isOrganizer);
      
      if (organizers.length > 0) {
        // Create sample events
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        const nextMonth = new Date(today);
        nextMonth.setDate(nextMonth.getDate() + 30);
        
        const formatDateForInput = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
        
        const eventData = [
          {
            title: 'Summer Music Festival',
            description: 'Join us for a weekend of amazing music performances from top artists. Food, drinks, and entertainment for all ages.',
            categoryId: createdCategories.find(c => c.name === 'Music & Concerts')?.id || 1,
            date: formatDateForInput(nextWeek),
            time: '14:00',
            location: 'Central Park, New York',
            price: '49.99',
            capacity: 5000,
            organizerId: organizers[0].id,
            imageUrl: '',
            isFeatured: true
          },
          {
            title: 'Tech Conference 2023',
            description: 'The biggest tech conference of the year. Network with industry professionals and learn about the latest technologies.',
            categoryId: createdCategories.find(c => c.name === 'Technology')?.id || 5,
            date: formatDateForInput(nextMonth),
            time: '09:00',
            location: 'Convention Center, San Francisco',
            price: '199.99',
            capacity: 2000,
            organizerId: organizers[0].id,
            imageUrl: '',
            isFeatured: true
          },
          {
            title: 'Food & Wine Festival',
            description: 'Sample gourmet food and fine wines from local and international chefs and wineries.',
            categoryId: createdCategories.find(c => c.name === 'Food & Drinks')?.id || 3,
            date: formatDateForInput(tomorrow),
            time: '18:00',
            location: 'Downtown Food Plaza, Chicago',
            price: '75.00',
            capacity: 1000,
            organizerId: organizers[0].id,
            imageUrl: '',
            isFeatured: false
          },
          {
            title: 'Marathon for Charity',
            description: 'Run for a cause! Join our annual charity marathon and help raise funds for children in need.',
            categoryId: createdCategories.find(c => c.name === 'Sports & Fitness')?.id || 2,
            date: formatDateForInput(nextWeek),
            time: '07:00',
            location: 'City Riverfront, Boston',
            price: '25.00',
            capacity: 3000,
            organizerId: organizers[0].id,
            imageUrl: '',
            isFeatured: false
          },
          {
            title: 'Art Exhibition Opening',
            description: 'Exclusive opening night for our new modern art exhibition featuring works from acclaimed international artists.',
            categoryId: createdCategories.find(c => c.name === 'Arts & Culture')?.id || 4,
            date: formatDateForInput(tomorrow),
            time: '19:00',
            location: 'City Art Museum, Los Angeles',
            price: '15.00',
            capacity: 300,
            organizerId: organizers[0].id,
            imageUrl: '',
            isFeatured: true
          },
          {
            title: 'Business Networking Lunch',
            description: 'Connect with local business leaders over lunch. Great opportunity for networking and forming new partnerships.',
            categoryId: createdCategories.find(c => c.name === 'Business & Career')?.id || 6,
            date: formatDateForInput(nextWeek),
            time: '12:30',
            location: 'Grand Hotel, Dallas',
            price: '45.00',
            capacity: 150,
            organizerId: organizers[1].id,
            imageUrl: '',
            isFeatured: false
          }
        ];
        
        eventData.forEach(event => {
          Storage.createEvent(event);
        });
      }
    }
  }
}