'use client';
import React from 'react';
import Link from 'next/link';

const AdminPanel = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Panel (/wleee)</h1>
      <ul className="mt-4 space-y-2">
        <li><Link href="/wleee/certificates">Manage Certificates</Link></li>
        <li><Link href="/wleee/projects">Manage Projects</Link></li>
        <li><Link href="/wleee/videos">Manage Videos</Link></li>
      </ul>
    </div>
  );
};

export default AdminPanel;
