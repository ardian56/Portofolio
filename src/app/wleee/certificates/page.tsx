'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Image is now imported and will be used

interface Certificate {
  id: number;
  title: string;
  issueDate: string;
  imageUrl?: string;
}

export default function CertificatesPage() {
  const router = useRouter();

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [title, setTitle] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  async function fetchCertificates() {
    const res = await fetch('/api/certificates');
    const data = await res.json();
    setCertificates(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let image_url = '';
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      const upload = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await upload.json();
      image_url = result.url;
    }

    await fetch('/api/certificates', {
      method: 'POST',
      body: JSON.stringify({ title, issueDate, imageUrl: image_url }),
      headers: { 'Content-Type': 'application/json' },
    });

    setTitle('');
    setIssueDate('');
    setImageFile(null);
    fetchCertificates();
  }

  async function handleDelete(id: number) {
    await fetch('/api/certificates', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetchCertificates();
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Tombol Home */}
      <button
        onClick={() => router.push('/wleee')}
        className="mb-6 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
      >
        ← Home
      </button>

      <h1 className="text-2xl font-bold mb-4">Manajemen Sertifikat</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Judul Sertifikat"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
          required
        />
        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Simpan
        </button>
      </form>

      <div className="space-y-4">
        {certificates.map((c) => (
          <div key={c.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{c.title}</h2>
            <p className="text-sm">{new Date(c.issueDate).toLocaleDateString()}</p>
            {c.imageUrl && (
              <div className="relative w-48 h-32 mt-2"> {/* Added a wrapper div with relative position and defined size */}
                <Image
                  src={c.imageUrl}
                  alt={c.title}
                  layout="fill" // Ensures the image fills the parent div
                  objectFit="cover" // Crops the image to cover the area
                  className="rounded" // Apply border-radius to the Image component itself
                />
              </div>
            )}
            <button
              onClick={() => handleDelete(c.id)}
              className="text-red-600 text-sm mt-2"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}