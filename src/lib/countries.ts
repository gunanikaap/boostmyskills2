import { countries } from "countries-list";

export type SelectOption = { label: string; value: string };

// Build a full, alphabetically sorted country option list from the
// `countries-list` package so we never hand-maintain the list.
export const countryOptions: SelectOption[] = Object.values(countries)
  .map((country) => ({ label: country.name, value: country.name }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const defaultCountry = "Ireland";

export const genderOptions: SelectOption[] = [
  { label: "Select gender", value: "" },
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Non-binary / Third gender", value: "Non-binary / Third gender" },
  { label: "Prefer not to say", value: "Prefer not to say" },
  { label: "Other", value: "Other" }
];
