/**
 * Authentication utility for managing user authentication
 * Handles login, registration, and session management
 */
const Auth = {
  /**
   * Current authenticated user
   */
  user: null,
  
  /**
   * Session token key in localStorage
   */
  SESSION_TOKEN_KEY: 'eventHub_session',
  
  /**
   * Get the current authenticated user
   */
  getCurrentUser() {
    if (this.user) {
      return this.user;
    }
    
    // Check for a saved session
    const sessionToken = localStorage.getItem(this.SESSION_TOKEN_KEY);
    if (sessionToken) {
      try {
        const userData = JSON.parse(atob(sessionToken));
        const user = Storage.getUser(userData.id);
        if (user) {
          this.user = user;
          return user;
        }
      } catch (error) {
        console.error('Error parsing session token:', error);
        localStorage.removeItem(this.SESSION_TOKEN_KEY);
      }
    }
    
    return null;
  },
  
  /**
   * Set the current authenticated user and save a session token
   */
  setCurrentUser(user) {
    if (!user) {
      this.user = null;
      localStorage.removeItem(this.SESSION_TOKEN_KEY);
      return;
    }
    
    this.user = user;
    
    // Create a simple session token (in a real app, we'd use JWT)
    const userData = {
      id: user.id,
      username: user.username,
      timestamp: new Date().getTime()
    };
    
    const sessionToken = btoa(JSON.stringify(userData));
    localStorage.setItem(this.SESSION_TOKEN_KEY, sessionToken);
    
    // Update UI for authenticated user
    this.updateAuthUI();
  },
  
  /**
   * Attempt to login a user
   */
  login(username, password) {
    const user = Storage.getUserByUsername(username);
    
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    
    // In a real app, we'd use proper password hashing and comparison
    if (user.password !== password) {
      return { success: false, message: 'Invalid password' };
    }
    
    // Set the current user and update UI
    this.setCurrentUser(user);
    
    return { success: true, user };
  },
  
  /**
   * Register a new user
   */
  register(username, email, password, passwordConfirm) {
    // Validate password match
    if (password !== passwordConfirm) {
      return { success: false, message: 'Passwords do not match' };
    }
    
    // Check if username already exists
    const existingUser = Storage.getUserByUsername(username);
    if (existingUser) {
      return { success: false, message: 'Username already exists' };
    }
    
    // Create the new user
    const user = Storage.createUser({
      username,
      email,
      password, // In a real app, we'd hash the password
      isAdmin: false
    });
    
    // Set the current user and update UI
    this.setCurrentUser(user);
    
    return { success: true, user };
  },
  
  /**
   * Logout the current user
   */
  logout() {
    this.setCurrentUser(null);
    this.updateAuthUI();
    
    // Redirect to home page
    Router.navigate('/');
    
    return { success: true };
  },
  
  /**
   * Update the UI based on authentication state
   */
  updateAuthUI() {
    const user = this.getCurrentUser();
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const userMenu = document.getElementById('userMenu');
    const usernameElement = document.getElementById('username');
    
    if (user) {
      // User is logged in
      if (loginBtn) loginBtn.classList.add('hidden');
      if (signupBtn) signupBtn.classList.add('hidden');
      if (userMenu) userMenu.classList.remove('hidden');
      if (usernameElement) usernameElement.textContent = user.username;
      
      // Update nav menu visibility based on user role
      const createEventLink = document.querySelector('a[href="/create-event"]');
      const dashboardLink = document.querySelector('a[href="/dashboard"]');
      
      if (createEventLink) {
        createEventLink.parentElement.classList.remove('hidden');
      }
      
      if (dashboardLink && user.isAdmin) {
        dashboardLink.parentElement.classList.remove('hidden');
      } else if (dashboardLink) {
        dashboardLink.parentElement.classList.add('hidden');
      }
    } else {
      // User is logged out
      if (loginBtn) loginBtn.classList.remove('hidden');
      if (signupBtn) signupBtn.classList.remove('hidden');
      if (userMenu) userMenu.classList.add('hidden');
      
      // Hide authenticated-only nav links
      const createEventLink = document.querySelector('a[href="/create-event"]');
      const dashboardLink = document.querySelector('a[href="/dashboard"]');
      
      if (createEventLink) {
        createEventLink.parentElement.classList.add('hidden');
      }
      
      if (dashboardLink) {
        dashboardLink.parentElement.classList.add('hidden');
      }
    }
  },
  
  /**
   * Initialize authentication
   */
  init() {
    // Initialize event listeners for auth UI
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const authModal = document.getElementById('authModal');
    const closeModal = document.querySelector('.close-modal');
    const modalTabs = document.querySelectorAll('.modal-tab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Login button click
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        // Show auth modal with login tab active
        authModal.classList.add('show');
        modalTabs[0].classList.add('active');
        modalTabs[1].classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
      });
    }
    
    // Signup button click
    if (signupBtn) {
      signupBtn.addEventListener('click', () => {
        // Show auth modal with register tab active
        authModal.classList.add('show');
        modalTabs[0].classList.remove('active');
        modalTabs[1].classList.add('active');
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
      });
    }
    
    // Logout button click
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.logout();
      });
    }
    
    // Close modal
    if (closeModal) {
      closeModal.addEventListener('click', () => {
        authModal.classList.remove('show');
      });
    }
    
    // Modal tabs
    if (modalTabs.length) {
      modalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const tabName = tab.getAttribute('data-tab');
          
          // Update active tab
          modalTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          
          // Show the correct form
          if (tabName === 'login') {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
          } else {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
          }
        });
      });
    }
    
    // Login form submission
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        const result = this.login(username, password);
        
        if (result.success) {
          authModal.classList.remove('show');
          showToast('Success', 'Logged in successfully', 'success');
        } else {
          showToast('Error', result.message, 'danger');
        }
      });
    }
    
    // Register form submission
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
        
        const result = this.register(username, email, password, passwordConfirm);
        
        if (result.success) {
          authModal.classList.remove('show');
          showToast('Success', 'Registered successfully', 'success');
        } else {
          showToast('Error', result.message, 'danger');
        }
      });
    }
    
    // Check and update UI for current user
    this.updateAuthUI();
  }
};

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
  Auth.init();
});