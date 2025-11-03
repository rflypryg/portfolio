'use client';

import React, { useState, useEffect } from 'react';

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is approximately in the viewport center/near top
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Pesan berhasil dikirim! 🎉');
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const skills = [
    { name: 'React.js', level: 90, color: 'from-blue-500 to-cyan-500' },
    { name: 'Next.js', level: 85, color: 'from-purple-500 to-pink-500' },
    { name: 'JavaScript', level: 90, color: 'from-yellow-500 to-orange-500' },
    { name: 'TypeScript', level: 80, color: 'from-blue-600 to-blue-400' },
    { name: 'Node.js', level: 85, color: 'from-green-500 to-emerald-500' },
    { name: 'Tailwind CSS', level: 95, color: 'from-cyan-500 to-blue-500' },
    { name: 'Python', level: 75, color: 'from-yellow-600 to-blue-600' },
    { name: 'Git', level: 85, color: 'from-orange-500 to-red-500' }
  ];

  const education = [
    {
      degree: 'Bachelor of Computer Science',
      school: 'Universitas Indonesia',
      year: '2019 - 2023',
      gpa: '3.85/4.00',
      description: 'Fokus pada Software Engineering dan Web Development'
    },
    {
      degree: 'Full Stack Web Development',
      school: 'Online Bootcamp',
      year: '2022',
      gpa: 'Certificate',
      description: 'Intensive training in modern web technologies'
    }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Platform e-commerce modern dengan fitur cart, payment gateway, dan admin dashboard',
      tech: ['Next.js', 'Node.js', 'MongoDB'],
      link: '#',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Task Management App',
      description: 'Aplikasi manajemen tugas kolaboratif dengan real-time updates',
      tech: ['React', 'Firebase', 'Material-UI'],
      link: '#',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Portfolio CMS',
      description: 'Content Management System untuk membuat portfolio website',
      tech: ['Next.js', 'Prisma', 'PostgreSQL'],
      link: '#',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const experience = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      period: '2023 - Sekarang',
      description: 'Memimpin tim frontend dalam mengembangkan aplikasi web skala enterprise',
      icon: '🚀'
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency',
      period: '2022 - 2023',
      description: 'Mengembangkan website dan aplikasi web untuk berbagai klien',
      icon: '💻'
    }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-purple-500/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300">
              MyPortfolio
            </h1>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 relative group ${
                    activeSection === item ? 'text-purple-400' : 'text-white hover:text-purple-400'
                  }`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform origin-left transition-transform duration-300 ${
                    activeSection === item ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-2 hover:bg-purple-500/20 rounded-lg transition-colors capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 animate-slide-in-left">
            <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full text-sm text-purple-300 backdrop-blur-sm border border-purple-500/30 animate-fade-in">
              👋 Welcome to my portfolio
            </div>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Hi, Saya
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Rafly Prayoga
              </span>
            </h2>
            <p className="text-xl text-gray-300 animate-fade-in animation-delay-200">
              Full Stack Developer & UI/UX Enthusiast
            </p>
            <p className="text-gray-400 leading-relaxed animate-fade-in animation-delay-400">
              Passionate about creating beautiful and functional web applications. 
              Specialized in modern JavaScript frameworks and responsive design.
            </p>
            <div className="flex space-x-4 animate-fade-in animation-delay-600">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center space-x-2 hover:scale-105 transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download CV</span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-purple-400 px-8 py-3 rounded-full hover:bg-purple-400/10 transition-all duration-300 hover:scale-105 transform"
              >
                Contact Me
              </button>
            </div>
            <div className="flex space-x-4 pt-4 animate-fade-in animation-delay-800">
              <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-purple-500 transition-all duration-300 hover:scale-110 transform hover:rotate-6">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-purple-500 transition-all duration-300 hover:scale-110 transform hover:rotate-6">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-purple-500 transition-all duration-300 hover:scale-110 transform hover:rotate-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex justify-center animate-slide-in-right">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-purple-400 shadow-2xl shadow-purple-500/50 hover:scale-105 transition-transform duration-500 cursor-pointer">
                <div className="w-full h-full bg-cover bg-center flex items-center justify-center"
                  style={{ backgroundImage: "url('/profile.jpg')", }}></div>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => scrollToSection('about')}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hover:text-purple-400 transition-colors cursor-pointer"
        >
          <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </section>
{/* About Section */}
<section id="about" className="py-20 px-6 relative z-10">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
      Tentang Saya
    </h2>
    <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
      Mengenal lebih dekat perjalanan karir dan pendidikan saya
    </p>

    <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 transform group max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mr-4 group-hover:rotate-12 transition-transform duration-500">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold">Pendidikan</h3>
      </div>

      <div className="border-l-4 border-purple-400 pl-6 pb-2 hover:border-pink-400 transition-colors duration-300">
        <h4 className="text-xl font-semibold text-purple-300 mb-1">
          Mahasiswa Teknik Informatika
        </h4>
        <p className="text-gray-400 mb-1">Universitas Tarumanagara</p>
        <p className="text-sm text-gray-500 mb-3">
          Aktif sebagai mahasiswa yang berfokus pada pengembangan aplikasi berbasis web, algoritma, dan kecerdasan buatan.
        </p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>📅 2024 - Sekarang</span>
        </div>
      </div>
    </div>
          <div className="mt-12 bg-slate-800/30 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-4 group">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Lokasi</h4>
                  <p className="text-gray-400">Jakarta, Indonesia</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Telepon</h4>
                  <p className="text-gray-400">+62 812-3456-7890</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Email</h4>
                  <p className="text-gray-400">Rafly@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
<section id="skills" className="py-20 px-6 bg-slate-900/30 relative z-10">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
      Keahlian Saya
    </h2>
    <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
      Teknologi dan tools yang saya kuasai untuk membangun aplikasi web modern
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 justify-items-center">
      {[
        { name: "Next.js", logo: "https://skillicons.dev/icons?i=nextjs" },
        { name: "C++", logo: "https://skillicons.dev/icons?i=cpp" },
        { name: "Python", logo: "https://skillicons.dev/icons?i=python" },
        { name: "Java", logo: "https://skillicons.dev/icons?i=java" },
        { name: "Oracle", logo: "https://skillicons.dev/icons?i=oracle" },
        { name: "MATLAB", logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png" },
      ].map((skill, index) => (
        <div
          key={index}
          className="flex flex-col items-center group transition-transform hover:scale-110"
        >
          <img
            src={skill.logo}
            alt={skill.name}
            className="w-16 h-16 object-contain mb-2 drop-shadow-lg"
          />
          <span className="text-sm text-gray-300 group-hover:text-purple-300 transition-colors">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-slate-900/30 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Hubungi Saya
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Punya project menarik? Mari berkolaborasi! 🚀
          </p>
          <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="space-y-6">
              <div className="group">
                <label className="block mb-2 text-sm font-medium text-gray-300 group-focus-within:text-purple-400 transition-colors">Nama</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-white placeholder-gray-500"
                  placeholder="Nama Anda"
                />
              </div>
              <div className="group">
                <label className="block mb-2 text-sm font-medium text-gray-300 group-focus-within:text-purple-400 transition-colors">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-white placeholder-gray-500"
                  placeholder="email@example.com"
                />
              </div>
              <div className="group">
                <label className="block mb-2 text-sm font-medium text-gray-300 group-focus-within:text-purple-400 transition-colors">Pesan</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all resize-none text-white placeholder-gray-500"
                  placeholder="Tulis pesan Anda..."
                ></textarea>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 hover:scale-105 transform group"
              >
                <svg className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Kirim Pesan</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-purple-500/20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400">&copy; 2024 John Doe. All rights reserved.</p>
              <p className="text-gray-500 text-sm mt-1">Built with Next.js & Tailwind CSS</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          animation-fill-mode: both;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
          animation-fill-mode: both;
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
