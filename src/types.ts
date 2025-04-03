// Define a Member type
export interface Member {
  id: string;
  name: string;
  email: string;
  membershipLevel: 'Basic' | 'Premium' | 'VIP';
  joinDate: string; // Using string for simplicity for now
}
