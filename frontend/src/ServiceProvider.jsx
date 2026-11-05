
import React, { useRef, useState, useEffect } from "react";
import {
  ChevronDown,
  Leaf,
  Package,
  Pencil,
  Search,
  Sprout,
  Trash2,
} from "lucide-react";
import seedsMarketHeroImage from "./assets/images/seeds-market-hero.jpeg";
import "./ServiceProvider.css";

const initialProducts = [
  {
    id: 1,
    name: "Paddy Seeds",
    type: "Seeds",
    crops: ["Paddy", "Maize"],
    price: 650,
    quantity: 100,
    unit: "kg",
    description: "High-quality seeds for cultivation.",
  },
  {
    id: 2,
    name: "Neem Pesticide",
    type: "Pesticides",
    crops: ["Paddy", "Cotton"],
    price: 320,
    quantity: 50,
    unit: "litre",
    description: "Neem-based crop protection solution.",
  },
  {
    id: 3,
    name: "Maize Seeds",
    type: "Seeds",
    crops: ["Maize"],
    price: 540,
    quantity: 75,
    unit: "kg",
    description: "Quality maize seeds for farmers.",
  },
];

const cropOptions = {
  Seeds: [
    "Paddy",
    "Maize",
    "Cotton",
    "Chilli",
    "Groundnut",
    "Tomato",
    "Wheat",
    "Soybean",
    "Sugarcane",
    "Pulses",
    "Other",
  ],
  Pesticides: [
    "Paddy",
    "Maize",
    "Cotton",
    "Chilli",
    "Groundnut",
    "Tomato",
    "Wheat",
    "Soybean",
    "Sugarcane",
    "Pulses",
    "Onion",
    "Potato",
    "Brinjal",
    "Okra",
    "Other",
  ],
};

const productOptions = {
  Seeds: [
    "Paddy Seeds",
    "Maize Seeds",
    "Cotton Seeds",
    "Chilli Seeds",
    "Groundnut Seeds",
    "Tomato Seeds",
    "Wheat Seeds",
    "Soybean Seeds",
    "Other",
  ],
  Pesticides: [
    "Neem Pesticide",
    "Neem Oil Pesticide",
    "Neem Cake",
    "Bt Bio-pesticide",
    "Trichoderma Biofungicide",
    "Insecticide",
    "Fungicide",
    "Herbicide",
    "Other",
  ],
};

const emptyForm = {
  type: "Seeds",
  productOption: "",
  name: "",
  crops: [],
  price: "",
  quantity: "",
  unit: "kg",
  description: "",
};

