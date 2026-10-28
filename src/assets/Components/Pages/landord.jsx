import RoleDashboard from './RoleDashboard.jsx'

function Landlord({
  language,
  onLanguageChange,
  uiTranslations,
  dashboardTextTranslations,
  onLogout,
  userName,
}) {
  return (
    <RoleDashboard
      role="Landlord Farmer"
      language={language}
      onLanguageChange={onLanguageChange}
      uiTranslations={uiTranslations}
      dashboardTextTranslations={dashboardTextTranslations}
      onLogout={onLogout}
      userName={userName}
    />
  )
}

export default Landlord