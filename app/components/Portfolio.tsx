'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type FormData = { name: string; email: string; message: string };

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Static user info (you can change)
  const fullName = 'Rafly Prayoga';
  const shortBio = 'Mahasiswa Informatika yang berfokus pada pengembangan web dan pemrograman algoritma.';

  useEffect(() => {
    setMounted(true);
    // initial theme from localStorage
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored === 'light') setTheme('light');

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    alert('Pesan berhasil dikirim! 🎉');
    setFormData({ name: '', email: '', message: '' });
  };

  // Skills / sample data
  const skills = [
    { name: 'Next.js', level: 90 },
    { name: 'React.js', level: 90 },
    { name: 'TypeScript', level: 80 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'C++', level: 75 },
    { name: 'Python', level: 75 },
    { name: 'Java', level: 75 },
    { name: 'Oracle', level: 70 },
    { name: 'MATLAB', level: 70 },
  ];

  const projects = [
    { title: 'E-Commerce Platform', desc: 'Platform dengan cart dan admin dashboard', tech: ['Next.js', 'Node.js', 'MongoDB'] },
    { title: 'Task Manager', desc: 'Realtime task management', tech: ['React', 'Firebase'] },
    { title: 'Portfolio CMS', desc: 'CMS untuk portfolio', tech: ['Next.js', 'Prisma', 'Postgres'] },
  ];

  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      {/* Animated blurred blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -left-20 top-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 bg-gradient-to-r from-indigo-500 to-sky-400 animate-blob"></div>
        <div className="absolute right-0 top-1/3 w-96 h-96 rounded-full blur-3xl opacity-10 bg-gradient-to-r from-violet-500 to-indigo-400 animate-blob animation-delay-2000"></div>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? (theme === 'dark' ? 'bg-slate-900/95 backdrop-blur' : 'bg-white/80 backdrop-blur shadow') : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold">R</div>
            <div className="hidden sm:block">
              <h1 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{fullName}</h1>
              <p className="text-xs text-slate-400">Full Stack Developer</p>
            </div>
          </div>

          {/* desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item)} className={`capitalize relative ${activeSection === item ? 'text-sky-400' : 'text-slate-400 hover:text-sky-400'}`}>
                {item}
                <span className={`absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 transform ${activeSection === item ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </button>
            ))}
            <button
              onClick={() => {
                // download CV (assumes public/cv/Rafly_Prayoga_CV.pdf exists)
                const link = document.createElement('a');
                link.href = '/cv/Rafly_Prayoga_CV.pdf';
                link.download = 'Rafly_Prayoga_CV.pdf';
                document.body.appendChild(link);
                link.click();
                link.remove();
              }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md hover:scale-105 transition-transform"
            >
              Download CV
            </button>
            <button
              onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
              title="Toggle theme"
              className="p-2 rounded-lg hover:bg-slate-700/20 transition"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>

          {/* mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} className="p-2 rounded-md">
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <button onClick={() => setIsMenuOpen(prev => !prev)} className="p-2 rounded-md border border-slate-700/30">
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* mobile menu */}
        {isMenuOpen && (
          <div className={`md:hidden px-6 pb-4 space-y-2 ${theme === 'light' ? 'bg-white' : 'bg-slate-900'}`}>
            {['home', 'about', 'skills', 'projects', 'contact'].map(item => (
              <button key={item} onClick={() => scrollToSection(item)} className="block w-full text-left px-4 py-2 rounded-md hover:bg-slate-700/10">
                {item}
              </button>
            ))}
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/cv/Rafly_Prayoga_CV.pdf';
                link.download = 'Rafly_Prayoga_CV.pdf';
                document.body.appendChild(link);
                link.click();
                link.remove();
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-md bg-gradient-to-r from-sky-500 to-indigo-600 text-white"
            >
              Download CV
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <main className="pt-24">
        <section id="home" className="min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 rounded-full bg-sky-500/10 text-sky-300">👋 Halo</div>
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Hi, saya <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">{fullName}</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-xl">{shortBio}</p>
              <div className="flex space-x-4">
                <a className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow" href="/cv/Rafly_Prayoga_CV.pdf" download>
                  Download CV
                </a>
                <button onClick={() => scrollToSection('projects')} className="px-6 py-3 rounded-full border border-slate-700/30">Lihat Proyek</button>
              </div>

              <div className="flex space-x-3 pt-4">
                <a className="p-3 rounded-full bg-slate-800/30 hover:scale-110 transition">GitHub</a>
                <a className="p-3 rounded-full bg-slate-800/30 hover:scale-110 transition">LinkedIn</a>
                <a className="p-3 rounded-full bg-slate-800/30 hover:scale-110 transition">Email</a>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-sky-400/30 shadow-xl transform hover:scale-105 transition-transform">
                {/* replace /profile.jpg in public */}
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/profile.jpg')" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-4">Tentang Saya</h3>
            <p className="text-center text-slate-400 max-w-2xl mx-auto mb-8">Sedikit tentang perjalanan saya di dunia programming dan pengembangan web.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/20 p-6 rounded-2xl">
                <h4 className="font-semibold mb-2">Pendidikan</h4>
                <p className="text-sm text-slate-400">Mahasiswa Teknik Informatika — Universitas Tarumanagara (2023 - Sekarang)</p>
              </div>
              <div className="bg-slate-800/20 p-6 rounded-2xl">
                <h4 className="font-semibold mb-2">Pengalaman</h4>
                <p className="text-sm text-slate-400">Frontend Developer — Digital Agency (2022 - 2023), Senior Frontend (2023 - Sekarang)</p>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-20 px-6 bg-gradient-to-b from-transparent to-slate-900/10">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Keahlian</h3>
            <p className="text-slate-400 mb-8">Teknologi yang biasa saya gunakan</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {skills.map(s => (
                <div key={s.name} className="p-4 rounded-lg bg-slate-800/20">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-sm text-slate-400">{s.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.level}%`, background: 'linear-gradient(90deg,#06b6d4,#7c3aed)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-6">Proyek</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map(p => (
                <div key={p.title} className="p-6 rounded-2xl bg-slate-800/20 hover:scale-105 transition">
                  <h4 className="font-semibold mb-2">{p.title}</h4>
                  <p className="text-sm text-slate-400 mb-3">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map(t => <span key={t} className="text-xs px-2 py-1 rounded bg-slate-700/20">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 px-6 bg-slate-900/10">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-4">Hubungi Saya</h3>
            <p className="text-center text-slate-400 mb-8">Punya project? Kirim pesan — saya akan balas secepatnya.</p>
            <form onSubmit={handleSubmit} className="bg-slate-800/20 p-6 rounded-2xl space-y-4">
              <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded bg-transparent border border-slate-700" placeholder="Nama" />
              <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded bg-transparent border border-slate-700" placeholder="Email" />
              <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={5} className="w-full px-4 py-3 rounded bg-transparent border border-slate-700" placeholder="Pesan" />
              <div className="flex gap-3">
                <button type="submit" className="px-6 py-3 rounded bg-gradient-to-r from-sky-500 to-indigo-600 text-white">Kirim</button>
                <button type="button" onClick={() => {
                  // download portfolio view as PDF by opening pre-generated PDF or server endpoint
                  const link = document.createElement('a');
                  link.href = '/cv/Portfolio_Rafly_Prayoga.pdf'; // optional generated PDF path
                  link.download = 'Portfolio_Rafly_Prayoga.pdf';
                  document.body.appendChild(link);
                  link.click();
                  link.remove();
                }} className="px-6 py-3 rounded border">Download PDF</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-slate-700/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} {fullName}. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <a className="text-sm text-slate-400 hover:text-sky-400">Privacy</a>
            <a className="text-sm text-slate-400 hover:text-sky-400">Terms</a>
          </div>
        </div>
      </footer>

      {/* extra local styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px,0px) scale(1) }
          33% { transform: translate(30px,-50px) scale(1.05) }
          66% { transform: translate(-20px,20px) scale(0.95) }
          100% { transform: translate(0px,0px) scale(1) }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        /* light theme adjustments */
        :global(.light) body {
          background: #f8fafc;
        }
      `}</style>
    </div>
  );
}
