import { useState } from "react";
import { Camera, MapPin, Upload, CheckCircle, AlertTriangle, Shield, Award, Star, Image, Flag, BarChart3, Send, ChevronRight, Users, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockProjects, formatDate } from "@/data/mockData";
import type { Project } from "@/types";

const badges = [
  { id: "b1", name: "First Report", icon: Star, desc: "Submitted your first field report", earned: true },
  { id: "b2", name: "Site Scout", icon: MapPin, desc: "Verified 5 project sites", earned: true },
  { id: "b3", name: "Watchdog", icon: Shield, desc: "Flagged 10 discrepancies", earned: false, progress: 7 },
  { id: "b4", name: "Gold Monitor", icon: Award, desc: "Top 1% of contributors", earned: false, progress: 3 },
  { id: "b5", name: "Community Voice", icon: Users, desc: "100 reports submitted", earned: false, progress: 1 },
];

export default function CitizenVerificationPortal() {
  const [activeTab, setActiveTab] = useState("submit");
  const [selectedProject, setSelectedProject] = useState("");
  const [reportType, setReportType] = useState("observation");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    if (!message.trim() || !selectedProject) return;
    alert("Report submitted successfully! Your contribution helps strengthen transparency. AI analysis will be performed shortly.");
    setMessage("");
    setLocation("");
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="tccn-gradient rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Citizen Verification Portal</h2>
            <p className="text-sm text-white/80">Your eyes on the ground. Every report builds a more transparent Nigeria.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/10 rounded-lg p-2">
            <div className="text-lg font-bold">12</div>
            <div className="text-[10px] text-white/70">My Reports</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="text-lg font-bold">2</div>
            <div className="text-[10px] text-white/70">Badges Earned</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="text-lg font-bold">87%</div>
            <div className="text-[10px] text-white/70">AI Accuracy</div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="submit" className="flex-1">Submit Report</TabsTrigger>
          <TabsTrigger value="badges" className="flex-1">My Badges</TabsTrigger>
          <TabsTrigger value="history" className="flex-1">My Reports</TabsTrigger>
        </TabsList>

        {/* Submit Report */}
        <TabsContent value="submit" className="space-y-4 mt-4">
          <Card className="border-emerald-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Field Report Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Select Project</label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  <option value="">-- Select a project --</option>
                  {mockProjects.map((p) => (
                    <option key={p.id} value={p.id}>{p.title} ({p.id.toUpperCase()})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Report Type</label>
                <div className="flex gap-2">
                  {[
                    { id: "observation", label: "Observation", icon: MapPin },
                    { id: "complaint", label: "Complaint", icon: AlertTriangle },
                    { id: "verification", label: "Verification", icon: CheckCircle },
                    { id: "praise", label: "Praise", icon: Star },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setReportType(type.id)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                        reportType === type.id ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <type.icon className="h-3 w-3" />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Description</label>
                <Textarea
                  placeholder="Describe what you observed at the project site. Include details like location, date, and any specific issues or progress..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">GPS Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="e.g., 6.5244, 3.3792 (or click 'Get Location')"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm" className="mt-2 text-xs" onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (pos) => setLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`),
                      () => alert("Location access denied. Please enter coordinates manually.")
                    );
                  }
                }}>
                  <MapPin className="h-3 w-3 mr-1" /> Get Current Location
                </Button>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Site Photos</label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-emerald-300 transition-colors cursor-pointer">
                  <Camera className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500 font-medium">Click to upload photos</p>
                  <p className="text-xs text-gray-400">JPG, PNG up to 10MB each. Max 5 photos.</p>
                </div>
              </div>

              <Button className="w-full tccn-gradient text-white" onClick={handleSubmit}>
                <Send className="h-4 w-4 mr-2" /> Submit Report
              </Button>
              <p className="text-xs text-gray-400 text-center">Your report will be analyzed by AI and reviewed by the oversight team.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Badges */}
        <TabsContent value="badges" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <Card key={badge.id} className={`border ${badge.earned ? "border-emerald-200 bg-emerald-50/50" : "border-gray-200"}`}>
                  <CardContent className="p-4 text-center">
                    <div className={`h-12 w-12 rounded-full mx-auto mb-2 flex items-center justify-center ${badge.earned ? "bg-emerald-100" : "bg-gray-100"}`}>
                      <Icon className={`h-6 w-6 ${badge.earned ? "text-emerald-600" : "text-gray-400"}`} />
                    </div>
                    <div className="font-semibold text-sm">{badge.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{badge.desc}</div>
                    {badge.earned && <Badge className="mt-2 bg-emerald-100 text-emerald-700 border-0">Earned</Badge>}
                    {!badge.earned && badge.progress && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{badge.progress}/10</span>
                        </div>
                        <Progress value={(badge.progress / 10) * 100} className="h-1.5" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* My Reports */}
        <TabsContent value="history" className="space-y-3 mt-4">
          <Card className="border-emerald-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Your Submitted Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { id: "1", project: "Lagos-Ibadan Expressway Phase 3", date: "2025-02-01", type: "concern", status: "acknowledged" },
                  { id: "2", project: "Benin-Asphalt Road Network", date: "2025-01-15", type: "complaint", status: "pending" },
                ].map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">CT</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{r.project}</div>
                        <div className="text-xs text-gray-500">{formatDate(r.date)}</div>
                      </div>
                    </div>
                    <Badge className={`${r.status === "resolved" ? "bg-emerald-50 text-emerald-700" : r.status === "acknowledged" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"} border-0 text-xs`}>
                      {r.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis Stats */}
          <Card className="border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="h-4 w-4 text-blue-600" /> AI Analysis Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <div className="text-lg font-bold text-blue-700">87%</div>
                  <div className="text-xs text-blue-600">AI Match Accuracy</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <div className="text-lg font-bold text-green-700">92%</div>
                  <div className="text-xs text-green-600">Image Verification</div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg text-center">
                  <div className="text-lg font-bold text-amber-700">78%</div>
                  <div className="text-xs text-amber-600">GPS Validation</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg text-center">
                  <div className="text-lg font-bold text-purple-700">2.4hrs</div>
                  <div className="text-xs text-purple-600">Avg. Response Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}