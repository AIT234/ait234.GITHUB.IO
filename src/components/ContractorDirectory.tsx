import { useState } from "react";
import { Building2, Search, MapPin, Star, Shield, CheckCircle, XCircle, Award, Filter, Mail, Phone, ChevronRight, ExternalLink, Users, Medal, Briefcase, BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockContractors, mockProjects, formatCurrency } from "@/data/mockData";
import type { Contractor } from "@/types";

export default function ContractorDirectory() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);

  const specializations = [...new Set(mockContractors.flatMap((c) => c.specialization))].sort();

  const filtered = mockContractors.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.shortName.toLowerCase().includes(search.toLowerCase())) return false;
    if (tierFilter !== "all" && c.tier !== tierFilter) return false;
    if (specializationFilter !== "all" && !c.specialization.includes(specializationFilter)) return false;
    return true;
  });

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star key={i} className={`h-3 w-3 ${i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
      );
    }
    return stars;
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Contractor Directory</h2>
            <p className="text-sm text-white/80">Verified contractors registered with the National Procurement Database</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/10 rounded-lg p-2">
            <div className="text-lg font-bold">{mockContractors.length}</div>
            <div className="text-[10px] text-white/70">Registered</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="text-lg font-bold">{mockContractors.filter((c) => c.status === "active").length}</div>
            <div className="text-[10px] text-white/70">Active</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="text-lg font-bold">{mockContractors.filter((c) => c.tier === "A").length}</div>
            <div className="text-[10px] text-white/70">Tier A</div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search contractors by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={tierFilter} onValueChange={setTierFilter}>
          <SelectTrigger className="w-28"><SelectValue placeholder="Tier" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="A">Tier A</SelectItem>
            <SelectItem value="B">Tier B</SelectItem>
            <SelectItem value="C">Tier C</SelectItem>
          </SelectContent>
        </Select>
        <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Specialization" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specializations</SelectItem>
            {specializations.map((s) => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Contractor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((contractor) => {
          const activeProjects = mockProjects.filter((p) => p.contractorId === contractor.id && p.status === "in_progress");
          const completedProjects = mockProjects.filter((p) => p.contractorId === contractor.id && p.status === "completed");
          const trustScore = Math.round((contractor.rating / 5) * 100);

          return (
            <Card
              key={contractor.id}
              className={`cursor-pointer hover:shadow-md hover:border-emerald-300 transition-all border-gray-200 ${
                selectedContractor?.id === contractor.id ? "ring-2 ring-emerald-400 border-emerald-300" : ""
              }`}
              onClick={() => setSelectedContractor(selectedContractor?.id === contractor.id ? null : contractor)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="tccn-gradient text-white text-xs font-bold">{contractor.shortName.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{contractor.name}</div>
                    <div className="text-xs text-gray-500">CAC: {contractor.registrationNumber}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {renderStars(contractor.rating)}
                      <span className="text-xs text-gray-500 ml-1">{contractor.rating}</span>
                    </div>
                  </div>
                  <Badge className={`${contractor.tier === "A" ? "bg-emerald-50 text-emerald-700" : contractor.tier === "B" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"} border-0 text-xs`}>
                    Tier {contractor.tier}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Briefcase className="h-3 w-3" />
                    {activeProjects.length} active
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <CheckCircle className="h-3 w-3" />
                    {completedProjects.length} completed
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Users className="h-3 w-3" />
                    {contractor.employees.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="h-3 w-3" />
                    {contractor.location.state}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-gray-500">Trust Score</span>
                      <span className={`font-medium ${trustScore >= 80 ? "text-emerald-600" : trustScore >= 60 ? "text-amber-600" : "text-red-600"}`}>{trustScore}%</span>
                    </div>
                    <Progress value={trustScore} className="h-1.5" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {contractor.specialization.slice(0, 3).map((s) => (
                    <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                  ))}
                  {contractor.specialization.length > 3 && (
                    <Badge variant="outline" className="text-[10px]">+{contractor.specialization.length - 3}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Building2 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium">No contractors found</p>
          <p className="text-sm">Try adjusting your search filters</p>
        </div>
      )}

      {/* Selected Contractor Detail */}
      {selectedContractor && (
        <Card className="border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Building2 className="h-4 w-4 text-emerald-600" />
              {selectedContractor.name} - Detailed Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-3.5 w-3.5 text-gray-400" />
                  <span>{selectedContractor.contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-3.5 w-3.5 text-gray-400" />
                  <span>{selectedContractor.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  <span>{selectedContractor.location.city}, {selectedContractor.location.state}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-3.5 w-3.5 text-gray-400" />
                  <span>{selectedContractor.employees.toLocaleString()} employees</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Awarded</span>
                  <span className="font-medium">{formatCurrency(selectedContractor.totalAwarded)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Completed</span>
                  <span className="font-medium">{formatCurrency(selectedContractor.totalCompleted)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Year Established</span>
                  <span className="font-medium">{selectedContractor.yearEstablished}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Performance Rating</span>
                  <span className="font-medium">{selectedContractor.rating}/5</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}