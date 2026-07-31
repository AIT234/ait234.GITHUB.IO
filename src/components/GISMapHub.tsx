import { useState, useMemo } from "react";
import { Search, MapPin, Filter, X, ChevronDown, Navigation, Building2, TreePine, Train, Heart, Lightbulb, Home, Wifi, Zap, Droplets, Warehouse, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockProjects, formatCurrency, getOverallStats } from "@/data/mockData";
import type { Project, ProjectCategory, ProjectStatus, RiskLevel } from "@/types";

interface GISMapHubProps {
  onSelectProject: (project: Project) => void;
  searchQuery: string;
}

const categoryIcons: Record<string, any> = {
  road: Building2, bridge: Scale, school: TreePine, hospital: Heart,
  water: Droplets, power: Zap, housing: Home, transport: Train,
  agriculture: Warehouse, telecom: Wifi,
};

const statusColors: Record<string, string> = {
  planning: "bg-slate-100 text-slate-700 border-slate-200",
  tendering: "bg-amber-50 text-amber-700 border-amber-200",
  in_progress: "bg-emerald-50 text-emerald-700 border-emerald-200",
  delayed: "bg-orange-50 text-orange-700 border-orange-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const riskColors: Record<string, string> = { low: "text-emerald-600", medium: "text-amber-600", high: "text-red-600" };

export default function GISMapHub({ onSelectProject, searchQuery }: GISMapHubProps) {
  const [activeTab, setActiveTab] = useState("map");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterRisk, setFilterRisk] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const stats = useMemo(() => getOverallStats(), []);

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((p) => {
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filterCategory !== "all" && p.category !== filterCategory) return false;
      if (filterStatus !== "all" && p.status !== filterStatus) return false;
      if (filterRisk !== "all" && p.riskLevel !== filterRisk) return false;
      if (selectedState !== "all" && p.location.state !== selectedState) return false;
      return true;
    });
  }, [searchQuery, filterCategory, filterStatus, filterRisk, selectedState]);

  const states = useMemo(() => [...new Set(mockProjects.map((p) => p.location.state))].sort(), []);
  const categories: { value: string; label: string }[] = [
    { value: "all", label: "All Sectors" },
    { value: "road", label: "Roads & Bridges" },
    { value: "bridge", label: "Bridges" },
    { value: "school", label: "Education" },
    { value: "hospital", label: "Health" },
    { value: "water", label: "Water & Sanitation" },
    { value: "power", label: "Power & Energy" },
    { value: "housing", label: "Housing" },
    { value: "transport", label: "Transport" },
    { value: "agriculture", label: "Agriculture" },
    { value: "telecom", label: "Telecom" },
  ];

  return (
    <div className="space-y-4">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-emerald-700">{stats.total}</div>
            <div className="text-xs text-emerald-600">Total Projects</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-blue-700">{stats.active}</div>
            <div className="text-xs text-blue-600">Active</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-green-700">{stats.completed}</div>
            <div className="text-xs text-green-600">Completed</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-orange-700">{stats.delayed}</div>
            <div className="text-xs text-orange-600">Delayed</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-purple-700">{formatCurrency(stats.totalBudget)}</div>
            <div className="text-xs text-purple-600">Total Budget</div>
          </CardContent>
        </Card>
        <Card className="bg-rose-50 border-rose-200">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-rose-700">{formatCurrency(stats.totalSpent)}</div>
            <div className="text-xs text-rose-600">Total Spent</div>
          </CardContent>
        </Card>
        <Card className="bg-cyan-50 border-cyan-200">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-cyan-700">{stats.avgCompletion}%</div>
            <div className="text-xs text-cyan-600">Avg. Completion</div>
          </CardContent>
        </Card>
      </div>

      {/* Map / List Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-3">
          <TabsList>
            <TabsTrigger value="map" className="flex items-center gap-1.5">
              <Navigation className="h-4 w-4" /> Map View
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> List View
            </TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5" /> Filters
            {(filterCategory !== "all" || filterStatus !== "all" || filterRisk !== "all" || selectedState !== "all") && (
              <Badge className="ml-1 h-5 px-1.5 bg-emerald-100 text-emerald-700 border-0 text-[10px]">
                {(filterCategory !== "all" ? 1 : 0) + (filterStatus !== "all" ? 1 : 0) + (filterRisk !== "all" ? 1 : 0) + (selectedState !== "all" ? 1 : 0)}
              </Badge>
            )}
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="mb-3 border-emerald-200">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-3">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40"><SelectValue placeholder="Sector" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="tendering">Tendering</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterRisk} onValueChange={setFilterRisk}>
                  <SelectTrigger className="w-32"><SelectValue placeholder="Risk" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risks</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-40"><SelectValue placeholder="State" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="sm" onClick={() => { setFilterCategory("all"); setFilterStatus("all"); setFilterRisk("all"); setSelectedState("all"); }}>
                  <X className="h-3.5 w-3.5 mr-1" /> Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Map View */}
        <TabsContent value="map" className="mt-0">
          <Card className="border-gray-200 overflow-hidden">
            <CardContent className="p-0 relative">
              <div className="bg-gradient-to-br from-emerald-50 to-white h-[500px] relative overflow-hidden">
                {/* Nigerian Map SVG */}
                <svg viewBox="0 0 400 500" className="w-full h-full p-4 opacity-80">
                  <path d="M200 50 L320 120 L350 250 L300 380 L200 440 L100 380 L50 250 L80 120 Z" fill="#059669" fillOpacity="0.1" stroke="#059669" strokeWidth="1.5" />
                  {/* Project markers */}
                  {filteredProjects.map((p, i) => {
                    const x = 80 + ((p.location.lng + 5) / 10) * 240;
                    const y = 80 + ((13 - p.location.lat) / 9) * 320;
                    const Icon = categoryIcons[p.category] || MapPin;
                    const isSelected = selectedProject?.id === p.id;
                    return (
                      <g key={p.id} onClick={() => { setSelectedProject(p); onSelectProject(p); }} className="cursor-pointer">
                        <circle cx={x} cy={y} r={isSelected ? 10 : 7} fill={isSelected ? "#059669" : "#10b981"} opacity={0.8} className="map-marker-pulse" />
                        <foreignObject x={x - 12} y={y - 12} width={24} height={24}>
                          <div className="flex items-center justify-center w-full h-full">
                            <Icon className="h-3.5 w-3.5 text-white" />
                          </div>
                        </foreignObject>
                        {isSelected && (
                          <foreignObject x={x - 60} y={y - 50} width={120} height={40}>
                            <div className="bg-white rounded-lg shadow-lg border p-1.5 text-center text-[10px] font-medium">
                              {p.title.substring(0, 20)}...
                            </div>
                          </foreignObject>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Legend */}
                <div className="absolute bottom-3 left-3 bg-white/90 rounded-lg border p-2 text-xs space-y-1">
                  <div className="font-medium text-gray-700 mb-1">Legend</div>
                  {[{ cat: "road", label: "Road" }, { cat: "bridge", label: "Bridge" }, { cat: "school", label: "School" }, { cat: "hospital", label: "Health" }, { cat: "water", label: "Water" }].map((item) => {
                    const Icon = categoryIcons[item.cat] || MapPin;
                    return (
                      <div key={item.cat} className="flex items-center gap-1.5">
                        <Icon className="h-3 w-3 text-emerald-600" />
                        <span className="text-gray-600">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredProjects.map((project) => {
              const Icon = categoryIcons[project.category] || MapPin;
              return (
                <Card
                  key={project.id}
                  className="cursor-pointer hover:shadow-md hover:border-emerald-300 transition-all border-gray-200"
                  onClick={() => onSelectProject(project)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                          <Icon className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 leading-tight">{project.title}</div>
                          <div className="text-xs text-gray-500">{project.id.toUpperCase()}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className={`text-[10px] ${statusColors[project.status]}`}>
                        {project.status.replace("_", " ")}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                      <MapPin className="h-3 w-3" />
                      {project.location.state}, {project.location.lga}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Budget</span>
                        <span className="font-medium">{formatCurrency(project.budget)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Completion</span>
                        <span className={`font-medium ${project.completion >= 80 ? "text-emerald-600" : project.completion >= 40 ? "text-amber-600" : "text-gray-700"}`}>
                          {project.completion}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full transition-all ${project.completion >= 80 ? "bg-emerald-500" : project.completion >= 40 ? "bg-amber-500" : "bg-blue-500"}`}
                          style={{ width: `${project.completion}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                      <span className={`text-xs font-medium ${riskColors[project.riskLevel]}`}>
                        {project.riskLevel.charAt(0).toUpperCase() + project.riskLevel.slice(1)} Risk
                      </span>
                      <span className="text-xs text-gray-400">Updated: {new Date(project.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {filteredProjects.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No projects found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}