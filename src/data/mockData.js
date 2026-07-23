export const CATEGORIES = ["Food", "Transport", "Rent", "Shopping", "Entertainment", "Healthcare"];

export const CATEGORY_COLORS = {
  Food: "#3B82F6",          
  Transport: "#10B981",    
  Housing: "#F59E0B",       
  Shopping: "#EF4444",      
  Entertainment: "#8B5CF6", 
  Healthcare: "#06B6D4",    
  Savings: "#14B8A6",       
  Education: "#6366F1",     
  Subscriptions: "#EC4899", 
  Other: "#6B7280",         
};


export const INITIAL_TRANSACTIONS = [
  { id: 1, date: "2026-07-20", description: "Naivas Supermarket", category: "Food", amount: 4200, type: "expense" },
  { id: 2, date: "2026-07-19", description: "Uber rides", category: "Transport", amount: 1350, type: "expense" },
  { id: 3, date: "2026-07-18", description: "Monthly salary", category: "Income", amount: 145000, type: "income" },
  { id: 4, date: "2026-07-17", description: "Westlands apartment", category: "Rent", amount: 35000, type: "expense" },
  { id: 5, date: "2026-07-16", description: "Java House", category: "Food", amount: 1650, type: "expense" },
  { id: 6, date: "2026-07-15", description: "Netflix subscription", category: "Entertainment", amount: 1100, type: "expense" },
  { id: 7, date: "2026-07-14", description: "Zara - new jacket", category: "Shopping", amount: 6800, type: "expense" },
  { id: 8, date: "2026-07-13", description: "Freelance design gig", category: "Income", amount: 22000, type: "income" },
  { id: 9, date: "2026-07-11", description: "Pharmacy - prescriptions", category: "Healthcare", amount: 2300, type: "expense" },
  { id: 10, date: "2026-07-10", description: "Fuel top-up", category: "Transport", amount: 3000, type: "expense" },
  { id: 11, date: "2026-07-08", description: "Cinema night", category: "Entertainment", amount: 1800, type: "expense" },
  { id: 12, date: "2026-07-06", description: "Carrefour groceries", category: "Food", amount: 5100, type: "expense" },
  { id: 13, date: "2026-07-04", description: "Dentist checkup", category: "Healthcare", amount: 4500, type: "expense" },
  { id: 14, date: "2026-07-02", description: "Online course", category: "Shopping", amount: 2900, type: "expense" },
];

export const BUDGETS = [
  { category: "Food", budget: 15000 },
  { category: "Transport", budget: 8000 },
  { category: "Housing", budget: 35000 },
  { category: "Shopping", budget: 10000 },
  { category: "Entertainment", budget: 5000 },
  { category: "Healthcare", budget: 6000 },
  { category: "Savings", budget: 10000},
  { category: "Education", budget: 12000},
  { category: "Subscriptions", budget: 8000 },
  { category: "Other", bugdet: 10000}
];

export const TREND_DATA = [
  { month: "Feb", income: 132000, expenses: 119000 },
  { month: "Mar", income: 140000, expenses: 95000 },
  { month: "Apr", income: 138000, expenses: 91000 },
  { month: "May", income: 150000, expenses: 102000 },
  { month: "Jun", income: 144000, expenses: 97000 },
  { month: "Jul", income: 167000, expenses: 89600 },
];

export const INITIAL_GOALS = [
  { id: 1, name: "Emergency Fund", target: 300000, saved: 187000, color: "#3B82F6" },
  { id: 2, name: "Zanzibar Trip", target: 120000, saved: 64000, color: "#10B981" },
  { id: 3, name: "New MacBook", target: 220000, saved: 55000, color: "#F59E0B" },
];

export const CURRENCIES = {
  KES: { symbol: "KSh", locale: "en-KE" },
  USD: { symbol: "$", locale: "en-US" },
  UGX: { symbol: "USh", locale: "en-UG" },
  TZS: { symbol: "TSh", locale: "en-TZ" },
};