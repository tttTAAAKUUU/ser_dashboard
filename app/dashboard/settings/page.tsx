"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("");
  const [storeSlug, setStoreSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);

      // Simulate saving settings — replace with real logic if needed
      console.log("Saving store settings:", { storeName, storeSlug });
      alert("Store details saved successfully.");
    } catch (error) {
      console.error("Failed to save store details:", error);
      alert("An error occurred while saving.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account and system preferences.</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store Name</Label>
            <Input
              id="store-name"
              placeholder="Enter your store name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="store-slug">Store Slug</Label>
            <Input
              id="store-slug"
              placeholder="Enter your store slug"
              value={storeSlug}
              onChange={(e) => setStoreSlug(e.target.value)}
            />
          </div>

          <Button
            onClick={handleSave}
            variant="default"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="marketing-emails">Marketing Emails</Label>
            <Switch id="marketing-emails" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="security-alerts">Security Alerts</Label>
            <Switch id="security-alerts" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* User Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>User Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="language">Language</Label>
            <select id="language" className="rounded-md border p-2">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Store Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Store Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-currency">Currency</Label>
            <select id="store-currency" className="rounded-md border p-2">
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="zar">ZAR</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-tax">Tax Rate (%)</Label>
            <Input id="store-tax" type="number" placeholder="Enter tax rate" defaultValue="15" />
          </div>
        </CardContent>
      </Card>

      {/* Billing Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-details">Card Details</Label>
            <Input id="card-details" placeholder="**** **** **** 1234" disabled />
          </div>
          <Button variant="secondary">Update Billing Info</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
            <Switch id="two-factor-auth" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="change-password">Change Password</Label>
            <Button variant="secondary">Change Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
