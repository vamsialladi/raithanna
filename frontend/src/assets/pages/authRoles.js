import farmerImage from '../images/farmer.jpg'
import landlordImage from '../images/landlord.png'
import tenantFarmerImage from '../images/FarmLabour.png'
import serviceProviderImage from '../images/Agricultural Machinery.png'

const authRoles = [
  {
    id: 'farmer',
    name: 'Farmer',
    description: 'Grow crops and manage your farm.',
    image: farmerImage,
    imageAlt: 'Farmer inspecting crops with a phone',
    pagePath: '/farmerproject',
  },
  {
    id: 'landlord',
    name: 'Landlord',
    description: 'Manage agricultural land and connect with farmers.',
    image: landlordImage,
    imageAlt: 'Farmers meeting to discuss agricultural work',
    pagePath: '/landlord',
  },
  {
    id: 'tenant-farmer',
    name: 'Tenant Farmer',
    description: 'Farm leased land and manage your crops.',
    image: tenantFarmerImage,
    imageAlt: 'Farmers exchanging agricultural supplies',
    pagePath: '/tenentfarmer',
  },
  {
    id: 'service-provider',
    name: 'Service Provider',
    description: 'Offer products or services to the farming community.',
    image: serviceProviderImage,
    imageAlt: 'Agricultural tractor working in a field',
    pagePath: '/serviceprovider',
  },
]

export function getAuthRole(roleId) {
  return authRoles.find((role) => role.id === roleId) ?? null
}

export default authRoles
