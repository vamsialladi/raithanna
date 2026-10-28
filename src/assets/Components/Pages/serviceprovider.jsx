import RoleDashboard from './RoleDashboard.jsx'

function ServiceProvider({
  language,
  onLanguageChange,
  uiTranslations,
  dashboardTextTranslations,
  onLogout,
  userName,
}) {
  return (
    <RoleDashboard
      role="Service Provider"
      language={language}
      onLanguageChange={onLanguageChange}
      uiTranslations={uiTranslations}
      dashboardTextTranslations={dashboardTextTranslations}
      onLogout={onLogout}
      userName={userName}
    />
  )
}

export default ServiceProvider