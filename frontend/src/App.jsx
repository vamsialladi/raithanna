
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import LandingPage from "./assets/pages/landingpage.jsx";
import Footer from "./assets/pages/footer.jsx";
import AuthPage from "./assets/pages/authpage.jsx";
import Navbar from "./assets/pages/navbar.jsx";
import FarmerProject from "./assets/pages/farmerproject.jsx";
import Landlord from "./assets/pages/landlord.jsx";
import ServiceProvider from "./ServiceProvider.jsx";


// Tenant dashboard
//import TenantFarmerDashboard from "./TenantFarmerDashboard.jsx";

// Content pages
const pages = {
  "/services": {
    title: "Services",
    description:
      "Practical resources to help you make informed decisions throughout the growing season.",
    cards: [
      [
        "Crop guidance",
        "Find support for crop planning and day-to-day farming decisions.",
      ],
      [
        "Soil health",
        "Learn about soil care and responsible input use for your farm.",
      ],
      [
        "Market access",
        "Explore ways to connect your produce with local markets.",
      ],
    ],
  },

  "/schemes": {
    title: "Schemes",
    description:
      "Explore information and guidance about agricultural support programs.",
    cards: [
      [
        "Support programs",
        "Find information about available farming support.",
      ],
      [
        "Eligibility guidance",
        "Understand the criteria to review before applying.",
      ],
      [
        "Application help",
        "Prepare the information and documents an application may require.",
      ],
    ],
  },

  "/contact": {
    title: "Contact",
    description:
      "Have a question or need help finding the right farming resource? We are here to help.",
    cards: [
      [
        "Farmer support",
        "Get guidance on using Raithanna services and resources.",
      ],
      [
        "Share feedback",
        "Let us know how we can make the platform more useful.",
      ],
      [
        "Stay connected",
        "More contact options will be shared here soon.",
      ],
    ],
  },
};

// Reusable content page
function ContentPage({ page }) {
  return (
    <main className="mx-auto min-h-[calc(100vh-76px)] w-full max-w-[1200px] px-6 py-16 max-[760px]:min-h-[calc(100vh-110px)] max-[760px]:py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#39895b]">
        Raithanna
      </p>

      <h1 className="mt-2 text-4xl font-bold text-[#183b27]">
        {page.title}
      </h1>

      <p className="mt-4 max-w-2xl text-lg leading-7 text-[#5b6b5f]">
        {page.description}
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {page.cards.map(([title, description]) => (
          <article
            className="rounded-xl border border-[#e1e9e2] bg-white p-6 shadow-sm"
            key={title}
          >
            <h2 className="text-xl font-semibold text-[#214b32]">
              {title}
            </h2>

            <p className="mt-3 leading-6 text-[#5b6b5f]">
              {description}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}

// Main App
function App() {
  const location = useLocation();

  const activePage =
    location.pathname.replace(/\/+$/, "") || "/";

  const page = pages[activePage];

  const isAuthPage = [
    "/auth",
    "/login",
    "/register",
  ].includes(activePage);

  const isFarmerProjectPage =
    activePage === "/farmerproject";

  // Role-based dashboard routes
  const rolePages = {
    "/landlord": <Landlord />,
    //"/tenantfarmer": <TenantFarmerDashboard />,
    "/serviceprovider": <ServiceProvider />,
  };

  const isRolePage = Boolean(rolePages[activePage]);

  return (
    <div className="min-h-screen min-w-[320px] bg-white pt-[76px] font-sans text-[#26352a] antialiased max-[760px]:pt-[110px]">
      <Navbar
        activePage={
          page || isFarmerProjectPage || isRolePage
            ? activePage
            : "/"
        }
      />

      {isAuthPage ? (
        <AuthPage />
      ) : isFarmerProjectPage ? (
        <FarmerProject />
      ) : isRolePage ? (
        rolePages[activePage]
      ) : page ? (
        <ContentPage page={page} />
      ) : (
        <LandingPage />
      )}

      {!isAuthPage &&
        !isRolePage &&
        !isFarmerProjectPage && <Footer />}
    </div>
  );
}

export default App;
