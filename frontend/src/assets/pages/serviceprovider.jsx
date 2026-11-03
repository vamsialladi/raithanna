import RoleDashboard from './RoleDashboard.jsx'

function ServiceProvider() {
  return (
    <RoleDashboard
      role="Service Provider"
      description="Share your agricultural products or services and connect with farmers who need support."
      features={[
        { title: 'My Services', description: 'Present the agricultural services you provide.' },
        { title: 'Products', description: 'Organize products and equipment available to farmers.' },
        { title: 'Enquiries', description: 'Keep track of requests from the farming community.' },
      ]}
    />
  )
}

export default ServiceProvider