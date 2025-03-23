import { useState } from "react";
import { Food } from "@shared/schema";

interface FoodDatabaseProps {
  foods: Food[];
}

export function FoodDatabase({ foods }: FoodDatabaseProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredFoods = foods.filter(food => 
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="makanan" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Pangkalan Data Makanan</h2>
        
        <div className="relative max-w-xl mx-auto mb-12">
          <input 
            type="text" 
            id="searchInput" 
            placeholder="🔍 Cari makanan..."
            className="w-full px-5 py-4 bg-white/5 backdrop-blur border border-white/10 rounded-full outline-none focus:ring-2 focus:ring-[#38BDF8]/50 text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="relative overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-[#38BDF8]/20 border-b border-white/10">
              <tr>
                <th scope="col" className="p-4 md:p-5">No.</th>
                <th scope="col" className="p-4 md:p-5">Gambar</th>
                <th scope="col" className="p-4 md:p-5">Nama Makanan</th>
                <th scope="col" className="p-4 md:p-5">Kalori Sebelum (100g)</th>
                <th scope="col" className="p-4 md:p-5 text-[#38BDF8]">Kalori Selepas (100g)</th>
              </tr>
            </thead>
            <tbody>
              {filteredFoods.length > 0 ? (
                filteredFoods.map((food, index) => (
                  <tr key={food.id} className="border-b border-white/5 hover:bg-white/10 transition-colors">
                    <td className="p-4 md:p-5">{index + 1}</td>
                    <td className="p-4 md:p-5">
                      <img 
                        src={food.imageUrl} 
                        alt={food.name} 
                        className="w-16 h-16 object-cover rounded-lg shadow-md" 
                      />
                    </td>
                    <td className="p-4 md:p-5 font-medium">{food.name}</td>
                    <td className="p-4 md:p-5">{food.caloriesBefore.toFixed(2)} kcal</td>
                    <td className="p-4 md:p-5 text-[#38BDF8] font-medium">{food.caloriesAfter.toFixed(2)} kcal</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 md:p-5 text-center text-gray-400">
                    Tiada makanan dijumpai. Sila cuba carian lain.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {foods.length > 5 && (
          <div className="mt-4 text-right">
            <button className="text-[#38BDF8] hover:text-[#0CD7E4] transition-colors flex items-center ml-auto">
              Lihat semua makanan
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
