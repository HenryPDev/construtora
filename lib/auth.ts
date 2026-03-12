'use client';

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

function generateToken(user: string, password: string): string {
  return btoa(`${user}:${password}`);
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('admin_token');
  return !!token && token === generateToken(ADMIN_USER, ADMIN_PASSWORD);
}

export function login(user: string, password: string): boolean {
  if (user === ADMIN_USER && password === ADMIN_PASSWORD) {
    const token = generateToken(user, password);
    localStorage.setItem('admin_token', token);
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem('admin_token');
}
