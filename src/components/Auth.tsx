import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  Upload, 
  CheckCircle2, 
  X,
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User, UserRole } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
  onClose: () => void;
}

export const Auth = ({ onLogin, onClose }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>('Client');
  const [step, setStep] = useState(1); // 1: Basic Info, 2: KYC (if applicable)
  const [isUploading, setIsUploading] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && (role === 'Agent' || role === 'Owner') && step === 1) {
      setStep(2);
      return;
    }
    
    // Mock login/register
    const mockUser: User = {
      id: 'user_1',
      name: 'Sarah Kamau',
      email: 'sarah@propertyhub.co.ke',
      role: role,
      isVerified: role === 'Client' || idUploaded,
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    };
    onLogin(mockUser);
  };

  const handleFileUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIdUploaded(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {isLogin ? 'Welcome Back' : step === 1 ? 'Create Account' : 'Complete KYC'}
            </h2>
            <p className="text-slate-500 mt-2">
              {isLogin 
                ? 'Sign in to manage your properties' 
                : step === 1 
                  ? 'Join the leading property hub in Kenya' 
                  : 'Verify your identity to start listing'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-5"
                >
                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Account Type</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'Client', label: 'Client', icon: Users },
                          { id: 'Agent', label: 'Agent', icon: UserIcon },
                          { id: 'Owner', label: 'Owner', icon: Building2 },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setRole(item.id as UserRole)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                              role === item.id 
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-600' 
                                : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                            }`}
                          >
                            <item.icon className="w-5 h-5 mb-1" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isLogin && (
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input 
                        type="text" 
                        required
                        placeholder="Full Name" 
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-emerald-600 transition-colors"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="email" 
                      required
                      placeholder="Email Address" 
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="password" 
                      required
                      placeholder="Password" 
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <p className="text-xs text-amber-800 leading-relaxed">
                      To list properties as an <strong>{role}</strong>, we need to verify your identity. This helps maintain a safe marketplace.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">National ID / Passport Number</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter ID number" 
                      className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Upload ID Copy (Front & Back)</label>
                    <div 
                      onClick={handleFileUpload}
                      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                        idUploaded 
                          ? 'border-emerald-600 bg-emerald-50' 
                          : 'border-slate-200 hover:border-emerald-600 bg-slate-50'
                      }`}
                    >
                      {isUploading ? (
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-2" />
                          <p className="text-sm text-slate-500 font-medium">Uploading...</p>
                        </div>
                      ) : idUploaded ? (
                        <div className="flex flex-col items-center">
                          <CheckCircle2 className="w-10 h-10 text-emerald-600 mb-2" />
                          <p className="text-sm text-emerald-700 font-bold">ID Uploaded Successfully</p>
                          <p className="text-xs text-emerald-600 mt-1">Click to change file</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="w-10 h-10 text-slate-300 mb-2" />
                          <p className="text-sm text-slate-500 font-medium">Click to upload ID copy</p>
                          <p className="text-xs text-slate-400 mt-1">PDF, JPG or PNG (Max 5MB)</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 group"
            >
              {isLogin ? 'Sign In' : step === 1 && (role === 'Agent' || role === 'Owner') ? 'Next: KYC' : 'Complete Registration'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setStep(1);
              }}
              className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
