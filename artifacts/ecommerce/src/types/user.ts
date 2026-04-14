export type Address = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  joinedAt: string;
  address?: Address;
};
