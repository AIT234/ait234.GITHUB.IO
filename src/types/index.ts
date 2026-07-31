export type ProjectStatus = "planning" | "tendering" | "in_progress" | "delayed" | "completed" | "cancelled";

export type ProjectCategory = "road" | "bridge" | "school" | "hospital" | "water" | "power" | "housing" | "transport" | "agriculture" | "telecom";

export type RiskLevel = "low" | "medium" | "high";

export type GeoZone = "north-west" | "north-east" | "north-central" | "south-west" | "south-east" | "south-south" | "fct";

export type UserRole = "citizen" | "executive" | "ministry" | "contractor" | "auditor";

export type Language = "en" | "ha" | "yo" | "ig" | "pcm";

export interface Location {
  state: string;
  lat: number;
  lng: number;
  lga: string;
}

export interface Milestone {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed" | "delayed";
  completion: number;
  dueDate: string;
}

export interface ProjectReport {
  id: string;
  date: string;
  title: string;
  status: "submitted" | "approved" | "rejected";
}

export interface CitizenReport {
  id: string;
  date: string;
  type: "concern" | "observation" | "complaint" | "praise" | "verification";
  message: string;
  status: "pending" | "acknowledged" | "resolved";
  photos?: string[];
  aiMatchScore?: number;
}

export interface ProjectPhoto {
  id: string;
  projectId: string;
  type: "contractor" | "citizen";
  url: string;
  caption: string;
  uploadedBy: string;
  uploadedAt: string;
  gpsLocation?: string;
}

export interface PhotoComparison {
  contractorPhoto: ProjectPhoto;
  citizenPhoto: ProjectPhoto;
  aiScore: number;
  aiSummary: string;
  communityVotes: { accurate: number; flagged: number };
  userVote?: "accurate" | "flagged";
}

export interface NINRegistration {
  nin: string;
  fullName: string;
  email: string;
  phone: string;
  state: string;
  lga: string;
  verified: boolean;
  registeredAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  budget: number;
  spent: number;
  completion: number;
  location: Location;
  contractorId: string | null;
  startDate: string;
  endDate: string;
  lastUpdated: string;
  riskLevel: RiskLevel;
  bids: number | null;
  tenderDeadline: string | null;
  milestones: Milestone[];
  reports: ProjectReport[];
  citizenReports: CitizenReport[];
  image_url?: string;
}

export interface Contractor {
  id: string;
  name: string;
  shortName: string;
  registrationNumber: string;
  tier: "A" | "B" | "C";
  projects: Project[];
  rating: number;
  totalAwarded: number;
  totalCompleted: number;
  contact: { email: string; phone: string };
  status: "active" | "suspended" | "blacklisted";
  specialization: string[];
  yearEstablished: number;
  employees: number;
  location: { state: string; city: string };
}

export interface DashboardMetrics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalBudget: number;
  totalSpent: number;
  averageCompletion: number;
  projectsByCategory: { category: ProjectCategory; count: number; budget: number }[];
  projectsByStatus: { status: ProjectStatus; count: number; budget: number }[];
  projectsByState: { state: string; count: number; budget: number }[];
}