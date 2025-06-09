
'use client';

import React from 'react';
// import './page-animation.css'; 

const personalInfo = {
  name: 'Ardian Danendra',
  tagline: 'Seorang Mahasiswa Universitas Dian Nuswantoro Semarang',
  shortDescription: 'Saya adalah seorang yang bersemangat dalam membangun aplikasi web yang efisien dan responsif. Saya suka mengubah ide menjadi solusi digital yang inovatif dan berorientasi pada pengguna. Berbekal pengalaman yang minim, saya selalu mencari tantangan baru untuk mengembangkan diri.',
  profilePic: '/unnamed.png', 
};

const skills = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' }
];

const projects = [
  {
    id: 1,
    name: 'SD Palebon 03 Semarang',
    description: 'Internship Diskominfo Project - Rebranding Website SD Palebon 03 Semarang. Proyek ini bertujuan untuk meningkatkan visibilitas dan aksesibilitas informasi sekolah melalui desain ulang yang modern dan responsif.',
    technologies: ['Next.js', 'React', 'Supabase', 'Tailwind CSS'],
    imageUrl: '/diskominfo.png',
    githubUrl: 'https://github.com/ardian56/SD-Palebon-03.git',
    liveUrl: 'https://sd-palebon-03.vercel.app/',
    date: '10-03-2025',
  },
  {
    id: 2,
    name: 'IOT Pet Feeder',
    description: 'Sistem untuk mengelola Pakan Hewan Peliharaan secara otomatis. Proyek ini memungkinkan pengguna untuk mengontrol pemberian makan hewan peliharaan mereka melalui aplikasi web yang terintegrasi dengan perangkat IoT.',
    technologies: ['React', 'Express', 'Supabase', 'C++', 'Arduino'],
    imageUrl: '/petfeederv2.png',
    githubUrl: 'https://github.com/ardian56/front-webiot.git',
    liveUrl: 'https://front-webiot-ardian56s-projects.vercel.app/',
    date: '12-12-2024',
  },
  {
    id: 3,
    name: 'Panorama ID',
    description: 'Website Jual Beli Tiket Wisata Indonesia. Proyek ini menyediakan platform untuk memesan tiket wisata di berbagai destinasi di Indonesia, dengan fokus pada pengalaman pengguna yang mudah dan intuitif.',
    technologies: ['Javascript','Bootstrap', 'MySql', 'PHP'],
    imageUrl: '/manpro.png',
    githubUrl: 'https://github.com/ardian56/manpro.git',
    liveUrl: '',
    date: '15-10-2023',
  },
];



// Komponen Hero Section
const HeroSection: React.FC = () => (
  <section id="home" className="relative flex flex-col items-center justify-center min-h-screen text-center p-8 text-white">
    {/* Background image with overlay */}
    <div 
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `url(${personalInfo.profilePic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
    </div>

    {/* Content */}
    <div className="relative z-10">
      <h1 className="text-5xl font-extrabold mb-3 leading-tight">{personalInfo.name}</h1>
      <p className="text-2xl font-semibold text-indigo-400 mb-6">{personalInfo.tagline}</p>
      <p className="max-w-3xl text-lg md:text-xl leading-relaxed">{personalInfo.shortDescription}</p>
      <div className="mt-8 flex gap-4 justify-center">
        {/* <a
          href="https://github.com/ardian56"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out font-medium text-lg"
        >
          GitHub Saya
        </a> */}        
      </div>
    </div>
  </section>
);

// Komponen Skills Section
const SkillsSection: React.FC = () => (
  <section id="skills" className="py-20 px-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
    <h2 className="text-4xl font-bold text-center mb-12">Tools & Language</h2>
    <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
      {skills.map((skill) => (
        <div 
          key={skill.name} 
          className="w-32 h-32 flex flex-col items-center justify-center p-5 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
        >
          {skill.icon && <img src={skill.icon} alt={skill.name} className="w-12 h-12 mb-3" />}
          <span className="text-lg font-medium text-center">{skill.name}</span>
        </div>
      ))}
    </div>
  </section>
);

// Komponen Project Card
interface ProjectCardProps {
  project: typeof projects[0];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden flex flex-col transform hover:translate-y-[-5px] transition duration-300 ease-in-out h-full">
    <img src={project.imageUrl} alt={project.name} className="w-full h-52 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{project.name}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{project.date}</p>
      <p className="text-gray-700 dark:text-gray-300 text-base mb-4 flex-grow">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4 mt-auto">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          GitHub
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  </div>
);

// Komponen Projects Section
const ProjectsSection: React.FC = () => (
  <section id="projects" className="py-20 px-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <h2 className="text-4xl font-bold text-center mb-12">Project Saya</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </section>
);

// Komponen Audio Player
const AudioPlayer: React.FC = () => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio('/audio/Color Your Night.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.1;

      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false)); // Autoplay ditolak
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition"
      aria-label={isPlaying ? "Pause audio" : "Play audio"}
    >
      {isPlaying ? (
        // Icon Pause
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
        </svg>
      ) : (
        // Icon Play
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="none">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
};

// Komponen YouTube Section
const YouTubeSection: React.FC = () => (
  <section id="videos" className="py-20 px-8 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
    <h2 className="text-4xl font-bold text-center mb-12">Project Videos</h2>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="aspect-video">
        <iframe
          className="w-full h-full rounded-xl shadow-lg"
          src="https://www.youtube.com/embed/to6jpLgU3_4?si=KfHs6kednxD1YJ7t"
          title="Project Video 1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="aspect-video">
        <iframe
          className="w-full h-full rounded-xl shadow-lg"
          src="https://www.youtube.com/embed/9nISJoMjCKk?si=wiXCQiegzSMm-Iwi"
          title="Project Video 2"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="aspect-video">
        <iframe
          className="w-full h-full rounded-xl shadow-lg"
          src="https://www.youtube.com/embed/_LUMmCTXT6o?si=97N-C3ZsjtQ3atxI"
          title="Project Video 2"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="aspect-video">
        <iframe
          className="w-full h-full rounded-xl shadow-lg"
          src="https://www.youtube.com/embed/uoctShQWBk4?si=gstcOH71I8D5qoVI"
          title="Project Video 2"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </section>
);

// Komponen Contact Section
const ContactSection: React.FC = () => (
  <section id="contact" className="py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <h2 className="text-4xl font-bold text-center mb-12">Connect With Me</h2>
    <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
      <a
        href="https://github.com/ardian56"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-8 h-8" />
        <span className="text-lg font-medium">GitHub</span>
      </a>

      <a
        href="https://www.instagram.com/ardiandanendra/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <span className="text-lg font-medium">Instagram</span>
      </a>

      <a
        href="mailto:ardiandanendra68@gmail.com"
        className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
        <span className="text-lg font-medium">Email</span>
      </a>
    </div>
  </section>
);

// --- MAIN PAGE COMPONENT ---
const HomePage: React.FC = () => {
  return (
    <main>
      <AudioPlayer />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <YouTubeSection />
      <ContactSection />
      <footer className="py-8 text-center bg-gray-800 dark:bg-gray-950 text-gray-300 dark:text-gray-500">
        <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default HomePage;
