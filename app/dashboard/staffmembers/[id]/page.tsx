"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { activities, staffMembers } from "../../../../data/dummy";

export default function StaffDetailsPage() {
  const router = useRouter();
  const params = useParams();

  // Find the staff member by ID
  const staffMember = staffMembers.find((member) => member.id === params.id);

  // If staff member not found
  if (!staffMember) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-red-600">Staff Member Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              We couldn&apos;t find the staff member you&apos;re looking for.
            </p>
          </CardContent>
          <Button onClick={() => router.push("/dashboard/staffmembers")} className="mt-4">
            Back to Staff
          </Button>
        </Card>
      </div>
    );
  }

  // Fetch activity logs for this staff member
  const activityLogs = activities.filter((log) => log.staffId === staffMember.id);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard/staffmembers")}
        className="mb-6"
      >
        &larr; Back to Staff
      </Button>

      {/* Staff Member Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{staffMember.fullName}</CardTitle>
          <p className="text-gray-500">{staffMember.email}</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Role and Status */}
          <div>
            <h3 className="text-lg font-medium">Role</h3>
            <p className="text-gray-600">{staffMember.role}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Status</h3>
            <Badge
              className={`text-white ${
                staffMember.status === "Active"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {staffMember.status}
            </Badge>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium">Phone</h3>
            <p className="text-gray-600">{staffMember.phone}</p>
          </div>

          {/* Assigned POS */}
          <div>
            <h3 className="text-lg font-medium">Assigned POS</h3>
            <p className="text-gray-600">{staffMember.posStation || "Not Assigned"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Logs */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Recent Activity Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {activityLogs.length === 0 ? (
            <p className="text-gray-500">No activity logs found.</p>
          ) : (
            <div className="space-y-4">
              {activityLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 border rounded-lg hover:shadow-sm"
                >
                  <p className="text-gray-600">{log.activity}</p>
                  <p className="text-sm text-gray-500">{log.timestamp}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}