import RoleDashboard from './RoleDashboard.jsx'

function Buyer({
  language,
  onLanguageChange,
  uiTranslations,
  dashboardTextTranslations,
  onLogout,
  userName,
}) {
  return (
    <RoleDashboard
      role="Buyer"
      language={language}
      onLanguageChange={onLanguageChange}
      uiTranslations={uiTranslations}
      dashboardTextTranslations={dashboardTextTranslations}
      onLogout={onLogout}
      userName={userName}
    />
  )
}

export default Buyer