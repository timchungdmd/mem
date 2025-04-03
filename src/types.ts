// Define a Member type
export interface Member {
  id: string;
  name: string;
  email: string;
  membershipLevel: 'Basic' | 'Premium' | 'VIP'; // This might need to become dynamic later based on Tiers
  joinDate: string; // Using string for simplicity for now
}

// Define a Perk type
export interface Perk {
  id: string;
  description: string;
}

// Define a Tier type
export interface Tier {
  id: string;
  name: string;
  price: number; // Monthly price, for example
  description: string;
  perks: Perk[];
}
