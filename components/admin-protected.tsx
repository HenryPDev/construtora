'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from './admin-layout';

export default function AdminProtected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check authentication
    const token = localStorage.getItem('admin_token');

    if (!token) {
      router.replace('/admin/login');
    } else {
      setIsReady(true);
    }
  }, [router]);

  // SSR safety - don't render on server
  if (!isClient) {
    return null;
  }

  // Don't render layout until authenticated
  if (!isReady) {
    return null;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
