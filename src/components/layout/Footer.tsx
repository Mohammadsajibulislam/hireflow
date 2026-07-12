import Link from "next/link";
import { Mail, Phone, MapPin, Briefcase } from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import type { NavItem } from "@/types/nav";

const forJobSeekers: NavItem[] = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "Career Advice", href: "/blog" },
];

const forEmployers: NavItem[] = [
  { label: "Post a Job", href: "/items/add" },
  { label: "Manage Jobs", href: "/items/manage" },
  { label: "Pricing", href: "/pricing" },
];

const company: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* ব্র্যান্ড + যোগাযোগ তথ্য */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
                <Briefcase size={18} />
              </span>
              HireFlow
            </Link>
            <p className="mt-3 text-sm text-neutral-400">
              Connecting talented job seekers with the right opportunities.
            </p>
            <div className="mt-4 space-y-2 text-sm text-neutral-400">
              <p className="flex items-center gap-2">
                <Mail size={14} /> support@hireflow.com
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} /> +880 1234-567890
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={14} /> Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="font-semibold text-white">For Job Seekers</h3>
            <ul className="mt-4 space-y-2">
              {forJobSeekers.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-neutral-400 hover:text-primary-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="font-semibold text-white">For Employers</h3>
            <ul className="mt-4 space-y-2">
              {forEmployers.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-neutral-400 hover:text-primary-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-neutral-400 hover:text-primary-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* নিচের বার — কপিরাইট + সোশ্যাল লিংক */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-6 sm:flex-row">
          <p className="text-sm text-neutral-400">
            &copy; {new Date().getFullYear()} HireFlow. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition-colors hover:bg-primary-500 hover:text-white"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition-colors hover:bg-primary-500 hover:text-white"
            >
              <FaTwitter size={14} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition-colors hover:bg-primary-500 hover:text-white"
            >
              <FaLinkedinIn size={14} />
            </a>
            <a 
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition-colors hover:bg-primary-500 hover:text-white"
            >
              <FaInstagram size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}