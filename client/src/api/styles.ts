export const getStyles = async () => {
  const response = await fetch("/styles");
  if (!response.ok) {
    throw new Error("Couldn't find styles");
  }
  const styles = await response.json();
  return styles;
};
