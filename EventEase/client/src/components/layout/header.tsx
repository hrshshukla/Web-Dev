import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Bell, Menu, X, Ticket } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function Header() {
  const [location] = useLocation();
  const { user, logoutMutation, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Ticket className="h-6 w-6 text-primary mr-2" />
                <span className="font-bold text-xl text-primary">EventHub</span>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`${
                  isActive("/")
                    ? "border-primary text-slate-900 border-b-2"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 border-b-2"
                } px-1 pt-1 inline-flex items-center text-sm font-medium`}
              >
                Discover
              </Link>
              <Link
                href="/create-event"
                className={`${
                  isActive("/create-event")
                    ? "border-primary text-slate-900 border-b-2"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 border-b-2"
                } px-1 pt-1 inline-flex items-center text-sm font-medium`}
              >
                Create Event
              </Link>
              <Link
                href="/my-tickets"
                className={`${
                  isActive("/my-tickets")
                    ? "border-primary text-slate-900 border-b-2"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 border-b-2"
                } px-1 pt-1 inline-flex items-center text-sm font-medium`}
              >
                My Tickets
              </Link>
              {user?.isOrganizer && (
                <Link
                  href="/organizer-dashboard"
                  className={`${
                    isActive("/organizer-dashboard")
                      ? "border-primary text-slate-900 border-b-2"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 border-b-2"
                  } px-1 pt-1 inline-flex items-center text-sm font-medium`}
                >
                  Dashboard
                </Link>
              )}
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : user ? (
              <>
                <ThemeToggle />
                <div className="relative ml-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-slate-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-0 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <div className="px-2 py-1.5 text-sm font-medium text-slate-900">
                        {user.name}
                      </div>
                      <div className="px-2 py-1.5 text-xs text-slate-500">
                        {user.email}
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/my-tickets">Your Tickets</Link>
                      </DropdownMenuItem>
                      {user.isOrganizer && (
                        <DropdownMenuItem asChild>
                          <Link href="/organizer-dashboard">Dashboard</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Button variant="ghost" asChild>
                  <Link href="/auth">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth">Register</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`${
                isActive("/")
                  ? "bg-primary-50 border-primary text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  : "border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Discover
            </Link>
            <Link
              href="/create-event"
              className={`${
                isActive("/create-event")
                  ? "bg-primary-50 border-primary text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  : "border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Event
            </Link>
            <Link
              href="/my-tickets"
              className={`${
                isActive("/my-tickets")
                  ? "bg-primary-50 border-primary text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  : "border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              My Tickets
            </Link>
            {user?.isOrganizer && (
              <Link
                href="/organizer-dashboard"
                className={`${
                  isActive("/organizer-dashboard")
                    ? "bg-primary-50 border-primary text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    : "border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>

          {user ? (
            <div className="pt-4 pb-3 border-t border-slate-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-slate-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-slate-500">
                    {user.email}
                  </div>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <ThemeToggle />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 text-slate-400 hover:text-slate-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  href="/my-tickets"
                  className="block px-4 py-2 text-base font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Your Tickets
                </Link>
                {user.isOrganizer && (
                  <Link
                    href="/organizer-dashboard"
                    className="block px-4 py-2 text-base font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-slate-200">
              <div className="flex flex-col space-y-2 px-4">
                <Button variant="ghost" asChild>
                  <Link
                    href="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </Button>
                <Button asChild>
                  <Link
                    href="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
