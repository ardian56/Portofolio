const UnderConstruction = () => (
  <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        🚧 Under Construction 🚧
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 mb-8">
        We're working hard to bring you something amazing!
      </p>
      <div className="flex justify-center space-x-4">
        <a
          href="https://github.com/ardian56"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Visit GitHub
        </a>
        <a
          href="mailto:ardiandanendra68@gmail.com"
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Contact Me
        </a>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  return <UnderConstruction />;
};

export default HomePage;
