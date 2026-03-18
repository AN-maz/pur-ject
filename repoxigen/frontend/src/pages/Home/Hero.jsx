import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-oxigen-dark overflow-hidden pt-20 tech-grid">

      {/* Tech Background Effects */}
      <div className="absolute inset-0 overflow-hidden -z-10">

        <div
          className="orb-tech w-96 h-96 bg-oxigen-light"
          style={{ top: '15%', left: '5%' }}
        />

        <div
          className="orb-tech w-[500px] h-[500px] bg-software-tosca"
          style={{
            bottom: '10%',
            right: '10%',
            animationDelay: '3s'
          }}
        />

      </div>


      <div className="absolute top-0 left-1/4 w-96 h-96 bg-oxigen-light/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-software-teal/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div className="space-y-6 text-center md:text-left">
            <div className="inline-block px-4 py-1 bg-oxigen-light/10 border border-oxigen-light/30 rounded-full">
              <span className="text-software-bright font-medium text-sm tracking-wide">UKM OXIGEN UTB</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Live with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-software-bright to-hardware-cyan">
                Technology
              </span>
            </h1>

            <p className="text-gray-400 text-lg max-w-lg mx-auto md:mx-0">
              Wadah kreativitas mahasiswa dalam mengembangkan potensi di bidang Software, Hardware, dan Game Development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="/register"
                className="px-8 py-3 bg-oxigen-light hover:bg-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-oxigen-light/25 text-center"
              >
                Bergabung Sekarang
              </a>

              <a
                href="/#division"
                className="px-8 py-3 border border-gray-600 hover:border-software-bright hover:text-software-bright text-gray-300 rounded-lg font-semibold transition-all text-center"
              >
                Pelajari Divisi
              </a>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="relative flex justify-center">
            <div
              className="absolute inset-0 bg-gradient-to-tr from-oxigen-light to-software-tosca rounded-full blur-2xl scale-90 animate-glow "
            ></div>

            {/* Gambar */}
            <img
              src="/techno.png"
              alt="Technology Illustration"
              className="relative z-10 w-full max-w-md drop-shadow-2xl animate-float"
            />
          </div>


        </div>
      </div>
    </section>
  );
};

export default Hero;