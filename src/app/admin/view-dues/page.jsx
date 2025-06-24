"use client";

import { useState } from "react";
import { Search, Users, FileText, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import DueDetails from "../components/DueDetails";

const ViewDuesPage = () => {
  const [roll, setRoll] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const getDuesInfo = async (rollNumber) => {
    if (!rollNumber.trim()) {
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(`/api/view/view-dues?roll=${rollNumber}`, {
        method: "GET",
      });

      const res = await response.json();

      // Simulate loading delay for better UX
      setTimeout(() => {
        if (res?.data) {
          setStudentData(res.data);
        } else {
          setStudentData(null);
        }
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error fetching dues:", error);
      setStudentData(null);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    getDuesInfo(roll);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                View Student Dues
              </h1>
              <p className="text-gray-600">
                Search and manage student due payments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Search Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                Search Student Dues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    value={roll}
                    onChange={(e) => setRoll(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter student roll number..."
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 text-lg"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={!roll.trim() || loading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 h-12 font-medium"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Search Dues
                    </>
                  )}
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-blue-600 font-medium">
                        Total Students
                      </p>
                      <p className="text-2xl font-bold text-blue-900">1,247</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-orange-600" />
                    <div>
                      <p className="text-sm text-orange-600 font-medium">
                        Pending Dues
                      </p>
                      <p className="text-2xl font-bold text-orange-900">342</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm text-green-600 font-medium">
                        Completed
                      </p>
                      <p className="text-2xl font-bold text-green-900">905</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {loading && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  <CardTitle>Searching for dues...</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-8 w-full" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                  <Skeleton className="h-32 w-full" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Results */}
          {searched && !loading && !studentData && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Dues Found
                </h3>
                <p className="text-gray-600 mb-6">
                  No due records found for roll number "{roll}". Please check
                  the roll number and try again.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setRoll("");
                    setSearched(false);
                    setStudentData(null);
                  }}
                >
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {!loading && studentData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <DueDetails data={studentData} />
            </motion.div>
          )}

          {/* Instructions */}
          {!searched && (
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8  text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Search Student Dues
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Enter a student's roll number in the search box above to view
                  their due details, payment history, and pending amounts.
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ViewDuesPage;
