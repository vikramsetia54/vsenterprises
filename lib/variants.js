/**
 * Variant metrics: shared read helpers for the storefront.
 *
 * Products used to carry exactly four hard-coded dimensions in
 * `variantOptions` (diameters / lengths / materials / sizes) with flat pricing
 * rows. Metrics are now admin-defined — each has a label, a unit and its own
 * values — and pricing rows key their selections by metric `key`.
 *
 * These helpers normalize either shape, so products saved before the change
 * keep rendering and pricing correctly.
 */

/** Legacy `variantOptions` array name for each built-in metric key. */
const BUILTIN_KEYS = {
  diameter: "diameters",
  length: "lengths",
  material: "materials",
  size: "sizes",
};

/** Labels/units the four built-ins had when they were hard-coded. */
const LEGACY_DEFAULTS = [
  { key: "diameter", label: "Diameter", unit: "" },
  { key: "length", label: "Length", unit: "mm" },
  { key: "material", label: "Grade", unit: "" },
  { key: "size", label: "Size", unit: "" },
];

/**
 * Metrics that have selectable values, in display order.
 * Returns [] for non-variant products.
 */
export function getVariantMetrics(product) {
  if (!product) return [];

  const metrics = product.variantMetrics;
  if (Array.isArray(metrics) && metrics.length > 0) {
    return metrics
      .map((m) => ({
        key: m.key,
        label: m.label || m.key,
        unit: m.unit || "",
        values: Array.isArray(m.values) ? m.values : [],
      }))
      .filter((m) => m.values.length > 0);
  }

  const opts = product.variantOptions || {};
  return LEGACY_DEFAULTS.map((m) => ({
    ...m,
    values: opts[BUILTIN_KEYS[m.key]] || [],
  })).filter((m) => m.values.length > 0);
}

/** Pricing rows normalized to `{ values: { [key]: value }, price }`. */
export function getPricingRows(product, metrics) {
  const raw = product?.pricingData;
  if (!Array.isArray(raw)) return [];

  return raw.map((row) => {
    const price = Number(row?.price ?? 0);
    if (row?.values && typeof row.values === "object") {
      return { values: { ...row.values }, price };
    }
    // Legacy flat row -> keyed map.
    const values = {};
    for (const m of metrics) {
      const v = row?.[m.key];
      if (typeof v === "string" && v !== "") values[m.key] = v;
    }
    return { values, price };
  });
}

/** Default selection: first value of each metric. */
export function defaultSelection(metrics) {
  const selected = {};
  for (const m of metrics) selected[m.key] = m.values[0] ?? "";
  return selected;
}

/**
 * Price for the given selection, or null when no row matches.
 * A row matches when every active metric's selected value equals the row's.
 */
export function findVariantPrice(rows, metrics, selected) {
  if (!metrics.length) return null;
  const match = rows.find((row) =>
    metrics.every((m) => (row.values?.[m.key] ?? "") === (selected?.[m.key] ?? ""))
  );
  return match ? Number(match.price) : null;
}

/** Display helper: "10 mm", or just "10" when the metric has no unit. */
export function formatValue(value, unit) {
  if (value === undefined || value === null || value === "") return "";
  return unit ? `${value} ${unit}` : String(value);
}
