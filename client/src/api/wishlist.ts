export const addWishlistItem = async (wishlistItemAdd: {
  customer_id: number | undefined;
  style_id: number;
}) => {
  const response = await fetch("/wishlist_items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wishlistItemAdd),
  });
  if (!response.ok) {
    throw new Error("Failed to add wishlist item");
  }
  const newWishlistItem = await response.json();
  return newWishlistItem;
};

export const deleteWishlistItem = async (id: number) => {
  const response = await fetch(`/wishlist_items/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete wishlist item");
  }
};
