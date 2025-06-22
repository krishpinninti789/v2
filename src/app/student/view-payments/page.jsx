"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Receipt,
  CreditCard,
  Banknote,
  Calendar,
  Search,
  Download,
  Filter,
  TrendingUp,
  History,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

// Mock formatDateTime function - replace with your actual implementation
const formatDateTime = (date) => {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const StudentViewPaymentPage = () => {
  const [roll, setRoll] = useState();
  const { data: session } = useSession();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("");

  useEffect(() => {
    if (session?.user) {
      setRoll(session.user.email.split("@")[0]);
    }
  }, [session]);

  useEffect(() => {
    const getPayments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/view/view-payments?roll=${roll}`, {
          method: "GET",
        });
        const res = await response.json();
        if (res?.data) setData(res.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    if (roll !== undefined) getPayments();
  }, [roll]);

  // Filter payments based on search term and payment mode
  const filteredPayments =
    data?.filter((payment) => {
      const matchesSearch =
        searchTerm === "" ||
        payment.due_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterMode === "all" || payment.payment_mode === filterMode;
      return matchesSearch && matchesFilter;
    }) || data;

  // Calculate summary statistics
  const totalAmount =
    data?.reduce((sum, payment) => sum + payment.amountPaid, 0) || 0;
  const totalPayments = data?.length || 0;
  const onlinePayments =
    data?.filter((p) => p.payment_mode !== "cash").length || 0;
  const cashPayments =
    data?.filter((p) => p.payment_mode === "cash").length || 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-0 shadow-md">
              <CardContent className="p-4">
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <History className="w-8 h-8 text-blue-600" />
            Payment History
          </h1>
          <p className="text-gray-600 mt-1">
            Track all your payment transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Paid</p>
                <p className="text-2xl font-bold text-blue-900">
                  ₹{totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">
                  Total Payments
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {totalPayments}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">
                  Online Payments
                </p>
                <p className="text-2xl font-bold text-purple-900">
                  {onlinePayments}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-r from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                <Banknote className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">
                  Cash Payments
                </p>
                <p className="text-2xl font-bold text-orange-900">
                  {cashPayments}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by due name or payment ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterMode === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterMode("all")}
                className="flex items-center gap-1"
              >
                <Filter className="w-3 h-3" />
                All
              </Button>
              <Button
                variant={filterMode === "online" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterMode("online")}
                className="flex items-center gap-1"
              >
                <CreditCard className="w-3 h-3" />
                Online
              </Button>
              <Button
                variant={filterMode === "cash" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterMode("cash")}
                className="flex items-center gap-1"
              >
                <Banknote className="w-3 h-3" />
                Cash
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Payment Records
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredPayments && filteredPayments.length > 0 ? (
            <div className="space-y-0">
              {filteredPayments.map((payment, index) => (
                <motion.div
                  key={payment.paymentId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      {/* Payment Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {payment.due_name}
                          </h3>
                          <Badge
                            variant="secondary"
                            className={`${
                              payment.payment_mode === "cash"
                                ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                                : "bg-green-100 text-green-700 hover:bg-green-100"
                            }`}
                          >
                            {payment.payment_mode === "cash" ? (
                              <Banknote className="w-3 h-3 mr-1" />
                            ) : (
                              <CreditCard className="w-3 h-3 mr-1" />
                            )}
                            {payment.payment_mode.charAt(0).toUpperCase() +
                              payment.payment_mode.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Payment ID</p>
                            <p className="font-mono text-gray-900 text-xs">
                              {payment.paymentId}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Due ID</p>
                            <p className="font-mono text-gray-900 text-xs">
                              {payment.due_id}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Amount Paid</p>
                            <p className="font-semibold text-green-600 text-lg">
                              ₹{payment.amountPaid.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Date & Time
                            </p>
                            <p className="font-semibold text-gray-900 text-sm">
                              {formatDateTime(payment.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex-shrink-0">
                        <Button
                          className="button-grad text-white px-6 py-2 font-medium"
                          onClick={() => {
                            window.location.href = `/student/payment_invoice/invoice?payid=${payment.paymentId}`;
                          }}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View Invoice
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < filteredPayments.length - 1 && <Separator />}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Receipt className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm || filterMode !== "all"
                  ? "No matching payments found"
                  : "No Payment Records"}
              </h3>
              <p className="text-gray-500 text-center max-w-md">
                {searchTerm || filterMode !== "all"
                  ? "Try adjusting your search terms or filters to find what you're looking for."
                  : "You haven't made any payments yet. Your payment history will appear here once you start making payments."}
              </p>
              {(searchTerm || filterMode !== "all") && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterMode("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentViewPaymentPage;
