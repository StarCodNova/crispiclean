export function TechnologySection() {
  return (
    <section id="technology" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-black/30">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">CrispiClean Technology</h2>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg hover:shadow-[#38BDF8]/20 transition-all duration-300 border border-[#38BDF8]/20">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-16 h-16 bg-[#38BDF8]/20 rounded-lg flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">Oil Spinner Mechanism with AI Technology</h3>
                <p className="text-gray-300 leading-relaxed">
                  CrispiClean uses a smart spinning technology that identifies and extracts excess oil 
                  from deep-fried food without affecting taste. The specialized collection system with oil filter 
                  uses AI algorithms to precisely control the process based on food type.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-[#2e5ce6]/20 to-[#38BDF8]/20 rounded-xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold mb-6">20% Calorie Reduction</h3>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="text-5xl text-[#38BDF8]">20%</span>
              <div className="text-left">
                <p className="text-gray-300">
                  Calorie reduction for all types of Malaysian deep-fried foods. Same taste, fewer calories.
                </p>
              </div>
            </div>
            
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#38BDF8] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Less saturated fat</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#38BDF8] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Same great taste</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#38BDF8] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Healthier option</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
