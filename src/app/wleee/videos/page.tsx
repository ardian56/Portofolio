'use client';

import React, { useEffect, useState } from 'react';

interface Video {
  id: number;
  title: string;
  description: string;
  youtubeUrl: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    const res = await fetch('/api/videos');
    const data = await res.json();
    setVideos(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch('/api/videos', {
      method: 'POST',
      body: JSON.stringify({
        title,
        youtubeUrl,
        description,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    setTitle('');
    setYoutubeUrl('');
    setDescription('');
    fetchVideos();
  }

  async function handleDelete(id: number) {
    await fetch('/api/videos', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    fetchVideos();
  }

  // Helper to extract embed URL from YouTube link
  function getEmbedUrl(youtubeUrl: string): string {
    const regex = /(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = youtubeUrl.match(regex);
    const videoId = match?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-6">
        <a href="/wleee" className="text-blue-500 underline">
          ← Home
        </a>
      </div>

      <h1 className="text-2xl font-bold mb-4">Manajemen Video</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Judul Video"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          placeholder="YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="w-full border p-2"
          required
        />
        <textarea
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Simpan Video
        </button>
      </form>

      <div className="space-y-4">
        {videos.map((v: Video) => (
          <div key={v.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{v.title}</h2>
            <p className="text-sm text-gray-700 mb-2">{v.description}</p>
            {v.youtubeUrl && (
              <div className="aspect-video w-full max-w-lg">
                <iframe
                  src={getEmbedUrl(v.youtubeUrl)}
                  title={v.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
            <button
              onClick={() => handleDelete(v.id)}
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
