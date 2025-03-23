export function ComparisonSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center">Sebelum vs Selepas CrispiClean</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative rounded-xl overflow-hidden group hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#38BDF8]/20 transition-all duration-300">
            <img 
              src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Sebelum" 
              className="w-full h-80 object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
              <div className="p-6">
                <div className="text-2xl font-semibold mb-2">Sebelum</div>
                <p className="text-gray-300">Minyak berlebihan meningkatkan kandungan kalori dan lemak tepu.</p>
                <div className="mt-4 inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  267 kcal / 100g
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden group hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#38BDF8]/20 transition-all duration-300">
            <img 
              src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Selepas" 
              className="w-full h-80 object-cover brightness-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
              <div className="p-6">
                <div className="text-2xl font-semibold mb-2 text-[#38BDF8]">Selepas CrispiClean</div>
                <p className="text-gray-300">Minyak berlebihan dikeluarkan, mengurangkan kalori tanpa menjejaskan rasa.</p>
                <div className="mt-4 inline-block px-4 py-2 bg-[#38BDF8]/30 backdrop-blur-sm rounded-lg text-[#38BDF8]">
                  213.6 kcal / 100g
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            CrispiClean mengurangkan kandungan kalori makanan bergoreng secara purata sebanyak 20% tanpa menjejaskan rasa atau tekstur.
          </p>
          <a 
            href="#" 
            className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#0CD7E4] text-white font-medium shadow-lg shadow-cyan-500/20 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
          >
            Tempah CrispiClean Anda Hari Ini
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
