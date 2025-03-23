import { 
  users, 
  foods, 
  analysisResults, 
  type User, 
  type InsertUser, 
  type Food, 
  type InsertFood,
  type AnalysisResult,
  type InsertAnalysisResult
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods (keeping these from the original)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Food methods
  getFoods(): Promise<Food[]>;
  getFoodById(id: number): Promise<Food | undefined>;
  getFoodByName(name: string): Promise<Food | undefined>;
  createFood(food: InsertFood): Promise<Food>;
  
  // Analysis result methods
  getAnalysisResults(): Promise<AnalysisResult[]>;
  createAnalysisResult(result: InsertAnalysisResult): Promise<AnalysisResult>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private foodsMap: Map<number, Food>;
  private analysisResultsMap: Map<number, AnalysisResult>;
  private userIdCounter: number;
  private foodIdCounter: number;
  private analysisResultIdCounter: number;

  constructor() {
    this.users = new Map();
    this.foodsMap = new Map();
    this.analysisResultsMap = new Map();
    this.userIdCounter = 1;
    this.foodIdCounter = 1;
    this.analysisResultIdCounter = 1;
    
    // Initialize with some Malaysian foods
    this.initializeFoods();
  }

  private initializeFoods() {
    const initialFoods = [
      { 
        name: "Ayam Goreng", 
        imageUrl: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 267.0,
        caloriesAfter: 213.6
      },
      { 
        name: "Pisang Goreng", 
        imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 267.0,
        caloriesAfter: 213.6
      },
      { 
        name: "Cempedak Goreng", 
        imageUrl: "https://images.unsplash.com/photo-1639024471283-03518883512f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 280.0,
        caloriesAfter: 224.0
      },
      { 
        name: "Nugget", 
        imageUrl: "https://images.unsplash.com/photo-1619021099058-af6e296d0da7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 290.0,
        caloriesAfter: 232.0
      },
      { 
        name: "Karipap", 
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 400.0,
        caloriesAfter: 320.0
      },
      { 
        name: "Cekodok", 
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 350.0,
        caloriesAfter: 280.0
      },
      { 
        name: "Kerepek Pisang", 
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 450.0,
        caloriesAfter: 360.0
      },
      { 
        name: "Kuih Keria", 
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 380.0,
        caloriesAfter: 304.0
      },
      { 
        name: "Donut Gula", 
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 420.0,
        caloriesAfter: 336.0
      },
      { 
        name: "Kuih Bom", 
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 410.0,
        caloriesAfter: 328.0
      },
      { 
        name: "Pau Goreng", 
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 390.0,
        caloriesAfter: 312.0
      },
      { 
        name: "Cucur Badak", 
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 370.0,
        caloriesAfter: 296.0
      },
      { 
        name: "Vadai", 
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 360.0,
        caloriesAfter: 288.0
      },
      { 
        name: "Samosa", 
        imageUrl: "https://images.unsplash.com/photo-1625498542602-6faf30276ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
        caloriesBefore: 410.0,
        caloriesAfter: 328.0
      }
    ];
    
    initialFoods.forEach(food => {
      this.createFood(food);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Food methods
  async getFoods(): Promise<Food[]> {
    return Array.from(this.foodsMap.values());
  }
  
  async getFoodById(id: number): Promise<Food | undefined> {
    return this.foodsMap.get(id);
  }
  
  async getFoodByName(name: string): Promise<Food | undefined> {
    return Array.from(this.foodsMap.values()).find(
      (food) => food.name.toLowerCase() === name.toLowerCase(),
    );
  }
  
  async createFood(insertFood: InsertFood): Promise<Food> {
    const id = this.foodIdCounter++;
    const food: Food = { ...insertFood, id };
    this.foodsMap.set(id, food);
    return food;
  }
  
  // Analysis result methods
  async getAnalysisResults(): Promise<AnalysisResult[]> {
    return Array.from(this.analysisResultsMap.values());
  }
  
  async createAnalysisResult(insertResult: InsertAnalysisResult): Promise<AnalysisResult> {
    const id = this.analysisResultIdCounter++;
    // Create a properly typed result with explicit properties
    const result: AnalysisResult = {
      id,
      imageUrl: insertResult.imageUrl,
      estimatedWeight: insertResult.estimatedWeight,
      caloriesBefore: insertResult.caloriesBefore,
      caloriesAfter: insertResult.caloriesAfter,
      createdAt: insertResult.createdAt,
      foodId: insertResult.foodId ?? null // Ensure null instead of undefined
    };
    this.analysisResultsMap.set(id, result);
    return result;
  }
}

export const storage = new MemStorage();
