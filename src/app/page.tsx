
import React from 'react';
// import './page-animation.css'; 

const personalInfo = {
  name: 'Ardian Danendra',
  tagline: 'Seorang Mahasiswa Universitas Dian Nuswantoro Semarang',
  shortDescription: 'Saya adalah seorang yang bersemangat dalam membangun aplikasi web yang efisien dan responsif. Saya suka mengubah ide menjadi solusi digital yang inovatif dan berorientasi pada pengguna. Berbekal pengalaman yang minim, saya selalu mencari tantangan baru untuk mengembangkan diri.',
  profilePic: '/profil.jpg', 
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
  },
  {
    id: 2,
    name: 'IOT Pet Feeder',
    description: 'Sistem untuk mengelola Pakan Hewan Peliharaan secara otomatis. Proyek ini memungkinkan pengguna untuk mengontrol pemberian makan hewan peliharaan mereka melalui aplikasi web yang terintegrasi dengan perangkat IoT.',
    technologies: ['React', 'Express', 'Supabase', 'C++', 'Arduino'],
    imageUrl: '/petfeeder.png',
    githubUrl: 'https://github.com/ardian56/front-webiot.git',
    liveUrl: 'https://front-webiot-ardian56s-projects.vercel.app/',
  },
  {
    id: 3,
    name: 'Panorama ID',
    description: 'Website Jual Beli Tiket Wisata Indonesia. Proyek ini menyediakan platform untuk memesan tiket wisata di berbagai destinasi di Indonesia, dengan fokus pada pengalaman pengguna yang mudah dan intuitif.',
    technologies: ['Javascript','Bootstrap', 'MySql', 'PHP'],
    imageUrl: '/manpro.png',
    githubUrl: 'https://github.com/ardian56/manpro.git',
    liveUrl: '',
  },
];



// Komponen Hero Section
const HeroSection: React.FC = () => (
  <section id="home" className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <img
      src={personalInfo.profilePic}
      alt={`Foto Profil ${personalInfo.name}`}
      className="mx-auto mb-6 rounded-full w-48 h-48 object-cover shadow-lg border-4 border-indigo-500"
    />
    <h1 className="text-5xl font-extrabold mb-3 leading-tight">{personalInfo.name}</h1>
    <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6">{personalInfo.tagline}</p>
    <p className="max-w-3xl text-lg md:text-xl leading-relaxed">{personalInfo.shortDescription}</p>
    <div className="mt-8 flex gap-4">
      <a
        href="https://github.com/ardian56"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out font-medium text-lg"
      >
        GitHub Saya
      </a>
    </div>
  </section>
);

// Komponen Skills Section
const SkillsSection: React.FC = () => (
  <section id="skills" className="py-20 px-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
    <h2 className="text-4xl font-bold text-center mb-12">Teknologi & Bahasa</h2>
    <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
      {skills.map((skill) => (
        <div key={skill.name} className="flex flex-col items-center p-5 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md transform hover:scale-105 transition duration-300 ease-in-out">
          {skill.icon && <img src={skill.icon} alt={skill.name} className="w-16 h-16 mb-3 object-contain" />}
          <span className="text-lg font-medium">{skill.name}</span>
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
    <h2 className="text-4xl font-bold text-center mb-12">Proyek Pilihan Saya</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </section>
);

// --- MAIN PAGE COMPONENT ---
const HomePage: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <footer className="py-8 text-center bg-gray-800 dark:bg-gray-950 text-gray-300 dark:text-gray-500">
        <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        <p className="mt-2 text-sm">Dibangun dengan Next.js & Tailwind CSS.</p>
      </footer>
    </main>
  );
};

export default HomePage;