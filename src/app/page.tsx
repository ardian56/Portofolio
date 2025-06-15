'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- DATA PERSONAL INFO (tetap statis) ---
const personalInfo = {
  name: 'Ardian Danendra',
  shortDescription: 'Saya adalah seorang yang bersemangat dalam membangun aplikasi web yang efisien dan responsif. Saya suka mengubah ide menjadi solusi digital yang inovatif dan berorientasi pada pengguna. Berbekal pengalaman yang minim, saya selalu mencari tantangan baru untuk mengembangkan diri.',
  profilePic: '/unnamed.png',
};

// --- DATA SKILLS (tetap statis, atau Anda bisa membuatnya dinamis jika ada di Neon) ---
const staticSkills = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' }
];

// --- INTERFACE DATA SESUAI PRISMA SCHEMA ANDA ---
interface Project {
  id: number;
  name: string; // 'name' dari skema Project
  description: string | null;
  // Technologies adalah Json di Prisma, kita asumsikan di-parse menjadi string[] di backend
  technologies: string[] | null;
  imageUrl: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  date: string | null; // DateTime dari Prisma, kita akan format ke string tanggal
}

interface Certificate {
  id: number;
  title: string; // 'title' dari skema Certificate
  imageUrl: string | null;
  issueDate: string | null; // DateTime dari Prisma, kita akan format ke string tanggal
}

interface Video {
  id: number;
  title: string; // 'title' dari skema Video
  youtubeUrl: string;
  description: string | null;
  createdAt: string; // DateTime dari Prisma
}

// --- ANIMATION VARIANTS (tetap sama) ---
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

