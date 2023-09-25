export const getBestsellers = async () => {
  const response = await fetch("/bestsellers");
  if (!response.ok) {
    throw new Error("Couldn't find bestsellers");
  }
  const bestsellers = await response.json();
  return bestsellers;
};
