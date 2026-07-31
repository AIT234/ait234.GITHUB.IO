import { useState } from "react";
import { LayoutDashboard, TrendingUp, TrendingDown, DollarSign, Users, FileText, MapPin, Calendar, AlertTriangle, CheckCircle, Clock, BarChart3, Eye, EyeOff, Building2, Star, Award, Activity, PieChart, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockProjects, mockContractors, formatCurrency, formatDate } from "@/data/mockData";
import type { UserRole } from "@/types";

interface MultiRoleDashboardsProps {
  currentRole: UserRole;
}

const projects = mockProjects;
const contractors = mockContractors;

function getRoleDashboard(role: UserRole) {
  switch (role) {
    case "citizen":
      return {
        title: "Citizen Oversight Dashboard",
        subtitle: "Track public infrastructure projects and hold government accountable",
        icon: Eye,
        color: "from-emerald-500 to-emerald-700",
      };
    case "executive":
      return {
        title: "Executive Command Center",
        subtitle: "High-level oversight of all national infrastructure projects",
        icon: LayoutDashboard,
        color: "from-blue-600 to-blue-800",
      };
    case "ministry":
      return {
        title: "Ministry Operations Dashboard",
        subtitle: "Department-level project management and compliance monitoring",
        icon: Building2,
        color: "from-purple-600 to-purple-800",
      };
    case "contractor":
      return {
        title: "Contractor Performance Hub",
        subtitle: "Manage your active contracts and compliance requirements",
        icon: Award,
        color: "from-amber-500 to-amber-700",
      };
    case "auditor":
      return {
        title: "Audit & Compliance Center",
        subtitle: "Financial audit trails, compliance checks, and fraud monitoring",
        icon: Activity,
        color: "from-red-600 to-red-800",
      };
    default:
      return {
        title: "Dashboard",
        subtitle: "Overview",
        icon: LayoutDashboard,
        color: "from-emerald-500 to-emerald-700",
      };
  }
}

