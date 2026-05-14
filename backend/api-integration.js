/**
 * STONE TECH SOLUTIONS — Frontend API Integration
 * Connects all frontend forms and features to the production backend
 */

const API_BASE_URL = 'http://localhost:4000/api/v1';

// =============================================================================
// API Service
// =============================================================================

const apiService = {
  submitContact: async (data) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to submit contact form');
    return response.json();
  },

  submitGetStarted: async (data) => {
    const response = await fetch(`${API_BASE_URL}/get-started`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to submit get started request');
    return response.json();
  },

  aiChat: async (message, sessionId) => {
    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId })
    });
    if (!response.ok) throw new Error('Failed to get AI response');
    return response.json();
  },

  register: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  },

  login: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  getDashboard: async (token) => {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch dashboard');
    return response.json();
  }
};

// =============================================================================
// Auth Management
// =============================================================================

const authManager = {
  getToken: () => localStorage.getItem('jwtToken'),
  setToken: (token) => localStorage.setItem('jwtToken', token),
  clearToken: () => localStorage.removeItem('jwtToken'),
  isLoggedIn: () => !!localStorage.getItem('jwtToken'),
  getUser: () => JSON.parse(localStorage.getItem('currentUser') || '{}'),
  setUser: (user) => localStorage.setItem('currentUser', JSON.stringify(user)),
  logout: () => {
    authManager.clearToken();
    localStorage.removeItem('currentUser');
    updateAuthUI();
  }
};

function updateAuthUI() {
  const signInBtn = document.getElementById('signInBtn');
  const isLoggedIn = authManager.isLoggedIn();

  if (isLoggedIn) {
    const user = authManager.getUser();
    signInBtn.textContent = `${user.fullName || 'Account'}`;
    signInBtn.onclick = () => showAccountMenu();
  } else {
    signInBtn.textContent = 'Sign In';
    signInBtn.onclick = () => openAuthModal('login');
  }
}

function showAccountMenu() {
  const user = authManager.getUser();
  const isAdmin = user.role === 'admin';

  const menuHTML = `
    <div style="position: fixed; top: 80px; right: 20px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 1000; min-width: 200px;">
      <div style="padding: 12px 16px; border-bottom: 1px solid #eee; font-weight: 600;">${user.fullName}</div>
      <div style="padding: 12px 16px; font-size: 0.9rem; color: #666;">${user.email}</div>
      ${isAdmin ? `<button onclick="location.href='/admin-dashboard.html'" style="width: 100%; text-align: left; border: none; background: none; padding: 12px 16px; cursor: pointer; border-top: 1px solid #eee;">📊 Admin Dashboard</button>` : ''}
      <button onclick="authManager.logout()" style="width: 100%; text-align: left; border: none; background: none; padding: 12px 16px; cursor: pointer; border-top: 1px solid #eee; color: #d32f2f;">Logout</button>
    </div>
  `;

  const existing = document.querySelector('[id="accountMenu"]');
  if (existing) existing.remove();

  const menu = document.createElement('div');
  menu.id = 'accountMenu';
  menu.innerHTML = menuHTML;
  document.body.appendChild(menu);

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#signInBtn') && !e.target.closest('#accountMenu')) {
      menu.remove();
    }
  });
}

// =============================================================================
// Modal Management
// =============================================================================

function createModal(id, title, content) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = id;
  modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000;';

  modal.innerHTML = `
    <div style="background: white; border-radius: 12px; padding: 32px; max-width: 500px; width: 90%; max-height: 90vh; overflow-y: auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <h2 style="margin: 0; font-size: 1.5rem;">${title}</h2>
        <button onclick="document.getElementById('${id}').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
      </div>
      ${content}
    </div>
  `;

  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  return modal;
}

function openAuthModal(type) {
  const isLogin = type === 'login';
  const title = isLogin ? 'Sign In' : 'Create Account';

  const content = `
    <form id="authForm" style="display: flex; flex-direction: column; gap: 16px;">
      ${!isLogin ? `
        <input type="text" id="fullName" placeholder="Full Name" required style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
      ` : ''}
      <input type="email" id="authEmail" placeholder="Email Address" required style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
      <input type="password" id="authPassword" placeholder="Password" required style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
      ${!isLogin ? `
        <small style="color: #666;">Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.</small>
      ` : ''}
      <button type="submit" class="btn-primary" style="width: 100%; padding: 12px;">
        ${isLogin ? 'Sign In' : 'Create Account'}
      </button>
    </form>
    <div style="text-align: center; margin-top: 16px;">
      ${isLogin ? `
        <p>Don't have an account? <button onclick="document.getElementById('authModal').remove(); openAuthModal('register')" style="background: none; border: none; color: #00ff88; cursor: pointer; font-weight: 600;">Sign Up</button></p>
      ` : `
        <p>Already have an account? <button onclick="document.getElementById('authModal').remove(); openAuthModal('login')" style="background: none; border: none; color: #00ff88; cursor: pointer; font-weight: 600;">Sign In</button></p>
      `}
    </div>
  `;

  createModal('authModal', title, content);

  const form = document.getElementById('authForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;

    if (isLogin) {
      try {
        const result = await apiService.login({ email, password });
        authManager.setToken(result.data.token);
        authManager.setUser(result.data.user);
        updateAuthUI();
        showToast('✅ Logged in successfully!', 'success');
        document.getElementById('authModal').remove();
      } catch (error) {
        showToast('❌ ' + (error.message || 'Login failed'), 'error');
      }
    } else {
      const fullName = document.getElementById('fullName').value;
      try {
        const result = await apiService.register({ fullName, email, password });
        authManager.setToken(result.data.token);
        authManager.setUser(result.data.user);
        updateAuthUI();
        showToast('✅ Account created successfully!', 'success');
        document.getElementById('authModal').remove();
      } catch (error) {
        showToast('❌ ' + (error.message || 'Registration failed'), 'error');
      }
    }
  });
}

