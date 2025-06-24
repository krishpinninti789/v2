"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  DollarSign,
  GraduationCap,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Building,
} from "lucide-react";
import { motion } from "framer-motion";
import { getCldImageUrl } from "next-cloudinary";

const DueDetails = ({ data }) => {
  const router = useRouter();

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <GraduationCap className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Dues Found
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          No due records found for this student.
        </p>
      </div>
    );
  }

  const url = getCldImageUrl({
    width: 200,
    height: 200,
    src: `students/${data.roll}`,
  });

  const totalAmount = data.dues.reduce((sum, due) => sum + due.amount, 0);
  const totalPaid = data.dues.reduce((sum, due) => sum + due.amount_paid, 0);
  const totalPending = data.dues.reduce(
    (sum, due) => sum + due.amount_pending,
    0
  );
  const pendingDues = data.dues.filter(
    (due) => due.status === "pending"
  ).length;

  return (
    <div className="space-y-6">
      {/* Student Info Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src={url || "/placeholder.svg"}
                  alt={`${data.roll} profile`}
                />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {data.roll.slice(-2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Roll: {data.roll.toUpperCase()}
                  </h2>
                  <div className="flex flex-col md:flex-row gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>Year: {data.year}</span>
                    </div>
                    {data.branch && (
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span>Branch: {data.branch}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center md:text-right mt-4 md:mt-0">
                  <div className="text-sm text-gray-500">Total Dues</div>
                  <div className="text-3xl font-bold text-gray-900">
                    ₹{totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount Paid</p>
                <p className="text-xl font-bold text-green-600">
                  ₹{totalPaid.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount Pending</p>
                <p className="text-xl font-bold text-red-600">
                  ₹{totalPending.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Dues</p>
                <p className="text-xl font-bold text-blue-600">{pendingDues}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dues List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Due Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {data.dues.map((due, index) => (
              <motion.div
                key={due._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    {/* Due Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {due.duetype}
                        </h3>
                        <Badge
                          variant={
                            due.status === "paid" ? "default" : "secondary"
                          }
                          className={`${
                            due.status === "paid"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                          }`}
                        >
                          {due.status === "paid" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {due.status.charAt(0).toUpperCase() +
                            due.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Total Amount</p>
                          <p className="font-semibold text-gray-900">
                            ₹{due.amount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Amount Paid</p>
                          <p className="font-semibold text-green-600">
                            ₹{due.amount_paid.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Amount Pending</p>
                          <p className="font-semibold text-red-600">
                            ₹{due.amount_pending.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Due Date
                          </p>
                          <p className="font-semibold text-gray-900">
                            {new Date(due.due_date).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <Button
                        className={`${
                          due.status === "paid"
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        } px-6 py-2 font-medium`}
                        disabled={due.status === "paid"}
                        onClick={() =>
                          router.push(
                            `/admin/edit-due?roll=${data.roll}&id=${due._id}`
                          )
                        }
                      >
                        {due.status === "paid" ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Edit className="w-4 h-4 mr-2" />
                            Update Due
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                {index < data.dues.length - 1 && <Separator />}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {pendingDues > 0 && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Pending Dues Alert
                </h3>
                <p className="text-orange-100">
                  This student has {pendingDues} pending due(s) requiring
                  attention
                </p>
              </div>
              <Button
                className="bg-white text-orange-600 hover:bg-gray-100 font-medium px-6"
                onClick={() => {
                  const firstPendingDue = data.dues.find(
                    (due) => due.status === "pending"
                  );
                  if (firstPendingDue) {
                    router.push(
                      `/admin/edit-due?roll=${data.roll}&id=${firstPendingDue._id}`
                    );
                  }
                }}
              >
                Update First Pending
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DueDetails;
