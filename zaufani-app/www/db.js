// Zaufani Family - User Database System
// localStorage-based with admin rights management

class UserDatabase {
  constructor() {
    this.dbKey = 'zaufani-users';
    this.adminsKey = 'zaufani-admins';
    this.initializeDB();
  }

  initializeDB() {
    // Only initialize if not already done
    if (!localStorage.getItem(this.dbKey)) {
      const defaultUsers = [];
      localStorage.setItem(this.dbKey, JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem(this.adminsKey)) {
      // Create default admin: Maximilien d'Iray
      const admin = {
        id: this.generateId(),
        email: 'maxandiray@gmail.com',
        fullName: 'Maximilien d\'Iray',
        password: this.hashPassword('admin123'), // Should be changed on first login
        role: 'admin',
        createdAt: new Date().toISOString(),
        lastLogin: null,
        profileComplete: 100,
        avatar: '👑',
        city: 'Paris',
        profession: 'Administrateur',
        isActive: true,
        totalDonated: 0,
        hasNoAds: true,
        invitationCode: 'ADMIN-' + Math.random().toString(36).substring(2, 11).toUpperCase()
      };

      const users = JSON.parse(localStorage.getItem(this.dbKey));
      users.push(admin);
      localStorage.setItem(this.dbKey, JSON.stringify(users));
      localStorage.setItem(this.adminsKey, JSON.stringify([admin.email]));
    }
  }

  // ── USER CRUD OPERATIONS ──
  addUser(email, password, fullName, role = 'user') {
    const users = JSON.parse(localStorage.getItem(this.dbKey));

    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = {
      id: this.generateId(),
      email,
      fullName,
      password: this.hashPassword(password),
      role,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      profileComplete: 0,
      avatar: '👤',
      city: '',
      profession: '',
      interests: [],
      isActive: true,
      totalDonated: 0,
      hasNoAds: false,
      sponsorCount: 0,
      sponsors: [],
      invitationCode: 'INV-' + Math.random().toString(36).substring(2, 11).toUpperCase(),
      posts: [],
      donations: []
    };

    users.push(newUser);
    localStorage.setItem(this.dbKey, JSON.stringify(users));
    return { success: true, user: newUser };
  }

  getUser(email) {
    const users = JSON.parse(localStorage.getItem(this.dbKey));
    return users.find(u => u.email === email) || null;
  }

  getUserById(userId) {
    const users = JSON.parse(localStorage.getItem(this.dbKey));
    return users.find(u => u.id === userId) || null;
  }

  getAllUsers() {
    return JSON.parse(localStorage.getItem(this.dbKey));
  }

  updateUser(userId, updates) {
    const users = JSON.parse(localStorage.getItem(this.dbKey));
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    localStorage.setItem(this.dbKey, JSON.stringify(users));
    return { success: true, user: users[userIndex] };
  }

  deleteUser(userId) {
    const users = JSON.parse(localStorage.getItem(this.dbKey));
    const filtered = users.filter(u => u.id !== userId);
    localStorage.setItem(this.dbKey, JSON.stringify(filtered));
    return { success: true };
  }

  authenticateUser(email, password) {
    const user = this.getUser(email);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    if (user.password !== this.hashPassword(password)) {
      return { success: false, error: 'Invalid password' };
    }

    this.updateUser(user.id, { lastLogin: new Date().toISOString() });
    return { success: true, user };
  }

  // ── ADMIN OPERATIONS ──
  isAdmin(email) {
    const admins = JSON.parse(localStorage.getItem(this.adminsKey) || '[]');
    return admins.includes(email);
  }

  promoteToAdmin(email) {
    const admins = JSON.parse(localStorage.getItem(this.adminsKey) || '[]');
    if (!admins.includes(email)) {
      admins.push(email);
      localStorage.setItem(this.adminsKey, JSON.stringify(admins));
      this.updateUser(this.getUser(email).id, { role: 'admin' });
      return { success: true };
    }
    return { success: false, error: 'Already admin' };
  }

  demoteAdmin(email) {
    const admins = JSON.parse(localStorage.getItem(this.adminsKey) || '[]');
    const filtered = admins.filter(a => a !== email);
    localStorage.setItem(this.adminsKey, JSON.stringify(filtered));
    this.updateUser(this.getUser(email).id, { role: 'user' });
    return { success: true };
  }

  getAdminInvitationLink() {
    const baseUrl = window.location.origin + window.location.pathname;
    return baseUrl + '?admin-invite=' + btoa(new Date().getTime().toString());
  }

  // ── DONATION TRACKING ──
  addDonation(email, amount, currency = 'PLN') {
    const user = this.getUser(email);
    if (!user) return { success: false, error: 'User not found' };

    const donation = {
      id: this.generateId(),
      amount,
      currency,
      date: new Date().toISOString(),
      processed: true
    };

    user.donations = user.donations || [];
    user.donations.push(donation);
    user.totalDonated = (user.totalDonated || 0) + amount;

    if (user.totalDonated >= 50) {
      user.hasNoAds = true;
    }

    this.updateUser(user.id, user);
    return { success: true, donation };
  }

  // ── UTILITY FUNCTIONS ──
  generateId() {
    return 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  hashPassword(password) {
    // Simple hash function (use bcrypt in production)
    return btoa(password);
  }

  verifyPassword(password, hash) {
    return btoa(password) === hash;
  }

  // ── STATS ──
  getDatabaseStats() {
    const users = this.getAllUsers();
    const admins = JSON.parse(localStorage.getItem(this.adminsKey) || '[]');
    const totalDonations = users.reduce((sum, u) => sum + (u.totalDonated || 0), 0);

    return {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.isActive).length,
      totalAdmins: admins.length,
      totalDonations,
      avgDonationPerUser: users.length > 0 ? (totalDonations / users.length).toFixed(2) : 0
    };
  }
}

// Initialize global database instance
const userDB = new UserDatabase();
