import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { USER_ROLES, normalizeRole } from '../../constants/roles';

/**
 * Route protection wrapper.
 * Enforces session authentication and role authorization:
 * - If unauthenticated: redirects to /login.
 * - If authenticated user does not have the required role: denies access and redirects safely to /login.
 * - If authenticated and authorized: renders the child dashboard component.
 */
export default function ProtectedRoute({ children, requiredRole = USER_ROLES.TENANT_FARMER }) {
  const { isAuthenticated, user } = useMarketplace();
  const location = useLocation();

  // 1. Check if user is authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Check if user is authorized for the required role
  const userRole = normalizeRole(user.role || user.farmerType);
  if (userRole !== requiredRole) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          roleError: 'Access denied. You do not have permission to view the Tenant Farmer Dashboard with your current role. Please log in as a Tenant Farmer.',
        }}
        replace
      />
    );
  }

  return children;
}