function openGetStartedModal() {
  const content = `
    <form id="getStartedForm" style="display: flex; flex-direction: column; gap: 14px;">
      <input type="text" id="gsFullName" placeholder="Full Name" required style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
      <input type="email" id="gsEmail" placeholder="Email" required style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
      <input type="text" id="gsCompany" placeholder="Company Name (optional)" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
      <select id="gsService" required style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        <option value="">Select Service</option>
        <option value="web-development">Web Development</option>
        <option value="software-installation">Software Installation</option>
        <option value="it-support">IT Support</option>
        <option value="consulting">Consulting</option>
        <option value="ai-assistant">AI Assistant</option>
        <option value="other">Other</option>
      </select>
      <textarea id="gsDescription" placeholder="Project Description (min 20 characters)" required style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; min-height: 80px; resize: vertical;"></textarea>
      <select id="gsBudget" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        <option value="not-sure">Budget</option>
        <option value="under-5k">Under $5k</option>
        <option value="5k-15k">$5k - $15k</option>
        <option value="15k-50k">$15k - $50k</option>
        <option value="50k+">$50k+</option>
      </select>
      <select id="gsTimeline" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        <option value="flexible">Timeline</option>
        <option value="immediate">Immediate</option>
        <option value="1-month">1 Month</option>
        <option value="1-3-months">1-3 Months</option>
        <option value="3-6-months">3-6 Months</option>
      </select>
      <button type="submit" class="btn-primary" style="width: 100%; padding: 12px;">Submit Request</button>
    </form>
  `;

  createModal('getStartedModal', 'Get Started', content);

  const form = document.getElementById('getStartedForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('gsFullName').value;
    const email = document.getElementById('gsEmail').value;
    const companyName = document.getElementById('gsCompany').value;
    const serviceInterestedIn = document.getElementById('gsService').value;
    const projectDescription = document.getElementById('gsDescription').value;
    const budget = document.getElementById('gsBudget').value;
    const timeline = document.getElementById('gsTimeline').value;

    if (projectDescription.length < 20) {
      showToast('❌ Project description must be at least 20 characters', 'error');
      return;
    }

    try {
      await apiService.submitGetStarted({
        fullName, email, companyName, serviceInterestedIn, projectDescription, budget, timeline
      });
      showToast('✅ Request submitted successfully! We\'ll contact you soon.', 'success');
      document.getElementById('getStartedModal').remove();
      form.reset();
    } catch (error) {
      showToast('❌ ' + (error.message || 'Failed to submit request'), 'error');
    }
  });
}

// =============================================================================
// Initialize on DOM Ready
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();

  const signInBtn = document.getElementById('signInBtn');
  if (signInBtn) {
    signInBtn.addEventListener('click', () => {
      if (!authManager.isLoggedIn()) {
        openAuthModal('login');
      }
    });
  }

  const getStartedNavBtn = document.getElementById('getStartedNavBtn');
  if (getStartedNavBtn) {
    getStartedNavBtn.addEventListener('click', openGetStartedModal);
  }

  const getStartedBtns = document.querySelectorAll('[data-action="get-started"]');
  getStartedBtns.forEach(btn => {
    btn.addEventListener('click', openGetStartedModal);
  });

  const heroCtaBtn = document.getElementById('heroCtaBtn');
  if (heroCtaBtn) {
    heroCtaBtn.addEventListener('click', openGetStartedModal);
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const fullName = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      const subject = 'Website Contact Form';

      if (!fullName || !email || !message) {
        showToast('❌ Please fill in all required fields.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showToast('❌ Please enter a valid email address.', 'error');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn?.innerHTML || '';

      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
      }

      try {
        await apiService.submitContact({ fullName, email, subject, message });
        showToast('✅ Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
        contactForm.reset();
      } catch (error) {
        showToast('❌ ' + (error.message || 'Failed to send message'), 'error');
      } finally {
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      }
    });
  }

  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');

  if (chatInput && chatSend) {
    let currentSessionId = null;

    async function sendChatMessage() {
      const message = chatInput.value.trim();
      if (!message) return;

      addMessage(message, 'user');
      chatInput.value = '';

      try {
        const result = await apiService.aiChat(message, currentSessionId);
        currentSessionId = result.data.sessionId;
        addMessage(result.data.reply, 'bot');
      } catch (error) {
        addMessage('Sorry, I couldn\'t process that. Please try again.', 'bot');
      }
    }

    chatSend.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }
});
