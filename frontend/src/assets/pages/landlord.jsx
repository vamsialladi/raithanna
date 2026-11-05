import RoleDashboard from './RoleDashboard.jsx'

function Landlord() {
  return (
    <RoleDashboard
      role="Landlord"
      description="Keep your agricultural land information organized and connect with farmers looking for land."
      features={[
        { title: 'My Land', description: 'Add and review your agricultural land details.' },
        { title: 'Farmer Requests', description: 'Review enquiries from farmers interested in your land.' },
        { title: 'Land Agreements', description: 'Keep important leasing and agreement information together.' },
      ]}
    />
  )
}

export default Landlord