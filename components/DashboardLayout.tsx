import React, { useState } from 'react';
import { LogOut, Bell, Search, Menu, ChevronDown, ChevronRight, User as UserIcon } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';
import { DashboardHome } from './DashboardHome';
import { GenericPage } from './GenericPage';
import { ProductArchivesPage } from './ProductArchivesPage';
import { ProductCategoriesPage } from './ProductCategoriesPage';
import { OrderQueryPage } from './OrderQueryPage';
import { RefundRecordsPage } from './RefundRecordsPage';

interface DashboardLayoutProps {
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onLogout }) => {
  const [activeMenuId, setActiveMenuId] = useState<string>('home');
  const [activeTitle, setActiveTitle] = useState<string>('首页概览');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['system', 'homepage', 'product', 'order']);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleExpand = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.children) {
      toggleExpand(item.id);
    } else {
      setActiveMenuId(item.id);
      setActiveTitle(item.title);
      // On mobile, close sidebar after selection
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    }
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isExpanded = expandedMenus.includes(item.id);
    const isActive = activeMenuId === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const Icon = item.icon;

    return (
      <div key={item.id} className="mb-1">
        <button
          onClick={() => handleMenuClick(item)}
          className={`
            w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
            ${isActive 
              ? 'bg-blue-50 text-blue-600 shadow-sm' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }
            ${level > 0 ? 'pl-11' : ''}
          `}
        >
          <div className="flex items-center">
            {Icon && <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />}
            <span>{item.title}</span>
          </div>
          {hasChildren && (
            <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          )}
        </button>
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1 animate-slide-down origin-top">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3 shadow-blue-200 shadow-md">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
            云商智汇
          </h1>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-64px)] p-4">
          <div className="space-y-1">
            {MENU_ITEMS.map(item => renderMenuItem(item))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 z-40 sticky top-0">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex relative ml-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="全局搜索功能..." 
                className="pl-10 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            
            <div className="flex items-center space-x-3 cursor-pointer group relative">
               <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-white shadow-sm">
                 <UserIcon className="w-5 h-5" />
               </div>
               <div className="hidden md:block text-left">
                 <p className="text-sm font-semibold text-slate-700">Admin User</p>
                 <p className="text-xs text-slate-500">超级管理员</p>
               </div>
               <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
               
               {/* Dropdown would go here, simplified to just Logout for demo */}
               <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-1 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all transform origin-top-right z-50">
                  <button 
                    onClick={onLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    退出登录
                  </button>
               </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="w-full h-full">
            {activeMenuId === 'home' ? (
              <DashboardHome />
            ) : activeMenuId === 'prod-arch' ? (
              <ProductArchivesPage />
            ) : activeMenuId === 'prod-cat' ? (
              <ProductCategoriesPage />
            ) : activeMenuId === 'ord-query' ? (
              <OrderQueryPage />
            ) : activeMenuId === 'ord-refund' ? (
              <RefundRecordsPage />
            ) : (
              <GenericPage title={activeTitle} />
            )}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};
