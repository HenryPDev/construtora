import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Zeferino & Correa',
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
