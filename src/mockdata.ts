import {
  User,
  Wallet,
  Admin,
  Tournament,
  Participant,
  Transaction,
  DepositRequest,
  WithdrawalRequest,
  AdminSettings,
} from './types';

/* =======================
   USERS & ADMINS
======================= */

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'amar_ff',
    email: 'amar@gmail.com',
    password: '123456',
    upi_id: 'amar@upi',
    created_at: '2025-01-01T10:00:00Z',
  },
  {
    id: 2,
    username: 'pro_gamer',
    email: 'progamer@gmail.com',
    password: '123456',
    upi_id: 'progamer@upi',
    created_at: '2025-01-02T12:00:00Z',
  },
];

export const mockAdmins: Admin[] = [
  {
    id: 1,
    email: 'admin@tournament.com',
    password: 'admin123',
  },
];

/* =======================
   WALLETS
======================= */

export const mockWallets: Wallet[] = [
  {
    id: 1,
    user_id: 1,
    balance: 250,
  },
  {
    id: 2,
    user_id: 2,
    balance: 80,
  },
];

/* =======================
   TOURNAMENTS
======================= */

export const mockTournaments: Tournament[] = [
  {
    id: 1,
    title: 'Free Fire Max CS Rank',
    game_name: 'Free Fire Max',
    entry_fee: 50,
    prize_pool: 1000,
    max_players: 48,
    match_time: '2025-01-20T18:30:00Z',
    status: 'Upcoming',
    registrations_open: true,
    room_id: null,
    room_password: null,
    winner_id: null,
    created_at: '2025-01-10T09:00:00Z',
  },
  {
    id: 2,
    title: 'Solo Clash Squad',
    game_name: 'Free Fire Max',
    entry_fee: 30,
    prize_pool: 500,
    max_players: 24,
    match_time: '2025-01-18T20:00:00Z',
    status: 'Completed',
    registrations_open: false,
    room_id: 'FF12345',
    room_password: 'CS2025',
    winner_id: 2,
    created_at: '2025-01-05T11:00:00Z',
  },
];

/* =======================
   PARTICIPANTS
======================= */

export const mockParticipants: Participant[] = [
  {
    id: 1,
    user_id: 1,
    tournament_id: 2,
    joined_at: '2025-01-18T19:40:00Z',
  },
  {
    id: 2,
    user_id: 2,
    tournament_id: 2,
    joined_at: '2025-01-18T19:42:00Z',
  },
];

/* =======================
   TRANSACTIONS
======================= */

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    wallet_id: 1,
    amount: 100,
    type: 'credit',
    description: 'UPI Deposit',
    reference_id: 'TXN123456',
    created_at: '2025-01-15T14:00:00Z',
  },
  {
    id: 2,
    wallet_id: 1,
    amount: 50,
    type: 'debit',
    description: 'Tournament Entry Fee',
    reference_id: null,
    created_at: '2025-01-18T19:45:00Z',
  },
];

/* =======================
   DEPOSIT REQUESTS
======================= */

export const mockDepositRequests: DepositRequest[] = [
  {
    id: 1,
    user_id: 1,
    username: 'amar_ff',
    amount: 200,
    transaction_id: 'UPI998877',
    status: 'Pending',
    created_at: '2025-01-19T09:30:00Z',
  },
];

/* =======================
   WITHDRAWAL REQUESTS
======================= */

export const mockWithdrawalRequests: WithdrawalRequest[] = [
  {
    id: 1,
    user_id: 2,
    username: 'pro_gamer',
    upi_id: 'progamer@upi',
    amount: 300,
    status: 'Pending',
    created_at: '2025-01-19T16:00:00Z',
  },
];

/* =======================
   ADMIN SETTINGS
======================= */

export const mockAdminSettings: AdminSettings = {
  admin_upi_id: 'admin@upi',
  qr_code_path: '/uploads/admin_qr.png',
};