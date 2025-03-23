import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { TechnologySection } from "@/components/technology-section";
import { FoodCalculator } from "@/components/food-calculator";
import { ImageUpload } from "@/components/image-upload";
import { Footer } from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { Food } from "@shared/schema";

export default function Home() {
  // Fetch food data from the server
  const { data: foods = [] } = useQuery<Food[]>({
    queryKey: ['/api/foods'],
  });

  return (
    <div className="min-h-screen bg-[#0F172A] text-white antialiased font-sans">
      <Navbar />
      <HeroSection />
      <TechnologySection />
      <div className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">AI Food Analysis</h2>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl">
              <ImageUpload />
            </div>
            <div className="w-full max-w-2xl mt-8">
              <FoodCalculator foods={foods} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
