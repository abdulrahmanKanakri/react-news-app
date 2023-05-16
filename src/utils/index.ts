export const getNameInitials = (name: string) => {
  const firstLetter = name.charAt(0);
  const secondLetter = name.charAt(name.lastIndexOf(" ") + 1);
  return firstLetter + secondLetter;
};
