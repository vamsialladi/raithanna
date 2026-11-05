import { useState } from 'react'

const farmingTypes = [
  {
    name: 'Crop Farming',
    description: 'Grow and manage seasonal crops with a clear plan.',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    icon: '🌱',
  },
  {
    name: 'Aqua Farming',
    description: 'Plan fish and shrimp farming for healthy yields.',
    image:
      'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=800&q=80',
    icon: '🐟',
  },
  {
    name: 'Dairy Farming',
    description: 'Keep track of dairy animals and daily farm work.',
    image:
      'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: '🐄',
  },
  {
    name: 'Poultry Farming',
    description: 'Organize poultry care, feeding and production.',
    image:
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    icon: '🐓',
  },
  {
    name: 'Organic Farming',
    description: 'Build a farm with natural and sustainable practices.',
    image:
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80',
    icon: '🌿',
  },
  {
    name: 'Mushroom Farming',
    description: 'Manage mushroom growing cycles and harvests.',
    image:
      'https://images.unsplash.com/photo-1504545102780-26774c1bb073?auto=format&fit=crop&w=800&q=80',
    icon: '🍄',
  },
]

const benefits = [
  { icon: '🌱', title: 'Add Crop', subtitle: 'Details' },
  { icon: '▥', title: 'Track', subtitle: 'Growth' },
  { icon: '✳', title: 'Get Expert', subtitle: 'Advice' },
  { icon: '₹', title: 'Improve', subtitle: 'Yield & Income' },
]

const seasonOptions = [
  'Kharif (Rainy season)',
  'Rabi (Winter season)',
  'Zaid (Summer season)',
  'Not sure',
]
const landOptions = [
  'Below 1 Acre',
  '1 Acre',
  '2 Acres',
  '3–5 Acres',
  '5–10 Acres',
  'Above 10 Acres',
  'Not sure',
]
const soilOptions = [
  'Red Soil',
  'Black Soil',
  'Sandy Soil',
  'Clay Soil',
  'Mixed Soil',
  'Not sure',
]
const waterOptions = [
  'Borewell',
  'Open Well',
  'Canal Water',
  'Rainwater',
  'River Water',
  'Drip Irrigation',
  'Sprinkler Irrigation',
  'No Irrigation Facility',
]
const resourceOptions = [
  'Seeds',
  'Fertilizers',
  'Pesticides',
  'Tractor',
  'Harvesting Machine',
  'Farm Workers',
  'Storage Facility',
  'Fencing',
  'Organic Manure',
]
const stageOptions = [
  'Land Preparation',
  'Seeds Sown',
  'Growing',
  'Flowering',
  'Fruiting',
  'Ready for Harvest',
  'Already Harvested',
]
const otherFacilityOptions = [
  'Farm Land',
  'Irrigation Facility',
  'Electricity',
  'Farm Equipment',
  'Nearby Market',
  'Cold Storage',
]

function createEmptyForm(type = 'Crop Farming') {
  return {
    type,
    crop: '',
    season: '',
    landSize: '',
    soil: '',
    waterFacilities: [],
    resources: [],
    stage: '',
    otherFacilities: [],
    otherInfo: '',
  }
}

