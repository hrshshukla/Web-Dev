/**
 * Simple client-side router for single page application
 * Handles navigation without full page reloads
 */
const Router = {
  routes: [],
  mode: 'hash', // could be 'history' for HTML5 history API
  root: '/',
  
  /**
   * Configure the router
   */
  config(options) {
    this.mode = options?.mode || 'hash';
    this.root = options?.root || '/';
    return this;
  },
  
  /**
   * Add a new route
   */
  add(path, callback) {
    this.routes.push({ path, callback });
    return this;
  },
  
  /**
   * Remove a route
   */
  remove(path) {
    this.routes = this.routes.filter(route => route.path !== path);
    return this;
  },
  
  /**
   * Clear all routes
   */
  flush() {
    this.routes = [];
    return this;
  },
  
  /**
   * Navigate to a specific path
   */
  navigate(path) {
    if (this.mode === 'history') {
      history.pushState(null, null, this.root + this.clearSlashes(path));
      this.check();
    } else {
      window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
    }
    return this;
  },
  
  /**
   * Get current route path
   */
  getFragment() {
    let fragment = '';
    if (this.mode === 'history') {
      fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
      fragment = fragment.replace(/\\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  },
  
  /**
   * Remove slashes from beginning and end of path
   */
  clearSlashes(path) {
    return path.toString().replace(/^\//, '').replace(/\\/$/, '');
  },
  
  /**
   * Check current route and execute callback
   */
  check() {
    const fragment = this.getFragment();
    
    for (let i = 0; i < this.routes.length; i++) {
      const route = this.routes[i];
      
      // Check for exact path matches
      if (route.path === fragment) {
        route.callback();
        return this;
      }
      
      // Check for parameterized routes (e.g., /event/:id)
      if (route.path.includes(':')) {
        const routeParts = route.path.split('/');
        const fragmentParts = fragment.split('/');
        
        if (routeParts.length === fragmentParts.length) {
          let match = true;
          const params = {};
          
          for (let j = 0; j < routeParts.length; j++) {
            if (routeParts[j].startsWith(':')) {
              const paramName = routeParts[j].slice(1);
              params[paramName] = fragmentParts[j];
            } else if (routeParts[j] !== fragmentParts[j]) {
              match = false;
              break;
            }
          }
          
          if (match) {
            route.callback(params);
            return this;
          }
        }
      }
    }
    
    // If no route matches, check for a default route ('*')
    const defaultRoute = this.routes.find(route => route.path === '*');
    if (defaultRoute) {
      defaultRoute.callback();
    }
    
    return this;
  },
  
  /**
   * Listen for changes in the URL
   */
  listen() {
    const self = this;
    window.clearInterval(this.interval);
    
    this.interval = window.setInterval(() => {
      if (self.current !== self.getFragment()) {
        self.current = self.getFragment();
        self.check();
      }
    }, 50);
    
    // Handle initial page load
    this.current = this.getFragment();
    this.check();
    
    return this;
  },
  
  /**
   * Handle link clicks to use the router instead of page reloads
   */
  handleLinks() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a[data-link]');
      if (target) {
        e.preventDefault();
        this.navigate(target.getAttribute('href'));
      }
    });
    
    return this;
  },
  
  /**
   * Check if a user is authenticated before rendering a route
   */
  checkAuth(callback, redirectPath = '/auth') {
    return () => {
      const user = Auth.getCurrentUser();
      if (user) {
        callback();
      } else {
        this.navigate(redirectPath);
      }
    };
  }
};

// Initialize the router
document.addEventListener('DOMContentLoaded', () => {
  Router.handleLinks();
});