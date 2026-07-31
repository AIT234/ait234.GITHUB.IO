import { useState } from "react";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import GISMapHub from "@/components/GISMapHub";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import CitizenVerificationPortal from "@/components/CitizenVerificationPortal";
import AITrustMatrix from "@/components/AITrustMatrix";
import MultiRoleDashboards from "@/components/MultiRoleDashboards";
import ContractorDirectory from "@/components/ContractorDirectory";
import ReportsExportCenter from "@/components/ReportsExportCenter";
import MainContent from "@/components/MainContent";
import { mockProjects, mockContractors } from "@/data/mockData";
import type { UserRole, Language, Project } from "@/types";

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>("citizen");
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = mockProjects.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.location.state.toLowerCase().includes(q) ||
      p.location.lga.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <MainContent projects={mockProjects} onViewProject={setSelectedProject} />;
      case "map":
        return <GISMapHub onSelectProject={setSelectedProject} searchQuery={searchQuery} />;
      case "projects":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">All Projects</h2>
              <span className="text-sm text-gray-500">{filteredProjects.length} projects</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className="p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium uppercase text-gray-500">{p.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      p.status === "completed" ? "bg-emerald-50 text-emerald-700" :
                      p.status === "in_progress" ? "bg-blue-50 text-blue-700" :
                      p.status === "delayed" ? "bg-red-50 text-red-700" :
                      "bg-gray-50 text-gray-600"
                    }`}>{p.status.replace("_", " ")}</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{p.title}</h4>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{p.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span>{p.location.state}</span>
                    <span>•</span>
                    <span>₦{(p.budget / 1e9).toFixed(1)}B</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium">{p.completion}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: `${p.completion}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "contractors":
        return <ContractorDirectory />;
      case "verify":
        return <CitizenVerificationPortal />;
      case "trust":
        return <AITrustMatrix />;
      case "export":
        return <ReportsExportCenter />;
      default:
        return <MultiRoleDashboards currentRole={currentRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="min-h-screen">
        {renderSection()}
      </main>
      <ProjectDetailModal
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
      {/* The new civic footer is built into MainContent */}
    </div>
  );
}