// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navbarLinks = document.getElementById('navbar-links');
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navbarLinks.classList.toggle('active');
      menuIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });
  }
  
  // Enhanced Toast notification system with animations
  window.showToast = (message, type = 'info', duration = 3000) => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Add icon based on toast type
    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'error') iconName = 'alert-circle';
    if (type === 'warning') iconName = 'alert-triangle';
    
    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-icon">
          <i data-lucide="${iconName}"></i>
        </div>
        <div>
          <p class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</p>
          <p>${message}</p>
        </div>
      </div>
      <button class="toast-close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    `;
    
    const closeBtn = toast.querySelector('.toast-close-btn');
    closeBtn.addEventListener('click', () => {
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.remove();
      }, 300);
    });
    
    document.getElementById('toast-container').appendChild(toast);
    lucide.createIcons({ parent: toast }); // Initialize icons in toast
    
    // Auto-dismiss after duration
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
    
    return toast;
  };
  
  // Handle active nav link based on current page
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else if (currentPage === 'home.html' && linkPage === 'home.html') {
      link.classList.add('active');
    }
  });
  
  // Add page transition effects
  document.body.classList.add('animate-fade-in');
  
  // Enhanced animation for elements when they come into view with staggered effect
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .section-header, .content-block, .ngo-card');
    
    elements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        // Add staggered delay based on index
        setTimeout(() => {
          element.classList.add('animate-fade-in');
        }, index * 100); // 100ms stagger
      }
    });
  };
  
  // Initial call and scroll event listener
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
});
