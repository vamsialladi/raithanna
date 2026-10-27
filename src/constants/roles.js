/**
 * RythuMitra Role Definitions & Constants
 * Establishes centralized role identifiers and display mappings across the frontend.
 */
export const USER_ROLES = {
  FARMER: 'FARMER',
  LANDLORD_FARMER: 'LANDLORD_FARMER',
  TENANT_FARMER: 'TENANT_FARMER',
  BUYER: 'BUYER',
  SERVICE_PROVIDER: 'SERVICE_PROVIDER',
};

export const ROLE_DEFINITIONS = [
  { id: USER_ROLES.FARMER, label: 'Farmer', icon: '◈' },
  { id: USER_ROLES.LANDLORD_FARMER, label: 'Landlord Farmer', icon: '◈' },
  { id: USER_ROLES.TENANT_FARMER, label: 'Tenant Farmer', icon: '◈' },
  { id: USER_ROLES.BUYER, label: 'Buyer', icon: '🛒' },
  { id: USER_ROLES.SERVICE_PROVIDER, label: 'Service Provider', icon: '♟' },
];

export const ROLE_LABELS = {
  [USER_ROLES.FARMER]: 'Farmer',
  [USER_ROLES.LANDLORD_FARMER]: 'Landlord Farmer',
  [USER_ROLES.TENANT_FARMER]: 'Tenant Farmer',
  [USER_ROLES.BUYER]: 'Buyer',
  [USER_ROLES.SERVICE_PROVIDER]: 'Service Provider',
};

/**
 * Normalizes any string representation of a role into standard USER_ROLES enum.
 */
export function normalizeRole(roleInput) {
  if (!roleInput) return USER_ROLES.TENANT_FARMER;
  const upper = String(roleInput).trim().toUpperCase().replace(/[\s-]+/g, '_');
  if (upper === 'TENANT_FARMER' || upper === 'TENANT') return USER_ROLES.TENANT_FARMER;
  if (upper === 'LANDLORD_FARMER' || upper === 'LANDLORD') return USER_ROLES.LANDLORD_FARMER;
  if (upper === 'BUYER') return USER_ROLES.BUYER;
  if (upper === 'SERVICE_PROVIDER' || upper === 'SERVICE') return USER_ROLES.SERVICE_PROVIDER;
  if (upper === 'FARMER') return USER_ROLES.FARMER;
  return USER_ROLES.TENANT_FARMER;
}