// --- KOMPONEN HERO SECTION ---
const HeroSection: React.FC<{ personalInfo: typeof personalInfo }> = ({ personalInfo }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio('/audio/Color Your Night.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.1;

      // Autoplay attempt (might be blocked by browsers)
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-screen text-center p-8 text-white">
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
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl font-extrabold mb-3 leading-tight"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          Welcome to My
        </motion.h1>
        <motion.p
          className="text-5xl font-extrabold mb-3 leading-tight text-indigo-400 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Portfolio Website
        </motion.p>
      </motion.div>
      {typeof window !== 'undefined' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-indigo-400 rounded-full opacity-30"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5
              }}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${60 + Math.random() * 20}%`
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Music Toggle Button */}
      {typeof window !== 'undefined' && (
        <motion.button
          onClick={togglePlay}
          className="absolute top-6 right-6 z-50 w-10 h-10 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition opacity-40"
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          whileHover={{ scale: 1.1, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="none">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>
      )}
      
      {/* Scroll to Top Button */}
      {typeof window !== 'undefined' && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition"
          aria-label="Scroll to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </section>
  );
};

// --- KOMPONEN ABOUT ME SECTION ---
const AboutMeSection: React.FC<{ shortDescription: string }> = ({ shortDescription }) => (
  <section id="about" className="py-20 px-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-white relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
    </div>

    {/* Content */}
    <div className="relative z-10">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.h3
            className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ardian Danendra
          </motion.h3>

          <motion.p
            className="text-lg md:text-xl leading-relaxed text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {shortDescription}
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href="#portfolio"
              className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="px-6 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-full font-semibold hover:bg-indigo-600 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// --- KOMPONEN SKILLS SECTION ---
const SkillsSection: React.FC<{ skills: typeof staticSkills }> = ({ skills }) => (
  <section id="skills" className="py-20 px-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <motion.h2
      className="text-4xl font-bold text-center mb-12"
      {...fadeInUp}
      viewport={{ once: true }}
    >
      Tools & Language
    </motion.h2>
    <motion.div
      className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      {skills.map((skill) => (
        <motion.div
          key={skill.name}
          className="w-32 h-32 flex flex-col items-center justify-center p-5 bg-white dark:bg-gray-700 rounded-xl shadow-md cursor-pointer"
          variants={scaleIn}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {skill.icon && (
            <motion.img
              src={skill.icon}
              alt={skill.name}
              className="w-12 h-12 mb-3"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            />
          )}
          <span className="text-lg font-medium text-center">{skill.name}</span>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

// --- KOMPONEN PROJECT CARD ---
interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => (
  <motion.div
    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden flex flex-col h-full group"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{
      y: -10,
      boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
    }}
  >
    <motion.div
      className="overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      )}
    </motion.div>
    <div className="p-6 flex flex-col flex-grow">
      <motion.h3
        className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {project.name}
      </motion.h3>
      {project.date && (
        <motion.p
          className="text-gray-500 dark:text-gray-400 text-sm mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {new Date(project.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </motion.p>
      )}
      {project.description && (
        <motion.p
          className="text-gray-700 dark:text-gray-300 text-base mb-4 flex-grow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {project.description}
        </motion.p>
      )}
      {project.technologies && project.technologies.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {project.technologies.map((tech, techIndex) => (
            <motion.span
              key={tech}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + techIndex * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      )}
      <motion.div
        className="flex gap-4 mt-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
          </motion.a>
        )}
        {project.liveUrl && (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Live Demo
          </motion.a>
        )}
      </motion.div>
    </div>
  </motion.div>
);

// --- KOMPONEN PROJECTS SECTION ---
const ProjectsSection: React.FC<{ projects: Project[] }> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 text-lg py-8">
        Tidak ada proyek yang tersedia.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {[...projects]
        .sort((a, b) => b.id - a.id) // Sorting projects by ID, newest first
        .map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
    </div>
  );
};

// --- KOMPONEN CERTIFICATE CARD ---
interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, index }) => (
  <motion.div
    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{
      y: -5,
      boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
    }}
  >
    {certificate.imageUrl && (
      <img
        src={certificate.imageUrl}
        alt={certificate.title}
        className="w-full h-48 object-cover"
      />
    )}
    <div className="p-5 flex flex-col flex-grow">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{certificate.title}</h3>

      {certificate.issueDate && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-grow">
          {new Date(certificate.issueDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      )}
    </div>
  </motion.div>
);

// --- KOMPONEN CERTIFICATES SECTION ---
const CertificatesSection: React.FC<{ certificates: Certificate[] }> = ({ certificates }) => {
  if (!certificates || certificates.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 text-lg py-8">
        Tidak ada sertifikat yang tersedia.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {certificates.map((cert, index) => (
        <CertificateCard key={cert.id} certificate={cert} index={index} />
      ))}
    </div>
  );
};

// --- KOMPONEN YOUTUBE SECTION ---
const YouTubeSection: React.FC<{ videos: Video[] }> = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 text-lg py-8">
        Tidak ada video yang tersedia.
      </div>
    );
  }
  return (
    <motion.div
      className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      {videos.map((video) => (
        <motion.div
          key={video.id}
          className="aspect-video"
          variants={scaleIn}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Pastikan youtubeUrl adalah format embed yang benar, misal: "https://www.youtube.com/embed/VIDEO_ID" */}
          <iframe
            className="w-full h-full rounded-xl shadow-lg"
            src={video.youtubeUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
      ))}
    </motion.div>
  );
};

// --- KOMPONEN CONTACT SECTION (tetap sama) ---
const ContactSection: React.FC = () => (
  <section id="contact" className="py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <motion.h2
      className="text-4xl font-bold text-center mb-12"
      {...fadeInUp}
      viewport={{ once: true }}
    >
      Connect With Me
    </motion.h2>
    <motion.div
      className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <motion.a
        href="https://github.com/ardian56"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        variants={scaleIn}
        whileHover={{
          scale: 1.05,
          y: -5,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          alt="GitHub"
          className="w-8 h-8"
          whileHover={{ rotate: 15 }}
        />
        <span className="text-lg font-medium">GitHub</span>
      </motion.a>

      <motion.a
        href="https://www.instagram.com/ardiandanendra/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        variants={scaleIn}
        whileHover={{
          scale: 1.05,
          y: -5,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="currentColor"
          whileHover={{ rotate: 15 }}
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </motion.svg>
        <span className="text-lg font-medium">Instagram</span>
      </motion.a>

      <motion.a
        href="mailto:ardiandanendra68@gmail.com"
        className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        variants={scaleIn}
        whileHover={{
          scale: 1.05,
          y: -5,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="currentColor"
          whileHover={{ rotate: 15 }}
        >
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </motion.svg>
        <span className="text-lg font-medium">Email</span>
      </motion.a>
    </motion.div>
  </section>
);


// --- MAIN PAGE COMPONENT ---
const HomePage: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'videos'>('projects');

  // State untuk menyimpan data yang di-fetch dari Neon
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [myCertificates, setMyCertificates] = useState<Certificate[]>([]);
  const [myVideos, setMyVideos] = useState<Video[]>([]); // Menggunakan 'myVideos'

  useEffect(() => {
    setIsMounted(true);

    const fetchData = async () => {
      try {
        // --- FETCH PROJECTS DARI NEON ---
        const projectsRes = await fetch('/api/projects'); // Pastikan endpoint ini ada
        if (projectsRes.ok) {
          const projectsData: Project[] = await projectsRes.json();
          setMyProjects(projectsData);
        } else {
          console.error('Gagal mengambil proyek:', projectsRes.statusText);
        }

        // --- FETCH CERTIFICATES DARI NEON ---
        const certificatesRes = await fetch('/api/certificates'); // Pastikan endpoint ini ada
        if (certificatesRes.ok) {
          const certificatesData: Certificate[] = await certificatesRes.json();
          setMyCertificates(certificatesData);
        } else {
          console.error('Gagal mengambil sertifikat:', certificatesRes.statusText);
        }

        // --- FETCH VIDEOS DARI NEON ---
        const videosRes = await fetch('/api/videos'); // Pastikan endpoint ini ada
        if (videosRes.ok) {
          const videosData: Video[] = await videosRes.json();
          setMyVideos(videosData);
        } else {
          console.error('Gagal mengambil video:', videosRes.statusText);
        }

      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data:', error);
      }
    };

    fetchData();
  }, []); // Dependensi kosong agar hanya berjalan sekali saat komponen di-mount

  if (!isMounted) {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Memuat...</div>
      </main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection personalInfo={personalInfo} />
      <AboutMeSection shortDescription={personalInfo.shortDescription} />
      <SkillsSection skills={staticSkills} />

      {/* --- Bagian Portofolio dengan Navigasi Tab --- */}
      <section id="portfolio" className="py-20 px-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          {...fadeInUp}
          viewport={{ once: true }}
        >
          My Portofolio
        </motion.h2>

        {/* Tombol Navigasi Tab */}
        <motion.div
          className="flex justify-center mb-12 space-x-4 md:space-x-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300
              ${activeTab === 'projects'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300
              ${activeTab === 'certificates'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
          >
            Certificates
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300
              ${activeTab === 'videos'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
          >
            Videos
          </button>
        </motion.div>

        {/* Konten yang dirender secara kondisional berdasarkan tab aktif */}
        <div>
          {activeTab === 'projects' && <ProjectsSection projects={myProjects} />}
          {activeTab === 'certificates' && <CertificatesSection certificates={myCertificates} />}
          {activeTab === 'videos' && <YouTubeSection videos={myVideos} />}
        </div>
      </section>
      {/* --- Akhir Bagian Portofolio dengan Navigasi Tab --- */}

      <ContactSection />
      <motion.footer
        className="py-8 text-center bg-gray-800 dark:bg-gray-950 text-gray-300 dark:text-gray-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
      </motion.footer>
    </motion.main>
  );
};

export default HomePage;