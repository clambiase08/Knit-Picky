export const getColors = async () => {
  const response = await fetch("/colors");
  if (!response.ok) {
    throw new Error("Couldn't find colors");
  }
  const colors = await response.json();
  return colors;
};
