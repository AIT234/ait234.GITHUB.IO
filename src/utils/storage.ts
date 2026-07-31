import { Project, Contractor, UserRole, Language } from "@/types";

const STORAGE_KEYS = {
  projects: "tccn_projects",
  contractors: "tccn_contractors",
  role: "tccn_role",
  language: "tccn_language",
  reports: "tccn_citizen_reports",
};

export function getStoredProjects(): Project[] | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.projects);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setStoredProjects(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
}

export function getStoredContractors(): Contractor[] | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.contractors);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setStoredContractors(contractors: Contractor[]): void {
  localStorage.setItem(STORAGE_KEYS.contractors, JSON.stringify(contractors));
}

export function getStoredRole(): UserRole {
  return (localStorage.getItem(STORAGE_KEYS.role) as UserRole) || "citizen";
}

export function setStoredRole(role: UserRole): void {
  localStorage.setItem(STORAGE_KEYS.role, role);
}

export function getStoredLanguage(): Language {
  return (localStorage.getItem(STORAGE_KEYS.language) as Language) || "en";
}

export function setStoredLanguage(lang: Language): void {
  localStorage.setItem(STORAGE_KEYS.language, lang);
}

export function addCitizenReport(projectId: string, report: any): void {
  const key = `${STORAGE_KEYS.reports}_${projectId}`;
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.push(report);
  localStorage.setItem(key, JSON.stringify(existing));
}

export function getCitizenReports(projectId: string): any[] {
  const key = `${STORAGE_KEYS.reports}_${projectId}`;
  return JSON.parse(localStorage.getItem(key) || "[]");
}

export function resetAll(): void {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
}