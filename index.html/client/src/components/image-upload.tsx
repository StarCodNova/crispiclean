import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { apiRequest } from '@/lib/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AnalysisResult {
  foodName: string;
  foodId: number;
  estimatedWeight: number;
  caloriesBefore: number;
  caloriesAfter: number;
  advice?: {
    healthTip: string;
    foodSpecificTip: string;
    nutritionInfo: string;
  };
}

interface Food {
  id: number;
  name: string;
  caloriesBefore: number;
  caloriesAfter: number;
}

export function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [isEditingFood, setIsEditingFood] = useState(false);
  const { toast } = useToast();
  
  // Fetch available foods for correction dropdown
  const { data: foods = [] } = useQuery<Food[]>({
    queryKey: ['/api/foods'],
    refetchOnWindowFocus: false,
  });
  
  // Mutation for analyzing image
  const { mutate: analyzeImage, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      setAnalyzing(true);
      try {
        const response = await apiRequest('POST', '/api/analyze-image', formData);
        return response.json();
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      setAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${data.foodName}`,
      });
    },
    onError: (error) => {
      console.error("Analysis error:", error);
      setAnalyzing(false);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze the image. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // State for food search
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  // Function to handle food correction
  const handleFoodCorrection = (selectedFoodId: string) => {
    if (!analysisResult) return;
    
    const foodId = parseInt(selectedFoodId);
    const selectedFood = foods.find(f => f.id === foodId);
    
    if (selectedFood) {
      // Recalculate calories based on the selected food and current weight
      const estimatedWeight = analysisResult.estimatedWeight;
      const caloriesBefore = (estimatedWeight / 100) * selectedFood.caloriesBefore;
      const caloriesAfter = (estimatedWeight / 100) * selectedFood.caloriesAfter;
      
      // Fetch updated food specific tips from the API
      // In a real app, this would be an actual endpoint that returns nutritional info and advice
      fetch(`/api/foods/${foodId}`)
        .then(res => res.json())
        .then(foodData => {
          // Simulate getting updated advice based on the new food type
          // In a real implementation, this would come from the server
          
          // Make a simulated API call for updated advice
          return fetch('/api/analyze-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              foodId,
              estimatedWeight: analysisResult.estimatedWeight,
              skipImageProcessing: true, // This would be a flag for a real API
            }),
          })
          .then(response => response.json())
          .catch(() => {
            // If the API call fails, we'll simulate advice content on the client
            // This is just for demo purposes - in a real app, always use server-generated content
            
            // Get nutritional info based on food name
            const nutritionInfo = foods.length > 0 ? 
              `${selectedFood.name} ${selectedFood.caloriesAfter < 300 ? 'is relatively low in calories' : 'is high in calories'} compared to other foods.` : 
              "Nutritional information unavailable.";
              
            return {
              advice: {
                healthTip: `Using CrispiClean with ${selectedFood.name} can help reduce unhealthy fats while preserving taste.`,
                foodSpecificTip: `${selectedFood.name} can be part of a balanced diet when consumed in moderation.`,
                nutritionInfo
              }
            };
          });
        })
        .then(adviceData => {
          // Update the analysis result with the new food data and advice
          setAnalysisResult({
            ...analysisResult,
            foodName: selectedFood.name,
            foodId: selectedFood.id,
            caloriesBefore,
            caloriesAfter,
            advice: adviceData?.advice || {
              ...analysisResult.advice,
              nutritionInfo: `${selectedFood.name} contains essential nutrients, but the deep-frying process adds unhealthy fats.`
            }
          });
        
          toast({
            title: "Food Corrected",
            description: `Updated to ${selectedFood.name}`,
          });
          
          setIsEditingFood(false);
        })
        .catch(error => {
          console.error('Error updating food:', error);
          toast({
            title: "Correction Failed",
            description: "Could not update food data. Please try again.",
            variant: "destructive",
          });
        });
    }
  };
  
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setAnalysisResult(null);
      
      // Create preview
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      
      toast({
        title: "Image Uploaded",
        description: "Image ready for analysis",
      });
    }
  };
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });
  
  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    setAnalysisResult(null);
  };
  
  const handleAnalyzeImage = () => {
    if (!file) {
      toast({
        title: "No Image Selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }
    
    const formData = new FormData();
    formData.append('image', file);
    
    analyzeImage(formData);
  };
  
  return (
    <div id="analysis" className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-[#38BDF8]/20 hover:shadow-lg hover:shadow-[#38BDF8]/20 transition-all duration-300">
      <h3 className="text-2xl font-semibold mb-6 text-center">AI Food Analysis</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-gray-300 text-center">
            Upload a picture of deep-fried food and let our advanced AI analyze calorie reduction with CrispiClean technology.
          </p>
          <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-400/20">
            <p className="text-yellow-400 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Note: Our AI is currently in training phase and learning to better identify Malaysian food. If the detected food is incorrect, please search for the correct food to help train our system.</span>
            </p>
          </div>
        </div>
        
        {!preview ? (
          <div 
            className="border-2 border-dashed border-[#38BDF8]/30 rounded-xl p-8 text-center bg-black/20 cursor-pointer hover:bg-black/30 hover:border-[#38BDF8]/50 transition-all"
            {...getRootProps()}
          >
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#38BDF8]/60 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-[#38BDF8] mb-2 font-medium">Drag and drop food image here</p>
              <p className="text-gray-400 text-sm mb-5">or</p>
              <button className="px-6 py-3 bg-[#38BDF8]/20 text-[#38BDF8] rounded-full border border-[#38BDF8]/30 hover:bg-[#38BDF8]/30 transition-all">
                Choose Image File
              </button>
              <input {...getInputProps()} />
            </div>
          </div>
        ) : (
          <div>
            <div className="relative rounded-xl overflow-hidden mb-6 ring-4 ring-[#38BDF8]/20">
              <img 
                src={preview} 
                alt="Food Image" 
                className="w-full h-56 object-cover" 
              />
              <button 
                className="absolute top-3 right-3 p-2 bg-black/70 rounded-full hover:bg-black/90 transition-colors"
                onClick={removeImage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <button 
              className={`w-full py-4 bg-gradient-to-r from-[#38BDF8] to-[#0CD7E4] rounded-full font-medium text-lg shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 transition-all ${
                isPending ? 'opacity-75 cursor-not-allowed' : 'hover:translate-y-[-1px]'
              }`}
              onClick={handleAnalyzeImage}
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing with AI...
                </div>
              ) : 'Analyze with Advanced AI'}
            </button>
            
            {analysisResult && (
              <div className="mt-6 bg-[#38BDF8]/10 rounded-xl p-6 border border-[#38BDF8]/30">
                <h4 className="text-xl font-semibold mb-4 text-center text-[#38BDF8]">AI Analysis Results</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-[#38BDF8]/20">
                    <span className="text-gray-300">Detected Food:</span>
                    
                    {isEditingFood ? (
                      <div className="w-1/2">
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              aria-label="Search for correct food"
                              className="w-full justify-between bg-black/20 border-[#38BDF8]/30 focus:ring-[#38BDF8]/30"
                            >
                              {searchValue
                                ? foods.find(food => food.name.toLowerCase().includes(searchValue.toLowerCase()))?.name || "Search..."
                                : "Search for correct food"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 bg-gray-900/80 backdrop-blur-lg border-[#38BDF8]/30">
                            <Command className="bg-transparent">
                              <CommandInput placeholder="Search food..." className="h-9 text-[#38BDF8]" value={searchValue} onValueChange={setSearchValue} />
                              <CommandList>
                                <CommandEmpty>No food found, AI is still training.</CommandEmpty>
                                <CommandGroup>
                                  {foods.filter(food => food.name.toLowerCase().includes(searchValue.toLowerCase())).map((food) => (
                                    <CommandItem
                                      key={food.id}
                                      value={food.name}
                                      onSelect={() => {
                                        handleFoodCorrection(food.id.toString());
                                        setOpen(false);
                                        setSearchValue("");
                                      }}
                                      className="cursor-pointer hover:bg-[#38BDF8]/20"
                                    >
                                      <Check className={`mr-2 h-4 w-4 ${analysisResult?.foodId === food.id ? "opacity-100" : "opacity-0"}`} />
                                      {food.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{analysisResult.foodName}</span>
                        <button 
                          onClick={() => setIsEditingFood(true)}
                          className="p-1 text-gray-400 hover:text-[#38BDF8] transition-colors"
                          title="Correct food name"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-[#38BDF8]/20">
                    <span className="text-gray-300">Estimated Weight:</span>
                    <span className="text-white font-medium">{analysisResult.estimatedWeight}g</span>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Calories Before:</span>
                      <span className="text-white">{analysisResult.caloriesBefore.toFixed(1)} kcal</span>
                    </div>
                    
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-300">Calories After CrispiClean:</span>
                      <span className="text-[#38BDF8] font-medium">{analysisResult.caloriesAfter.toFixed(1)} kcal</span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-[#38BDF8] to-[#0CD7E4] h-2.5 rounded-full" 
                        style={{ width: `${Math.min(((analysisResult.caloriesBefore - analysisResult.caloriesAfter) / analysisResult.caloriesBefore * 100), 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-[#38BDF8]">
                        {((analysisResult.caloriesBefore - analysisResult.caloriesAfter) / analysisResult.caloriesBefore * 100).toFixed(1)}% Reduction
                      </span>
                      <span className="text-gray-400">
                        -{(analysisResult.caloriesBefore - analysisResult.caloriesAfter).toFixed(1)} kcal
                      </span>
                    </div>
                  </div>
                  
                  {/* Health Advice Section */}
                  {analysisResult.advice && (
                    <div className="mt-5 bg-gradient-to-br from-[#38BDF8]/10 to-[#0CD7E4]/5 rounded-xl p-5 border border-[#38BDF8]/20">
                      <h5 className="text-lg font-medium mb-3 text-[#38BDF8]">Health Tips & Advice</h5>
                      
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <p className="text-gray-200">{analysisResult.advice.healthTip}</p>
                        </div>
                        
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <p className="text-gray-200">{analysisResult.advice.foodSpecificTip}</p>
                        </div>
                        
                        {analysisResult.advice.nutritionInfo && (
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8.5h10M7 12h4m1 8-4-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3l-4 4z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-white font-medium mb-1">Nutritional Information:</p>
                              <p className="text-gray-200">{analysisResult.advice.nutritionInfo}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}