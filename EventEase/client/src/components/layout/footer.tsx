import { Link } from "wouter";
import { Ticket, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Ticket className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-xl">EventHub</span>
            </div>
            <p className="mt-4 text-slate-400 text-sm">
              Making event management simple and accessible for everyone.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
              About
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Company
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Status
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Organizer Agreement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} EventHub, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
