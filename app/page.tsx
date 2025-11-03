export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      <section className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md text-center text-white">
        <img
          src="https://avatars.githubusercontent.com/u/9919?v=4"
          alt="Profile Picture"
          className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">Rafly Dajvs</h1>
        <h2 className="text-lg text-blue-400 mb-4">Frontend Developer</h2>
        <p className="text-gray-300 mb-6">
          Saya seorang mahasiswa yang sedang belajar pengembangan web menggunakan Next.js, Tailwind CSS, dan berbagai teknologi modern untuk membangun aplikasi web yang cepat dan menarik.
        </p>
        <a
          href="https://github.com/raflydajvs"
          target="_blank"
          className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full transition-all"
        >
          Kunjungi GitHub
        </a>
      </section>
    </main>
  );
}
