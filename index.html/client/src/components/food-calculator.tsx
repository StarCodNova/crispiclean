import { useState, useEffect, useRef } from "react";
import { Food } from "@shared/schema";

interface FoodCalculatorProps {
  foods: Food[];
}

export function FoodCalculator({ foods }: FoodCalculatorProps) {
  const [selectedFoodId, setSelectedFoodId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [grams, setGrams] = useState<number | "">("");
  const [calculatedCaloriesBefore, setCalculatedCaloriesBefore] = useState(0);
  const [calculatedCaloriesAfter, setCalculatedCaloriesAfter] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    calculateCalories();
  }, [selectedFoodId, grams]);
  
  const calculateCalories = () => {
    if (!selectedFoodId || !grams || isNaN(Number(grams))) {
      setCalculatedCaloriesBefore(0);
      setCalculatedCaloriesAfter(0);
      return;
    }
    
    const selectedFood = foods.find(food => food.id.toString() === selectedFoodId);
    if (!selectedFood) return;
    
    const gramValue = Number(grams);
    const caloriesBefore = (gramValue / 100) * selectedFood.caloriesBefore;
    const caloriesAfter = (gramValue / 100) * selectedFood.caloriesAfter;
    
    setCalculatedCaloriesBefore(caloriesBefore);
    setCalculatedCaloriesAfter(caloriesAfter);
  };
  
  const filteredFoods = foods.filter(food => 
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleFoodSelect = (foodId: string) => {
    setSelectedFoodId(foodId);
    setSearchTerm(foods.find(f => f.id.toString() === foodId)?.name || "");
    setShowResults(false);
  };
  
  const handleCalculate = () => {
    calculateCalories();
    if (selectedFoodId && grams) {
      setShowResults(true);
    }
  };
  
  const calorieReduction = calculatedCaloriesBefore - calculatedCaloriesAfter;
  const reductionPercentage = calculatedCaloriesBefore ? (calorieReduction / calculatedCaloriesBefore) * 100 : 0;
  
  return (
    <div id="calculator" className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-[#38BDF8]/20 hover:shadow-lg hover:shadow-[#38BDF8]/20 transition-all duration-300">
      <h3 className="text-2xl font-semibold mb-6 text-center">Calorie Calculator</h3>
      
      <div className="space-y-6">
        <div className="relative">
          <label className="block text-gray-300 font-medium mb-2">Search for Deep-Fried Food</label>
          <input 
            type="text" 
            ref={searchRef}
            placeholder="Type to search Malaysian deep-fried foods..." 
            className="w-full px-4 py-3 bg-black/20 border border-[#38BDF8]/30 rounded-lg outline-none focus:ring-2 focus:ring-[#38BDF8]/50 text-white"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowResults(false);
            }}
            onFocus={() => filteredFoods.length > 0 && setShowResults(true)}
          />
          
          {searchTerm && filteredFoods.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-black/90 border border-[#38BDF8]/30 rounded-lg max-h-60 overflow-auto">
              {filteredFoods.map(food => (
                <div 
                  key={food.id} 
                  className="px-4 py-2 cursor-pointer hover:bg-[#38BDF8]/20 transition-colors"
                  onClick={() => handleFoodSelect(food.id.toString())}
                >
                  {food.name}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-gray-300 font-medium mb-2">Enter Weight (grams)</label>
          <input 
            type="number" 
            id="grams" 
            placeholder="Example: 100" 
            className="w-full px-4 py-3 bg-black/20 border border-[#38BDF8]/30 rounded-lg outline-none focus:ring-2 focus:ring-[#38BDF8]/50 text-white"
            value={grams}
            onChange={(e) => setGrams(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
        
        <button 
          className="w-full py-3 bg-gradient-to-r from-[#38BDF8] to-[#0CD7E4] rounded-lg font-medium text-white shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:translate-y-[-1px]"
          onClick={handleCalculate}
          disabled={!selectedFoodId || !grams}
        >
          Calculate with AI
        </button>
        
        {showResults && calculatedCaloriesBefore > 0 && (
          <div className="mt-6 bg-gradient-to-r from-[#2e5ce6]/20 to-[#38BDF8]/20 rounded-xl p-5">
            <h4 className="font-medium text-xl mb-6 text-center text-white">Calorie Calculation Results</h4>
            
            <div className="flex items-center justify-center mb-6">
              <div className="h-20 w-20 rounded-full flex items-center justify-center bg-black/30 border-4 border-[#38BDF8]/30">
                <span className="text-xl font-bold text-[#38BDF8]">{reductionPercentage.toFixed(0)}%</span>
              </div>
              <div className="w-12 h-[2px] bg-gradient-to-r from-gray-500/50 to-transparent"></div>
              <div className="bg-black/30 rounded-xl py-2 px-4 text-sm">
                <span className="text-gray-400">Reduction</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1 text-center">
                <div className="text-sm text-gray-400 uppercase">Before</div>
                <div className="text-2xl font-medium text-white">{calculatedCaloriesBefore.toFixed(0)}</div>
                <div className="text-sm text-gray-400">kcal</div>
              </div>
              
              <div className="space-y-1 text-center">
                <div className="text-sm text-gray-400 uppercase">After</div>
                <div className="text-2xl font-medium text-[#38BDF8]">{calculatedCaloriesAfter.toFixed(0)}</div>
                <div className="text-sm text-gray-400">kcal</div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <div className="text-gray-300">Total Reduction:</div>
                <div className="text-lg font-medium text-[#38BDF8]">
                  -{calorieReduction.toFixed(1)} kcal
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 text-center">
              <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#38BDF8] to-[#0CD7E4] h-2.5 rounded-full" 
                  style={{ width: `${reductionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-black/30 p-4 rounded-lg border border-[#38BDF8]/20 text-sm text-gray-300">
          <p>CrispiClean technology consistently reduces the calorie content of deep-fried foods by approximately 20% without affecting taste.</p>
        </div>
      </div>
    </div>
  );
}
