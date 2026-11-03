import RoleDashboard from './RoleDashboard.jsx'

function TenantFarmer() {
  return (
    <RoleDashboard
      role="Tenant Farmer"
      description="Manage your leased farmland, crop plans, and the details you need throughout the growing season."
      features={[
        { title: 'Leased Land', description: 'Keep the location, area, and lease details for your farmland.' },
        { title: 'Crop Plans', description: 'Plan crops and record important farming dates.' },
        { title: 'Farm Support', description: 'Find agricultural services and guidance for your farm.' },
      ]}
    />
  )
}

export default TenantFarmer