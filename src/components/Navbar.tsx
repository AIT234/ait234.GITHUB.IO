import { useState } from "react";
import { Menu, Search, Globe, ChevronDown, Bell, User, LogOut, LayoutDashboard, Users, Map, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { BRAND_NAME, LANGUAGES, ROLES } from "@/constants";
import { t } from "@/constants";
import type { UserRole, Language } from "@/types";

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const navItems = [
  { id: "dashboard", label: "nav.home", icon: LayoutDashboard },
  { id: "map", label: "nav.map", icon: Map },
  { id: "projects", label: "nav.projects", icon: FileText },
  { id: "contractors", label: "nav.contractors", icon: Users },
  { id: "verify", label: "nav.verify", icon: Shield },
  { id: "trust", label: "nav.trust", icon: Shield },
  { id: "export", label: "nav.export", icon: FileText },
];

export default function Navbar({ currentRole, onRoleChange, currentLang, onLangChange, activeSection, onSectionChange, searchQuery, onSearchChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left: Logo + Mobile Menu */}
        <div className="flex items-center gap-3">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="tccn-gradient p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">TCCN</div>
                  <div>
                    <div className="text-sm font-bold">{BRAND_NAME}</div>
                    <div className="text-xs opacity-80">Transparency Platform</div>
                  </div>
                </div>
              </div>
              <div className="p-3 space-y-1">
                {navItems.map((item) => (
                  <SheetClose key={item.id} asChild>
                    <button
                      onClick={() => { onSectionChange(item.id); setMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === item.id ? "bg-emerald-50 text-emerald-700" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {t(item.label, currentLang)}
                    </button>
                  </SheetClose>
                ))}
                <Separator className="my-2" />
                <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">{t("role.switch", currentLang)}</div>
                {ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => { onRoleChange(role.id as UserRole); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      currentRole === role.id ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    {role.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <button onClick={() => onSectionChange("dashboard")} className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full tccn-gradient flex items-center justify-center text-white font-bold text-xs">TCCN</div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-gray-900 leading-tight">{BRAND_NAME}</div>
              <div className="text-[10px] text-gray-500 leading-tight">Transparency Platform</div>
            </div>
          </button>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {t(item.label, currentLang)}
            </button>
          ))}
        </nav>

        {/* Right: Search, Lang, Role, Notifications */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t("search.placeholder", currentLang)}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-56 lg:w-72 h-9 pl-9 text-sm rounded-full bg-gray-50 border-gray-200"
            />
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSearchOpen(!searchOpen)}>
            <Search className="h-4 w-4" />
          </Button>

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden sm:flex gap-1.5 text-xs font-medium">
                <Globe className="h-3.5 w-3.5" />
                {LANGUAGES.find((l) => l.id === currentLang)?.native || "English"}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {LANGUAGES.map((lang) => (
                <DropdownMenuItem key={lang.id} onClick={() => onLangChange(lang.id as Language)} className="text-sm">
                  {lang.native} <span className="text-xs text-gray-400 ml-1">({lang.label})</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Role Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden sm:flex gap-1.5 text-xs font-medium">
                <User className="h-3.5 w-3.5" />
                {ROLES.find((r) => r.id === currentRole)?.label || "Citizen"}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              {ROLES.map((role) => (
                <DropdownMenuItem key={role.id} onClick={() => onRoleChange(role.id as UserRole)} className="text-sm">
                  <User className="h-3.5 w-3.5 mr-2" />
                  {role.label}
                  {currentRole === role.id && <Badge className="ml-auto h-5 px-1.5 text-[10px] bg-emerald-100 text-emerald-700 border-0">Active</Badge>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">3</span>
          </Button>

          {/* Avatar */}
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarFallback className="tccn-gradient text-white text-xs font-bold">
              {currentRole === "citizen" ? "CT" : currentRole === "executive" ? "EX" : currentRole === "ministry" ? "MN" : currentRole === "contractor" ? "CR" : "AU"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t("search.placeholder", currentLang)}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-9 pl-9 text-sm rounded-full bg-gray-50"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}