export type UserRole = "user" | "admin";

export type Book = {
  id: string;
  title: string;
  author: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  coverUrl: string;
  isbn?: string;
  publisher?: string;
  language?: string;
  pages?: number;
  featured: boolean;
  createdAt: string;
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
};

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profile: Omit<UserProfile, "name" | "email">;
};

export type SessionData = Pick<PublicUser, "id" | "role"> & {
  sessionVersion: number;
};

export type CartItem = {
  bookId: string;
  slug: string;
  title: string;
  author: string;
  coverUrl: string;
  price: number;
  stock: number;
  quantity: number;
};

export type ShippingAddress = {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
};

export type OrderStatus =
  | "placed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "demo_paid" | "pending" | "failed" | "refunded";

export type OrderItem = {
  bookId: string;
  slug: string;
  title: string;
  author: string;
  coverUrl: string;
  priceAtPurchase: number;
  quantity: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
};

export type ApiSuccess<T> = { success: true; data: T };
export type ApiFailure = {
  success: false;
  error: { code: string; message: string; fields?: Record<string, string[]> };
};
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
