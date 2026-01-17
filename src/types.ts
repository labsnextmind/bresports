export interface User {
  id: number;
  username: string;
  email: string;
  password?: string; // Only for mock data
  upi_id?: string;
  created_at: string;
}

export interface Wallet {
  id: number;
  user_id: number;
  balance: number;
}

export interface AuthenticatedUser extends Omit<User, 'password'> {
  wallet_balance: number;
}

export interface Admin {
  id: number;
  email: string;
  password?: string; // Only for mock data
}

export interface Tournament {
  id: number;
  title: string;
  game_name: string;
  entry_fee: number;
  prize_pool: number;
  max_players: number;
  match_time: string;
  status: 'Upcoming' | 'Live' | 'Completed' | 'Cancelled';
  registrations_open: boolean;
  room_id: string | null;
  room_password: string | null;
  winner_id?: number | null;
  created_at: string;
}

export interface Participant {
  id: number;
  user_id: number;
  tournament_id: number;
  joined_at: string;
}

export interface Transaction {
  id: number;
  wallet_id: number;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  reference_id: string | null;
  created_at: string;
}

export interface DepositRequest {
  id: number;
  user_id: number;
  username: string;
  amount: number;
  transaction_id: string;
  status: 'Pending' | 'Completed' | 'Rejected';
  created_at: string;
}

export interface WithdrawalRequest {
  id: number;
  user_id: number;
  username: string;
  upi_id: string;
  amount: number;
  status: 'Pending' | 'Completed';
  created_at: string;
}

export interface AdminSettings {
    admin_upi_id: string;
    qr_code_path: string;
}