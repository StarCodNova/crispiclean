export function HeroSection() {
  return (
    <section className="pt-28 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          <span className="block">🔷 CrispiClean</span>
          <span className="block bg-gradient-to-r from-[#38BDF8] to-[#0CD7E4] bg-clip-text text-transparent mt-2">Healthier Food Revolution</span>
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
          Compare calories before and after using CrispiClean's revolutionary oil reduction technology for deep-fried foods.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="#analysis" 
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#0CD7E4] text-white font-medium shadow-lg shadow-cyan-500/20 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
          >
            AI Image Analysis
          </a>
          <a 
            href="#calculator" 
            className="px-8 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white font-medium hover:translate-y-[-2px] hover:shadow-lg hover:shadow-white/5 transition-all duration-300"
          >
            Calorie Calculator
          </a>
        </div>
        
        {/* Abstract design element */}
        <div className="relative mt-20 h-20 sm:h-24 md:h-32">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#38BDF8] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-[float_4s_ease-in-out_infinite]"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#0CD7E4] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-[float_4s_ease-in-out_infinite_0.5s]"></div>
        </div>
      </div>
    </section>
  );
}
