// "food" → "Food"
export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

// "2026-10-18T10:37:57.547Z" → "18 Oct 2026"
export const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
