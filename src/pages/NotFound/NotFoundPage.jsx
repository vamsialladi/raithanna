import React from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function NotFoundPage() {
  const { isAuthenticated } = useMarketplace();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f5f8f5] text-slate-800">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(17,63,37,0.1)] text-center border border-green-950/10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-50 text-green-700 text-3xl font-black mb-4">
          🌾
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Page Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The requested page could not be located in the RythuMitra ecosystem.
        </p>
        <Link
          to={isAuthenticated ? '/dashboard' : '/login'}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-700 to-green-800 text-sm font-semibold text-white shadow-sm transition hover:from-green-800 hover:to-green-900"
        >
          {isAuthenticated ? '← Return to Dashboard' : '← Go to Login'}
        </Link>
      </div>
    </div>
  );
}