export default function MultiRoleDashboards({ currentRole }: MultiRoleDashboardsProps) {
  const [timeframe, setTimeframe] = useState("year");
  const dashboard = getRoleDashboard(currentRole);

  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const activeProjects = projects.filter((p) => p.status === "in_progress").length;
  const completedProjects = projects.filter((p) => p.status === "completed").length;
  const delayedProjects = projects.filter((p) => p.status === "delayed").length;
  const budgetUtilization = Math.round((totalSpent / totalBudget) * 100);

  return (
    <div className="space-y-6">
      {/* Role Header */}
      <div className={`bg-gradient-to-r ${dashboard.color} rounded-xl p-6 text-white`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <dashboard.icon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{dashboard.title}</h2>
            <p className="text-sm text-white/80">{dashboard.subtitle}</p>
          </div>
        </div>

        {/* Role-specific KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="text-lg font-bold">{projects.length}</div>
            <div className="text-[10px] text-white/70">Total Projects</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="text-lg font-bold">{formatCurrency(totalBudget)}</div>
            <div className="text-[10px] text-white/70">Total Budget</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="text-lg font-bold">{activeProjects}</div>
            <div className="text-[10px] text-white/70">Active</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="text-lg font-bold">{contractors.length}</div>
            <div className="text-[10px] text-white/70">Contractors</div>
          </div>
        </div>
      </div>

      {/* Timeframe selector */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {["week", "month", "quarter", "year"].map((t) => (
            <Button key={t} variant={timeframe === t ? "default" : "outline"} size="sm" onClick={() => setTimeframe(t)}
              className={`text-xs ${timeframe === t ? "tccn-gradient text-white" : ""}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          <RefreshCw className="h-3 w-3 mr-1" /> Refresh
        </Button>
      </div>

      {/* Role-specific content */}
      {currentRole === "citizen" && <CitizenDashboard />}
      {currentRole === "executive" && <ExecutiveDashboard />}
      {currentRole === "ministry" && <MinistryDashboard />}
      {currentRole === "contractor" && <ContractorDashboard />}
      {currentRole === "auditor" && <AuditorDashboard />}
    </div>
  );
}

function CitizenDashboard() {
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const budgetUtilization = Math.round((totalSpent / totalBudget) * 100);
  const citizenReports = projects.filter((p) => p.citizenReports.length > 0).length;

  return (
    <>
      {/* Budget Utilization */}
      <Card className="border-emerald-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2"><DollarSign className="h-4 w-4 text-emerald-600" /> National Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="p-3 bg-emerald-50 rounded-lg text-center">
              <div className="text-lg font-bold text-emerald-700">{formatCurrency(totalBudget)}</div>
              <div className="text-xs text-emerald-600">Approved Budget</div>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg text-center">
              <div className="text-lg font-bold text-amber-700">{formatCurrency(totalSpent)}</div>
              <div className="text-xs text-amber-600">Amount Spent</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-700">{budgetUtilization}%</div>
              <div className="text-xs text-blue-600">Utilization Rate</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-center">
              <div className="text-lg font-bold text-purple-700">{formatCurrency(totalBudget - totalSpent)}</div>
              <div className="text-xs text-purple-600">Remaining</div>
            </div>
          </div>
          <Progress value={budgetUtilization} className="h-2.5" />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </CardContent>
      </Card>

      {/* Project Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Project Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "In Progress", count: projects.filter((p) => p.status === "in_progress").length, color: "bg-emerald-500" },
              { label: "Completed", count: projects.filter((p) => p.status === "completed").length, color: "bg-blue-500" },
              { label: "Planning", count: projects.filter((p) => p.status === "planning" || p.status === "tendering").length, color: "bg-amber-500" },
              { label: "Delayed", count: projects.filter((p) => p.status === "delayed").length, color: "bg-red-500" },
              { label: "Cancelled", count: projects.filter((p) => p.status === "cancelled").length, color: "bg-gray-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
                <span className="text-sm font-medium">{item.count}</span>
                <Progress value={(item.count / projects.length) * 100} className="w-20 h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Recent Citizen Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {projects.filter((p) => p.citizenReports.length > 0).slice(0, 3).map((p) => (
              <div key={p.id} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-medium truncate">{p.title}</div>
                  <div className="text-[10px] text-gray-500">{p.citizenReports.length} report(s) filed</div>
                </div>
              </div>
            ))}
            {citizenReports === 0 && <div className="text-sm text-gray-500 text-center py-4">No citizen reports yet</div>}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function ExecutiveDashboard() {
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><TrendingUp className="h-4 w-4 text-blue-600" /> Budget Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Budget vs Spend</span>
                <span className="text-sm font-medium">{formatCurrency(totalSpent)} / {formatCurrency(totalBudget)}</span>
              </div>
              <Progress value={Math.round((totalSpent / totalBudget) * 100)} className="h-2.5" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{formatCurrency(totalSpent)} spent</span>
                <span>{formatCurrency(totalBudget - totalSpent)} remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-600" /> Risk Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { label: "High Risk", count: projects.filter((p) => p.riskLevel === "high").length, color: "text-red-600" },
                { label: "Medium Risk", count: projects.filter((p) => p.riskLevel === "medium").length, color: "text-amber-600" },
                { label: "Low Risk", count: projects.filter((p) => p.riskLevel === "low").length, color: "text-emerald-600" },
                { label: "Delayed", count: projects.filter((p) => p.status === "delayed").length, color: "text-orange-600" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className={`text-sm font-bold ${item.color}`}>{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><Star className="h-4 w-4 text-emerald-600" /> Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {contractors.sort((a, b) => b.rating - a.rating).slice(0, 3).map((c) => (
              <div key={c.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="tccn-gradient text-white text-xs">{c.shortName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{c.name}</div>
                  <div className="text-xs text-gray-500">Rating: {c.rating}/5</div>
                </div>
                <Badge className="bg-emerald-50 text-emerald-700 border-0 text-xs">{c.tier}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function MinistryDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Projects by Sector</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "Roads & Bridges", count: projects.filter((p) => p.category === "road" || p.category === "bridge").length, color: "bg-emerald-500" },
              { label: "Education", count: projects.filter((p) => p.category === "school").length, color: "bg-blue-500" },
              { label: "Health", count: projects.filter((p) => p.category === "hospital").length, color: "bg-red-500" },
              { label: "Water & Power", count: projects.filter((p) => p.category === "water" || p.category === "power").length, color: "bg-cyan-500" },
              { label: "Housing & Transport", count: projects.filter((p) => p.category === "housing" || p.category === "transport").length, color: "bg-amber-500" },
              { label: "Agriculture & Telecom", count: projects.filter((p) => p.category === "agriculture" || p.category === "telecom").length, color: "bg-green-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                <span className="flex-1 text-sm">{item.label}</span>
                <span className="text-sm font-medium">{item.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Upcoming Milestones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {projects.flatMap((p) => p.milestones.filter((m) => m.status === "in_progress" || m.status === "pending").slice(0, 2)).slice(0, 5).map((m, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <Clock className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium truncate">{m.title}</div>
                  <div className="text-[10px] text-gray-500">Due: {formatDate(m.dueDate)}</div>
                </div>
                <Badge className={`${m.status === "in_progress" ? "bg-blue-50 text-blue-700" : "bg-gray-50 text-gray-500"} border-0 text-[10px]`}>
                  {m.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function ContractorDashboard() {
  const myContractor = contractors[0];
  const myProjects = projects.filter((p) => p.contractorId === myContractor.id);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-amber-700">{myProjects.length}</div>
            <div className="text-xs text-amber-600">Active Contracts</div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-emerald-700">{formatCurrency(myContractor.totalAwarded)}</div>
            <div className="text-xs text-emerald-600">Total Awarded</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-blue-700">{myContractor.rating}/5</div>
            <div className="text-xs text-blue-600">Performance Rating</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-purple-700">{myContractor.employees.toLocaleString()}</div>
            <div className="text-xs text-purple-600">Workforce</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-amber-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">My Active Projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {myProjects.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{p.title}</div>
                <div className="text-xs text-gray-500">{p.location.state} | {formatCurrency(p.budget)}</div>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <div className="text-sm font-bold">{p.completion}%</div>
                <Progress value={p.completion} className="w-20 h-1.5" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

function AuditorDashboard() {
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const flagged = projects.filter((p) => p.riskLevel === "high" || p.status === "delayed").length;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-600" /> Audit Flags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{flagged}</div>
            <div className="text-sm text-gray-500">Projects requiring audit attention</div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {Math.round((projects.filter((p) => p.status !== "delayed" && p.status !== "cancelled").length / projects.length) * 100)}%
            </div>
            <div className="text-sm text-gray-500">Projects on track</div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="h-4 w-4 text-blue-600" /> Financial Audit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Budget</span><span className="font-medium">{formatCurrency(totalBudget)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Spent</span><span className="font-medium">{formatCurrency(totalSpent)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Variance</span><span className="font-medium text-emerald-600">{formatCurrency(totalBudget - totalSpent)}</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}