function ServiceProvider() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  // Professional notification
  const [toast, setToast] = useState({
    text: "",
    type: "success",
  });
  const cropDropdownRef = useRef(null);

  // Automatically hide notification after 3 seconds
  useEffect(() => {
    if (!toast.text) return;

    const timer = setTimeout(() => {
      setToast({ text: "", type: "success" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (text, type = "success") => {
    setToast({ text, type });
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesTab =
      activeTab === "All" || product.type === activeTab;

    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.crops.some((crop) =>
        crop.toLowerCase().includes(search.toLowerCase())
      );

    return matchesTab && matchesSearch;
  });

  const isAllSelected =
    filteredProducts.length > 0 &&
    filteredProducts.every((product) =>
      selectedIds.includes(product.id)
    );

  // Select multiple crops
  const handleCropChange = (crop) => {
    setForm((prev) => ({
      ...prev,
      crops: prev.crops.includes(crop)
        ? prev.crops.filter((item) => item !== crop)
        : [...prev.crops, crop],
    }));
  };

  // Select all filtered products
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((prev) =>
        prev.filter(
          (id) =>
            !filteredProducts.some((product) => product.id === id)
        )
      );
    } else {
      setSelectedIds((prev) => [
        ...new Set([
          ...prev,
          ...filteredProducts.map((product) => product.id),
        ]),
      ]);
    }
  };

  // Select individual product
  const handleSelectProduct = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // Clear form
  const handleClear = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    cropDropdownRef.current?.removeAttribute("open");
  };

  // Add or update product
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.productOption) {
      showToast("Please choose a product.", "error");
      return;
    }

    if (
      (form.type === "Pesticides" || form.productOption === "Other") &&
      !form.name.trim()
    ) {
      showToast(
        form.type === "Pesticides"
          ? "Please enter the pesticide name."
          : "Please enter a product name.",
        "error"
      );
      return;
    }

    if (form.type === "Seeds" && form.crops.length === 0) {
      showToast("Please select at least one crop", "error");
      return;
    }

    const productData = {
      name: form.type === "Pesticides"
        ? form.name.trim()
        : form.productOption === "Other"
          ? form.name.trim()
          : form.productOption,
      type: form.type,
      productVariant: form.type === "Pesticides" ? form.productOption : "",
      crops: form.type === "Seeds" ? form.crops : [],
      price: Number(form.price),
      quantity: Number(form.quantity),
      unit: form.unit,
      description: form.description,
    };

    if (
      !productData.name ||
      productData.price <= 0 ||
      productData.quantity < 0 ||
      form.price === "" ||
      form.quantity === ""
    ) {
      showToast("Please enter valid product details.", "error");
      return;
    }

    if (editingId !== null) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingId
            ? { ...product, ...productData }
            : product
        )
      );

      showToast("Product updated successfully!");
    } else {
      setProducts((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...productData,
        },
      ]);

      showToast("Product added successfully!");
    }

    setForm({ ...emptyForm });
    setEditingId(null);
    cropDropdownRef.current?.removeAttribute("open");
  };

  // Edit product
  const handleEdit = (product) => {
    const category = product.type.split("+")[0].trim();
    const matchingProduct = productOptions[category].find(
      (option) =>
        option === product.productVariant ||
        option === product.name
    );
    const productOption = matchingProduct || "Other";

    setForm({
      type: category,
      productOption,
      name:
        category === "Pesticides" || productOption === "Other"
          ? product.name
          : "",
      crops: category === "Seeds" ? product.crops : [],
      price: String(product.price),
      quantity: String(product.quantity),
      unit: product.unit,
      description: product.description,
    });

    setEditingId(product.id);
    cropDropdownRef.current?.removeAttribute("open");
    setToast({ text: "", type: "success" });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete products and show the same success notification used by other actions.
  const handleDeleteProducts = (idsToDelete) => {
    setProducts((prev) =>
      prev.filter((product) => !idsToDelete.includes(product.id))
    );

    setSelectedIds((prev) =>
      prev.filter((id) => !idsToDelete.includes(id))
    );

    showToast(
      idsToDelete.length === 1
        ? "Product deleted successfully!"
        : `${idsToDelete.length} products deleted successfully!`
    );
  };

  // Delete selected products
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      showToast("Please select products first.", "error");
      return;
    }

    handleDeleteProducts(selectedIds);
  };

  // Edit selected product
  const handleEditSelected = () => {
    if (selectedIds.length !== 1) {
      showToast("Please select exactly one product to edit.", "error");
      return;
    }

    const product = products.find(
      (item) => item.id === selectedIds[0]
    );

    if (product) {
      handleEdit(product);
    }
  };

  return (
    <div className="sp-page">

      {/* PAGE BANNER */}
      <section className="mb-6 grid overflow-hidden rounded-[24px] border border-[#dcebdd] bg-white shadow-[0_8px_28px_rgba(20,60,30,0.08)] md:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center bg-gradient-to-br from-[#f2fbf2] to-white px-6 py-7 sm:px-9 sm:py-9 lg:px-12">
          <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#e6f5e8] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#287440]">
            <Leaf size={14} aria-hidden="true" />
            Service provider dashboard
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#124d22] sm:text-4xl lg:text-[42px]">
            Service Providers
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#526b58] sm:text-base sm:leading-7">
            Showcase your agricultural products, connect with farmers, and manage your seed and pesticide listings in one place.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-[#d9eadb] bg-white/80 px-3 py-1.5 text-xs font-medium text-[#42634a]">
              Seeds
            </span>
            <span className="rounded-full border border-[#d9eadb] bg-white/80 px-3 py-1.5 text-xs font-medium text-[#42634a]">
              Pesticides
            </span>
            <span className="rounded-full border border-[#d9eadb] bg-white/80 px-3 py-1.5 text-xs font-medium text-[#42634a]">
              Farmer connections
            </span>
          </div>
        </div>

        <div className="relative min-h-52 overflow-hidden sm:min-h-64">
          <img
            src={seedsMarketHeroImage}
            alt="Colorful varieties of seeds displayed at a market"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#103d24]/45 via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:to-[#103d24]/10" />
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#214b32] shadow-sm backdrop-blur sm:bottom-5 sm:right-5">
            <Sprout size={15} aria-hidden="true" />
            Supporting local agriculture
          </span>
        </div>
      </section>

      {/* ADD PRODUCT SECTION */}
      <section className="sp-card">

        <div className="sp-card-heading px-5 pt-5 sm:px-7 sm:pt-6">
          <span className="sp-heading-icon" aria-hidden="true">
            <Package size={22} />
          </span>
          <h2>{editingId ? "Edit Product" : "Add Products"}</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-x-6 gap-y-5 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-4"
        >
          <div className="flex min-w-0 flex-col gap-2 lg:col-span-2">
            <label htmlFor="product-type" className="text-sm font-bold text-[#27382b]">
              Category <span className="text-red-600">*</span>
            </label>
            <select
              id="product-type"
              value={form.type}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  type: e.target.value,
                  productOption: "",
                  name: "",
                  crops: e.target.value === "Seeds"
                    ? prev.crops.filter((crop) =>
                        cropOptions.Seeds.includes(crop)
                      )
                    : [],
                }))
              }
              className="w-full rounded-lg border border-[#d8e0d9] bg-white px-3.5 py-3 text-sm text-[#26392b] outline-none transition focus:border-[#168536] focus:ring-2 focus:ring-[#168536]/15"
            >
              <option value="Seeds">Seeds</option>
              <option value="Pesticides">Pesticides</option>
            </select>
            <span className="text-xs leading-5 text-[#718074]">
              {form.type === "Seeds"
                ? "Choose seeds and the crops they are intended for."
                : "Choose a pesticide and the crops it is intended to protect."}
            </span>
          </div>

          <div className="flex min-w-0 flex-col gap-2 lg:col-span-2">
            <label htmlFor="product-option" className="text-sm font-bold text-[#27382b]">
              Product <span className="text-red-600">*</span>
            </label>
            <select
              id="product-option"
              value={form.productOption}
              onChange={(e) =>
                setForm({
                  ...form,
                  productOption: e.target.value,
                  name: form.type === "Pesticides" ? form.name : "",
                })
              }
              required
              className="w-full rounded-lg border border-[#d8e0d9] bg-white px-3.5 py-3 text-sm text-[#26392b] outline-none transition focus:border-[#168536] focus:ring-2 focus:ring-[#168536]/15"
            >
              <option value="" disabled>
                Choose a {form.type.toLowerCase()} product
              </option>
              {productOptions[form.type].map((product) => (
                <option key={product} value={product}>
                  {product === "Other" ? "Other (enter product name)" : product}
                </option>
              ))}
            </select>
            {(form.type === "Pesticides" || form.productOption === "Other") && (
              <div className="flex flex-col gap-2">
                <label htmlFor="product-name" className="text-sm font-bold text-[#27382b]">
                  {form.type === "Pesticides" ? "Pesticide Name" : "Product Name"}{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  id="product-name"
                  type="text"
                  placeholder={
                    form.type === "Pesticides"
                      ? "Enter the pesticide brand or product name"
                      : "Enter product name"
                  }
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                  className="w-full min-w-0 rounded-lg border border-[#d8e0d9] bg-white px-3.5 py-3 text-sm text-[#26392b] outline-none transition placeholder:text-[#89968c] focus:border-[#168536] focus:ring-2 focus:ring-[#168536]/15"
                />
              </div>
            )}
          </div>

          {form.type === "Seeds" && (
            <div className="flex min-w-0 flex-col gap-2 lg:col-span-2">
              <span className="text-sm font-bold text-[#27382b]">
                Crop <span className="text-red-600">*</span>
              </span>
              <details ref={cropDropdownRef} className="group relative">
                <summary
                  className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-lg border border-[#d8e0d9] bg-white px-3.5 py-2.5 text-sm text-[#26392b] outline-none transition focus-visible:border-[#168536] focus-visible:ring-2 focus-visible:ring-[#168536]/15 [&::-webkit-details-marker]:hidden"
                  aria-label="Choose one or more crops"
                >
                  <span className="flex min-w-0 flex-1 flex-wrap gap-1.5">
                    {form.crops.length ? (
                      form.crops.map((crop) => (
                        <span
                          key={crop}
                          className="rounded-md bg-[#eaf6eb] px-2 py-1 text-xs font-medium text-[#17652b]"
                        >
                          {crop}
                        </span>
                      ))
                    ) : (
                      <span className="py-1 text-[#89968c]">
                        Choose one or more crops
                      </span>
                    )}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-base text-[#536457] transition group-open:rotate-180"
                  >
                    ▾
                  </span>
                </summary>
                <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-lg border border-[#d8e0d9] bg-white p-1.5 shadow-lg">
                  {cropOptions.Seeds.map((crop) => {
                    const isSelected = form.crops.includes(crop);
                    return (
                      <button
                        key={crop}
                        type="button"
                        onClick={() => handleCropChange(crop)}
                        aria-pressed={isSelected}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
                          isSelected
                            ? "bg-[#eaf6eb] font-semibold text-[#17652b]"
                            : "text-[#344b38] hover:bg-[#f5f9f5]"
                        }`}
                      >
                        {crop}
                        {isSelected && <span aria-hidden="true">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </details>
              {form.crops.length === 0 && (
                <span className="text-xs text-[#778579]">
                  Select one or more crops.
                </span>
              )}
            </div>
          )}

          <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="product-price" className="text-sm font-bold text-[#27382b]">
              Price (₹) <span className="text-red-600">*</span>
            </label>
            <input
              id="product-price"
              type="number"
              min="1"
              placeholder="e.g., 450"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              required
              className="w-full min-w-0 rounded-lg border border-[#d8e0d9] bg-white px-3.5 py-3 text-sm text-[#26392b] outline-none transition placeholder:text-[#89968c] focus:border-[#168536] focus:ring-2 focus:ring-[#168536]/15"
            />
          </div>

          <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="product-quantity" className="text-sm font-bold text-[#27382b]">
              Quantity <span className="text-red-600">*</span>
            </label>
            <input
              id="product-quantity"
              type="number"
              min="0"
              placeholder="e.g., 50"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: e.target.value })
              }
              required
              className="w-full min-w-0 rounded-lg border border-[#d8e0d9] bg-white px-3.5 py-3 text-sm text-[#26392b] outline-none transition placeholder:text-[#89968c] focus:border-[#168536] focus:ring-2 focus:ring-[#168536]/15"
            />
          </div>

          <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="product-unit" className="text-sm font-bold text-[#27382b]">
              Unit <span className="text-red-600">*</span>
            </label>
            <select
              id="product-unit"
              value={form.unit}
              onChange={(e) =>
                setForm({ ...form, unit: e.target.value })
              }
              className="w-full rounded-lg border border-[#d8e0d9] bg-white px-3.5 py-3 text-sm text-[#26392b] outline-none transition focus:border-[#168536] focus:ring-2 focus:ring-[#168536]/15"
            >
              <option value="kg">kg</option>
              <option value="gram">gram</option>
              <option value="litre">litre</option>
              <option value="ml">ml</option>
              <option value="packet">packet</option>
              <option value="piece">piece</option>
            </select>
          </div>

          <div className="flex min-w-0 flex-col gap-2 lg:col-span-2">
            <label htmlFor="product-description" className="text-sm font-bold text-[#27382b]">
              Description
            </label>
            <textarea
              id="product-description"
              placeholder="Enter product details (quality, usage, coverage)"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows="3"
              className="w-full min-w-0 resize-y rounded-lg border border-[#d8e0d9] bg-white px-3.5 py-3 text-sm text-[#26392b] outline-none transition placeholder:text-[#89968c] focus:border-[#168536] focus:ring-2 focus:ring-[#168536]/15"
            />
          </div>

          <div className="col-span-full mt-1 flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <button
              type="button"
              className="sp-btn sp-btn-secondary"
              onClick={handleClear}
            >
              Clear
            </button>

            <button
              type="submit"
              className="sp-btn sp-btn-primary"
            >
              {editingId
                ? "✓ Update Product"
                : "+ Add Product"}
            </button>
          </div>

        </form>
      </section>

      {/* MY LISTINGS */}
      <section className="sp-card sp-list-card">

        {/* LISTING HEADER */}
        <div className="sp-list-heading">

          <div className="sp-card-heading">
            <span className="sp-heading-icon" aria-hidden="true">
              <Package size={22} />
            </span>
            <h2>My Listings</h2>

            <span className="sp-count">
              {products.length} products
            </span>
          </div>

          {/* BULK ACTIONS */}
          <div className="sp-bulk-actions">

            <button
              type="button"
              className="sp-btn sp-btn-danger"
              onClick={handleDeleteSelected}
              disabled={selectedIds.length === 0}
            >
              <Trash2 size={15} aria-hidden="true" />
              Delete Selected
            </button>

            <button
              type="button"
              className="sp-btn sp-btn-edit"
              onClick={handleEditSelected}
              disabled={selectedIds.length !== 1}
            >
              <Pencil size={15} aria-hidden="true" />
              Edit Selected
            </button>

          </div>
        </div>

        {/* SEARCH AND FILTER */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end lg:flex-nowrap">
          <label className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#718074]">
              Search listings
            </span>
            <span className="flex h-11 items-center gap-2.5 rounded-xl border border-[#dce4dd] bg-white px-3.5 text-[#7a887c] shadow-sm transition focus-within:border-[#15803d] focus-within:ring-4 focus-within:ring-[#15803d]/10">
              <Search size={17} aria-hidden="true" />
              <input
                type="search"
                placeholder="Search by product name or crop"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="sp-list-search-input min-w-0 flex-1 border-0 bg-transparent text-sm text-[#26392b] outline-none placeholder:text-[#97a198]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="grid size-7 place-items-center rounded-full text-lg leading-none text-[#718074] transition hover:bg-[#f1f5f1] hover:text-[#26392b]"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </span>
          </label>

          <label className="flex w-full flex-col gap-1.5 sm:w-52">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#718074]">
              Product category
            </span>
            <span className="relative">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                aria-label="Filter listings by product category"
                className="h-11 w-full appearance-none rounded-xl border border-[#dce4dd] bg-white px-3.5 pr-10 text-sm font-medium text-[#26392b] shadow-sm outline-none transition focus:border-[#15803d] focus:ring-4 focus:ring-[#15803d]/10"
              >
                <option value="All">All categories</option>
                <option value="Seeds">Seeds</option>
                <option value="Pesticides">Pesticides</option>
              </select>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#718074]"
              />
            </span>
          </label>

          <span className="basis-full pb-1 text-left text-sm text-[#718074] lg:ml-auto lg:basis-auto lg:whitespace-nowrap lg:text-right">
            Showing{" "}
            <strong className="font-semibold text-[#26392b]">
              {filteredProducts.length}
            </strong>{" "}
            of {products.length} products
          </span>
        </div>

        {/* PRODUCT TABLE */}
        <div className="sp-table-wrapper">

          <table className="sp-table">

            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    aria-label="Select all products"
                  />
                </th>

                <th>Product</th>
                <th>Type</th>
                <th>Crop</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>

                  {/* SELECT */}
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(product.id)}
                      onChange={() =>
                        handleSelectProduct(product.id)
                      }
                      aria-label={`Select ${product.name}`}
                    />
                  </td>

                  {/* PRODUCT */}
                  <td>
                    <div className="flex flex-col gap-0.5">
                      <strong>{product.name}</strong>
                      {product.productVariant &&
                        product.productVariant !== product.name && (
                          <span className="text-xs text-[#718074]">
                            {product.productVariant}
                          </span>
                        )}
                    </div>
                  </td>

                  {/* TYPE */}
                  <td>
                    <span
                      className={`sp-type-badge ${
                        product.type.includes("Pesticides")
                          ? "pesticide-badge"
                          : "seed-badge"
                      }`}
                    >
                      {product.type}
                    </span>
                  </td>

                  {/* CROP */}
                  <td>{product.crops.length ? product.crops.join(", ") : "—"}</td>

                  {/* PRICE */}
                  <td className="sp-price">
                    ₹{product.price} / {product.unit}
                  </td>

                  {/* QUANTITY */}
                  <td>
                    {product.quantity} {product.unit}
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`sp-status ${
                        product.quantity > 0
                          ? "status-active"
                          : "status-out"
                      }`}
                    >
                      {product.quantity > 0
                        ? "● Active"
                        : "● Out of Stock"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div className="sp-row-actions">

                      <button
                        type="button"
                        className="sp-icon-btn edit-icon"
                        title="Edit product"
                        aria-label={`Edit ${product.name}`}
                        onClick={() => handleEdit(product)}
                      >
                        <Pencil size={16} aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        className="sp-icon-btn delete-icon"
                        title="Delete product"
                        aria-label={`Delete ${product.name}`}
                        onClick={() => handleDeleteProducts([product.id])}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {/* EMPTY STATE */}
          {filteredProducts.length === 0 && (
            <div className="sp-empty-state">
              <span>🌱</span>
              <h3>No products found</h3>
              <p>Add a product or change your search filters.</p>
            </div>
          )}

        </div>

        {/* SELECTED COUNT */}
        {selectedIds.length > 0 && (
          <p className="sp-selection-info">
            {selectedIds.length} product(s) selected
          </p>
        )}

      </section>

      {/* PROFESSIONAL TOAST */}
      {toast.text && (
        <div
          className={`fixed bottom-6 right-6 z-[1000] flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-semibold shadow-lg sm:right-8 ${
            toast.type === "success"
              ? "bg-[#e8f8e9] text-[#17632a]"
              : "bg-[#fff0f0] text-[#b42323]"
          }`}
          role="status"
        >
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/70 font-bold">
            {toast.type === "success" ? "✓" : "!"}
          </span>

          <span className="flex-1">{toast.text}</span>

          <button
            type="button"
            className="ml-1 grid size-7 shrink-0 place-items-center rounded-full text-xl leading-none transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            onClick={() =>
              setToast({ text: "", type: "success" })
            }
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}

    </div>
  );
}

export default ServiceProvider;
