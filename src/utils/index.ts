export const getNameInitials = (name: string) => {
  const firstLetter = name.charAt(0);
  const secondLetter = name.charAt(name.lastIndexOf(" ") + 1);
  return firstLetter + secondLetter;
};

export const omitEmptyValues = (obj: object | undefined) => {
  if (typeof obj === "undefined") return {};
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => !!v));
};
