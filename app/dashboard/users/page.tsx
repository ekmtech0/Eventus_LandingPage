'use client';

import React, { useState } from 'react';
import { 
  Users as UsersIcon, 
  Search, 
  MoreVertical, 
  ShieldCheck, 
  Ban, 
  Mail, 
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX
} from 'lucide-react';
import { User } from '../../../types/DashBoardTypes';
import { motion, AnimatePresence } from 'motion/react';

const mockUsers: User[] = [
  { id: '1', name: 'Edvaldo João', email: 'edvaldo@eventus.com', role: 'SuperAdmin', status: 'Active', createdAt: '2023-01-01T10:00:00Z', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Maria Silva', email: 'maria@gmail.com', role: 'Admin', status: 'Active', createdAt: '2023-05-15T14:30:00Z', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Zélia André', email: 'zelia@outlook.com', role: 'Admin', status: 'Suspended', createdAt: '2023-11-20T09:00:00Z', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Carlos Pedro', email: 'cp@bol.com.br', role: 'Admin', status: 'Active', createdAt: '2024-02-10T12:00:00Z', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'João Miguel', email: 'joao@proton.me', role: 'Admin', status: 'Blocked', createdAt: '2024-04-05T16:00:00Z', avatar: 'https://i.pravatar.cc/150?u=5' },
];

export default function Users() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-1">User Controls</h2>
          <p className="text-xs text-muted-foreground font-medium italic">Manage administrative roles and system permissions.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-none overflow-hidden">
        <div className="p-4 border-b border-border bg-gray-50/30">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search user profiles..." 
              className="w-full pl-10 pr-4 py-1.5 bg-white border border-border rounded-lg text-xs outline-none focus:border-primary transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="px-6 py-3">User Profile</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Join Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground overflow-hidden">
                        {user.avatar ? <img src={user.avatar} className="object-cover w-full h-full" /> : user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{user.name}</p>
                        <p className="text-[11px] text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      user.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary text-[12px] font-semibold hover:underline">Edit Role</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
