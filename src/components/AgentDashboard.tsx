import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Plus, 
  Home, 
  MessageSquare, 
  Settings, 
  LogOut, 
  TrendingUp, 
  Users, 
  Eye,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  MapPin,
  Camera,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROPERTIES, INQUIRIES } from '../data';
import { Property, PropertyType, ListingType, User } from '../types';

const formatKES = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const AgentDashboard = ({ user, onBack }: { user: User | null; onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'inquiries'>('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Filter state for listings
  const [listingFilters, setListingFilters] = useState({
    minBeds: '',
    maxBeds: '',
    minBaths: '',
    maxBaths: '',
  });
  
  // Mock agent data with filtering
  const agentProperties = PROPERTIES.filter(p => {
    // In a real app, we'd filter by user.id
    const isAgent = p.agent.name === (user?.name || 'Sarah Kamau');
    if (!isAgent) return false;

    const minBeds = listingFilters.minBeds ? parseInt(listingFilters.minBeds) : 0;
    const maxBeds = listingFilters.maxBeds ? parseInt(listingFilters.maxBeds) : Infinity;
    const minBaths = listingFilters.minBaths ? parseInt(listingFilters.minBaths) : 0;
    const maxBaths = listingFilters.maxBaths ? parseInt(listingFilters.maxBaths) : Infinity;

    const pBeds = p.bedrooms || 0;
    const pBaths = p.bathrooms || 0;

    return pBeds >= minBeds && pBeds <= maxBeds && pBaths >= minBaths && pBaths <= maxBaths;
  });
  
  const stats = [
    { label: 'Total Listings', value: agentProperties.length, icon: Home, color: 'bg-blue-500' },
    { label: 'Total Views', value: '12.4k', icon: Eye, color: 'bg-emerald-500' },
    { label: 'Inquiries', value: INQUIRIES.length, icon: MessageSquare, color: 'bg-amber-500' },
    { label: 'Conversion', value: '3.2%', icon: TrendingUp, color: 'bg-rose-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2" onClick={onBack} role="button">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Home className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Propertyhub
            </span>
          </div>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'overview' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('listings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'listings' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Home className="w-5 h-5" />
            My Listings
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'inquiries' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Inquiries
            <span className="ml-auto bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">2</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all">
            <Users className="w-5 h-5" />
            Clients
          </button>
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all">
            <Settings className="w-5 h-5" />
            Settings
          </button>
          <button 
            onClick={onBack}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-8 lg:p-12 overflow-y-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'listings' && 'My Listings'}
              {activeTab === 'inquiries' && 'Recent Inquiries'}
            </h1>
            <p className="text-slate-500">Welcome back, {user?.name || 'Sarah Kamau'}</p>
          </div>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Property
          </button>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <stat.icon className="text-white w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900">Recent Listings</h3>
                  <button onClick={() => setActiveTab('listings')} className="text-sm font-bold text-emerald-600 hover:underline">View All</button>
                </div>
                <div className="divide-y divide-slate-100">
                  {agentProperties.slice(0, 3).map((p) => (
                    <div key={p.id} className="p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                      <img src={p.images[0]} className="w-16 h-16 rounded-xl object-cover" alt={p.title} />
                      <div className="flex-grow">
                        <h4 className="font-bold text-slate-900 line-clamp-1">{p.title}</h4>
                        <div className="text-sm text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {p.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-600">{formatKES(p.price)}</div>
                        <div className="text-xs text-slate-400">Active</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900">Recent Inquiries</h3>
                </div>
                <div className="p-6 space-y-6">
                  {INQUIRIES.map((inquiry) => (
                    <div key={inquiry.id} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{inquiry.userName}</div>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-2">{inquiry.message}</p>
                        <div className="text-[10px] text-slate-400 font-medium">{inquiry.date}</div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setActiveTab('inquiries')} className="w-full py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    View All Inquiries
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bedrooms (Min - Max)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
                    value={listingFilters.minBeds}
                    onChange={(e) => setListingFilters(prev => ({ ...prev, minBeds: e.target.value }))}
                  />
                  <span className="text-slate-300">-</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
                    value={listingFilters.maxBeds}
                    onChange={(e) => setListingFilters(prev => ({ ...prev, maxBeds: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bathrooms (Min - Max)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
                    value={listingFilters.minBaths}
                    onChange={(e) => setListingFilters(prev => ({ ...prev, minBaths: e.target.value }))}
                  />
                  <span className="text-slate-300">-</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
                    value={listingFilters.maxBaths}
                    onChange={(e) => setListingFilters(prev => ({ ...prev, maxBaths: e.target.value }))}
                  />
                </div>
              </div>
              <div className="lg:col-span-2 flex items-end">
                <button 
                  onClick={() => setListingFilters({ minBeds: '', maxBeds: '', minBaths: '', maxBaths: '' })}
                  className="text-sm font-bold text-slate-400 hover:text-rose-500 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Property</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {agentProperties.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} className="w-12 h-12 rounded-lg object-cover" alt="" />
                          <div>
                            <div className="font-bold text-slate-900 text-sm line-clamp-1">{p.title}</div>
                            <div className="text-xs text-slate-500">{p.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                          {p.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 text-sm">{formatKES(p.price)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

        {activeTab === 'inquiries' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INQUIRIES.map((inquiry) => (
              <div key={inquiry.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                      <Users className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{inquiry.userName}</h4>
                      <p className="text-xs text-slate-500">{inquiry.userEmail}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    inquiry.status === 'New' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {inquiry.status}
                  </span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl mb-4">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Property</div>
                  <div className="text-sm font-bold text-slate-900 line-clamp-1">{inquiry.propertyName}</div>
                </div>
                <p className="text-sm text-slate-600 mb-6 italic">"{inquiry.message}"</p>
                <div className="flex gap-2">
                  <button className="flex-grow bg-emerald-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all">
                    Reply via Email
                  </button>
                  <button className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Property Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Add New Property</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Property Title</label>
                    <input type="text" placeholder="e.g. Modern Villa" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Location</label>
                    <input type="text" placeholder="e.g. Westlands, Nairobi" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Price (KES)</label>
                    <input type="number" placeholder="0" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Property Type</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 appearance-none bg-white">
                      <option>House</option>
                      <option>Apartment</option>
                      <option>Land</option>
                      <option>Commercial</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Description</label>
                  <textarea rows={4} placeholder="Describe the property..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 resize-none" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Property Images</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-emerald-600 transition-colors cursor-pointer group">
                    <Camera className="w-8 h-8 text-slate-300 group-hover:text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Click to upload or drag and drop images</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-100 flex gap-4">
                <button onClick={() => setShowAddModal(false)} className="flex-grow py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  Cancel
                </button>
                <button className="flex-grow py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                  Publish Listing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
