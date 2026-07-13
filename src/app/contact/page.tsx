"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // এই ফর্মের কোনো ব্যাকএন্ড নেই (Requirement এ Contact পেজে API লাগবে বলা নেই),
    // তাই শুধু সফলতার UI state দেখানো হচ্ছে — বাস্তব প্রজেক্টে এখানে email service (Resend, SendGrid) যুক্ত হতো
    setIsSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-neutral-900">Get in Touch</h1>
            <p className="mt-2 text-neutral-600">
              Have a question or feedback? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* যোগাযোগের তথ্য */}
            <div className="space-y-4">
              <div className="rounded-card border border-neutral-200 bg-white p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Mail size={18} />
                </span>
                <p className="mt-3 font-medium text-neutral-900">Email</p>
                <p className="text-sm text-neutral-600">support@hireflow.com</p>
              </div>
              <div className="rounded-card border border-neutral-200 bg-white p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                  <Phone size={18} />
                </span>
                <p className="mt-3 font-medium text-neutral-900">Phone</p>
                <p className="text-sm text-neutral-600">+880 1234-567890</p>
              </div>
              <div className="rounded-card border border-neutral-200 bg-white p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <MapPin size={18} />
                </span>
                <p className="mt-3 font-medium text-neutral-900">Office</p>
                <p className="text-sm text-neutral-600">Dhaka, Bangladesh</p>
              </div>
            </div>

            {/* ফর্ম */}
            <div className="rounded-card border border-neutral-200 bg-white p-6 lg:col-span-2">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                    <CheckCircle2 size={26} />
                  </span>
                  <p className="font-semibold text-neutral-900">Message sent successfully!</p>
                  <p className="text-sm text-neutral-600">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-neutral-900">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-neutral-900">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-900">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600"
                  >
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}