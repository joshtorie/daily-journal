export const PROMPTS = [
  'Briefly describe your morning',
  'Briefly describe your afternoon',
  'Briefly describe your evening',
] as const;

export type TimeOfDay = typeof PROMPTS[number];