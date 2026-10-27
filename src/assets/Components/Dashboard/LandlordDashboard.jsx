import { useState } from 'react'
import {
  LayoutDashboard,
  MapPin,
  Users,
  FileText,
  Sprout,
  BarChart3,
  CreditCard,
  MessageSquare,
  Bell,
  Settings,
  Search,
  ChevronDown,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  Maximize2,
  Layers,
  X,
  LogOut,
  BadgeCheck,
} from './Icons.jsx'
import { useTranslation } from '../../../context/LanguageContext.jsx'

export default function LandlordDashboard({ user, onLogout }) {
  const { t, language, setLanguage, availableLanguages } = useTranslation()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('Hyderabad, Telangana')
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showAddParcelModal, setShowAddParcelModal] = useState(false)
  const [selectedTenantDetails, setSelectedTenantDetails] = useState(null)
  const [timeRange, setTimeRange] = useState('Last 6 Months')
  const [showTimeRangeDropdown, setShowTimeRangeDropdown] = useState(false)
  const [selectedSeason, setSelectedSeason] = useState('This Season')
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  // Message chat drawer state
  const [selectedChatTenant, setSelectedChatTenant] = useState('Suresh Kumar')
  const [chatMessages, setChatMessages] = useState({
    'Suresh Kumar': [
      { sender: 'Suresh Kumar', text: 'Namaste Ramu garu, have you reviewed my Kaulu proposal for North Field?', time: '10:15 AM' },
      { sender: 'You', text: 'Namaste Suresh. Yes, reviewing your soil preparation and crop plan.', time: '10:22 AM' },
      { sender: 'Suresh Kumar', text: 'I have arranged certified BPT-5204 seeds and drip lines ready for installation.', time: '10:30 AM' },
    ],
    'Lakshmi Devi': [
      { sender: 'Lakshmi Devi', text: 'Good morning sir, advance payment for East Field has been deposited via NEFT.', time: 'Yesterday' },
      { sender: 'You', text: 'Received Lakshmi garu. Receipt generated in the portal.', time: 'Yesterday' },
    ],
    'Ravi Teja': [
      { sender: 'Ravi Teja', text: 'Namaste Ramu garu, I am interested in leasing West Field for Cotton cultivation.', time: '2 days ago' },
      { sender: 'You', text: 'Namaste Ravi Teja. I received your request. Checking soil test report.', time: '2 days ago' },
    ],
  })
  const [inputMsg, setInputMsg] = useState('')

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // 1. Land Parcels Data
  const [parcels, setParcels] = useState([
    {
      id: 1,
      name: 'North Field',
      area: '2.5 Acres',
      crop: 'Paddy',
      soilType: 'Black Clay Loam',
      waterSource: 'Borewell 2.5" with Solar Pump',
      location: 'Hyderabad, Telangana',
      status: 'Rented',
      statusColor: 'bg-[#e8f5e9] text-[#1b7f45] border border-[#c8e6c9]',
      image: '/crop-paddy.jpg',
      surveyNo: 'SY-104/A',
      annualRent: '₹ 62,500',
      tenant: 'Suresh Kumar',
    },
    {
      id: 2,
      name: 'East Field',
      area: '1.8 Acres',
      crop: 'Maize',
      soilType: 'Red Sandy Loam',
      waterSource: 'Canal Irrigation',
      location: 'Sangareddy, Telangana',
      status: 'Rented',
      statusColor: 'bg-[#e8f5e9] text-[#1b7f45] border border-[#c8e6c9]',
      image: '/crop-maize.jpg',
      surveyNo: 'SY-88/B',
      annualRent: '₹ 45,000',
      tenant: 'Lakshmi Devi',
    },
    {
      id: 3,
      name: 'West Field',
      area: '3.0 Acres',
      crop: 'Cotton',
      soilType: 'Deep Black Cotton',
      waterSource: 'Open Well',
      location: 'Vikarabad, Telangana',
      status: 'Available',
      statusColor: 'bg-[#e8f5e9] text-[#2e7d32] border border-[#c8e6c9]',
      image: '/crop-cotton.jpg',
      surveyNo: 'SY-201/C',
      annualRent: '₹ 75,000',
      tenant: 'Available for Kaulu',
    },
    {
      id: 4,
      name: 'South Field',
      area: '2.2 Acres',
      crop: 'Groundnut',
      soilType: 'Chalka Red Soil',
      waterSource: 'Sprinkler Network',
      location: 'Medak, Telangana',
      status: 'Pending',
      statusColor: 'bg-[#fff3e0] text-[#e65100] border border-[#ffe0b2]',
      image: '/cover-banner.jpg',
      surveyNo: 'SY-45/D',
      annualRent: '₹ 55,000',
      tenant: 'Ravi Teja (Reviewing)',
    },
  ])

  // 2. Tenant Requests Data
  const [tenantRequests, setTenantRequests] = useState([
    {
      id: 1,
      name: 'Suresh Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      acres: '2.5 Acres',
      parcelName: 'North Field',
      crop: 'Paddy',
      duration: '6 months',
      timeAgo: 'Applied 2 days ago',
      offeredRent: '₹ 62,500 / yr',
      status: 'pending',
      experience: '12 Years Experience in Paddy cultivation',
      phone: '+91 98480 23145',
      rating: '⭐ 4.9 (18 Verified Leases)',
    },
    {
      id: 2,
      name: 'Lakshmi Devi',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      acres: '1.8 Acres',
      parcelName: 'East Field',
      crop: 'Maize',
      duration: '1 year',
      timeAgo: 'Applied 3 days ago',
      offeredRent: '₹ 45,000 / yr',
      status: 'pending',
      experience: '8 Years Organic Certified farming',
      phone: '+91 94401 88923',
      rating: '⭐ 4.8 (9 Verified Leases)',
    },
    {
      id: 3,
      name: 'Ravi Teja',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      acres: '3.0 Acres',
      parcelName: 'West Field',
      crop: 'Cotton',
      duration: '1 year',
      timeAgo: 'Applied 4 days ago',
      offeredRent: '₹ 75,000 / yr',
      status: 'pending',
      experience: '15 Years Cotton and Pulses specialist',
      phone: '+91 99890 55120',
      rating: '⭐ 4.7 (14 Verified Leases)',
    },
  ])

  // 3. Leases Data
  const leases = [
    {
      id: 'RAI-KAULU-2026-08',
      parcel: 'North Field (2.5 Ac)',
      tenant: 'Suresh Kumar',
      period: '01 Jun 2026 – 31 May 2027',
      rent: '₹ 62,500',
      paid: '₹ 31,250 (50% Advance)',
      status: 'Active',
      statusBadge: 'bg-[#e8f5e9] text-[#1b7f45]',
    },
    {
      id: 'RAI-KAULU-2025-42',
      parcel: 'East Field (1.8 Ac)',
      tenant: 'Lakshmi Devi',
      period: '15 Jul 2025 – 14 Jul 2026',
      rent: '₹ 45,000',
      paid: '₹ 45,000 (Fully Paid)',
      status: 'Active',
      statusBadge: 'bg-[#e8f5e9] text-[#1b7f45]',
    },
  ]

  // Form State for Adding New Parcel
  const [newParcel, setNewParcel] = useState({
    name: '',
    area: '',
    crop: '',
    soilType: 'Black Clay Loam',
    waterSource: 'Borewell with Solar Pump',
    location: 'Hyderabad, Telangana',
    surveyNo: '',
    annualRent: '',
    status: 'Available',
  })

  const handleAddParcel = (e) => {
    e.preventDefault()
    if (!newParcel.name || !newParcel.area) return

    const parcelToAdd = {
      id: Date.now(),
      name: newParcel.name,
      area: `${newParcel.area} Acres`,
      crop: newParcel.crop || 'Paddy',
      soilType: newParcel.soilType,
      waterSource: newParcel.waterSource,
      location: newParcel.location,
      status: newParcel.status,
      statusColor: newParcel.status === 'Available' ? 'bg-[#e8f5e9] text-[#2e7d32] border border-[#c8e6c9]' : 'bg-[#e8f5e9] text-[#1b7f45] border border-[#c8e6c9]',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      surveyNo: newParcel.surveyNo || 'SY-118/G',
      annualRent: newParcel.annualRent ? `₹ ${newParcel.annualRent}` : '₹ 50,000',
      tenant: 'None',
    }

    setParcels([parcelToAdd, ...parcels])
    setNewParcel({
      name: '',
      area: '',
      crop: '',
      soilType: 'Black Clay Loam',
      waterSource: 'Borewell with Solar Pump',
      location: 'Hyderabad, Telangana',
      surveyNo: '',
      annualRent: '',
      status: 'Available',
    })
    setShowAddParcelModal(false)
    showToast(`Parcel "${parcelToAdd.name}" added successfully!`)
  }

  const handleAcceptTenant = (id, name) => {
    const targetReq = tenantRequests.find((tr) => tr.id === id)
    setTenantRequests(tenantRequests.map((tr) => (tr.id === id ? { ...tr, status: 'accepted' } : tr)))
    if (targetReq) {
      setParcels((prev) =>
        prev.map((p) =>
          p.name === targetReq.parcelName
            ? {
                ...p,
                status: 'Rented',
                statusColor: 'bg-[#e8f5e9] text-[#1b7f45] border border-[#c8e6c9]',
                tenant: name,
              }
            : p
        )
      )
    }
    showToast(`Tenant request from ${name} accepted! Digital lease prepared.`)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputMsg.trim()) return
    const cur = chatMessages[selectedChatTenant] || []
    const sentText = inputMsg
    setChatMessages((prev) => ({
      ...prev,
      [selectedChatTenant]: [...cur, { sender: 'You', text: sentText, time: 'Just now' }],
    }))
    setInputMsg('')

    // Realistic auto-reply from tenant
    setTimeout(() => {
      setChatMessages((prev) => ({
        ...prev,
        [selectedChatTenant]: [
          ...(prev[selectedChatTenant] || []),
          {
            sender: selectedChatTenant,
            text: `Dhanyavadalu Ramu garu! Noted, will update you on the field work and irrigation.`,
            time: 'Just now',
          },
        ],
      }))
    }, 900)
  }

  const filteredParcels = parcels.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.surveyNo.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeTenantsCount = 3 + tenantRequests.filter((tr) => tr.status === 'accepted').length
  const pendingRequestsCount = tenantRequests.filter((tr) => tr.status === 'pending').length

  const navigationItems = [
    { id: 'dashboard', label: t('dashNavDashboard'), icon: LayoutDashboard },
    { id: 'parcels', label: t('dashNavParcels'), icon: MapPin },
    { id: 'requests', label: t('dashNavRequests'), icon: Users, badge: pendingRequestsCount },
    { id: 'leases', label: t('dashNavLeases'), icon: FileText },
    { id: 'crops', label: t('dashNavCrops'), icon: Sprout },
    { id: 'reports', label: t('dashNavReports'), icon: BarChart3 },
    { id: 'payments', label: t('dashNavPayments'), icon: CreditCard },
    { id: 'messages', label: t('dashNavMessages'), icon: MessageSquare, badge: 2 },
    { id: 'notifications', label: t('dashNavNotifications'), icon: Bell, badge: 5 },
    { id: 'settings', label: t('dashNavSettings'), icon: Settings },
  ]

  return (
    <div className="min-h-screen w-full bg-[#f4f7f4] text-[#1e293b] font-sans flex antialiased">
      {/* TOAST ALERT */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-[#0c3b24] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold animate-bounce border border-emerald-500/30">
          <CheckCircle2 className="h-4 w-4 text-[#4ade80]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. LEFT SIDEBAR */}
      <aside className="w-[250px] bg-white border-r border-[#e2e8e2] flex flex-col justify-between shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Logo Header */}
          <div
            className="px-5 py-4 flex items-center gap-3 cursor-pointer"
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="h-9 w-9 rounded-xl bg-[#2e7d32] flex items-center justify-center text-white shadow-sm">
              <Sprout className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[19px] font-bold tracking-tight text-[#1b5e20] leading-none block font-serif">
                Raithanna
              </span>
              <p className="text-[9px] text-[#64748b] font-medium tracking-tight mt-0.5">
                Farmers · Markets · Better Tomorrow
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="px-3 py-2 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition ${
                    isActive
                      ? 'bg-[#1b7f45] text-white shadow-sm font-semibold'
                      : 'text-[#475569] hover:bg-[#f1f6f1] hover:text-[#1b5e20]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-[#64748b]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                        isActive ? 'bg-white text-[#1b7f45]' : 'bg-[#ef4444] text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Promo Card & Logout */}
        <div className="p-3.5 space-y-2.5">
          <div className="relative overflow-hidden rounded-2xl bg-[#eaf4ea] border border-[#d0e5d0] shadow-sm">
            <div className="relative h-24 w-full overflow-hidden bg-emerald-100">
              <img
                src="/promo-card.jpg"
                alt="Agricultural landscape"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 bg-white/95 backdrop-blur-sm">
              <h4 className="text-[12px] font-extrabold text-[#144723] leading-snug">
                {t('dashBetterLandYield')}
              </h4>
              <p className="text-[9px] text-[#64748b] mt-0.5">{t('dashVerifiedLeases')}</p>
              <button
                type="button"
                onClick={() => setShowAddParcelModal(true)}
                className="mt-2 w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#1b7f45] py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-[#146235] transition"
              >
                {t('dashGrowWithRaithanna')}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#ef4444] hover:bg-[#fef2f2] rounded-xl transition border border-[#fee2e2]"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>{t('dashSignOut')}</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT BODY */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f4f7f4]">
        {/* TOP BAR */}
        <header className="h-[62px] bg-white border-b border-[#e2e8e2] px-6 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          {/* Search bar */}
          <div className="relative w-[340px] max-w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#94a3b8]" />
            <input
              type="text"
              placeholder={t('dashSearchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#f8faf8] border border-[#e2e8e2] rounded-full focus:bg-white focus:outline-none focus:border-[#1b7f45] transition placeholder:text-[#94a3b8]"
            />
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Location selector dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-1.5 text-xs font-medium text-[#475569] hover:text-[#1b7f45] cursor-pointer bg-[#f8faf8] px-3 py-1.5 rounded-full border border-[#e2e8e2] transition"
              >
                <MapPin className="h-3.5 w-3.5 text-[#1b7f45]" />
                <span className="truncate max-w-[140px]">{selectedLocation}</span>
                <ChevronDown className="h-3 w-3 text-[#94a3b8]" />
              </button>

              {showLocationDropdown && (
                <div className="absolute top-full mt-1.5 left-0 w-52 bg-white rounded-xl shadow-lg border border-[#e2e8e2] py-1 z-50">
                  {['Hyderabad, Telangana', 'Sangareddy, Telangana', 'Vikarabad, Telangana', 'Medak, Telangana', 'Warangal, Telangana'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setSelectedLocation(loc)
                        setShowLocationDropdown(false)
                        showToast(`Location set to ${loc}`)
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#f1f6f1] transition flex items-center justify-between ${
                        selectedLocation === loc ? 'font-bold text-[#1b7f45]' : 'text-[#475569]'
                      }`}
                    >
                      <span>{loc}</span>
                      {selectedLocation === loc && <CheckCircle2 className="h-3.5 w-3.5 text-[#1b7f45]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Switcher dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-1 text-xs font-semibold text-[#475569] hover:text-[#1b7f45] px-2.5 py-1.5 rounded-full bg-[#f8faf8] border border-[#e2e8e2] transition"
                title="Switch Language"
              >
                <span className="text-xs">🌐</span>
                <span className="hidden sm:inline">{language}</span>
                <ChevronDown className="h-2.5 w-2.5 text-[#94a3b8]" />
              </button>

              {showLanguageDropdown && (
                <div className="absolute top-full mt-1.5 right-0 w-36 bg-white rounded-xl shadow-lg border border-[#e2e8e2] py-1 z-50">
                  {availableLanguages?.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setLanguage(lang)
                        setShowLanguageDropdown(false)
                        showToast(`Language switched to ${lang}`)
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#f1f6f1] transition flex items-center justify-between ${
                        language === lang ? 'font-bold text-[#1b7f45]' : 'text-[#475569]'
                      }`}
                    >
                      <span>{lang}</span>
                      {language === lang && <CheckCircle2 className="h-3.5 w-3.5 text-[#1b7f45]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button
              type="button"
              onClick={() => setActiveTab('notifications')}
              className="relative p-1.5 text-[#64748b] hover:text-[#1b7f45] rounded-full transition"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-[#ef4444] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                5
              </span>
            </button>

            {/* Messages */}
            <button
              type="button"
              onClick={() => setActiveTab('messages')}
              className="relative p-1.5 text-[#64748b] hover:text-[#1b7f45] rounded-full transition"
              title="Messages"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-[#ef4444] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>

            {/* Profile Avatar & Info */}
            <div
              className="flex items-center gap-2 pl-3 border-l border-[#e2e8e2] cursor-pointer"
              onClick={() => setActiveTab('settings')}
            >
              <img
                src="/ramu-naik.jpg"
                alt="Ramu Naik"
                className="h-8 w-8 rounded-full object-cover ring-1 ring-[#1b7f45]/30"
              />
              <div className="text-left hidden sm:block">
                <p className="text-[12px] font-bold text-[#0f172a] leading-none">
                  {user?.name || 'Ramu Naik'}
                </p>
                <p className="text-[10px] text-[#64748b] font-medium mt-0.5">
                  {t('dashLandlordRole')}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <div className="p-5 xl:p-6 w-full flex-1">
          {/* ======================================================== */}
          {/* TAB 1: MAIN DASHBOARD VIEW (MATCHING IMAGE 1 EXACTLY)    */}
          {/* ======================================================== */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-12 gap-5 w-full">
              {/* LEFT 9 COLUMNS (72-75% Width) */}
              <div className="col-span-12 xl:col-span-9 lg:col-span-8 space-y-5">
                {/* A. COVER HERO BANNER MATCHING IMAGE 1 */}
                <div className="relative rounded-2xl overflow-hidden min-h-[160px] flex items-center px-8 py-6 shadow-sm border border-[#cde0cd] bg-gradient-to-r from-[#dcfce7] via-[#f0fdf4] to-[#ecfdf5]">
                  {/* High-res local cover photo */}
                  <img
                    src="/cover-banner.jpg"
                    alt="Raithanna Agricultural Panorama"
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />

                  {/* Soft light morning haze overlay on the left for crystal-clear readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent pointer-events-none" />

                  {/* Left: Welcome text */}
                  <div className="relative z-10 max-w-lg">
                    <span className="text-[12px] font-semibold text-[#475569] block mb-1">
                      {t('dashWelcomeBack')}
                    </span>
                    <h1 className="text-2xl sm:text-[30px] font-black tracking-tight text-[#0f172a] mb-2 flex items-center gap-2">
                      {user?.name || 'Ramu Naik'}! <span className="text-[#16a34a]">🍃</span>
                    </h1>
                    <p className="text-xs sm:text-[13px] text-[#334155] font-medium leading-relaxed max-w-md">
                      {t('dashHeroTagline')}
                    </p>
                  </div>
                </div>

                {/* B. 4 METRIC STATS CARDS (1 ROW OF 4) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                  {/* 1. Total Land Parcels */}
                  <div className="bg-white p-4 rounded-2xl border border-[#e2e8e2] shadow-sm flex flex-col justify-between hover:shadow-md transition">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-[#e8f5e9] text-[#1b7f45] flex items-center justify-center">
                        <Layers className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-[#64748b] block">{t('dashTotalParcels')}</span>
                        <span className="text-xl font-bold text-[#0f172a] leading-tight block">{parcels.length}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('parcels')}
                      className="text-[11px] font-semibold text-[#1b7f45] hover:underline flex items-center gap-1 mt-2.5"
                    >
                      {t('dashViewDetails')} <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* 2. Active Tenants */}
                  <div className="bg-white p-4 rounded-2xl border border-[#e2e8e2] shadow-sm flex flex-col justify-between hover:shadow-md transition">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-[#f3e8ff] text-[#7e22ce] flex items-center justify-center">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-[#64748b] block">{t('dashActiveTenants')}</span>
                        <span className="text-xl font-bold text-[#0f172a] leading-tight block">{activeTenantsCount}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('requests')}
                      className="text-[11px] font-semibold text-[#7e22ce] hover:underline flex items-center gap-1 mt-2.5"
                    >
                      {t('dashViewTenants')} <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* 3. Pending Requests */}
                  <div className="bg-white p-4 rounded-2xl border border-[#e2e8e2] shadow-sm flex flex-col justify-between hover:shadow-md transition">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-[#fff7ed] text-[#c2410c] flex items-center justify-center">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-[#64748b] block">{t('dashPendingRequests')}</span>
                        <span className="text-xl font-bold text-[#0f172a] leading-tight block">{pendingRequestsCount}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('requests')}
                      className="text-[11px] font-semibold text-[#c2410c] hover:underline flex items-center gap-1 mt-2.5"
                    >
                      {t('dashViewRequests')} <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* 4. Total Earnings */}
                  <div className="bg-white p-4 rounded-2xl border border-[#e2e8e2] shadow-sm flex flex-col justify-between hover:shadow-md transition">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center font-bold text-sm">
                        ₹
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-[#64748b] block">{t('dashTotalEarnings')}</span>
                        <span className="text-lg font-bold text-[#0f172a] leading-tight block">₹ 1,28,500</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('payments')}
                      className="text-[11px] font-semibold text-[#1d4ed8] hover:underline flex items-center gap-1 mt-2.5"
                    >
                      {t('dashViewReports')} <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* C. MIDDLE & LOWER DASHBOARD GRID (2 SUB-COLUMNS) */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
                  {/* SUB-COLUMN A: PARCELS & CROP PRODUCTION (5 COLS) */}
                  <div className="xl:col-span-5 space-y-5">
                    {/* 1. My Land Parcels (2x2 Grid) */}
                    <div className="bg-white p-4 rounded-2xl border border-[#e2e8e2] shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3.5">
                          <h3 className="text-sm font-bold text-[#0f172a]">{t('dashMyLandParcels')}</h3>
                          <button
                            type="button"
                            onClick={() => setActiveTab('parcels')}
                            className="text-xs font-semibold text-[#1b7f45] hover:underline flex items-center gap-1"
                          >
                            {t('dashViewAll')} <ArrowUpRight className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {filteredParcels.slice(0, 4).map((p) => (
                            <div
                              key={p.id}
                              className="border border-[#e2e8e2] rounded-xl overflow-hidden hover:border-[#1b7f45] transition bg-white"
                            >
                              <div className="relative h-24 w-full overflow-hidden bg-slate-100">
                                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                                <div className="absolute inset-0 border-2 border-lime-400 m-2 rounded pointer-events-none" />
                              </div>
                              <div className="p-2.5">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs font-bold text-[#0f172a] truncate">{p.name}</h4>
                                  <span className="text-slate-400 text-xs">⋮</span>
                                </div>
                                <p className="text-[10px] text-[#64748b] mt-0.5">
                                  {p.area} <span className="text-slate-300">|</span> {p.crop}
                                </p>
                                <p className="text-[9px] text-[#94a3b8] truncate">{p.location}</p>
                                <div className="mt-1.5 flex justify-end">
                                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${p.statusColor}`}>
                                    {p.status === 'Rented'
                                      ? t('dashStatusRented')
                                      : p.status === 'Available'
                                      ? t('dashStatusAvailable')
                                      : t('dashStatusPending')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 2. Crop Production & Yield */}
                    <div className="bg-white p-4 rounded-2xl border border-[#e2e8e2] shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold text-[#0f172a]">{t('dashCropProductionYield')}</h4>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}
                            className="text-[10px] text-[#64748b] bg-[#f8faf8] px-2 py-0.5 rounded border border-[#e2e8e2] flex items-center gap-1 hover:text-[#1b7f45]"
                          >
                            <span>{selectedSeason}</span>
                            <ChevronDown className="h-2.5 w-2.5" />
                          </button>
                          {showSeasonDropdown && (
                            <div className="absolute right-0 top-full mt-1 w-28 bg-white border border-[#e2e8e2] rounded-lg shadow-lg py-1 z-30">
                              {['This Season', 'Kharif 2025', 'Rabi 2025'].map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => {
                                    setSelectedSeason(s)
                                    setShowSeasonDropdown(false)
                                  }}
                                  className="w-full text-left px-2.5 py-1 text-[10px] text-[#475569] hover:bg-[#f1f6f1]"
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {/* Paddy */}
                        <div className="border border-[#f1f5f9] rounded-xl p-2.5 text-center bg-[#fafdfa]">
                          <img
                            src="/crop-paddy.jpg"
                            alt="Paddy"
                            className="h-10 w-10 mx-auto rounded-full object-cover ring-2 ring-emerald-500/20 mb-1.5 shadow-xs"
                          />
                          <p className="text-xs font-bold text-[#0f172a]">{t('dashCropPaddy')}</p>
                          <p className="text-[10px] text-[#64748b]">2.5 {t('dashAcres')}</p>
                          <p className="text-[9px] text-[#94a3b8] mt-1">{t('dashExpectedYield')}</p>
                          <p className="text-xs font-bold text-[#0f172a]">12 {t('dashQuintals')}</p>
                          <div className="mt-2 h-1.5 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#16a34a] rounded-full" style={{ width: '70%' }} />
                          </div>
                          <span className="text-[9px] text-[#64748b] font-medium block mt-1">70%</span>
                        </div>

                        {/* Maize */}
                        <div className="border border-[#f1f5f9] rounded-xl p-2.5 text-center bg-[#fffdfa]">
                          <img
                            src="/crop-maize.jpg"
                            alt="Maize"
                            className="h-10 w-10 mx-auto rounded-full object-cover ring-2 ring-amber-500/20 mb-1.5 shadow-xs"
                          />
                          <p className="text-xs font-bold text-[#0f172a]">{t('dashCropMaize')}</p>
                          <p className="text-[10px] text-[#64748b]">1.8 {t('dashAcres')}</p>
                          <p className="text-[9px] text-[#94a3b8] mt-1">{t('dashExpectedYield')}</p>
                          <p className="text-xs font-bold text-[#0f172a]">10 {t('dashQuintals')}</p>
                          <div className="mt-2 h-1.5 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: '60%' }} />
                          </div>
                          <span className="text-[9px] text-[#64748b] font-medium block mt-1">60%</span>
                        </div>

                        {/* Cotton */}
                        <div className="border border-[#f1f5f9] rounded-xl p-2.5 text-center bg-[#fafbfe]">
                          <img
                            src="/crop-cotton.jpg"
                            alt="Cotton"
                            className="h-10 w-10 mx-auto rounded-full object-cover ring-2 ring-blue-500/20 mb-1.5 shadow-xs"
                          />
                          <p className="text-xs font-bold text-[#0f172a]">{t('dashCropCotton')}</p>
                          <p className="text-[10px] text-[#64748b]">3.0 {t('dashAcres')}</p>
                          <p className="text-[9px] text-[#94a3b8] mt-1">{t('dashExpectedYield')}</p>
                          <p className="text-xs font-bold text-[#0f172a]">15 {t('dashQuintals')}</p>
                          <div className="mt-2 h-1.5 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#3b82f6] rounded-full" style={{ width: '50%' }} />
                          </div>
                          <span className="text-[9px] text-[#64748b] font-medium block mt-1">50%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SUB-COLUMN B: EARNINGS, TENANTS & GIS MAP (7 COLS) */}
                  <div className="xl:col-span-7 space-y-5">
                    {/* 1. Earnings Overview & Land Usage side-by-side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Earnings Bar Chart */}
                      <div className="bg-white p-4 rounded-2xl border border-[#e2e8e2] shadow-sm">
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="text-xs font-bold text-[#0f172a]">{t('dashEarningsOverview')}</h4>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setShowTimeRangeDropdown(!showTimeRangeDropdown)}
                              className="text-[10px] text-[#64748b] bg-[#f8faf8] px-2 py-0.5 rounded border border-[#e2e8e2] flex items-center gap-1 hover:text-[#1b7f45]"
                            >
                              <span>{timeRange}</span>
                              <ChevronDown className="h-2.5 w-2.5" />
                            </button>
                            {showTimeRangeDropdown && (
                              <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-[#e2e8e2] rounded-lg shadow-lg py-1 z-30">
                                {['Last 3 Months', 'Last 6 Months', 'Last 1 Year'].map((tr) => (
                                  <button
                                    key={tr}
                                    type="button"
                                    onClick={() => {
                                      setTimeRange(tr)
                                      setShowTimeRangeDropdown(false)
                                    }}
                                    className="w-full text-left px-2.5 py-1 text-[10px] text-[#475569] hover:bg-[#f1f6f1]"
                                  >
                                    {tr}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-lg font-bold text-[#0f172a]">₹ 1,28,500</span>
                          <span className="text-[10px] font-bold text-[#16a34a]">↑ 12%</span>
                          <span className="text-[9px] text-[#94a3b8]">vs. previous 6 months</span>
                        </div>

                        {/* Bar Chart */}
                        <div className="h-24 flex items-end justify-between gap-2 pt-2 border-b border-[#f1f5f9]">
                          {[
                            { m: 'Jan', h: 30 },
                            { m: 'Feb', h: 45 },
                            { m: 'Mar', h: 60 },
                            { m: 'Apr', h: 40 },
                            { m: 'May', h: 75 },
                            { m: 'Jun', h: 90 },
                          ].map((b, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                              <div
                                style={{ height: `${b.h}%` }}
                                className="w-full bg-[#1b7f45] rounded-t-sm hover:opacity-80 transition"
                              />
                              <span className="text-[9px] text-[#94a3b8]">{b.m}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Land Usage Donut */}
                      <div className="bg-white p-4 rounded-2xl border border-[#e2e8e2] shadow-sm flex flex-col justify-between">
                        <h4 className="text-xs font-bold text-[#0f172a] mb-1">{t('dashLandUsage')}</h4>
                        <div className="flex items-center gap-4 my-1">
                          <div className="relative w-20 h-20 shrink-0">
                            <svg width="80" height="80" viewBox="0 0 42 42" className="rotate-[-90deg]">
                              <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#f1f5f9" strokeWidth="5.5" />
                              <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#16a34a" strokeWidth="6" strokeDasharray="60 40" strokeDashoffset="0" />
                              <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#f59e0b" strokeWidth="6" strokeDasharray="20 80" strokeDashoffset="-60" />
                              <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#3b82f6" strokeWidth="6" strokeDasharray="20 80" strokeDashoffset="-80" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-xs font-bold text-[#0f172a] leading-none">{parcels.length}</span>
                              <span className="text-[8px] text-[#94a3b8]">{t('dashTotalParcels')}</span>
                            </div>
                          </div>

                          <div className="space-y-1.5 text-[10px] text-[#475569]">
                            <div className="flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
                              <span>{t('dashStatusRented')}</span>
                              <span className="font-semibold text-[#0f172a] ml-auto">3 (60%)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
                              <span>{t('dashStatusAvailable')}</span>
                              <span className="font-semibold text-[#0f172a] ml-auto">1 (20%)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-[#3b82f6]" />
                              <span>{t('dashStatusPending')}</span>
                              <span className="font-semibold text-[#0f172a] ml-auto">1 (20%)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Recent Tenant Requests */}
                    <div className="bg-white p-4 rounded-2xl border border-[#e2e8e2] shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold text-[#0f172a]">{t('dashRecentTenantRequests')}</h4>
                        <button
                          type="button"
                          onClick={() => setActiveTab('requests')}
                          className="text-xs font-semibold text-[#1b7f45] hover:underline flex items-center gap-1"
                        >
                          {t('dashViewAll')} <ArrowUpRight className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {tenantRequests.map((tr) => (
                          <div key={tr.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-[#f8faf8] transition border border-[#f1f5f9]">
                            <div className="flex items-center gap-2.5">
                              <img src={tr.avatar} alt={tr.name} className="h-8 w-8 rounded-full object-cover" />
                              <div>
                                <p className="text-xs font-bold text-[#0f172a] leading-none">{tr.name}</p>
                                <p className="text-[10px] text-[#64748b] mt-0.5">
                                  {tr.acres} <span className="text-slate-300">|</span> {tr.crop} <span className="text-slate-300">|</span> {tr.duration}
                                </p>
                                <p className="text-[9px] text-[#94a3b8]">{tr.timeAgo}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {tr.status === 'accepted' ? (
                                <span className="text-[11px] font-bold text-[#1b7f45] bg-[#e8f5e9] px-2.5 py-1 rounded-lg">
                                  {t('dashAccepted')}
                                </span>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedTenantDetails(tr)}
                                    className="px-2.5 py-1 text-[11px] font-medium text-[#475569] bg-[#f8faf8] border border-[#e2e8e2] rounded-lg hover:bg-slate-100"
                                  >
                                    {t('dashView')}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleAcceptTenant(tr.id, tr.name)}
                                    className="px-3 py-1 text-[11px] font-semibold text-white bg-[#1b7f45] hover:bg-[#146235] rounded-lg shadow-sm"
                                  >
                                    {t('dashAccept')}
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. Land Location GIS Satellite Map */}
                    <div className="bg-white p-4 rounded-2xl border border-[#e2e8e2] shadow-sm flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold text-[#0f172a]">{t('dashLandLocation')}</h4>
                        <button
                          type="button"
                          onClick={() => setActiveTab('parcels')}
                          className="text-xs font-semibold text-[#1b7f45] hover:underline flex items-center gap-1"
                        >
                          {t('dashViewAll')} <ArrowUpRight className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="relative h-44 rounded-xl overflow-hidden border border-[#cbd5e1] group">
                        <img
                          src="/gis-satellite-map.jpg"
                          alt="Satellite Map"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1524813686514-a57563d77d4c?auto=format&fit=crop&w=800&q=80'
                          }}
                        />
                        <div className="absolute inset-0 bg-[#064e3b]/10 pointer-events-none" />

                        {/* Surveyed Polygon Boundary overlays */}
                        <div className="absolute top-3 left-6 bg-white/95 backdrop-blur-sm text-[#0f172a] px-2 py-0.5 rounded text-[9px] font-bold shadow border border-emerald-500">
                          North Field<br />2.5 ac
                        </div>
                        <div className="absolute top-5 right-6 bg-white/95 backdrop-blur-sm text-[#0f172a] px-2 py-0.5 rounded text-[9px] font-bold shadow border border-emerald-500">
                          East Field<br />1.8 ac
                        </div>
                        <div className="absolute bottom-4 left-6 bg-white/95 backdrop-blur-sm text-[#0f172a] px-2 py-0.5 rounded text-[9px] font-bold shadow border border-emerald-500">
                          West Field<br />3.0 ac
                        </div>
                        <div className="absolute bottom-4 right-8 bg-white/95 backdrop-blur-sm text-[#0f172a] px-2 py-0.5 rounded text-[9px] font-bold shadow border border-emerald-500">
                          South Field<br />2.2 ac
                        </div>

                        <button
                          type="button"
                          onClick={() => showToast('Re-centering GIS satellite telemetry...')}
                          className="absolute bottom-2.5 right-2.5 p-1 bg-white rounded shadow text-[#475569] hover:text-[#1b7f45] transition"
                          title="Recenter Map"
                        >
                          <Maximize2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT 3 COLUMNS (25-28% Width) - Quote Card, Profile, Actions, Notifications */}
              <div className="col-span-12 xl:col-span-3 lg:col-span-4 space-y-4">
                {/* 1. SEPARATE QUOTE CARD MATCHING IMAGE 1 */}
                <div className="bg-white rounded-2xl p-5 border border-[#e2e8e2] shadow-sm flex flex-col justify-between min-h-[160px] relative">
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#16a34a] text-lg font-bold">🍃</span>
                    <p className="text-[12px] font-medium text-[#334155] italic leading-relaxed pt-0.5">
                      {t('dashQuote')}
                    </p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Sprout className="h-5 w-5 text-[#16a34a]" />
                  </div>
                </div>

                {/* 2. LANDLORD PROFILE CARD */}
                <div className="bg-white p-4 rounded-2xl border border-[#e2e8e2] shadow-sm text-center relative">
                  <button
                    type="button"
                    onClick={() => setActiveTab('settings')}
                    className="absolute top-3.5 right-3.5 text-[#94a3b8] hover:text-[#475569]"
                    title="Edit Settings"
                  >
                    <Settings className="h-3.5 w-3.5" />
                  </button>

                  <img
                    src="/ramu-naik.jpg"
                    alt="Ramu Naik"
                    className="h-16 w-16 rounded-full object-cover mx-auto ring-2 ring-[#1b7f45]/20 shadow-sm"
                  />

                  <h3 className="text-sm font-bold text-[#0f172a] mt-2">{user?.name || 'Ramu Naik'}</h3>
                  <p className="text-[10px] text-[#64748b]">{t('dashLandlordRole')}</p>
                  <p className="text-[10px] text-[#94a3b8] flex items-center justify-center gap-1 mt-0.5">
                    <MapPin className="h-2.5 w-2.5 text-[#1b7f45]" /> {selectedLocation}
                  </p>

                  <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-[#1b7f45] bg-[#e8f5e9] px-2.5 py-0.5 rounded-full border border-[#c8e6c9]">
                    <CheckCircle2 className="h-2.5 w-2.5" /> {t('dashVerified')}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#f1f5f9]">
                    <div className="p-2 bg-[#f8faf8] rounded-xl text-left flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-[#e8f5e9] text-[#1b7f45] flex items-center justify-center shrink-0">
                        <Layers className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="text-[9px] text-[#64748b] block">{t('dashLandHoldings')}</span>
                        <span className="text-xs font-bold text-[#0f172a] block">12.5 {t('dashAcres')}</span>
                      </div>
                    </div>
                    <div className="p-2 bg-[#f8faf8] rounded-xl text-left flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-[#f0fdf4] text-[#16a34a] flex items-center justify-center shrink-0">
                        <Sprout className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="text-[9px] text-[#64748b] block">{t('dashFarmingSince')}</span>
                        <span className="text-xs font-bold text-[#0f172a] block">15 {t('dashYears')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. QUICK ACTIONS CARD */}
                <div className="bg-white p-4 rounded-2xl border border-[#e2e8e2] shadow-sm">
                  <h4 className="text-xs font-bold text-[#0f172a] mb-3">{t('dashQuickActions')}</h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setShowAddParcelModal(true)}
                      className="p-3 rounded-xl border border-[#e2e8e2] hover:border-[#1b7f45] hover:bg-[#f8faf8] transition flex flex-col items-center justify-center"
                    >
                      <div className="h-8 w-8 rounded-full bg-[#e8f5e9] text-[#1b7f45] flex items-center justify-center mb-1.5">
                        <Plus className="h-4 w-4" />
                      </div>
                      <span className="text-[11px] font-semibold text-[#0f172a] text-center leading-tight">
                        {t('dashAddLandParcel')}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('requests')}
                      className="p-3 rounded-xl border border-[#e2e8e2] hover:border-[#3b82f6] hover:bg-[#f8faf8] transition flex flex-col items-center justify-center"
                    >
                      <div className="h-8 w-8 rounded-full bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center mb-1.5">
                        <Users className="h-4 w-4" />
                      </div>
                      <span className="text-[11px] font-semibold text-[#0f172a] text-center leading-tight">
                        {t('dashFindTenants')}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('leases')}
                      className="p-3 rounded-xl border border-[#e2e8e2] hover:border-[#16a34a] hover:bg-[#f8faf8] transition flex flex-col items-center justify-center"
                    >
                      <div className="h-8 w-8 rounded-full bg-[#f0fdf4] text-[#16a34a] flex items-center justify-center mb-1.5">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="text-[11px] font-semibold text-[#0f172a] text-center leading-tight">
                        {t('dashCreateLease')}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('reports')}
                      className="p-3 rounded-xl border border-[#e2e8e2] hover:border-[#7e22ce] hover:bg-[#f8faf8] transition flex flex-col items-center justify-center"
                    >
                      <div className="h-8 w-8 rounded-full bg-[#f3e8ff] text-[#7e22ce] flex items-center justify-center mb-1.5">
                        <BarChart3 className="h-4 w-4" />
                      </div>
                      <span className="text-[11px] font-semibold text-[#0f172a] text-center leading-tight">
                        {t('dashViewReports')}
                      </span>
                    </button>
                  </div>
                </div>

                {/* 4. RECENT NOTIFICATIONS CARD */}
                <div className="bg-white p-4 rounded-2xl border border-[#e2e8e2] shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-[#0f172a]">{t('dashRecentNotifications')}</h4>
                    <button
                      type="button"
                      onClick={() => setActiveTab('notifications')}
                      className="text-xs font-semibold text-[#1b7f45] hover:underline flex items-center gap-1"
                    >
                      {t('dashViewAll')} <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        icon: Users,
                        bg: 'bg-[#e8f5e9] text-[#1b7f45]',
                        title: 'New tenant request from Suresh Kumar',
                        time: '2 hours ago',
                      },
                      {
                        icon: FileText,
                        bg: 'bg-[#eff6ff] text-[#1d4ed8]',
                        title: 'Lease agreement signed for East Field',
                        time: '5 hours ago',
                      },
                      {
                        icon: CreditCard,
                        bg: 'bg-[#fff7ed] text-[#ea580c]',
                        title: 'Payment received from Lakshmi Devi',
                        time: '1 day ago',
                      },
                      {
                        icon: MessageSquare,
                        bg: 'bg-[#e8f5e9] text-[#16a34a]',
                        title: 'New message from Ravi Teja',
                        time: '1 day ago',
                      },
                    ].map((n, i) => {
                      const NIcon = n.icon
                      return (
                        <div key={i} className="flex items-start gap-2.5 p-1 rounded-lg hover:bg-[#f8faf8] transition">
                          <div className={`h-7 w-7 rounded-full ${n.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                            <NIcon className="h-3.5 w-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-semibold text-[#0f172a] leading-tight truncate">
                              {n.title}
                            </p>
                            <span className="text-[9px] text-[#94a3b8]">{n.time}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: MY LAND PARCELS DETAILED VIEW                     */}
          {/* ======================================================== */}
          {activeTab === 'parcels' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8e2] shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
                <div>
                  <h2 className="text-lg font-bold text-[#0f172a]">{t('dashTabParcelsTitle')} ({filteredParcels.length})</h2>
                  <p className="text-xs text-[#64748b]">{t('dashTabParcelsSubtitle')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddParcelModal(true)}
                  className="px-4 py-2 bg-[#1b7f45] text-white rounded-xl text-xs font-bold hover:bg-[#146235] transition flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="h-4 w-4" /> {t('dashModalAddParcelTitle')}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredParcels.map((p) => (
                  <div key={p.id} className="border border-[#e2e8e2] rounded-2xl overflow-hidden hover:shadow-md transition">
                    <div className="relative h-36 w-full">
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                      <div className="absolute top-2.5 right-2.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.statusColor}`}>
                          {p.status === 'Rented'
                            ? t('dashStatusRented')
                            : p.status === 'Available'
                            ? t('dashStatusAvailable')
                            : t('dashStatusPending')}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                        {p.surveyNo}
                      </div>
                    </div>
                    <div className="p-3.5 space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-[#0f172a]">{p.name}</h4>
                        <span className="text-xs font-bold text-[#1b7f45]">{p.annualRent}</span>
                      </div>
                      <p className="text-xs text-[#64748b]">{p.area} · {p.crop}</p>
                      <div className="text-[11px] bg-[#f8faf8] p-2.5 rounded-xl space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[#94a3b8]">{t('dashSoil')}:</span>
                          <span className="font-semibold text-[#334155]">{p.soilType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#94a3b8]">{t('dashWater')}:</span>
                          <span className="font-semibold text-[#334155]">{p.waterSource}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#94a3b8]">{t('dashTenant')}:</span>
                          <span className="font-semibold text-[#1b7f45]">{p.tenant}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => showToast(`Opening GIS scan for ${p.name}`)}
                        className="w-full py-1.5 text-xs font-semibold text-[#1b7f45] bg-[#e8f5e9] hover:bg-[#d4ebd4] rounded-lg transition"
                      >
                        {t('dashInspectLand')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: TENANT REQUESTS                                   */}
          {/* ======================================================== */}
          {activeTab === 'requests' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8e2] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
                <div>
                  <h2 className="text-lg font-bold text-[#0f172a]">{t('dashTabRequestsTitle')}</h2>
                  <p className="text-xs text-[#64748b]">{t('dashTabRequestsSubtitle')}</p>
                </div>
                <span className="text-xs bg-[#fef2f2] text-[#ef4444] font-bold px-3 py-1 rounded-full border border-red-200">
                  {pendingRequestsCount} {t('dashPendingApproval')}
                </span>
              </div>

              <div className="space-y-3">
                {tenantRequests.map((tr) => (
                  <div key={tr.id} className="p-3.5 rounded-xl border border-[#e2e8e2] flex items-center justify-between hover:bg-[#f8faf8] transition">
                    <div className="flex items-center gap-3">
                      <img src={tr.avatar} alt={tr.name} className="h-10 w-10 rounded-full object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-[#0f172a]">{tr.name}</h4>
                          <span className="text-[10px] text-[#1b7f45] bg-[#e8f5e9] px-2 py-0.5 rounded font-bold">{tr.rating}</span>
                        </div>
                        <p className="text-xs text-[#64748b]">
                          {tr.parcelName} ({tr.acres}) · {tr.crop} · {tr.duration} · {tr.offeredRent}
                        </p>
                        <p className="text-[10px] text-[#94a3b8]">{tr.experience} · {tr.timeAgo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {tr.status === 'accepted' ? (
                        <span className="text-xs font-bold text-[#1b7f45] bg-[#e8f5e9] px-3 py-1.5 rounded-lg flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> {t('dashApproved')}
                        </span>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => setSelectedTenantDetails(tr)}
                            className="px-3 py-1.5 text-xs font-medium text-[#475569] bg-white border border-[#e2e8e2] rounded-lg hover:bg-slate-50"
                          >
                            {t('dashDetails')}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAcceptTenant(tr.id, tr.name)}
                            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1b7f45] hover:bg-[#146235] rounded-lg shadow-sm"
                          >
                            {t('dashAccept')}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: LEASES & AGREEMENTS                               */}
          {/* ======================================================== */}
          {activeTab === 'leases' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8e2] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
                <div>
                  <h2 className="text-lg font-bold text-[#0f172a]">{t('dashTabLeasesTitle')}</h2>
                  <p className="text-xs text-[#64748b]">{t('dashTabLeasesSubtitle')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Model agreement downloaded!')}
                  className="px-3 py-1.5 bg-[#e8f5e9] text-[#1b7f45] text-xs font-bold rounded-lg hover:bg-[#d4ebd4] transition"
                >
                  {t('dashDownloadModelDeed')}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f8faf8] text-[#64748b] font-bold border-b border-[#e2e8e2]">
                    <tr>
                      <th className="p-3">{t('dashColAgreementId')}</th>
                      <th className="p-3">{t('dashColParcel')}</th>
                      <th className="p-3">{t('dashColTenant')}</th>
                      <th className="p-3">{t('dashColTenure')}</th>
                      <th className="p-3">{t('dashColAnnualRent')}</th>
                      <th className="p-3">{t('dashColPaid')}</th>
                      <th className="p-3">{t('dashColStatus')}</th>
                      <th className="p-3">{t('dashColContract')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    {leases.map((l) => (
                      <tr key={l.id} className="hover:bg-[#f8faf8]">
                        <td className="p-3 font-mono font-bold text-[#1b7f45]">{l.id}</td>
                        <td className="p-3 font-bold text-[#0f172a]">{l.parcel}</td>
                        <td className="p-3 text-[#334155]">{l.tenant}</td>
                        <td className="p-3 text-[#64748b]">{l.period}</td>
                        <td className="p-3 font-bold text-[#0f172a]">{l.rent}</td>
                        <td className="p-3 font-bold text-[#16a34a]">{l.paid}</td>
                        <td className="p-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${l.statusBadge}`}>
                            {l.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            type="button"
                            onClick={() => showToast(`Opening contract for ${l.id}`)}
                            className="text-[#1b7f45] font-bold hover:underline"
                          >
                            {t('dashViewPdf')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: CROP MANAGEMENT                                   */}
          {/* ======================================================== */}
          {activeTab === 'crops' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8e2] shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-[#0f172a]">{t('dashTabCropsTitle')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: `${t('dashCropPaddy')} (BPT-5204)`, field: `North Field (2.5 ${t('dashAcres')})`, stage: 'Tillering Phase', moisture: 'Optimal (82%)', harvest: 'Nov 2026', health: 'Excellent' },
                  { name: `${t('dashCropMaize')} (Hybrid)`, field: `East Field (1.8 ${t('dashAcres')})`, stage: 'Tasseling Stage', moisture: 'Moderate (68%)', harvest: 'Oct 2026', health: 'Good' },
                  { name: `${t('dashCropCotton')} (Bt-II)`, field: `West Field (3.0 ${t('dashAcres')})`, stage: 'Vegetative Growth', moisture: 'Normal (74%)', harvest: 'Dec 2026', health: 'Healthy' },
                ].map((c, i) => (
                  <div key={i} className="border border-[#e2e8e2] p-4 rounded-xl space-y-2">
                    <h4 className="text-sm font-bold text-[#0f172a]">{c.name}</h4>
                    <p className="text-xs text-[#64748b]">{c.field}</p>
                    <div className="text-xs space-y-1 bg-[#f8faf8] p-2.5 rounded-lg">
                      <div className="flex justify-between"><span className="text-[#94a3b8]">{t('dashGrowthStage')}:</span><span className="font-semibold text-[#0f172a]">{c.stage}</span></div>
                      <div className="flex justify-between"><span className="text-[#94a3b8]">{t('dashSoilMoisture')}:</span><span className="font-semibold text-[#0f172a]">{c.moisture}</span></div>
                      <div className="flex justify-between"><span className="text-[#94a3b8]">{t('dashHarvestEst')}:</span><span className="font-semibold text-[#1b7f45]">{c.harvest}</span></div>
                      <div className="flex justify-between"><span className="text-[#94a3b8]">{t('dashNdviStatus')}:</span><span className="font-bold text-[#16a34a]">{c.health}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: REPORTS & ANALYTICS                               */}
          {/* ======================================================== */}
          {activeTab === 'reports' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8e2] shadow-sm space-y-5">
              <h2 className="text-lg font-bold text-[#0f172a]">{t('dashTabReportsTitle')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="border border-[#e2e8e2] p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-[#0f172a] mb-2">{t('dashAnnualRevenue')}</h4>
                  <p className="text-xl font-bold text-[#1b7f45]">₹ 2,37,500</p>
                  <p className="text-xs text-[#64748b]">{t('dashAnnualRevenueSub')}</p>
                </div>
                <div className="border border-[#e2e8e2] p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-[#0f172a] mb-2">{t('dashAvgRentYield')}</h4>
                  <p className="text-xl font-bold text-[#0f172a]">₹ 25,000 / {t('dashAcres')}</p>
                  <p className="text-xs text-[#64748b]">{t('dashAvgRentSub')}</p>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 7: PAYMENTS & INVOICES                               */}
          {/* ======================================================== */}
          {activeTab === 'payments' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8e2] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
                <div>
                  <h2 className="text-lg font-bold text-[#0f172a]">{t('dashTabPaymentsTitle')}</h2>
                  <p className="text-xs text-[#64748b]">{t('dashTabPaymentsSubtitle')}</p>
                </div>
                <span className="text-sm font-bold text-[#1b7f45]">{t('dashSeasonBalance')}: ₹ 1,28,500</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'TXN-90281', tenant: 'Suresh Kumar', parcel: 'North Field', amt: '₹ 31,250', date: '24 Oct 2026', type: 'UPI Payment', status: 'Success' },
                  { id: 'TXN-88421', tenant: 'Lakshmi Devi', parcel: 'East Field', amt: '₹ 22,500', date: '12 Sep 2026', type: 'Bank NEFT', status: 'Success' },
                  { id: 'TXN-79110', tenant: 'Ravi Teja', parcel: 'Security Deposit', amt: '₹ 15,000', date: '01 Aug 2026', type: 'Raithanna Escrow', status: 'Success' },
                ].map((tItem) => (
                  <div key={tItem.id} className="p-3 rounded-xl border border-[#e2e8e2] flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#0f172a]">{tItem.tenant} · {tItem.parcel}</h4>
                      <p className="text-[10px] text-[#94a3b8]">{tItem.id} · {tItem.date} via {tItem.type}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#0f172a]">{tItem.amt}</span>
                      <p className="text-[10px] font-bold text-[#16a34a]">{tItem.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 8: MESSAGES CHAT                                     */}
          {/* ======================================================== */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-2xl border border-[#e2e8e2] shadow-sm flex h-[500px] overflow-hidden">
              {/* Chat Sidebar */}
              <div className="w-64 border-r border-[#e2e8e2] bg-[#f8faf8] p-3 space-y-1">
                <h3 className="text-xs font-bold text-[#0f172a] mb-2 px-2">{t('dashTabMessagesTitle')}</h3>
                {['Suresh Kumar', 'Lakshmi Devi'].map((tName) => (
                  <button
                    key={tName}
                    type="button"
                    onClick={() => setSelectedChatTenant(tName)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                      selectedChatTenant === tName ? 'bg-white shadow-sm border border-[#e2e8e2] text-[#1b7f45]' : 'text-[#475569] hover:bg-white/60'
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
                    {tName}
                  </button>
                ))}
              </div>

              {/* Chat Conversation */}
              <div className="flex-1 flex flex-col justify-between p-4">
                <div className="border-b border-[#f1f5f9] pb-2 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#0f172a]">{selectedChatTenant}</h4>
                  <span className="text-[10px] text-[#16a34a] font-bold">{t('dashOnlineTenant')}</span>
                </div>

                <div className="flex-1 overflow-y-auto py-3 space-y-2">
                  {(chatMessages[selectedChatTenant] || []).map((m, idx) => (
                    <div key={idx} className={`flex flex-col ${m.sender === 'You' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-3 py-2 rounded-xl text-xs max-w-sm ${m.sender === 'You' ? 'bg-[#1b7f45] text-white' : 'bg-[#f1f5f9] text-[#0f172a]'}`}>
                        {m.text}
                      </div>
                      <span className="text-[9px] text-[#94a3b8] mt-0.5">{m.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-[#f1f5f9]">
                  <input
                    type="text"
                    placeholder={t('dashTypeMessage')}
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-[#f8faf8] border border-[#e2e8e2] rounded-lg focus:outline-none focus:border-[#1b7f45]"
                  />
                  <button type="submit" className="px-4 py-1.5 bg-[#1b7f45] text-white text-xs font-bold rounded-lg shadow-sm">
                    {t('dashSend')}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 9: NOTIFICATIONS                                     */}
          {/* ======================================================== */}
          {activeTab === 'notifications' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8e2] shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-[#0f172a]">{t('dashTabNotificationsTitle')}</h2>
              {[
                { text: 'New tenant request from Suresh Kumar for North Field', time: '2 hours ago', tag: 'Tenant' },
                { text: 'Lease agreement signed for East Field by Lakshmi Devi', time: '5 hours ago', tag: 'Legal' },
                { text: 'Payment ₹ 31,250 received via UPI from Suresh Kumar', time: '1 day ago', tag: 'Payment' },
                { text: 'Monsoon weather forecast: Rainfall expected in Vikarabad', time: '2 days ago', tag: 'Weather' },
                { text: 'Satellite scan updated: Soil moisture optimal', time: '3 days ago', tag: 'GIS' },
              ].map((n, i) => (
                <div key={i} className="p-3 rounded-xl border border-[#e2e8e2] flex items-center justify-between hover:bg-[#f8faf8]">
                  <div>
                    <p className="text-xs font-semibold text-[#0f172a]">{n.text}</p>
                    <span className="text-[10px] text-[#94a3b8]">{n.time}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f1f5f9] text-[#475569]">{n.tag}</span>
                </div>
              ))}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 10: SETTINGS                                         */}
          {/* ======================================================== */}
          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8e2] shadow-sm space-y-4 max-w-xl">
              <h2 className="text-lg font-bold text-[#0f172a]">{t('dashTabSettingsTitle')}</h2>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#64748b] mb-1">{t('dashFullName')}</label>
                  <input type="text" defaultValue={user?.name || 'Ramu Naik'} className="w-full p-2 border border-[#e2e8e2] rounded-lg bg-[#f8faf8]" />
                </div>
                <div>
                  <label className="block font-semibold text-[#64748b] mb-1">{t('dashVillageDistrict')}</label>
                  <input type="text" defaultValue="Hyderabad, Telangana" className="w-full p-2 border border-[#e2e8e2] rounded-lg bg-[#f8faf8]" />
                </div>
                <div>
                  <label className="block font-semibold text-[#64748b] mb-1">{t('dashDharaniRef')}</label>
                  <input type="text" defaultValue="TEL-DHARANI-994821" className="w-full p-2 border border-[#e2e8e2] rounded-lg bg-[#f8faf8]" />
                </div>
                <button type="button" onClick={() => showToast('Settings saved successfully!')} className="px-4 py-2 bg-[#1b7f45] text-white font-bold rounded-lg shadow-sm">
                  {t('dashSaveChanges')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: ADD LAND PARCEL */}
      {showAddParcelModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-[#e8f5e9] text-[#1b7f45] flex items-center justify-center font-bold">
                  +
                </div>
                <h3 className="text-sm font-bold text-[#0f172a]">{t('dashModalAddParcelTitle')}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddParcelModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddParcel} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#475569] mb-1">{t('dashFieldParcelName')}</label>
                <input
                  type="text"
                  placeholder="e.g. Northeast Field"
                  required
                  value={newParcel.name}
                  onChange={(e) => setNewParcel({ ...newParcel, name: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-200 focus:border-[#1b7f45] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#475569] mb-1">{t('dashFieldArea')}</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 2.5"
                    required
                    value={newParcel.area}
                    onChange={(e) => setNewParcel({ ...newParcel, area: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-200 focus:border-[#1b7f45] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#475569] mb-1">{t('dashFieldSurveyNo')}</label>
                  <input
                    type="text"
                    placeholder="e.g. SY-302/F"
                    value={newParcel.surveyNo}
                    onChange={(e) => setNewParcel({ ...newParcel, surveyNo: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-200 focus:border-[#1b7f45] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#475569] mb-1">{t('dashFieldCrop')}</label>
                  <input
                    type="text"
                    placeholder="e.g. Paddy, Cotton"
                    value={newParcel.crop}
                    onChange={(e) => setNewParcel({ ...newParcel, crop: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-200 focus:border-[#1b7f45] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#475569] mb-1">{t('dashFieldInitialStatus')}</label>
                  <select
                    value={newParcel.status}
                    onChange={(e) => setNewParcel({ ...newParcel, status: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-200 focus:border-[#1b7f45] outline-none bg-white"
                  >
                    <option value="Available">{t('dashStatusAvailable')}</option>
                    <option value="Rented">{t('dashStatusRented')}</option>
                    <option value="Pending">{t('dashStatusPending')}</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddParcelModal(false)}
                  className="px-4 py-1.5 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  {t('dashCancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-semibold text-white bg-[#1b7f45] hover:bg-[#146235] rounded-lg shadow-sm"
                >
                  {t('dashSaveParcel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW TENANT DOSSIER */}
      {selectedTenantDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <h3 className="text-xs font-bold text-[#0f172a]">{t('dashModalTenantTitle')}</h3>
              <button
                type="button"
                onClick={() => setSelectedTenantDetails(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 text-center">
              <img
                src={selectedTenantDetails.avatar}
                alt={selectedTenantDetails.name}
                className="h-14 w-14 rounded-full object-cover mx-auto ring-2 ring-[#1b7f45]/20"
              />
              <h4 className="text-sm font-bold text-[#0f172a] mt-1.5">{selectedTenantDetails.name}</h4>
              <p className="text-[11px] text-[#64748b]">{selectedTenantDetails.acres} | {selectedTenantDetails.crop}</p>
            </div>

            <div className="mt-3 text-xs bg-[#f8faf8] p-3 rounded-xl space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">{t('dashLabelDuration')}:</span>
                <span className="font-semibold text-[#0f172a]">{selectedTenantDetails.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t('dashLabelRent')}:</span>
                <span className="font-bold text-[#1b7f45]">{selectedTenantDetails.offeredRent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t('dashLabelApplied')}:</span>
                <span className="text-slate-600">{selectedTenantDetails.timeAgo}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedTenantDetails(null)}
                className="flex-1 py-1.5 font-semibold text-slate-600 bg-slate-100 rounded-lg"
              >
                {t('dashBtnClose')}
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAcceptTenant(selectedTenantDetails.id, selectedTenantDetails.name)
                  setSelectedTenantDetails(null)
                }}
                className="flex-1 py-1.5 font-semibold text-white bg-[#1b7f45] rounded-lg shadow-sm"
              >
                {t('dashBtnAcceptTenant')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
