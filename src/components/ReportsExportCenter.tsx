import { useState } from "react";
import { FileText, Download, FileSpreadsheet, FilePieChart, FileBarChart, Printer, Share2, Calendar, Filter, CheckCircle, Clock, AlertTriangle, ChevronRight, Eye, BarChart3, Activity, TrendingUp, X, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockProjects, mockContractors, formatCurrency, formatDate } from "@/data/mockData";

const projects = mockProjects;
const contractors = mockContractors;

export default function ReportsExportCenter() {
  const [activeTab, setActiveTab] = useState("generated");
  const [reportType, setReportType] = useState("project-status");
  const [exportFormat, setExportFormat] = useState("pdf");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);

  const generatedReports = [
    { id: "r1", title: "National Infrastructure Status Report", type: "PDF", date: "2025-02-10", size: "2.4 MB", status: "ready" },
    { id: "r2", title: "Q1 2025 Budget Utilization Analysis", type: "Excel", date: "2025-02-01", size: "1.8 MB", status: "ready" },
    { id: "r3", title: "Contractor Performance Dashboard", type: "PDF", date: "2025-01-28", size: "3.1 MB", status: "ready" },
    { id: "r4", title: "Citizen Report Summary - Jan 2025", type: "CSV", date: "2025-01-31", size: "0.6 MB", status: "ready" },
    { id: "r5", title: "Risk Assessment & Anomaly Report", type: "PDF", date: "2025-01-25", size: "4.2 MB", status: "generating" },
    { id: "r6", title: "Annual Procurement Transparency Report", type: "PDF", date: "2024-12-31", size: "8.5 MB", status: "ready" },
  ];

  const scheduledReports = [
    { id: "s1", title: "Weekly Project Status Update", frequency: "Weekly (Mon)", format: "PDF", recipients: "Ministry of Works", nextRun: "2025-02-17" },
    { id: "s2", title: "Monthly Budget Report", frequency: "Monthly (1st)", format: "Excel", recipients: "FMoF, Presidency", nextRun: "2025-03-01" },
    { id: "s3", title: "Quarterly Transparency Scorecard", frequency: "Quarterly", format: "PDF", recipients: "Public Portal", nextRun: "2025-04-01" },
  ];

  const handleExport = () => {
    alert(`Generating ${reportType.replace("-", " ")} report in ${exportFormat.toUpperCase()} format. This may take a moment...`);
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Reports & Export Center</h2>
            <p className="text-sm text-white/80">Generate, schedule, and export transparency reports in multiple formats</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/10 rounded-lg p-2">
            <div className="text-lg font-bold">{generatedReports.filter((r) => r.status === "ready").length}</div>
            <div className="text-[10px] text-white/70">Ready Reports</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="text-lg font-bold">{scheduledReports.length}</div>
            <div className="text-[10px] text-white/70">Scheduled</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="text-lg font-bold">3</div>
            <div className="text-[10px] text-white/70">Formats</div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="generated" className="flex-1">Generated Reports</TabsTrigger>
          <TabsTrigger value="scheduled" className="flex-1">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="create" className="flex-1">Create Report</TabsTrigger>
        </TabsList>

        {/* Generated Reports */}
        <TabsContent value="generated" className="space-y-4 mt-4">
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Available Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {generatedReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                      report.type === "PDF" ? "bg-red-50" : report.type === "Excel" ? "bg-emerald-50" : "bg-blue-50"
                    }`}>
                      {report.type === "PDF" ? <FilePieChart className="h-4 w-4 text-red-500" /> :
                       report.type === "Excel" ? <FileSpreadsheet className="h-4 w-4 text-emerald-500" /> :
                       <FileBarChart className="h-4 w-4 text-blue-500" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{report.title}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{report.type}</span>
                        <span>{report.size}</span>
                        <span>{formatDate(report.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === "generating" ? (
                      <Badge className="bg-amber-50 text-amber-700 border-0 text-xs">Generating...</Badge>
                    ) : (
                      <>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4 text-emerald-600" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scheduled Reports */}
        <TabsContent value="scheduled" className="space-y-4 mt-4">
          <Card className="border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Automated Report Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {scheduledReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{report.title}</div>
                      <div className="text-xs text-gray-500">{report.frequency} | {report.format} | {report.nextRun}</div>
                      <div className="text-xs text-gray-400">Recipients: {report.recipients}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-50 text-emerald-700 border-0 text-xs">Active</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Report */}
        <TabsContent value="create" className="space-y-4 mt-4">
          <Card className="border-emerald-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Generate New Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select report type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project-status">Project Status Overview</SelectItem>
                    <SelectItem value="budget-analysis">Budget Utilization Analysis</SelectItem>
                    <SelectItem value="contractor-performance">Contractor Performance</SelectItem>
                    <SelectItem value="risk-assessment">Risk Assessment Report</SelectItem>
                    <SelectItem value="citizen-feedback">Citizen Feedback Summary</SelectItem>
                    <SelectItem value="transparency-scorecard">Transparency Scorecard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Export Format</label>
                <div className="flex gap-2">
                  {[
                    { id: "pdf", label: "PDF", icon: FilePieChart, desc: "Formatted document" },
                    { id: "excel", label: "Excel", icon: FileSpreadsheet, desc: "Spreadsheet data" },
                    { id: "csv", label: "CSV", icon: FileBarChart, desc: "Raw data export" },
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      onClick={() => setExportFormat(fmt.id)}
                      className={`flex-1 p-3 rounded-lg border text-center transition-colors ${
                        exportFormat === fmt.id ? "bg-emerald-50 border-emerald-300" : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <fmt.icon className={`h-5 w-5 mx-auto mb-1 ${exportFormat === fmt.id ? "text-emerald-600" : "text-gray-400"}`} />
                      <div className="text-xs font-medium">{fmt.label}</div>
                      <div className="text-[10px] text-gray-500">{fmt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <Button className="w-full tccn-gradient text-white" onClick={handleExport}>
                <FileDown className="h-4 w-4 mr-2" /> Generate & Export Report
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats for Report */}
          <Card className="border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="h-4 w-4 text-blue-600" /> Report Data Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <div className="text-lg font-bold text-blue-700">{projects.length}</div>
                  <div className="text-xs text-blue-600">Projects</div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg text-center">
                  <div className="text-lg font-bold text-emerald-700">{formatCurrency(totalBudget)}</div>
                  <div className="text-xs text-emerald-600">Total Budget</div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg text-center">
                  <div className="text-lg font-bold text-amber-700">{formatCurrency(totalSpent)}</div>
                  <div className="text-xs text-amber-600">Total Spent</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg text-center">
                  <div className="text-lg font-bold text-purple-700">{contractors.length}</div>
                  <div className="text-xs text-purple-600">Contractors</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}