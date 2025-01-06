"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { OrganizationMembershipResource } from "@clerk/types";

export default function StaffManagementDashboard() {
  const router = useRouter();
  const { organization } = useOrganization();
  const [searchTerm, setSearchTerm] = useState("");
  const [memberships, setMemberships] = useState<OrganizationMembershipResource[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inviteEmails, setInviteEmails] = useState("");
  const [inviteRole, setInviteRole] = useState("member");

  useEffect(() => {
    const fetchMemberships = async () => {
      if (organization) {
        const fetchedMemberships = await organization.getMemberships();
        setMemberships(fetchedMemberships.data);
      }
    };

    fetchMemberships();
  }, [organization]);

  const filteredMembers = memberships.filter((member) => {
    const userName = member.publicUserData?.firstName?.toLowerCase() || "";
    const identifier = member.publicUserData?.identifier?.toLowerCase() || "";
    return (
      userName.includes(searchTerm.toLowerCase()) ||
      identifier.includes(searchTerm.toLowerCase())
    );
  });

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/staffmembers/${id}`);
  };

  const handleInviteMembers = async () => {
    if (!organization) {
      alert("Organization is not properly initialized.");
      return;
    }

    const isValidEmail = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const emails = inviteEmails.split(/[\s,]+/).filter(isValidEmail);

    if (emails.length === 0) {
      alert("Please enter at least one valid email address.");
      return;
    }

    try {
      await organization.inviteMembers({
        emailAddresses: emails,
        role: inviteRole,
      });

      setInviteEmails("");
      setIsDialogOpen(false);
      alert("Invitations sent successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while sending invitations";

      console.error("Failed to send invitations:", error);
      alert(`Failed to send invitations: ${errorMessage}`);
    }
  };

  const handleRemoveMember = async (membershipId: string, memberRole: string) => {
    if (!organization) {
      alert("Organization is not properly initialized.");
      return;
    }

    if (memberRole === "admin") {
      alert("You cannot remove an admin.");
      return;
    }

    try {
      await organization.removeMember(membershipId);
      alert("Member removed successfully.");
      const updatedMemberships = memberships.filter(
        (member) => member.id !== membershipId
      );
      setMemberships(updatedMemberships);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while removing the member";

      console.error("Failed to remove member:", error);
      alert(`Failed to remove member: ${errorMessage}`);
    }
  };

  if (!organization) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">Staff Management</h1>
        <p className="text-gray-500">Loading organization data...</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 w-full max-w-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="w-full sm:w-auto">
              + Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Invite New Members</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="emails">Emails</Label>
                <Input
                  id="emails"
                  placeholder="Enter emails, separated by commas"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select
                  onValueChange={(value) => setInviteRole(value)}
                  defaultValue={inviteRole}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteMembers}>Send Invitations</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full">
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <Card key={member.id} className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  {member.publicUserData?.firstName || "N/A"}{" "}
                  {member.publicUserData?.lastName || ""}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 break-words">
                  {member.publicUserData?.identifier ?? "N/A"}
                </p>
                <p className="text-sm font-medium mt-2 capitalize">
                  Role: {member.role}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewDetails(member.publicUserData?.userId ?? "")}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemoveMember(member.id, member.role)}
                >
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-4">
            No members found.
          </div>
        )}
      </div>
    </div>
  );
}

