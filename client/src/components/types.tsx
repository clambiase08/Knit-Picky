export interface Order {
  id: number;
  customer_id: number;
  status: string;
  orderitems: OrderItem[];
}

export interface OrderItem {
  id: number;
  quantity: number;
  subtotal: number;
  order_id: number;
  style_id: number;
  sku_id: number;
  style: {
    style_name: string;
    price: number;
  };
}

export interface Style {
  id: number;
  style_name: string;
  description?: string;
  price: number;
  stock_quantity?: number;
  category_id?: number;
  skus: Skus[];
}

export interface Skus {
  color_id: number;
  id: number;
  image: string;
  sku: string;
  style_id: number;
}

export interface Customer {
  id?: number;
  // username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  shipping_address?: string;
  billing_address?: string;
  wishlist_items?: WishlistItem[];
}

export interface WishlistItem {
  id: number;
  style_id: number;
  customer_id: number;
}

export interface ProductCardProps {
  id: number;
  style_name: string;
  price: number;
  color_ids: number[];
  images: string[];
}
