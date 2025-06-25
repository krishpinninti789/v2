"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Building,
  Calendar,
  Users,
  Edit,
  Camera,
  School,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { getCldImageUrl } from "next-cloudinary";

const StudentProfilePage = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState(null);
  const [roll, setRoll] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      setRoll(session.user.email.split("@")[0]);
    }
  }, [session]);

  const profileImageUrl = roll
    ? getCldImageUrl({
        width: 300,
        height: 300,
        src: `students/${roll}`,
      })
    : null;

  useEffect(() => {
    const getStudent = async () => {
      if (!roll) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/view/view-students?roll=${roll}`, {
          method: "GET",
        });
        const res = await response.json();
        if (res?.data) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (roll) {
      getStudent();
    }
  }, [roll]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-8 w-48" />
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Skeleton className="w-32 h-32 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Profile Not Found
            </h2>
            <p className="text-gray-600">
              Unable to load your profile information.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 button-grad rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-600">
                  Manage your personal information
                </p>
              </div>
            </div>
            <Button className="button-grad text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Profile Header Card */}
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="button-grad h-32"></div>
            <CardContent className="relative p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 -mt-16">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                    <AvatarImage
                      src={profileImageUrl || "/placeholder.svg"}
                      alt={`${data.name} profile`}
                    />
                    <AvatarFallback className="text-3xl font-bold button-grad text-white">
                      {data.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-white text-gray-600 hover:bg-gray-50 shadow-lg border"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1 text-center md:text-left mt-4 md:mt-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {data.name}
                      </h2>
                      <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          <span>Roll: {data.roll.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span>{data.branch}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{data.year} Year</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                          <UserCheck className="w-3 h-3 mr-1" />
                          {data.type}
                        </Badge>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          <School className="w-3 h-3 mr-1" />
                          VVIT Student
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <label className="text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.name}
                  </p>
                </div>

                {/* Branch */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <label className="text-sm font-medium text-gray-500">
                      Branch
                    </label>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.branch}
                  </p>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <label className="text-sm font-medium text-gray-500">
                      Email Address
                    </label>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.email}
                  </p>
                </div>

                {/* Mobile */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <label className="text-sm font-medium text-gray-500">
                      Mobile Number
                    </label>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.mobile_no}
                  </p>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <label className="text-sm font-medium text-gray-500">
                      Address
                    </label>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.address}
                  </p>
                </div>

                {/* Parent Mobile */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <label className="text-sm font-medium text-gray-500">
                      Parent Mobile
                    </label>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.parent_mobile_no}
                  </p>
                </div>

                {/* Student Type */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-gray-500" />
                    <label className="text-sm font-medium text-gray-500">
                      Student Type
                    </label>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.type}
                  </p>
                </div>

                {/* Academic Year */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <label className="text-sm font-medium text-gray-500">
                      Academic Year
                    </label>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.year}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-600" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <GraduationCap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-blue-600 font-medium">
                    Roll Number
                  </p>
                  <p className="text-xl font-bold text-blue-900">
                    {data.roll.toUpperCase()}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-purple-600 font-medium">
                    Department
                  </p>
                  <p className="text-xl font-bold text-purple-900">
                    {data.branch}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-green-600 font-medium">
                    Current Year
                  </p>
                  <p className="text-xl font-bold text-green-900">
                    {data.year}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-semibold text-gray-900">
                        {data.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Personal Mobile</p>
                      <p className="font-semibold text-gray-900">
                        {data.mobile_no}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Parent Mobile</p>
                      <p className="font-semibold text-gray-900">
                        {data.parent_mobile_no}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
