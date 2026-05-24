export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string; // Lucide icon name
  basePricePerHour: number;
  benefits: string[];
  image: string;
}

export interface QuoteEstimation {
  squareMeters: number;
  rooms: number;
  bathrooms: number;
  frequency: "once" | "weekly" | "biweekly" | "monthly";
  serviceType: string;
  addons: {
    windows: boolean;
    oven: boolean;
    fridge: boolean;
    ironing: boolean;
    cabinet: boolean;
  };
  totalEstimatedHours: number;
  totalEstimatedPrice: number;
  pricePerHour: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  serviceId: string;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  content: string;
  timestamp: string;
}

export interface ServicePlanRequest {
  squareMeters: number;
  frequency: string;
  roomsSelected: string[];
  specialInstructions: string;
  petPresence: boolean;
  priorityAreas: string;
}
