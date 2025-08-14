"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { RequestCard } from "@/components/RequestCard";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceSort, setPriceSort] = useState("lowToHigh");
  const [distanceFilter, setDistanceFilter] = useState("all");

  // Mocked request data
  const requests = [
    {
      id: "1",
      name: "Taku Tembedza",
      title: "Box Braids",
      date: "11 Nov 2025",
      time: "12:00pm",
      description: "Standard box braids with hairpiece",
      price: 800,
      rating: 5,
      address: "1 Dove Street",
      area: "Bryanston",
      distance: 12,
    },
    {
      id: "2",
      name: "Ayesha Patel",
      title: "Cornrows",
      date: "15 Nov 2025",
      time: "10:00am",
      description: "Tight neat cornrows",
      price: 400,
      rating: 4,
      address: "22 Maple Ave",
      area: "Sandton",
      distance: 8,
    },
    {
      id: "3",
      name: "Lebo Mokoena",
      title: "Knotless Braids",
      date: "18 Nov 2025",
      time: "1:30pm",
      description: "Mid-back length knotless braids",
      price: 1000,
      rating: 5,
      address: "5 Zinnia Rd",
      area: "Randburg",
      distance: 18,
    },
    {
      id: "4",
      name: "Zinhle Dlamini",
      title: "Dreadlocks Retwist",
      date: "20 Nov 2025",
      time: "9:00am",
      description: "Palm roll & retwist full head",
      price: 600,
      rating: 4,
      address: "99 Orange Grove",
      area: "Rosebank",
      distance: 25,
    },
    {
      id: "5",
      name: "Musa Khumalo",
      title: "Fade & Beard Trim",
      date: "21 Nov 2025",
      time: "3:00pm",
      description: "Clean fade and detailed beard line-up",
      price: 350,
      rating: 5,
      address: "31 Hilltop Street",
      area: "Fourways",
      distance: 30,
    },
  ];

  const filteredRequests = requests
    .filter((request) => {
      const matchesSearch =
        searchTerm === "" ||
        request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.title.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDistance =
        distanceFilter === "all" || request.distance <= parseInt(distanceFilter);

      return matchesSearch && matchesDistance;
    })
    .sort((a, b) => {
      if (priceSort === "lowToHigh") return a.price - b.price;
      if (priceSort === "highToLow") return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
        {/* Search Input */}
        <div className="space-y-2">
          <label htmlFor="search" className="text-sm font-medium text-gray-300">
            Search Requests
          </label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-600 text-gray-200 bg-gray-800 px-4 text-sm shadow-sm"
          />
        </div>

        {/* Price Sort */}
        <div className="space-y-2">
          <label htmlFor="priceSort" className="text-sm font-medium text-gray-300">
            Sort by Price
          </label>
          <Select value={priceSort} onValueChange={setPriceSort}>
            <SelectTrigger id="priceSort" className="h-10 w-full rounded-lg border border-gray-600 text-gray-200 bg-gray-800 px-4 text-sm shadow-sm">
              <SelectValue placeholder="Select price order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lowToHigh">Low to High</SelectItem>
              <SelectItem value="highToLow">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Distance Filter */}
        <div className="space-y-2">
          <label htmlFor="distance" className="text-sm font-medium text-gray-300">
            Distance (max 30 km)
          </label>
          <Select value={distanceFilter} onValueChange={setDistanceFilter}>
            <SelectTrigger id="distance" className="h-10 w-full rounded-lg border border-gray-600 text-gray-200 bg-gray-800 px-4 text-sm shadow-sm">
              <SelectValue placeholder="Select distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="10">Within 10 km</SelectItem>
              <SelectItem value="20">Within 20 km</SelectItem>
              <SelectItem value="30">Within 30 km</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map((request) => (
          <RequestCard
            key={request.id}
            name={request.name}
            title={request.title}
            date={request.date}
            time={request.time}
            description={request.description}
            price={request.price}
            stars={request.rating}
            address={request.address}
            area={request.area}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
