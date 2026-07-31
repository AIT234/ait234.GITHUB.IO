import { useState } from "react";
import { X, MapPin, Calendar, DollarSign, FileText, CheckCircle, AlertTriangle, Clock, User, Image, MessageSquare, ThumbsUp, Flag, Camera, Navigation, BarChart3, FileCheck, Shield, TrendingUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { mockProjects, getContractorById, formatCurrency, formatDate } from "@/data/mockData";
import type { Project, Milestone } from "@/types";

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusBadgeMap: Record<string, string> = {
  planning: "bg-slate-100 text-slate-700",
  tendering: "bg-amber-50 text-amber-700",
  in_progress: "bg-emerald-50 text-emerald-700",
  delayed: "bg-orange-50 text-orange-700",
  completed: "bg-blue-50 text-blue-700",
  cancelled: "bg-red-50 text-red-700",
};

const milestoneStatusIcon: Record<string, any> = {
  completed: CheckCircle,
  in_progress: Clock,
  delayed: AlertTriangle,
  pending: Clock,
};

const milestoneStatusColor: Record<string, string> = {
  completed: "text-emerald-500",
  in_progress: "text-blue-500",
  delayed: "text-orange-500",
  pending: "text-gray-400",
};

export default function ProjectDetailModal({ project, open, onOpenChange }: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [citizenMessage, setCitizenMessage] = useState("");

  if (!project) return null;

  const contractor = project.contractorId ? getContractorById(project.contractorId) : null;
  const budgetUtilization = project.budget > 0 ? Math.round((project.spent / project.budget) * 100) : 0;
  const trustScore = Math.max(0, 100 - (project.riskLevel === "high" ? 30 : project.riskLevel === "medium" ? 15 : 5) - (project.status === "delayed" ? 15 : 0) + (project.status === "completed" ? 10 : 0) - (project.completion < 20 ? 5 : 0));
  const budgetVariance = project.budget - project.spent;

  const handleSubmitCitizenReport = () => {
    if (!citizenMessage.trim()) return;
    alert("Citizen report submitted successfully. Thank you for your contribution to transparency!");
    setCitizenMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>Project details for {project.id}</DialogDescription>
        </DialogHeader>

        {/* Header */}
        <div className="tccn-gradient p-6 text-white relative">
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white/80 hover:text-white hover:bg-white/10">
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`${statusBadgeMap[project.status]} border-0 text-xs`}>
                  {project.status.replace("_", " ")}
                </Badge>
                <Badge variant="outline" className="text-white/80 border-white/30 text-xs">{project.id.toUpperCase()}</Badge>
              </div>
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p className="text-sm text-white/80 mt-1">{project.description}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-white/70">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {project.location.state}, {project.location.lga}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-3xl font-bold">{trustScore}/100</div>
              <div className="text-xs text-white/70">Trust Score</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto mb-4">
              <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
              <TabsTrigger value="financial" className="text-xs">Financial</TabsTrigger>
              <TabsTrigger value="milestones" className="text-xs">Milestones</TabsTrigger>
              <TabsTrigger value="contractor" className="text-xs">Contractor</TabsTrigger>
              <TabsTrigger value="reports" className="text-xs">Reports</TabsTrigger>
              <TabsTrigger value="citizen" className="text-xs">Citizen Reports</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="bg-emerald-50 border-emerald-200">
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl font-bold text-emerald-700">{project.completion}%</div>
                    <div className="text-xs text-emerald-600">Completion</div>
                    <Progress value={project.completion} className="mt-2 h-1.5" />
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-blue-700">{formatCurrency(project.budget)}</div>
                    <div className="text-xs text-blue-600">Budget</div>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-purple-700">{formatCurrency(project.spent)}</div>
                    <div className="text-xs text-purple-600">Spent</div>
                  </CardContent>
                </Card>
                <Card className={project.riskLevel === "high" ? "bg-red-50 border-red-200" : project.riskLevel === "medium" ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200"}>
                  <CardContent className="p-3 text-center">
                    <div className={`text-lg font-bold ${project.riskLevel === "high" ? "text-red-700" : project.riskLevel === "medium" ? "text-amber-700" : "text-emerald-700"}`}>
                      {project.riskLevel.toUpperCase()}
                    </div>
                    <div className="text-xs text-gray-500">Risk Level</div>
                  </CardContent>
                </Card>
              </div>

              {/* Trust Score Breakdown */}
              <Card className="border-emerald-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-600" /> AI Trust Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Base Score</span><span className="font-medium">100</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Risk Adjustment ({project.riskLevel})</span><span className="text-red-500">-{project.riskLevel === "high" ? 30 : project.riskLevel === "medium" ? 15 : 5}</span></div>
                    {project.status === "delayed" && <div className="flex justify-between"><span className="text-gray-500">Delay Penalty</span><span className="text-red-500">-15</span></div>}
                    {project.status === "completed" && <div className="flex justify-between"><span className="text-gray-500">Completion Bonus</span><span className="text-emerald-500">+10</span></div>}
                    {project.completion < 20 && <div className="flex justify-between"><span className="text-gray-500">Early Stage Penalty</span><span className="text-red-500">-5</span></div>}
                    <Separator />
                    <div className="flex justify-between font-bold"><span>Final Trust Score</span><span className={trustScore >= 80 ? "text-emerald-600" : trustScore >= 60 ? "text-amber-600" : "text-red-600"}>{trustScore}/100</span></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Financial Tab */}
            <TabsContent value="financial" className="space-y-4">
              <Card className="border-amber-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><DollarSign className="h-4 w-4 text-amber-600" /> Financial Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Approved Budget</span>
                      <span className="font-bold text-lg">{formatCurrency(project.budget)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Amount Released</span>
                      <span className="font-bold">{formatCurrency(project.spent)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Budget Utilization</span>
                      <span className="font-bold">{budgetUtilization}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Remaining Budget</span>
                      <span className="font-bold text-emerald-600">{formatCurrency(budgetVariance)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 mt-2">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${Math.min(budgetUtilization, 100)}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Budget utilization: {budgetUtilization}% of approved budget spent</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Milestones Tab */}
            <TabsContent value="milestones" className="space-y-3">
              {project.milestones.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="font-medium">No milestones defined yet</p>
                  <p className="text-xs">Milestones will be added as the project progresses</p>
                </div>
              ) : (
                project.milestones.map((ms: Milestone) => {
                  const Icon = milestoneStatusIcon[ms.status] || Clock;
                  return (
                    <Card key={ms.id} className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className={`h-5 w-5 ${milestoneStatusColor[ms.status]}`} />
                            <div>
                              <div className="text-sm font-medium">{ms.title}</div>
                              <div className="text-xs text-gray-500">Due: {formatDate(ms.dueDate)}</div>
                            </div>
                          </div>
                          <Badge variant="outline" className={`text-xs ${
                            ms.status === "completed" ? "bg-emerald-50 text-emerald-700" :
                            ms.status === "in_progress" ? "bg-blue-50 text-blue-700" :
                            ms.status === "delayed" ? "bg-orange-50 text-orange-700" : "bg-gray-50 text-gray-500"
                          }`}>
                            {ms.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-medium">{ms.completion}%</span>
                          </div>
                          <Progress value={ms.completion} className="h-1.5" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </TabsContent>

            {/* Contractor Tab */}
            <TabsContent value="contractor" className="space-y-4">
              {contractor ? (
                <>
                  <Card className="border-emerald-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="tccn-gradient text-white font-bold">{contractor.shortName.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-base">{contractor.name}</div>
                          <div className="text-xs text-gray-500">CAC: {contractor.registrationNumber} | Tier {contractor.tier}</div>
                        </div>
                        <Badge className={`ml-auto ${contractor.status === "active" ? "bg-emerald-50 text-emerald-700" : contractor.status === "suspended" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"} border-0`}>
                          {contractor.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div><span className="text-gray-500">Rating</span><div className="font-medium">{contractor.rating}/5.0</div></div>
                        <div><span className="text-gray-500">Contracts</span><div className="font-medium">{contractor.totalAwarded > 0 ? `${contractor.projects.length} active` : "0"}</div></div>
                        <div><span className="text-gray-500">Employees</span><div className="font-medium">{contractor.employees.toLocaleString()}</div></div>
                        <div><span className="text-gray-500">Since</span><div className="font-medium">{contractor.yearEstablished}</div></div>
                      </div>
                      <div className="mt-3">
                        <span className="text-xs text-gray-500">Specialization:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {contractor.specialization.map((s: string) => (
                            <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-amber-700">
                      <AlertTriangle className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Contractor not yet assigned</p>
                        <p className="text-xs">This project is in the {project.status} stage. Tenders are being evaluated.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-2">
              {project.reports.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="font-medium">No reports submitted yet</p>
                </div>
              ) : (
                project.reports.map((rep) => (
                  <Card key={rep.id} className="border-gray-200">
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium">{rep.title}</div>
                          <div className="text-xs text-gray-500">{formatDate(rep.date)}</div>
                        </div>
                      </div>
                      <Badge className={`${rep.status === "approved" ? "bg-emerald-50 text-emerald-700" : rep.status === "rejected" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"} border-0`}>
                        {rep.status}
                      </Badge>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Citizen Reports Tab */}
            <TabsContent value="citizen" className="space-y-4">
              {/* Submit Form */}
              <Card className="border-emerald-200 bg-emerald-50/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><MessageSquare className="h-4 w-4 text-emerald-600" /> Submit Citizen Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe your observation, concern, or report about this project site..."
                    value={citizenMessage}
                    onChange={(e) => setCitizenMessage(e.target.value)}
                    className="mb-2 min-h-[80px]"
                  />
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Camera className="h-3.5 w-3.5" /> Add Photo
                    </Button>
                    <Button size="sm" className="tccn-gradient text-white" onClick={handleSubmitCitizenReport}>
                      <Flag className="h-3.5 w-3.5 mr-1" /> Submit Report
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Reports are verified by AI and reviewed by the oversight team.</p>
                </CardContent>
              </Card>

              {/* Existing Reports */}
              {project.citizenReports.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="font-medium">No citizen reports yet</p>
                  <p className="text-xs">Be the first to report on this project</p>
                </div>
              ) : (
                project.citizenReports.map((cr) => (
                  <Card key={cr.id} className="border-gray-200">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">CT</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-xs font-medium text-gray-500">{formatDate(cr.date)}</div>
                            <Badge className={`text-[10px] ${cr.type === "complaint" ? "bg-red-50 text-red-700" : cr.type === "concern" ? "bg-amber-50 text-amber-700" : cr.type === "praise" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"} border-0`}>
                              {cr.type}
                            </Badge>
                          </div>
                        </div>
                        <Badge variant="outline" className={`text-[10px] ${cr.status === "resolved" ? "bg-emerald-50 text-emerald-700" : cr.status === "acknowledged" ? "bg-blue-50 text-blue-700" : "bg-gray-50 text-gray-500"}`}>
                          {cr.status}
                        </Badge>
                      </div>
                      <p className="text-sm mt-2">{cr.message}</p>
                      {cr.aiMatchScore !== undefined && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-blue-600">
                          <BarChart3 className="h-3 w-3" /> AI Match Score: {cr.aiMatchScore}%
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs text-gray-400">
            <span>Last updated: {formatDate(project.lastUpdated)}</span>
            <span>Project ID: {project.id.toUpperCase()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}