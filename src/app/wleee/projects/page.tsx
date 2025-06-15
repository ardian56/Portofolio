'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl: string;
  liveUrl: string;
  date: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let imageUrl = '';
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      const upload = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await upload.json();
      imageUrl = result.url;
    }

    // technologies harus berupa array JSON, parse dari string input (misal dipisah koma)
    const techArray = technologies.split(',').map((t) => t.trim());

    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        technologies: techArray,
        imageUrl,
        githubUrl,
        liveUrl,
        date,
      }),
    });

    setName('');
    setDescription('');
    setTechnologies('');
    setImageFile(null);
    setGithubUrl('');
    setLiveUrl('');
    setDate('');
    fetchProjects();
  }

  async function handleDelete(id: number) {
    await fetch('/api/projects', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    fetchProjects();
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button
        onClick={() => window.location.href = '/wleee'}
        className="mb-6 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
      >
        ← Home
      </button>

      <h1 className="text-2xl font-bold mb-4">Manajemen Projects</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Nama Project"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2"
        />
        <textarea
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="text"
          placeholder="Teknologi (pisah koma)"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full"
        />
        <input
          type="url"
          placeholder="Github URL"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="url"
          placeholder="Live URL"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
          className="w-full border p-2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Simpan Project
        </button>
      </form>

      <div className="space-y-4">
        {projects.map((p: Project) => (
          <div key={p.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p>{p.description}</p>
            <p>Teknologi: {p.technologies?.join(', ')}</p>
            {p.imageUrl && (
              <div className="relative w-48 h-32 mt-2">
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  className="rounded object-cover"
                />
              </div>
            )}
            <p>
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                Github
              </a>{' '}
              |{' '}
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                Live
              </a>
            </p>
            <p>{p.date && new Date(p.date).toLocaleDateString()}</p>
            <button onClick={() => handleDelete(p.id)} className="text-red-600 text-sm mt-2">
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
