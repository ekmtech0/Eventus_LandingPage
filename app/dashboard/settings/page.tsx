import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Wallet, Globe } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-1">System Settings</h2>
          <p className="text-xs text-muted-foreground font-medium italic">Configure global platform parameters and security thresholds.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-border shadow-none overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-sm font-bold">General Configuration</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Platform Name</label>
              <input 
                type="text" 
                defaultValue="Eventus"
                className="w-full px-4 py-2 bg-muted/30 border border-border rounded-lg text-sm outline-none focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Support Email</label>
              <input 
                type="email" 
                defaultValue="support@eventus.com"
                className="w-full px-4 py-2 bg-muted/30 border border-border rounded-lg text-sm outline-none focus:bg-white transition-all"
              />
            </div>
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-4 bg-primary rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                 </div>
                 <span className="text-xs font-bold">Auto-approval Mode</span>
              </div>
              <button className="px-4 py-2 bg-foreground text-background text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border shadow-none overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-sm font-bold">Security & Auditing</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50/50 border border-red-100 rounded-lg">
              <div>
                <p className="text-xs font-bold text-red-800 uppercase tracking-tighter">Emergency Shutdown</p>
                <p className="text-[10px] text-red-600 font-medium">Instantly disable all event creation and ticket sales.</p>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white text-[11px] font-bold rounded-lg hover:bg-red-700 transition-colors">
                Triguer
              </button>
            </div>
            
            <div className="p-4 border border-border rounded-lg space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Recent Audit Logs</p>
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between text-[11px] font-medium py-1 border-b border-gray-50 last:border-0">
                    <span className="text-foreground">Admin Login: admin@eventus.com</span>
                    <span className="text-muted-foreground uppercase text-[9px] font-bold tracking-tight">2m ago</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