function FarmerProject() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [crops, setCrops] = useState([])
  const [form, setForm] = useState(() => createEmptyForm())

  function updateForm(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function toggleOption(group, option) {
    setForm((current) => {
      const selectedOptions = current[group]

      if (group === 'waterFacilities' && option === 'No Irrigation Facility') {
        return {
          ...current,
          waterFacilities: selectedOptions.includes(option) ? [] : [option],
        }
      }

      const filteredOptions =
        group === 'waterFacilities'
          ? selectedOptions.filter(
              (selectedOption) => selectedOption !== 'No Irrigation Facility',
            )
          : selectedOptions
      const nextOptions = filteredOptions.includes(option)
        ? filteredOptions.filter((selectedOption) => selectedOption !== option)
        : [...filteredOptions, option]

      return { ...current, [group]: nextOptions }
    })
  }

  function addCrop(event) {
    event.preventDefault()
    setCrops((current) => [{ ...form, crop: form.crop.trim(), id: Date.now() }, ...current])
    setForm(createEmptyForm())
    setIsFormOpen(false)
  }

  function openForm(type) {
    setForm(createEmptyForm(type || 'Crop Farming'))
    setIsFormOpen(true)
  }

  function renderCheckboxes(group, options) {
    return options.map((option) => (
      <label
        className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-[#e1e9e2] px-3 text-sm text-[#344139] hover:bg-[#f5faf5]"
        key={option}
      >
        <input
          className="h-4 w-4 accent-[#087a31]"
          type="checkbox"
          checked={form[group].includes(option)}
          onChange={() => toggleOption(group, option)}
        />
        {option}
      </label>
    ))
  }

  return (
    <main className="bg-[#f8faf8]">
      <section className="border-b border-[#e7eee8] bg-white">
        <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-6 py-7 md:grid-cols-[1.15fr_0.85fr] md:gap-10 md:px-10 md:py-10 xl:gap-14 xl:px-12 xl:py-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#167333]">
              Crop Management
            </p>
            <h1 className="mt-2 text-[clamp(2.4rem,4.8vw,3.4rem)] font-extrabold leading-[1.08] tracking-tight text-[#12231a]">
              Add &amp; Manage
              <span className="block text-[#08732d]">Your Crop Information</span>
            </h1>
            <p className="mt-4 max-w-[580px] text-base leading-7 text-[#344139]">
              Keep your farm updated by adding new crop types, tracking crop
              details, and getting expert support for better yield and profit.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {benefits.map((benefit) => (
                <div className="flex items-center gap-2" key={benefit.title}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf6eb] text-lg font-bold text-[#08732d]">
                    {benefit.icon}
                  </span>
                  <span className="text-xs font-semibold leading-tight text-[#24342a]">
                    {benefit.title}
                    <span className="block">{benefit.subtitle}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <img
            className="h-[230px] w-full rounded-[24px] object-cover object-center shadow-sm sm:h-[270px] lg:h-[310px] xl:h-[340px]"
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=85"
            alt="Farmer checking crops in a green field"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-7 sm:py-9">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#167333]">
              Types of Farming
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#18271e] sm:text-[28px]">
              Farming Types
            </h2>
            <p className="mt-1 text-sm text-[#526057]">
              Explore farming options and find the right support for your farm.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {farmingTypes.map((type) => (
            <article
              className="overflow-hidden rounded-2xl border border-[#e1e9e2] bg-white shadow-[0_3px_12px_rgba(27,72,43,0.07)] transition hover:-translate-y-0.5 hover:shadow-md"
              key={type.name}
            >
              <img
                className="h-36 w-full object-cover"
                src={type.image}
                alt=""
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="flex items-center gap-2 text-base font-bold text-[#1d3024]">
                  <span aria-hidden="true">{type.icon}</span>
                  {type.name}
                </h3>
                <p className="mt-1 min-h-10 text-sm leading-5 text-[#58665c]">
                  {type.description}
                </p>
                <button
                  className="mt-3 min-h-9 w-full rounded-full border border-[#16813b] text-xs font-bold text-[#116b31] transition hover:bg-[#eff8ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087a31]"
                  type="button"
                  onClick={() => openForm(type.name)}
                >
                  Add to my farm <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-10">
        <div className="rounded-2xl border border-[#e0ece2] bg-[#edf7ef] p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#167333]">
                My Farm Overview
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-[#18271e]">
                Your Crops
              </h2>
              <p className="mt-1 text-sm text-[#526057]">
                Keep your crop details and farming plans together.
              </p>
            </div>
            <button
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#087a31] px-4 text-sm font-bold text-white transition hover:bg-[#066326] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087a31]"
              type="button"
              onClick={() => openForm()}
            >
              <span aria-hidden="true">＋</span> Add a Crop
            </button>
          </div>

          {isFormOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#102016]/60 p-3 sm:p-6">
              <form
                aria-labelledby="crop-form-title"
                aria-modal="true"
                className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
                onSubmit={addCrop}
                role="dialog"
              >
                <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#e5ece6] bg-white px-5 py-4 sm:px-7">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#167333]">
                      My Farm
                    </p>
                    <h2
                      className="mt-1 text-xl font-extrabold text-[#18271e] sm:text-2xl"
                      id="crop-form-title"
                    >
                      Add Crop Details
                    </h2>
                    <p className="mt-1 text-sm text-[#58665c]">
                      Tell us about your crop and available farm resources.
                    </p>
                  </div>
                  <button
                    aria-label="Close crop form"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl text-[#647268] hover:bg-[#f1f5f1]"
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6 px-5 py-5 sm:px-7">
                  <label className="block text-sm font-semibold text-[#29382e]">
                    Farming type
                    <select
                      className="mt-1.5 min-h-11 w-full rounded-lg border border-[#d5dfd7] bg-white px-3 font-normal outline-none focus:border-[#258047] focus:ring-2 focus:ring-[#258047]/20"
                      name="type"
                      value={form.type}
                      onChange={updateForm}
                    >
                      {farmingTypes.map((type) => (
                        <option key={type.name} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <fieldset>
                    <legend className="mb-2 text-sm font-bold text-[#29382e]">
                      1. Which crop are you growing?
                    </legend>
                    <input
                      aria-label="Crop you are growing"
                      className="min-h-11 w-full rounded-lg border border-[#d5dfd7] px-3 outline-none focus:border-[#258047] focus:ring-2 focus:ring-[#258047]/20"
                      name="crop"
                      value={form.crop}
                      onChange={updateForm}
                      placeholder="Enter crop name (e.g. Paddy, Cotton, Maize)"
                      required
                    />
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 text-sm font-bold text-[#29382e]">
                      2. Which farming season?
                    </legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {seasonOptions.map((option) => (
                        <label
                          className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-[#e1e9e2] px-3 text-sm text-[#344139] hover:bg-[#f5faf5]"
                          key={option}
                        >
                          <input
                            className="h-4 w-4 accent-[#087a31]"
                            type="radio"
                            name="season"
                            value={option}
                            checked={form.season === option}
                            onChange={updateForm}
                            required
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 text-sm font-bold text-[#29382e]">
                      3. How much land do you have?
                    </legend>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {landOptions.map((option) => (
                        <label
                          className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-[#e1e9e2] px-3 text-sm text-[#344139] hover:bg-[#f5faf5]"
                          key={option}
                        >
                          <input
                            className="h-4 w-4 accent-[#087a31]"
                            type="radio"
                            name="landSize"
                            value={option}
                            checked={form.landSize === option}
                            onChange={updateForm}
                            required
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 text-sm font-bold text-[#29382e]">
                      4. What type of soil do you have?
                    </legend>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {soilOptions.map((option) => (
                        <label
                          className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-[#e1e9e2] px-3 text-sm text-[#344139] hover:bg-[#f5faf5]"
                          key={option}
                        >
                          <input
                            className="h-4 w-4 accent-[#087a31]"
                            type="radio"
                            name="soil"
                            value={option}
                            checked={form.soil === option}
                            onChange={updateForm}
                            required
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-bold text-[#29382e]">
                      5. What water facilities do you have?
                    </legend>
                    <p className="mb-2 mt-1 text-xs text-[#68766c]">
                      Select all that apply.
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {renderCheckboxes('waterFacilities', waterOptions)}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-bold text-[#29382e]">
                      6. What farming facilities or resources do you currently
                      have?
                    </legend>
                    <p className="mb-2 mt-1 text-xs text-[#68766c]">
                      Select only what you already have.
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {renderCheckboxes('resources', resourceOptions)}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 text-sm font-bold text-[#29382e]">
                      7. What is your current crop stage?
                    </legend>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {stageOptions.map((option) => (
                        <label
                          className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-[#e1e9e2] px-3 text-sm text-[#344139] hover:bg-[#f5faf5]"
                          key={option}
                        >
                          <input
                            className="h-4 w-4 accent-[#087a31]"
                            type="radio"
                            name="stage"
                            value={option}
                            checked={form.stage === option}
                            onChange={updateForm}
                            required
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 text-sm font-bold text-[#29382e]">
                      8. What other facilities do you have?
                    </legend>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {renderCheckboxes(
                        'otherFacilities',
                        otherFacilityOptions,
                      )}
                    </div>
                  </fieldset>

                  <label className="block text-sm font-bold text-[#29382e]">
                    9. Any other information?{' '}
                    <span className="font-normal text-[#68766c]">
                      (Optional)
                    </span>
                    <textarea
                      className="mt-1.5 min-h-24 w-full resize-y rounded-lg border border-[#d5dfd7] px-3 py-2 font-normal outline-none focus:border-[#258047] focus:ring-2 focus:ring-[#258047]/20"
                      name="otherInfo"
                      value={form.otherInfo}
                      onChange={updateForm}
                      placeholder="Share anything else that may help us understand your farm."
                    />
                  </label>
                </div>

                <div className="sticky bottom-0 flex justify-end gap-2 border-t border-[#e5ece6] bg-white px-5 py-4 sm:px-7">
                  <button
                    className="min-h-10 rounded-lg border border-[#d5dfd7] px-4 text-sm font-semibold text-[#415047] hover:bg-[#f5f8f5]"
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="min-h-10 rounded-lg bg-[#087a31] px-5 text-sm font-bold text-white hover:bg-[#066326]"
                    type="submit"
                  >
                    Save Crop
                  </button>
                </div>
              </form>
            </div>
          )}

          {crops.length > 0 ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {crops.map((crop) => (
                <article
                  className="rounded-xl border border-[#deeadf] bg-white p-4"
                  key={crop.id}
                >
                  <h3 className="font-bold text-[#1d3024]">{crop.crop}</h3>
                  <p className="mt-1 text-sm text-[#526057]">{crop.type}</p>
                  <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <dt className="text-[#68766c]">Season</dt>
                      <dd className="mt-0.5 font-semibold text-[#29382e]">
                        {crop.season}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#68766c]">Land size</dt>
                      <dd className="mt-0.5 font-semibold text-[#29382e]">
                        {crop.landSize}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#68766c]">Soil</dt>
                      <dd className="mt-0.5 font-semibold text-[#29382e]">
                        {crop.soil}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#68766c]">Crop stage</dt>
                      <dd className="mt-0.5 font-semibold text-[#29382e]">
                        {crop.stage}
                      </dd>
                    </div>
                  </dl>
                  {crop.waterFacilities.length > 0 && (
                    <p className="mt-3 text-xs text-[#526057]">
                      <span className="font-semibold">Water: </span>
                      {crop.waterFacilities.join(', ')}
                    </p>
                  )}
                  {crop.resources.length > 0 && (
                    <p className="mt-1 text-xs text-[#526057]">
                      <span className="font-semibold">Resources: </span>
                      {crop.resources.join(', ')}
                    </p>
                  )}
                  {crop.otherFacilities.length > 0 && (
                    <p className="mt-1 text-xs text-[#526057]">
                      <span className="font-semibold">Other facilities: </span>
                      {crop.otherFacilities.join(', ')}
                    </p>
                  )}
                  {crop.otherInfo && (
                    <p className="mt-2 text-sm text-[#526057]">
                      {crop.otherInfo}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            !isFormOpen && (
              <div className="mt-5 rounded-xl border border-dashed border-[#cbdccd] bg-white/70 px-4 py-8 text-center">
                <p className="font-semibold text-[#324439]">No crops added yet</p>
                <p className="mt-1 text-sm text-[#647268]">
                  Add a crop to start building your farm overview.
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  )
}

export default FarmerProject