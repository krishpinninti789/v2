"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Cloud,
  Search,
  CreditCard,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Login from "./components/Login";
import LoginPage from "@/components/LoginPage";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-gray-900"
            >
              NDMS
            </Link>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowLogin(true)}
                size="lg"
                className="bg-vprimary hover:bg-blue-800 text-white font-medium px-6"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                onClick={() => setShowLogin(true)}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6"
              >
                Sign In
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <CheckCircle className="h-4 w-4" />
                Trusted by 1000+ institutions
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                No
                <span className="bg-gradient-to-r from-blue-800  to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  Due{" "}
                </span>
                <br />
                Management
                <br />
                <span className="text-gray-600 text-4xl lg:text-5xl">
                  Made Simple
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                Transform how you manage dues and payments with our intelligent
                platform. Accessible anywhere, anytime, on any device.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={() => setShowLogin(true)}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-700 text-white font-medium px-8 h-14 text-lg"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 h-14 text-lg"
                >
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  No setup fees
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Cancel anytime
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20"></div>
              <Card className="relative shadow-2xl border-0 overflow-hidden">
                <Image
                  src="/images/landing.jpg?height=600&width=600"
                  alt="NDMS Dashboard Preview"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Everything you need to manage dues
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Powerful features designed to streamline your workflow and
                enhance productivity
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Search Feature */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Search className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Smart Search
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Find any record instantly with our intelligent search
                    system. Filter, sort, and locate data in seconds.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Real-time search results
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Advanced filtering options
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Export search results
                    </div>
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="Search students, dues..."
                      className="pl-10 h-12 border-gray-200 bg-gray-50"
                      readOnly
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Feature */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Secure Payments
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Process payments securely with multiple gateway options.
                    Track transactions and generate receipts automatically.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Multiple payment methods
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Automated receipts
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Payment tracking
                    </div>
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="•••• •••• •••• 1234"
                      className="pl-10 h-12 border-gray-200 bg-gray-50"
                      readOnly
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* User Management Feature */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    User Management
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Manage students, staff, and administrators with role-based
                    access control and real-time notifications.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Role-based permissions
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Email notifications
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Bulk operations
                    </div>
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="Add new student..."
                      className="pl-10 h-12 border-gray-200 bg-gray-50"
                      readOnly
                    />
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to transform your due management?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of institutions already using NDMS to streamline
              their operations.
            </p>
            <Button
              onClick={() => setShowLogin(true)}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 font-medium px-8 h-14 text-lg"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Simplified Footer */}
      <footer className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">NDMS</span>
            </Link>
            <p className="text-gray-500 text-center max-w-md">
              Simplifying due management for educational institutions worldwide.
            </p>
            <p className="text-sm text-gray-400">
              © 2024 NDMS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
