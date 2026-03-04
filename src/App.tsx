/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Filter, 
  Home, 
  Building2, 
  Landmark, 
  Briefcase,
  ChevronRight,
  Phone,
  X,
  Menu,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROPERTIES } from './data';
import { Property, PropertyType, ListingType, FilterState, User } from './types';
import { AgentDashboard } from './components/AgentDashboard';
import { Auth } from './components/Auth';

const formatKES = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(amount);
};

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
            <Home className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Propertyhub <span className="text-emerald-600">Kenya</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Buy</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Rent</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Sell</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Agents</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-medium text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
            Sign In
          </button>
          <button className="bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200">
            List Property
          </button>
          <button className="md:hidden p-2 text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const PropertyCard = ({ property, onClick }: { property: Property; onClick: () => void; key?: string }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    whileHover={{ y: -4 }}
    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
    onClick={onClick}
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img 
        src={property.images[0]} 
        alt={property.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 left-4 flex gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          property.listingType === 'Sale' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
        }`}>
          For {property.listingType}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-slate-900">
          {property.type}
        </span>
      </div>
      <button className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm text-slate-400 hover:text-rose-500 transition-colors">
        <Heart className="w-5 h-5" />
      </button>
    </div>
    
    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{property.title}</h3>
      </div>
      <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
        <MapPin className="w-4 h-4" />
        <span>{property.location}</span>
      </div>
      
      <div className="flex items-center gap-4 mb-4 text-slate-600">
        {property.bedrooms && (
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" />
            <span className="text-sm font-medium">{property.bedrooms}</span>
          </div>
        )}
        {property.bathrooms && (
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" />
            <span className="text-sm font-medium">{property.bathrooms}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Maximize className="w-4 h-4" />
          <span className="text-sm font-medium">{property.area}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
        <span className="text-xl font-bold text-emerald-600">
          {formatKES(property.price)}
          {property.listingType === 'Rent' && <span className="text-sm font-normal text-slate-500">/mo</span>}
        </span>
        <div className="flex items-center gap-2">
          <img src={property.agent.image} className="w-8 h-8 rounded-full border border-slate-200" alt={property.agent.name} />
        </div>
      </div>
    </div>
  </motion.div>
);

const PropertyModal = ({ property, onClose }: { property: Property; onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
  >
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
    <motion.div 
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
      >
        <X className="w-6 h-6 text-slate-900" />
      </button>
      
      <div className="overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="h-[300px] md:h-full">
            <img 
              src={property.images[0]} 
              className="w-full h-full object-cover" 
              alt={property.title}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                For {property.listingType}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                {property.type}
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{property.title}</h2>
            <div className="flex items-center gap-1.5 text-slate-500 mb-6">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{property.location}</span>
            </div>
            
            <div className="text-3xl font-bold text-emerald-600 mb-8">
              {formatKES(property.price)}
              {property.listingType === 'Rent' && <span className="text-lg font-normal text-slate-500">/mo</span>}
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-slate-50 rounded-2xl">
              {property.bedrooms && (
                <div className="text-center">
                  <div className="text-slate-400 mb-1 flex justify-center"><Bed className="w-5 h-5" /></div>
                  <div className="font-bold text-slate-900">{property.bedrooms} Beds</div>
                </div>
              )}
              {property.bathrooms && (
                <div className="text-center">
                  <div className="text-slate-400 mb-1 flex justify-center"><Bath className="w-5 h-5" /></div>
                  <div className="font-bold text-slate-900">{property.bathrooms} Baths</div>
                </div>
              )}
              <div className="text-center">
                <div className="text-slate-400 mb-1 flex justify-center"><Maximize className="w-5 h-5" /></div>
                <div className="font-bold text-slate-900">{property.area}</div>
              </div>
            </div>
            
            <div className="mb-8">
              <h4 className="font-bold text-slate-900 mb-3">Description</h4>
              <p className="text-slate-600 leading-relaxed">{property.description}</p>
            </div>
            
            <div className="mb-8">
              <h4 className="font-bold text-slate-900 mb-3">Key Features</h4>
              <div className="flex flex-wrap gap-2">
                {property.features.map(feature => (
                  <span key={feature} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
              <div className="flex items-center gap-3">
                <img src={property.agent.image} className="w-12 h-12 rounded-full" alt={property.agent.name} />
                <div>
                  <div className="font-bold text-slate-900">{property.agent.name}</div>
                  <div className="text-sm text-slate-500">Property Agent</div>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-colors">
                <Phone className="w-4 h-4" />
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default function App() {
  const [view, setView] = useState<'home' | 'dashboard'>('home');
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: 'All',
    listingType: 'All',
    minPrice: 0,
    maxPrice: 1000000000,
  });
  
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                           p.location.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.type === 'All' || p.type === filters.type;
      const matchesListing = filters.listingType === 'All' || p.listingType === filters.listingType;
      const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      
      return matchesSearch && matchesType && matchesListing && matchesPrice;
    });
  }, [filters]);

  if (view === 'dashboard') {
    return <AgentDashboard user={user} onBack={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <Home className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Propertyhub <span className="text-emerald-600">Kenya</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Buy</a>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Rent</a>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Sell</a>
              <button 
                onClick={() => setView('dashboard')}
                className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
              >
                Dashboard
              </button>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block text-right">
                    <div className="text-sm font-bold text-slate-900">{user.name}</div>
                    <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{user.role}</div>
                  </div>
                  <button 
                    onClick={() => setView(user.role === 'Agent' || user.role === 'Owner' ? 'dashboard' : 'home')}
                    className="w-10 h-10 rounded-full border-2 border-emerald-100 overflow-hidden hover:border-emerald-600 transition-all"
                  >
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </button>
                  <button 
                    onClick={() => setUser(null)}
                    className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setShowAuth(true)}
                    className="hidden sm:block text-sm font-medium text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => setShowAuth(true)}
                    className="bg-emerald-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200"
                  >
                    Join Now
                  </button>
                </>
              )}
              <button className="md:hidden p-2 text-slate-600">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 px-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50 rounded-l-[100px] -z-10" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl -z-10" />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold mb-6">
                  Real Estate in Kenya
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-[1.1]">
                  Find your perfect <br />
                  <span className="text-emerald-600">dream home</span> in Kenya.
                </h1>
                <p className="text-xl text-slate-600 mb-12 max-w-xl leading-relaxed">
                  The most trusted platform for buying, renting, and selling properties across Nairobi, Mombasa, and beyond.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-2 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-2"
              >
                <div className="flex-grow flex items-center px-4 gap-3">
                  <Search className="text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search location, property name..."
                    className="w-full py-4 text-slate-900 focus:outline-none placeholder:text-slate-400"
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                </div>
                <div className="h-px md:h-10 md:w-px bg-slate-100 self-center" />
                <div className="flex items-center px-4 gap-3 min-w-[160px]">
                  <select 
                    className="w-full py-4 bg-transparent text-slate-900 font-medium focus:outline-none appearance-none cursor-pointer"
                    value={filters.listingType}
                    onChange={(e) => setFilters(prev => ({ ...prev, listingType: e.target.value as ListingType | 'All' }))}
                  >
                    <option value="All">All Types</option>
                    <option value="Sale">For Sale</option>
                    <option value="Rent">For Rent</option>
                  </select>
                </div>
                <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Properties</h2>
                <p className="text-slate-500">Handpicked listings from our most trusted agents</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(['All', 'House', 'Apartment', 'Land', 'Commercial'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilters(prev => ({ ...prev, type }))}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      filters.type === type 
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    onClick={() => setSelectedProperty(property)}
                  />
                ))}
              </AnimatePresence>
            </div>
            
            {filteredProperties.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No properties found</h3>
                <p className="text-slate-500">Try adjusting your filters or search terms</p>
                <button 
                  onClick={() => setFilters({ search: '', type: 'All', listingType: 'All', minPrice: 0, maxPrice: 1000000000 })}
                  className="mt-6 text-emerald-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#10b981_0,transparent_50%)]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">1,200+</div>
                <div className="text-slate-400 font-medium">Properties Listed</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">850+</div>
                <div className="text-slate-400 font-medium">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">150+</div>
                <div className="text-slate-400 font-medium">Verified Agents</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">12+</div>
                <div className="text-slate-400 font-medium">Cities Covered</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto bg-emerald-600 rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-900/20 rounded-full -ml-32 -mb-32 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to list your property?</h2>
              <p className="text-emerald-50 text-lg mb-10 max-w-2xl mx-auto">
                Join thousands of property owners and agents who trust Propertyhub Kenya to reach millions of potential buyers and renters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-emerald-600 px-10 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-xl shadow-emerald-900/20">
                  Get Started Now
                </button>
                <button className="bg-emerald-700 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-800 transition-all border border-emerald-500/30">
                  Talk to an Expert
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Home className="text-white w-5 h-5" />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  Propertyhub <span className="text-emerald-600">Kenya</span>
                </span>
              </div>
              <p className="text-slate-500 mb-6 leading-relaxed">
                The leading real estate marketplace in Kenya. We connect buyers, sellers, and renters with the best properties.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Search Properties</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">List Your Property</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Our Agents</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Market Trends</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Support</h4>
              <ul className="space-y-4 text-slate-500">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Newsletter</h4>
              <p className="text-slate-500 mb-4">Get the latest property updates directly in your inbox.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2 w-full focus:outline-none focus:border-emerald-600"
                />
                <button className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 Propertyhub Kenya. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">Facebook</a>
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">Instagram</a>
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProperty && (
          <PropertyModal 
            property={selectedProperty} 
            onClose={() => setSelectedProperty(null)} 
          />
        )}
        {showAuth && (
          <Auth 
            onLogin={(u) => {
              setUser(u);
              setShowAuth(false);
            }} 
            onClose={() => setShowAuth(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
