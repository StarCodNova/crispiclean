import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { z } from "zod";
import { insertAnalysisResultSchema } from "@shared/schema";

// Function to get food-specific health tips and nutritional information
function getFoodSpecificTips(foodName: string): { tip: string; nutrition: string } {
  const foodInfo: Record<string, { tip: string; nutrition: string }> = {
    "Ayam Goreng": {
      tip: "Try air-frying chicken for a healthier alternative with similar crispy texture.",
      nutrition: "Contains protein which helps build muscle, but high in fat. Look for leaner cuts like breast meat."
    },
    "Pisang Goreng": {
      tip: "Banana fritters can be made healthier by using whole wheat flour or oats in the batter.",
      nutrition: "Bananas provide potassium, vitamin B6, and dietary fiber, but the frying process adds unhealthy fats."
    },
    "Udang Goreng": {
      tip: "Shrimp is naturally low in calories and high in protein. Try grilling instead of frying.",
      nutrition: "Rich in omega-3 fatty acids, iodine, selenium, and protein. Good for heart health and thyroid function."
    },
    "Keropok": {
      tip: "Consume crackers in moderation as part of a balanced meal rather than as a standalone snack.",
      nutrition: "Generally high in sodium and refined carbohydrates, which can lead to water retention and blood pressure issues."
    },
    "Donut Gula": {
      tip: "For a healthier sweet treat, baked donuts have significantly less fat than fried ones.",
      nutrition: "High in simple sugars and refined carbohydrates. Limited nutritional value but high in calories."
    },
    "Kuih Keria": {
      tip: "These sweet potato donuts contain beneficial vitamins. Enjoy them on special occasions.",
      nutrition: "Sweet potatoes are rich in vitamin A, potassium, and fiber, but the deep-frying process adds unhealthy fats."
    },
    "Cekodok": {
      tip: "Banana fritters can be made with ripe bananas to reduce added sugar content.",
      nutrition: "Ripe bananas provide natural sugars and potassium, which supports heart health and muscle function."
    }
  };
  
  return foodInfo[foodName] || {
    tip: "Consider using CrispiClean regularly to reduce calories in all your fried foods.",
    nutrition: "Deep-fried foods are generally high in calories, trans fats, and may contain acrylamide (a potentially harmful compound formed during frying)."
  };
}

// Function to get general health advice based on calorie reduction
function getGeneralHealthAdvice(percentReduction: number): string {
  if (percentReduction >= 20) {
    return "Great job! This significant reduction in calories can help maintain a healthier diet while still enjoying your favorite foods.";
  } else if (percentReduction >= 15) {
    return "Good result! This calorie reduction contributes to a healthier lifestyle without sacrificing taste.";
  } else {
    return "Every bit of calorie reduction helps. Combined with regular exercise, this can contribute to better health.";
  }
}

// Configure multer for image upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all foods
  app.get("/api/foods", async (_req: Request, res: Response) => {
    try {
      const foods = await storage.getFoods();
      res.json(foods);
    } catch (error) {
      res.status(500).json({ message: "Error fetching foods" });
    }
  });

  // Get a specific food by ID
  app.get("/api/foods/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const food = await storage.getFoodById(id);
      if (!food) {
        return res.status(404).json({ message: "Food not found" });
      }

      res.json(food);
    } catch (error) {
      res.status(500).json({ message: "Error fetching food" });
    }
  });

  // Analyze image and identify food
  app.post("/api/analyze-image", upload.single("image"), async (req: Request, res: Response) => {
    try {
      console.log("Received image analysis request");
      
      if (!req.file) {
        console.log("No file in request:", req.body);
        return res.status(400).json({ message: "No image file provided" });
      }
      
      console.log(`Processing image: ${req.file.originalname}, size: ${req.file.size}`, 
                  `mimetype: ${req.file.mimetype}`);

      // In a real application, we would call an AI service here
      // For this demo, we'll simulate AI detection by picking a random food
      const foods = await storage.getFoods();
      
      if (!foods || foods.length === 0) {
        console.log("No foods found in database");
        return res.status(500).json({ message: "Food database not available" });
      }
      
      const randomIndex = Math.floor(Math.random() * foods.length);
      const detectedFood = foods[randomIndex];
      
      console.log(`Detected food: ${detectedFood.name}`);
      
      // Simulate weight estimation (between 50 and 250 grams)
      const estimatedWeight = Math.floor(Math.random() * (250 - 50) + 50);
      
      // Calculate calories based on detected food and estimated weight
      const caloriesBefore = (estimatedWeight / 100) * detectedFood.caloriesBefore;
      const caloriesAfter = (estimatedWeight / 100) * detectedFood.caloriesAfter;
      
      console.log(`Estimated weight: ${estimatedWeight}g, Calories before: ${caloriesBefore}, Calories after: ${caloriesAfter}`);
      
      // Create analysis result
      const analysisResult = {
        foodId: detectedFood.id,
        imageUrl: `https://example.com/uploads/${req.file.originalname}`, // In a real app, upload to storage
        estimatedWeight,
        caloriesBefore,
        caloriesAfter,
        createdAt: new Date().toISOString(),
      };
      
      // Validate the analysis result
      const validatedResult = insertAnalysisResultSchema.parse(analysisResult);
      
      // Save the analysis result
      const savedResult = await storage.createAnalysisResult(validatedResult);
      console.log("Analysis result saved successfully");
      
      // Generate health advice based on the food type and calorie reduction
      const calorieReduction = caloriesBefore - caloriesAfter;
      const percentReduction = (calorieReduction / caloriesBefore) * 100;
      
      // Generate tips based on the food
      const foodTips = getFoodSpecificTips(detectedFood.name);
      const generalAdvice = getGeneralHealthAdvice(percentReduction);
      
      // Return result to client with advice and nutrition info
      res.json({
        foodName: detectedFood.name,
        foodId: detectedFood.id,
        estimatedWeight,
        caloriesBefore,
        caloriesAfter,
        advice: {
          healthTip: generalAdvice,
          foodSpecificTip: foodTips.tip,
          nutritionInfo: foodTips.nutrition
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        return res.status(400).json({ message: "Invalid data format", errors: error.errors });
      }
      console.error("Error analyzing image:", error);
      res.status(500).json({ message: "Error analyzing image" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
