"use client";
import React, { useState, useEffect } from 'react';
import { Search, MapPin, CheckCircle2, Package, Clock, TrendingUp } from 'lucide-react';
import Container from "../../../Components/Shared/Container/Container.jsx";
import Image from 'next/image';

const CoveragePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // all, northwest, southwest, etc.

  // Major Cities and States in Nigeria
  const districts = [
    // North West
    { name: 'Kano', division: 'North West', position: 'top-[20%] left-[45%]', deliveryTime: '24h', coverage: '100%' },
    { name: 'Kaduna', division: 'North West', position: 'top-[30%] left-[40%]', deliveryTime: '24h', coverage: '100%' },
    { name: 'Sokoto', division: 'North West', position: 'top-[10%] left-[15%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Katsina', division: 'North West', position: 'top-[15%] left-[35%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Kebbi', division: 'North West', position: 'top-[18%] left-[10%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Zamfara', division: 'North West', position: 'top-[22%] left-[20%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Jigawa', division: 'North West', position: 'top-[18%] left-[50%]', deliveryTime: '48-72h', coverage: '95%' },

    // North Central
    { name: 'Abuja (FCT)', division: 'North Central', position: 'top-[45%] left-[45%]', deliveryTime: '24h', coverage: '100%' },
    { name: 'Niger', division: 'North Central', position: 'top-[40%] left-[30%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Kwara', division: 'North Central', position: 'center left-[20%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Kogi', division: 'North Central', position: 'bottom-[45%] left-[40%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Plateau', division: 'North Central', position: 'top-[42%] right-[40%]', deliveryTime: '24-48h', coverage: '95%' },
    { name: 'Benue', division: 'North Central', position: 'bottom-[40%] right-[35%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Nasarawa', division: 'North Central', position: 'top-[48%] left-[50%]', deliveryTime: '24-48h', coverage: '95%' },

    // South West
    { name: 'Lagos', division: 'South West', position: 'bottom-[20%] left-[15%]', deliveryTime: '24h', coverage: '100%' },
    { name: 'Ibadan (Oyo)', division: 'South West', position: 'bottom-[25%] left-[18%]', deliveryTime: '24h', coverage: '100%' },
    { name: 'Ogun', division: 'South West', position: 'bottom-[22%] left-[12%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Osun', division: 'South West', position: 'bottom-[30%] left-[22%]', deliveryTime: '24-48h', coverage: '95%' },
    { name: 'Ondo', division: 'South West', position: 'bottom-[32%] left-[28%]', deliveryTime: '24-48h', coverage: '95%' },
    { name: 'Ekiti', division: 'South West', position: 'bottom-[35%] left-[25%]', deliveryTime: '48-72h', coverage: '95%' },

    // South South
    { name: 'Port Harcourt (Rivers)', division: 'South South', position: 'bottom-[15%] left-[45%]', deliveryTime: '24h', coverage: '100%' },
    { name: 'Delta', division: 'South South', position: 'bottom-[22%] left-[35%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Edo', division: 'South South', position: 'bottom-[28%] left-[32%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Cross River', division: 'South South', position: 'bottom-[20%] right-[30%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Akwa Ibom', division: 'South South', position: 'bottom-[12%] right-[35%]', deliveryTime: '24-48h', coverage: '95%' },
    { name: 'Bayelsa', division: 'South South', position: 'bottom-[10%] left-[38%]', deliveryTime: '48-72h', coverage: '90%' },

    // South East
    { name: 'Enugu', division: 'South East', position: 'bottom-[30%] right-[35%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Anambra', division: 'South East', position: 'bottom-[28%] left-[45%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Imo', division: 'South East', position: 'bottom-[20%] left-[48%]', deliveryTime: '24-48h', coverage: '95%' },
    { name: 'Abia', division: 'South East', position: 'bottom-[18%] left-[52%]', deliveryTime: '24-48h', coverage: '95%' },
    { name: 'Ebonyi', division: 'South East', position: 'bottom-[28%] right-[38%]', deliveryTime: '48-72h', coverage: '90%' },

    // North East
    { name: 'Maiduguri (Borno)', division: 'North East', position: 'top-[15%] right-[10%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Adamawa', division: 'North East', position: 'center right-[10%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Bauchi', division: 'North East', position: 'top-[30%] right-[30%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Gombe', division: 'North East', position: 'top-[35%] right-[20%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Taraba', division: 'North East', position: 'center right-[20%]', deliveryTime: '48-72h', coverage: '90%' },
    { name: 'Yobe', division: 'North East', position: 'top-[12%] right-[25%]', deliveryTime: '48-72h', coverage: '90%' },
  ];

  const filteredDistricts = districts.filter(district =>
    (activeTab === 'all' || district.division.toLowerCase() === activeTab) &&
    district.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { icon: <MapPin className="w-6 h-6" />, label: 'States Covered', value: '36+1', color: 'from-red-500 to-rose-600' },
    { icon: <Package className="w-6 h-6" />, label: 'Daily Deliveries', value: '5000+', color: 'from-blue-500 to-cyan-600' },
    { icon: <Clock className="w-6 h-6" />, label: 'Avg Delivery', value: '24-48h', color: 'from-purple-500 to-pink-600' },
    { icon: <TrendingUp className="w-6 h-6" />, label: 'Success Rate', value: '99.5%', color: 'from-green-500 to-emerald-600' },
  ];

  const divisions = ['all', 'North West', 'North Central', 'South West', 'South South', 'South East', 'North East'];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-gray-50 min-h-screen pt-24 pb-16">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Nationwide{' '}
            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 bg-clip-text text-transparent">
              Coverage
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering to every corner of Nigeria with speed and reliability
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mb-3`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search district or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Division Tabs */}
          <div className="flex flex-wrap gap-2 mt-4">
            {divisions.map((division) => (
              <button
                key={division}
                onClick={() => setActiveTab(division)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === division
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {division === 'all' ? 'All' : division}
              </button>
            ))}
          </div>

          {selectedDistrict && (
            <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border-l-4 border-red-600">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedDistrict.name}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedDistrict.division} Division • {selectedDistrict.deliveryTime} delivery • {selectedDistrict.coverage} coverage
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDistrict(null)}
                  className="text-red-600 hover:text-red-700 font-semibold"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Map Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="relative w-full aspect-square max-w-3xl mx-auto">
                {/* Bangladesh Map Image */}
                <Image
                  src="/kano_map.png"
                  alt="Kano State Coverage Map"
                  width={800}
                  height={800}
                  className="w-full h-full object-contain"
                  priority
                />

                {/* Interactive District Markers */}
                {filteredDistricts.map((district, index) => (
                  <div
                    key={index}
                    className={`absolute ${district.position} transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10`}
                    onClick={() => setSelectedDistrict(district)}
                  >
                    {/* Pulse Animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-4 h-4 rounded-full animate-ping opacity-75 ${selectedDistrict?.name === district.name ? 'bg-red-600' : 'bg-blue-500'
                        }`}></div>
                    </div>

                    {/* Static Pin */}
                    <div className={`relative w-4 h-4 rounded-full border-2 border-white shadow-lg ${selectedDistrict?.name === district.name ? 'bg-red-600 w-6 h-6' : 'bg-blue-600'
                      }`}></div>

                    {/* Hover Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-gray-900 text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
                        {district.name}
                        <div className="text-gray-300 text-xs">{district.deliveryTime}</div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 100% Coverage Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2 rounded-full shadow-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-bold text-sm">100% Coverage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* District List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 max-h-[600px] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                Districts ({filteredDistricts.length})
              </h3>
              <div className="space-y-2">
                {filteredDistricts.map((district, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDistrict(district)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${selectedDistrict?.name === district.name
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                      : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                  >
                    <div className="font-semibold">{district.name}</div>
                    <div className={`text-sm ${selectedDistrict?.name === district.name ? 'text-red-100' : 'text-gray-600'}`}>
                      {district.division} • {district.deliveryTime}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl p-8 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-3">Ready to Start Delivering?</h2>
          <p className="text-red-100 mb-6">Join thousands of merchants using our nationwide network</p>
          <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
        </div>
      </Container>
    </div>
  );
};

export default CoveragePage;
