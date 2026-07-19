import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true }, // Base price or default (for display)
  images: { type: [String] },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  onSale: { type: Boolean, default: false },
  salePrice: { type: Number },
  rating: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  bestSeller: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  
  // Custom Variant Fields
  isVariantProduct: { type: Boolean, default: false },
  // Legacy fixed dimensions. Still written by the admin as a mirror of
  // variantMetrics so older clients keep working; new code reads variantMetrics.
  variantOptions: {
    diameters: [String],
    lengths: [String],
    sizes: [String],
    materials: [String],
  },
  // Admin-defined dimensions: each has a label, unit and its own values.
  variantMetrics: [
    {
      key: String,
      label: String,
      unit: String,
      values: [String],
    }
  ],
  pricingData: [
    {
      // Maps metric key -> selected value. Flat fields below are the legacy mirror.
      values: { type: Map, of: String },
      diameter: String,
      length: String,
      size: String,
      material: String,
      price: Number, // Price per 100 pcs
    }
  ],
  unit: { type: String, default: "100 pcs" },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
