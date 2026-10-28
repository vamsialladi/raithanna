import RoleDashboard from './RoleDashboard.jsx'

function TenantFarmer({
  language,
  onLanguageChange,
  uiTranslations,
  dashboardTextTranslations,
  onLogout,
  userName,
}) {
  return (
    <RoleDashboard
      role="Tenant Farmer"
      language={language}
      onLanguageChange={onLanguageChange}
      uiTranslations={uiTranslations}
      dashboardTextTranslations={dashboardTextTranslations}
      onLogout={onLogout}
      userName={userName}
    />
  )
}

export default TenantFarmer