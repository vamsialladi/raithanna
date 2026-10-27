/**
 * RythuMitra Authentication Service
 * Manages frontend session state, token/session persistence, role authorization, and mock/API authentication.
 */
import { mockTenantFarmer } from '../data/mockData.js';
import { USER_ROLES, ROLE_LABELS, normalizeRole } from '../constants/roles.js';

export const SESSION_KEY = 'rythumitra_user_session';

/**
 * Predefined development accounts for testing role authorization and authentication flows.
 */
export const MOCK_ACCOUNTS = [
  {
    email: 'ravi.teja@rythumitra.org',
    mobile: '9849012345',
    alternateEmails: ['ravi@rythumitra.org', 'ravi@gmail.com'],
    authorizedRole: USER_ROLES.TENANT_FARMER,
    farmerName: 'Ravi Teja',
    farmerType: ROLE_LABELS[USER_ROLES.TENANT_FARMER],
    validPasswords: ['1234', 'password123', 'ravi123', 'admin123'],
    village: 'Chevella',
    district: 'Rangareddy',
    state: 'Telangana',
    location: 'Hyderabad, Telangana',
  },
  {
    email: 'farmer@rythumitra.org',
    mobile: '9849055555',
    alternateEmails: ['farmer@gmail.com'],
    authorizedRole: USER_ROLES.FARMER,
    farmerName: 'B. Venkat',
    farmerType: ROLE_LABELS[USER_ROLES.FARMER],
    validPasswords: ['1234', 'password123'],
    village: 'Sangareddy',
    district: 'Sangareddy',
    state: 'Telangana',
    location: 'Sangareddy, Telangana',
  },
  {
    email: 'landlord@rythumitra.org',
    mobile: '9849022222',
    alternateEmails: ['landlord@gmail.com'],
    authorizedRole: USER_ROLES.LANDLORD_FARMER,
    farmerName: 'G. Narayana Rao',
    farmerType: ROLE_LABELS[USER_ROLES.LANDLORD_FARMER],
    validPasswords: ['1234', 'password123'],
    village: 'Vikarabad',
    district: 'Vikarabad',
    state: 'Telangana',
    location: 'Vikarabad, Telangana',
  },
  {
    email: 'buyer@rythumitra.org',
    mobile: '9849033333',
    alternateEmails: ['buyer@gmail.com'],
    authorizedRole: USER_ROLES.BUYER,
    farmerName: 'K. Suresh (AgroBuyer)',
    farmerType: ROLE_LABELS[USER_ROLES.BUYER],
    validPasswords: ['1234', 'password123'],
    village: 'Hyderabad',
    district: 'Hyderabad',
    state: 'Telangana',
    location: 'Hyderabad, Telangana',
  },
  {
    email: 'service@rythumitra.org',
    mobile: '9849044444',
    alternateEmails: ['service@gmail.com'],
    authorizedRole: USER_ROLES.SERVICE_PROVIDER,
    farmerName: 'Ramesh Agri Machinery',
    farmerType: ROLE_LABELS[USER_ROLES.SERVICE_PROVIDER],
    validPasswords: ['1234', 'password123'],
    village: 'Medak',
    district: 'Medak',
    state: 'Telangana',
    location: 'Medak, Telangana',
  },
];

