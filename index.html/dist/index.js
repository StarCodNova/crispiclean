// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  foodsMap;
  analysisResultsMap;
  userIdCounter;
  foodIdCounter;
  analysisResultIdCounter;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.foodsMap = /* @__PURE__ */ new Map();
    this.analysisResultsMap = /* @__PURE__ */ new Map();
    this.userIdCounter = 1;
    this.foodIdCounter = 1;
    this.analysisResultIdCounter = 1;
    this.initializeFoods();
  }
  initializeFoods() {
    const initialFoods = [
      {
        name: "Ayam Goreng",
        imageUrl: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 267,
        caloriesAfter: 213.6
      },
      {
        name: "Pisang Goreng",
        imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 267,
        caloriesAfter: 213.6
      },
      {
        name: "Cempedak Goreng",
        imageUrl: "https://images.unsplash.com/photo-1639024471283-03518883512f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 280,
        caloriesAfter: 224
      },
      {
        name: "Nugget",
        imageUrl: "https://images.unsplash.com/photo-1619021099058-af6e296d0da7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 290,
        caloriesAfter: 232
      },
      {
        name: "Karipap",
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 400,
        caloriesAfter: 320
      },
      {
        name: "Cekodok",
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 350,
        caloriesAfter: 280
      },
      {
        name: "Kerepek Pisang",
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 450,
        caloriesAfter: 360
      },
      {
        name: "Kuih Keria",
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 380,
        caloriesAfter: 304
      },
      {
        name: "Donut Gula",
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 420,
        caloriesAfter: 336
      },
      {
        name: "Kuih Bom",
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 410,
        caloriesAfter: 328
      },
      {
        name: "Pau Goreng",
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 390,
        caloriesAfter: 312
      },
      {
        name: "Cucur Badak",
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 370,
        caloriesAfter: 296
      },
      {
        name: "Vadai",
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 360,
        caloriesAfter: 288
      },
      {
        name: "Samosa",
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 410,
        caloriesAfter: 328
      }
    ];
    initialFoods.forEach((food) => {
      this.createFood(food);
    });
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.userIdCounter++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Food methods
  async getFoods() {
    return Array.from(this.foodsMap.values());
  }
  async getFoodById(id) {
    return this.foodsMap.get(id);
  }
  async getFoodByName(name) {
    return Array.from(this.foodsMap.values()).find(
      (food) => food.name.toLowerCase() === name.toLowerCase()
    );
  }
  async createFood(insertFood) {
    const id = this.foodIdCounter++;
    const food = { ...insertFood, id };
    this.foodsMap.set(id, food);
    return food;
  }
  // Analysis result methods
  async getAnalysisResults() {
    return Array.from(this.analysisResultsMap.values());
  }
  async createAnalysisResult(insertResult) {
    const id = this.analysisResultIdCounter++;
    const result = {
      id,
      imageUrl: insertResult.imageUrl,
      estimatedWeight: insertResult.estimatedWeight,
      caloriesBefore: insertResult.caloriesBefore,
      caloriesAfter: insertResult.caloriesAfter,
      createdAt: insertResult.createdAt,
      foodId: insertResult.foodId ?? null
      // Ensure null instead of undefined
    };
    this.analysisResultsMap.set(id, result);
    return result;
  }
};
var storage = new MemStorage();

// server/routes.ts
import multer from "multer";
import { z } from "zod";

// shared/schema.ts
import { pgTable, text, serial, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var foods = pgTable("foods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
  caloriesBefore: real("calories_before").notNull(),
  // calories per 100g before processing
  caloriesAfter: real("calories_after").notNull()
  // calories per 100g after processing
});
var insertFoodSchema = createInsertSchema(foods).pick({
  name: true,
  imageUrl: true,
  caloriesBefore: true,
  caloriesAfter: true
});
var analysisResults = pgTable("analysis_results", {
  id: serial("id").primaryKey(),
  foodId: integer("food_id").references(() => foods.id),
  imageUrl: text("image_url").notNull(),
  estimatedWeight: real("estimated_weight").notNull(),
  // estimated weight in grams
  caloriesBefore: real("calories_before").notNull(),
  // total calories before
  caloriesAfter: real("calories_after").notNull(),
  // total calories after
  createdAt: text("created_at").notNull()
  // timestamp
});
var insertAnalysisResultSchema = createInsertSchema(analysisResults).pick({
  foodId: true,
  imageUrl: true,
  estimatedWeight: true,
  caloriesBefore: true,
  caloriesAfter: true,
  createdAt: true
});

// server/routes.ts
function getFoodSpecificTips(foodName) {
  const foodInfo = {
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
function getGeneralHealthAdvice(percentReduction) {
  if (percentReduction >= 20) {
    return "Great job! This significant reduction in calories can help maintain a healthier diet while still enjoying your favorite foods.";
  } else if (percentReduction >= 15) {
    return "Good result! This calorie reduction contributes to a healthier lifestyle without sacrificing taste.";
  } else {
    return "Every bit of calorie reduction helps. Combined with regular exercise, this can contribute to better health.";
  }
}
var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
    // 5MB limit
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  }
});
async function registerRoutes(app2) {
  app2.get("/api/foods", async (_req, res) => {
    try {
      const foods2 = await storage.getFoods();
      res.json(foods2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching foods" });
    }
  });
  app2.get("/api/foods/:id", async (req, res) => {
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
  app2.post("/api/analyze-image", upload.single("image"), async (req, res) => {
    try {
      console.log("Received image analysis request");
      if (!req.file) {
        console.log("No file in request:", req.body);
        return res.status(400).json({ message: "No image file provided" });
      }
      console.log(
        `Processing image: ${req.file.originalname}, size: ${req.file.size}`,
        `mimetype: ${req.file.mimetype}`
      );
      const foods2 = await storage.getFoods();
      if (!foods2 || foods2.length === 0) {
        console.log("No foods found in database");
        return res.status(500).json({ message: "Food database not available" });
      }
      const randomIndex = Math.floor(Math.random() * foods2.length);
      const detectedFood = foods2[randomIndex];
      console.log(`Detected food: ${detectedFood.name}`);
      const estimatedWeight = Math.floor(Math.random() * (250 - 50) + 50);
      const caloriesBefore = estimatedWeight / 100 * detectedFood.caloriesBefore;
      const caloriesAfter = estimatedWeight / 100 * detectedFood.caloriesAfter;
      console.log(`Estimated weight: ${estimatedWeight}g, Calories before: ${caloriesBefore}, Calories after: ${caloriesAfter}`);
      const analysisResult = {
        foodId: detectedFood.id,
        imageUrl: `https://example.com/uploads/${req.file.originalname}`,
        // In a real app, upload to storage
        estimatedWeight,
        caloriesBefore,
        caloriesAfter,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const validatedResult = insertAnalysisResultSchema.parse(analysisResult);
      const savedResult = await storage.createAnalysisResult(validatedResult);
      console.log("Analysis result saved successfully");
      const calorieReduction = caloriesBefore - caloriesAfter;
      const percentReduction = calorieReduction / caloriesBefore * 100;
      const foodTips = getFoodSpecificTips(detectedFood.name);
      const generalAdvice = getGeneralHealthAdvice(percentReduction);
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    base: "/CrispiClean/"
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
