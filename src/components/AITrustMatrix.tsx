import { useState } from "react";
import { Shield, AlertTriangle, TrendingUp, BarChart3, Brain, CheckCircle, XCircle, AlertOctagon, Sliders, RefreshCw, Download, Zap, Scale, FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { mockProjects, mockContractors, formatCurrency } from "@/data/mockData";

const projects = mockProjects;
const contractors = mockContractors;

function calculateTrustScore(p: typeof projects[0]): number {
  let score = 100;
  if (p.riskLevel === "high") score -= 30;
  else if (p.riskLevel === "medium") score -= 15;
  else score -= 5;
  if (p.status === "delayed") score -= 15;
  if (p.status === "completed") score += 10;
  if (p.completion < 20) score -= 5;
  if (p.budget > 0 && p.spent / p.budget > 0.9) score -= 10;
  if (p.citizenReports.length > 0) score -= 5;
  return Math.max(0, Math.min(100, score));
}

function calculateContractorScore(c: typeof contractors[0]): number {
  return Math.round((c.rating / 5) * 100);
}

export default function AITrustMatrix() {
  const [activeTab, setActiveTab] = useState("overview");
  const [simRisk, setSimRisk] = useState([50]);
  const [simDelay, setSimDelay] = useState([0]);
  const [simBudget, setSimBudget] = useState([50]);

  const overallTrust = Math.round(projects.reduce((sum, p) => sum + calculateTrustScore(p), 0) / projects.length);
  const flaggedProjects = projects.filter((p) => calculateTrustScore(p) < 60);
  const highRiskProjects = projects.filter((p) => p.riskLevel === "high");
  const delayedProjects = projects.filter((p) => p.status === "delayed");

  const simulatedScore = Math.max(0, Math.min(100, overallTrust - (simRisk[0] - 50) * 0.3 - simDelay[0] * 0.5 + (simBudget[0] - 50) * 0.2));

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">AI Trust Matrix</h2>
            <p className="text-sm text-white/80">Real-time AI-powered fraud detection, anomaly analysis, and trust scoring</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="bg-white/10 rounded-lg p-2">
            <div className="text-xl font-bold">{overallTrust}%</div>
            <div className="text-[10px] text-white/70">Overall Trust Score</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="text-xl font-bold">{flaggedProjects.length}</div>
            <div className="text-[10px] text-white/70">Flagged Projects</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="text-xl font-bold">{highRiskProjects.length}</div>
            <div className="text-[10px] text-white/70">High Risk</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="text-xl font-bold">{delayedProjects.length}</div>
            <div className="text-[10px] text-white/70">Delayed</div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="overview" className="flex-1">Trust Score Breakdown</TabsTrigger>
          <TabsTrigger value="anomalies" className="flex-1">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="simulator" className="flex-1">Scenario Simulator</TabsTrigger>
        </TabsList>

        {/* Trust Score Breakdown */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          {/* Overall Score Card */}
          <Card className={`border-2 ${overallTrust >= 80 ? "border-emerald-300" : overallTrust >= 60 ? "border-amber-300" : "border-red-300"}`}>
            <CardContent className="p-6 text-center">
              <div className="relative inline-flex items-center justify-center mb-3">
                <svg className="w-28 h-28 -rotate-90">
                  <circle cx="56" cy="56" r="48" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                  <circle cx="56" cy="56" r="48" fill="none" stroke={overallTrust >= 80 ? "#10b981" : overallTrust >= 60 ? "#f59e0b" : "#ef4444"} strokeWidth="6"
                    strokeDasharray={`${(overallTrust / 100) * 301.6} 301.6`} strokeLinecap="round" className="trust-ring" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <div className="text-3xl font-bold">{overallTrust}%</div>
                    <div className="text-xs text-gray-500">Trust Score</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                <div className="p-3 bg-emerald-50 rounded-lg text-center">
                  <div className="text-lg font-bold text-emerald-700">{projects.filter((p) => calculateTrustScore(p) >= 80).length}</div>
                  <div className="text-xs text-emerald-600">High Trust</div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg text-center">
                  <div className="text-lg font-bold text-amber-700">{projects.filter((p) => calculateTrustScore(p) >= 60 && calculateTrustScore(p) < 80).length}</div>
                  <div className="text-xs text-amber-600">Medium Trust</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg text-center">
                  <div className="text-lg font-bold text-orange-700">{projects.filter((p) => calculateTrustScore(p) >= 40 && calculateTrustScore(p) < 60).length}</div>
                  <div className="text-xs text-orange-600">Low Trust</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg text-center">
                  <div className="text-lg font-bold text-red-700">{projects.filter((p) => calculateTrustScore(p) < 40).length}</div>
                  <div className="text-xs text-red-600">Critical</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Trust Scores */}
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Project Trust Scores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {projects.map((p) => {
                const score = calculateTrustScore(p);
                return (
                  <div key={p.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <div className="w-10 text-center">
                      <div className={`text-sm font-bold ${score >= 80 ? "text-emerald-600" : score >= 60 ? "text-amber-600" : "text-red-600"}`}>{score}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{p.title}</div>
                      <div className="text-xs text-gray-500">{p.id.toUpperCase()}</div>
                    </div>
                    <Progress value={score} className="w-24 h-2" />
                    <Badge className={`${score >= 80 ? "bg-emerald-50 text-emerald-700" : score >= 60 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"} border-0 text-xs`}>
                      {score >= 80 ? "Good" : score >= 60 ? "Fair" : "Poor"}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Anomaly Detection */}
        <TabsContent value="anomalies" className="space-y-4 mt-4">
          <Card className="border-red-200 bg-red-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><AlertOctagon className="h-4 w-4 text-red-600" /> Detected Anomalies ({flaggedProjects.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {flaggedProjects.length === 0 ? (
                <div className="text-center py-6 text-emerald-600">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">No anomalies detected</p>
                  <p className="text-xs">All projects are within expected parameters</p>
                </div>
              ) : (
                flaggedProjects.map((p) => {
                  const score = calculateTrustScore(p);
                  const anomalies: string[] = [];
                  if (p.riskLevel === "high") anomalies.push("High risk level flagged");
                  if (p.status === "delayed") anomalies.push("Project is behind schedule");
                  if (p.budget > 0 && p.spent / p.budget > 0.9) anomalies.push("Budget utilization > 90%");
                  if (p.citizenReports.length > 0) anomalies.push("Citizen complaints filed");
                  if (p.completion < 20) anomalies.push("Low completion rate");

                  return (
                    <Card key={p.id} className="border-red-200">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-medium text-sm">{p.title}</div>
                            <div className="text-xs text-gray-500">Trust Score: {score}/100</div>
                          </div>
                          <Badge className="bg-red-50 text-red-700 border-0">{anomalies.length} flags</Badge>
                        </div>
                        <div className="space-y-1">
                          {anomalies.map((a, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-red-600">
                              <AlertTriangle className="h-3 w-3" />
                              {a}
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                          <FileWarning className="h-3 w-3" />
                          Contractor: {p.contractorId ? contractors.find(c => c.id === p.contractorId)?.name || "N/A" : "Not assigned"}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Contractor Risk Assessment */}
          <Card className="border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><Scale className="h-4 w-4 text-amber-600" /> Contractor Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {contractors.map((c) => {
                const cScore = calculateContractorScore(c);
                const cProjects = projects.filter((p) => p.contractorId === c.id);
                const avgTrust = cProjects.length > 0 ? Math.round(cProjects.reduce((s, p) => s + calculateTrustScore(p), 0) / cProjects.length) : 0;
                return (
                  <div key={c.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <div className="w-10 text-center">
                      <div className={`text-sm font-bold ${cScore >= 80 ? "text-emerald-600" : cScore >= 60 ? "text-amber-600" : "text-red-600"}`}>{cScore}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{c.name}</div>
                      <div className="text-xs text-gray-500">Rating: {c.rating}/5 | Projects: {c.projects.length}</div>
                    </div>
                    <Badge className={`${cScore >= 80 ? "bg-emerald-50 text-emerald-700" : cScore >= 60 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"} border-0 text-xs`}>
                      {cScore >= 80 ? "Low Risk" : cScore >= 60 ? "Moderate" : "High Risk"}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scenario Simulator */}
        <TabsContent value="simulator" className="space-y-4 mt-4">
          <Card className="border-emerald-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><Sliders className="h-4 w-4 text-emerald-600" /> What-If Scenario Simulator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Risk Exposure</span>
                    <span className="font-medium">{simRisk[0]}%</span>
                  </div>
                  <Slider value={simRisk} onValueChange={setSimRisk} max={100} step={1} />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Conservative</span>
                    <span>Aggressive</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delay Probability</span>
                    <span className="font-medium">{simDelay[0]}%</span>
                  </div>
                  <Slider value={simDelay} onValueChange={setSimDelay} max={100} step={1} />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>On Track</span>
                    <span>Delayed</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budget Pressure</span>
                    <span className="font-medium">{simBudget[0]}%</span>
                  </div>
                  <Slider value={simBudget} onValueChange={setSimBudget} max={100} step={1} />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Under Budget</span>
                    <span>Over Budget</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Simulated Trust Score</div>
                <div className={`text-5xl font-bold ${simulatedScore >= 80 ? "text-emerald-600" : simulatedScore >= 60 ? "text-amber-600" : "text-red-600"}`}>
                  {simulatedScore}%
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">vs {overallTrust}% baseline</span>
                  <span className={`text-sm font-medium ${simulatedScore >= overallTrust ? "text-emerald-600" : "text-red-600"}`}>
                    {simulatedScore >= overallTrust ? "+" : ""}{simulatedScore - overallTrust}%
                  </span>
                </div>
                <Progress value={simulatedScore} className="h-2 mt-3 max-w-md mx-auto" />
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <RefreshCw className="h-3.5 w-3.5" />
                Adjust the sliders to see how different factors affect the trust score
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}