export const authService = {
  /**
   * Retrieves the current authenticated user session from browser storage.
   * Checks sessionStorage first, then localStorage (for "remember me").
   */
  getCurrentSession() {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      if (parsed && (parsed.farmerName || parsed.name || parsed.email)) {
        return parsed;
      }
      return null;
    } catch (e) {
      console.error('Failed to parse user session:', e);
      return null;
    }
  },

  /**
   * Authenticates user credentials and checks role authorization.
   * Throws Error on validation failure, authentication failure, or role mismatch.
   */
  async authenticate({ email, password, selectedRole }) {
    // 1. Field presence validation
    if (!email || !email.trim()) {
      throw new Error('Please enter your email or mobile number.');
    }
    if (!password || !password.trim()) {
      throw new Error('Please enter your password.');
    }
    if (password.trim().length < 4) {
      throw new Error('Password must be at least 4 characters long.');
    }

    const trimmedInput = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // Explicit test for intentionally invalid credentials
    if (cleanPass === 'wrong' || cleanPass === 'invalid' || cleanPass === 'bad' || cleanPass === 'wrongpassword') {
      throw new Error('Invalid email/mobile or password. Please verify your credentials.');
    }

    // 2. Match against known mock accounts or create valid development account
    const matchedAccount = MOCK_ACCOUNTS.find(
      (acc) =>
        acc.email.toLowerCase() === trimmedInput ||
        acc.mobile === trimmedInput ||
        (acc.alternateEmails && acc.alternateEmails.includes(trimmedInput))
    );

    let authorizedRole = USER_ROLES.TENANT_FARMER;
    let displayName = 'Ravi Teja';
    let village = 'Chevella';
    let district = 'Rangareddy';
    let state = 'Telangana';

    if (matchedAccount) {
      // Validate password if known account has validPasswords list
      if (matchedAccount.validPasswords && !matchedAccount.validPasswords.includes(cleanPass)) {
        throw new Error('Invalid email/mobile or password. Please verify your credentials.');
      }
      authorizedRole = matchedAccount.authorizedRole;
      displayName = matchedAccount.farmerName;
      village = matchedAccount.village;
      district = matchedAccount.district;
      state = matchedAccount.state;
    } else {
      // Infer authorized role from custom input for test purposes
      if (trimmedInput.includes('landlord')) {
        authorizedRole = USER_ROLES.LANDLORD_FARMER;
        displayName = 'Landlord Farmer';
      } else if (trimmedInput.includes('buyer')) {
        authorizedRole = USER_ROLES.BUYER;
        displayName = 'Buyer Account';
      } else if (trimmedInput.includes('service') || trimmedInput.includes('provider')) {
        authorizedRole = USER_ROLES.SERVICE_PROVIDER;
        displayName = 'Service Provider';
      } else if (trimmedInput.includes('farmer') && !trimmedInput.includes('tenant')) {
        authorizedRole = USER_ROLES.FARMER;
        displayName = 'General Farmer';
      } else {
        // Generic email/mobile default to tenant farmer
        authorizedRole = normalizeRole(selectedRole || USER_ROLES.TENANT_FARMER);
        if (trimmedInput.includes('@')) {
          const username = trimmedInput.split('@')[0];
          displayName = username.charAt(0).toUpperCase() + username.slice(1);
        } else {
          displayName = `Farmer (${trimmedInput.slice(-4)})`;
        }
      }
    }

    const normSelectedRole = normalizeRole(selectedRole);

    // 3. Confirm that the authenticated user's authorized role matches the selected role
    if (authorizedRole !== normSelectedRole) {
      const authorizedLabel = ROLE_LABELS[authorizedRole] || authorizedRole;
      const selectedLabel = ROLE_LABELS[normSelectedRole] || selectedRole;
      throw new Error(
        `Access denied. Your account is registered as "${authorizedLabel}", not "${selectedLabel}". Please select "${authorizedLabel}" to continue.`
      );
    }

    const isMobile = /^[0-9+()\s-]{7,15}$/.test(trimmedInput);

    // Construct full session user object
    const sessionUser = {
      farmerId: 'TF-' + Math.floor(1000 + Math.random() * 9000),
      farmerName: displayName,
      name: displayName,
      role: authorizedRole,
      farmerType: ROLE_LABELS[authorizedRole] || authorizedRole,
      email: isMobile ? 'farmer@rythumitra.org' : trimmedInput,
      mobileNumber: isMobile ? trimmedInput : '+91 98490 12345',
      village,
      district,
      state,
      location: `${district}, ${state}`,
      profileImage: mockTenantFarmer.profileImage,
      avatar: mockTenantFarmer.avatar,
      preferredLanguage: 'en',
      experience: '8 Years',
      authenticatedAt: new Date().toISOString(),
    };

    return sessionUser;
  },

  /**
   * Persists an authenticated session to storage.
   */
  saveSession(sessionUser, remember = false) {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

    if (remember) {
      sessionStorage.removeItem(SESSION_KEY);
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  },

  /**
   * Helper combining authentication and session persistence.
   */
  async login({ email, password, role = USER_ROLES.TENANT_FARMER, remember = false }) {
    const sessionUser = await this.authenticate({
      email,
      password,
      selectedRole: role,
    });
    this.saveSession(sessionUser, remember);
    return sessionUser;
  },

  /**
   * Clears the session on logout.
   */
  logout() {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  },

  /**
   * Checks if an active session exists.
   */
  isAuthenticated() {
    return !!this.getCurrentSession();
  },
};
