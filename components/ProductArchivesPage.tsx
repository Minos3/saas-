import React, { useState } from 'react';
import { 
  Search, Filter, Plus, MoreHorizontal, Edit, Eye, 
  Archive, DollarSign, MessageSquare, Settings, 
  ChevronDown, ChevronUp, Calendar, RefreshCw, X,
  Upload, Download, FileText, Tag, FolderTree, Globe, Database, CheckSquare, Square
} from 'lucide-react';
import { ProductEditModal } from './ProductEditModal';

// Mock Data Generator
const MOCK_PRODUCTS = Array.from({ length: 20 }).map((_, i) => ({
  id: 10001 + i,
  supplier: `云商供应链 ${String.fromCharCode(65 + (i % 5))}`,
  sku: `SP${2023000 + i}`,
  name: i % 3 === 0 ? `高级定制商务休闲西装外套 ${i+1}号` : `智能家用多功能空气炸锅 Pro版 ${i+1}`,
  cost: (100 + i * 15.5).toFixed(2),
  rrp: (299 + i * 30).toFixed(2),
  original: (399 + i * 30).toFixed(2),
  jdPrice: (280 + i * 28).toFixed(2),
  jdTime: '2023-10-25 14:30',
  pcCost: (90 + i * 12).toFixed(2),
  image: `https://picsum.photos/seed/${i + 500}/100/100`,
  status: i % 6 === 0 ? 0 : 1, // 0: 下架, 1: 上架
  xfhShow: i % 2 === 0,
  actualSales: 120 + i * 15,
  virtualSales: 500 + i * 50,
  l1: i % 2 === 0 ? '数码家电' : '服装服饰',
  l2: i % 2 === 0 ? '厨房电器' : '男装',
  l3: i % 2 === 0 ? '空气炸锅' : '西装',
  tags: i % 3 === 0 ? ['热销', '新品'] : ['推荐'],
  isEvent: i % 4 === 0,
  recommend: i % 5 === 0,
  manageTags: ['自营'],
  created: '2023-10-01 12:00:00',
  level: i % 5 === 0 ? 'S' : 'A'
}));

export const ProductArchivesPage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeActionId, setActiveActionId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleActionMenu = (id: number) => {
    if (activeActionId === id) {
      setActiveActionId(null);
    } else {
      setActiveActionId(id);
    }
  };

  const handleCreate = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: any) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleClickOutside = () => setActiveActionId(null);

  // Selection Logic
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(MOCK_PRODUCTS.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isAllSelected = MOCK_PRODUCTS.length > 0 && selectedIds.length === MOCK_PRODUCTS.length;
  const hasSelection = selectedIds.length > 0;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-[calc(100vh-140px)] w-full" onClick={() => activeActionId && handleClickOutside()}>
        {/* Filter Section */}
        <div className="p-5 border-b border-slate-100 bg-white rounded-t-xl flex-shrink-0 transition-all duration-300">
          {/* Primary Toolbar */}
          <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full xl:w-auto">
              {/* Main Search */}
              <div className="relative group min-w-[280px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="名称 / ID / 货号 / 条码" 
                  className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full transition-all bg-slate-50 focus:bg-white"
                />
              </div>
              
              {/* Supplier Select */}
              <div className="relative min-w-[160px]">
                 <select className="appearance-none pl-4 pr-10 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white w-full text-slate-600 cursor-pointer hover:border-slate-300 transition-colors">
                   <option value="">所有供应商</option>
                   <option value="A">云商供应链 A</option>
                   <option value="B">云商供应链 B</option>
                 </select>
                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Status Select */}
              <div className="relative min-w-[120px]">
                 <select className="appearance-none pl-4 pr-10 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white w-full text-slate-600 cursor-pointer hover:border-slate-300 transition-colors">
                   <option value="">状态: 全部</option>
                   <option value="1">上架</option>
                   <option value="0">下架</option>
                 </select>
                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full xl:w-auto justify-between xl:justify-end">
               <div className="flex items-center gap-2">
                 <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm shadow-blue-200">
                    <Search className="w-4 h-4 mr-1.5" />
                    查询
                 </button>
                 <button className="flex items-center justify-center px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors">
                    <RefreshCw className="w-4 h-4 mr-1.5" />
                    重置
                 </button>
                 <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`flex items-center justify-center px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${isExpanded ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                 >
                    <Filter className="w-4 h-4 mr-1.5" />
                    {isExpanded ? '收起' : '筛选'}
                    {isExpanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                 </button>
               </div>
               
               <div className="h-6 w-px bg-slate-200 mx-1 hidden xl:block"></div>

               <button 
                 onClick={handleCreate}
                 className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm shadow-emerald-200 whitespace-nowrap"
               >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">发布商品</span>
                <span className="sm:hidden">发布</span>
              </button>
            </div>
          </div>

          {/* Expanded Filters Grid */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-slate-100 animate-in slide-in-from-top-2 fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                 {/* Product Category */}
                 <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">商品类别</label>
                    <div className="relative">
                      <select className="w-full appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">所有分类</option>
                        <option value="1">数码家电</option>
                        <option value="2">服装服饰</option>
                        <option value="3">食品生鲜</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    </div>
                 </div>

                 {/* Category Level */}
                 <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">品类等级</label>
                    <div className="relative">
                      <select className="w-full appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">全部等级</option>
                        <option value="SS">SS 级</option>
                        <option value="S">S 级</option>
                        <option value="A">A 级</option>
                        <option value="B">B 级</option>
                        <option value="C">C 级</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    </div>
                 </div>

                 {/* Origin */}
                 <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">产地</label>
                    <input type="text" placeholder="输入产地" className="w-full pl-3 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 </div>

                 {/* Multi-SKU */}
                 <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">商品多货号</label>
                    <input type="text" placeholder="逗号分隔多个货号" className="w-full pl-3 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                 </div>

                 {/* Display Tags */}
                 <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">商品展示标签</label>
                    <div className="relative">
                      <select className="w-full appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">请选择</option>
                        <option value="new">新品</option>
                        <option value="hot">热销</option>
                        <option value="rec">推荐</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    </div>
                 </div>

                 {/* Attribute Tags */}
                 <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">商品属性标签</label>
                    <div className="relative">
                      <select className="w-full appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">请选择</option>
                        <option value="import">进口</option>
                        <option value="local">国产</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    </div>
                 </div>

                 {/* Creation Time Range */}
                 <div className="space-y-1 lg:col-span-2">
                    <label className="text-xs font-medium text-slate-500">创建时间</label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                        <input type="date" className="w-full pl-9 pr-2 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <span className="text-slate-400">-</span>
                      <div className="relative flex-1">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                        <input type="date" className="w-full pl-9 pr-2 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                 </div>

                 {/* JD Price Time Range */}
                 <div className="space-y-1 lg:col-span-2">
                    <label className="text-xs font-medium text-slate-500">京东调价时间</label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                        <input type="date" className="w-full pl-9 pr-2 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <span className="text-slate-400">-</span>
                      <div className="relative flex-1">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                        <input type="date" className="w-full pl-9 pr-2 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                 </div>

                 {/* Display Checkboxes */}
                 <div className="lg:col-span-2 flex items-center space-x-6 pt-6">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
                      <span className="text-sm text-slate-600 group-hover:text-blue-600">小程序显示</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
                      <span className="text-sm text-slate-600 group-hover:text-blue-600">PC显示</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
                      <span className="text-sm text-slate-600 group-hover:text-blue-600">成本价 > 售价</span>
                    </label>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Toolbar */}
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center gap-2 animate-in fade-in duration-300">
           {/* Batch Operations */}
           <button 
             disabled={!hasSelection}
             className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm
               ${hasSelection ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'}`}
           >
              <Archive className={`w-3.5 h-3.5 mr-1.5 ${hasSelection ? 'text-blue-100' : 'text-slate-400'}`} />
              批量上架
           </button>
           <button 
             disabled={!hasSelection}
             className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm mr-2
               ${hasSelection ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'}`}
           >
              <Archive className={`w-3.5 h-3.5 mr-1.5 ${hasSelection ? 'text-blue-100' : 'text-slate-400'}`} />
              批量下架
           </button>

           <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block"></div>

           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Upload className="w-3.5 h-3.5 mr-1.5 text-blue-100" />
              导入商品&主图
           </button>
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Upload className="w-3.5 h-3.5 mr-1.5 text-blue-100" />
              导入售价状态虚拟销量
           </button>
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-blue-100" />
              更新批发价
           </button>
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <FolderTree className="w-3.5 h-3.5 mr-1.5 text-blue-100" />
              修改分类
           </button>
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Tag className="w-3.5 h-3.5 mr-1.5 text-blue-100" />
              更新扶贫标签
           </button>
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Upload className="w-3.5 h-3.5 mr-1.5 text-blue-100" />
              属性标签导入
           </button>
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Globe className="w-3.5 h-3.5 mr-1.5 text-blue-100" />
              产地档案导入
           </button>
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Upload className="w-3.5 h-3.5 mr-1.5 text-blue-100" />
              商品税率导入
           </button>
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Upload className="w-3.5 h-3.5 mr-1.5 text-blue-100" />
              曦和商品导入
           </button>
           
           <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block"></div>

           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Database className="w-3.5 h-3.5 mr-1.5 text-blue-100" />
              同步ERP
           </button>
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Download className="w-3.5 h-3.5 mr-1.5 text-blue-100" />
              导出
           </button>
           
           <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block"></div>

           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-blue-100" />
              商品信息更新
           </button>
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Edit className="w-3.5 h-3.5 mr-1.5 text-blue-100" />
              批量改价
           </button>
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Upload className="w-3.5 h-3.5 mr-1.5 text-blue-100" />
              导入结算税率
           </button>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto relative scroll-smooth">
          <table className="min-w-max w-full text-left border-collapse text-sm">
            <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm font-medium text-slate-500">
              <tr>
                <th className="p-4 border-b border-slate-200 w-12 text-center bg-slate-50">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-4 border-b border-slate-200 whitespace-nowrap min-w-[100px]">商品ID</th>
                <th className="p-4 border-b border-slate-200 whitespace-nowrap min-w-[240px]">商品信息</th>
                <th className="p-4 border-b border-slate-200 whitespace-nowrap min-w-[120px]">供应商</th>
                <th className="p-4 border-b border-slate-200 whitespace-nowrap">等级</th>
                <th className="p-4 border-b border-slate-200 whitespace-nowrap">成本价</th>
                <th className="p-4 border-b border-slate-200 whitespace-nowrap">零售价</th>
                <th className="p-4 border-b border-slate-200 whitespace-nowrap">京东价</th>
                <th className="p-4 border-b border-slate-200 whitespace-nowrap">状态</th>
                <th className="p-4 border-b border-slate-200 whitespace-nowrap text-center">销量(实/虚)</th>
                <th className="p-4 border-b border-slate-200 whitespace-nowrap">分类</th>
                <th className="p-4 border-b border-slate-200 whitespace-nowrap">展示配置</th>
                <th className="p-4 border-b border-slate-200 whitespace-nowrap">标签</th>
                <th className="p-4 border-b border-slate-200 whitespace-nowrap min-w-[160px]">创建时间</th>
                <th className="p-4 border-b border-slate-200 whitespace-nowrap sticky right-0 bg-slate-50 z-20 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] text-center w-[160px]">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_PRODUCTS.map((item) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-blue-50/30 transition-colors group ${selectedIds.includes(item.id) ? 'bg-blue-50/50' : ''}`}
                  onClick={() => handleSelectRow(item.id)}
                >
                  <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleSelectRow(item.id)}
                    />
                  </td>
                  <td className="p-4 text-slate-600 font-mono">{item.id}</td>
                  <td className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 line-clamp-1 w-48" title={item.name}>{item.name}</div>
                        <div className="text-xs text-slate-400 mt-1 flex items-center">
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 mr-2">{item.sku}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">
                    <div className="truncate w-32" title={item.supplier}>{item.supplier}</div>
                  </td>
                  <td className="p-4">
                     <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-violet-50 text-violet-600 text-xs font-bold border border-violet-100">
                       {item.level}
                     </span>
                  </td>
                  <td className="p-4 font-medium text-slate-600">¥{item.cost}</td>
                  <td className="p-4 font-bold text-slate-800">¥{item.rrp}</td>
                  <td className="p-4 text-slate-500">
                    <div className="flex flex-col">
                      <span>¥{item.jdPrice}</span>
                      <span className="text-[10px] text-slate-400 scale-90 origin-left">更新: {item.jdTime.split(' ')[0]}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      item.status === 1 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {item.status === 1 ? '上架中' : '已下架'}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="text-xs">
                      <div className="font-medium text-blue-600">{item.actualSales}</div>
                      <div className="text-slate-400 border-t border-slate-100 mt-1 pt-1">{item.virtualSales}</div>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-slate-600">
                    <div>{item.l1}</div>
                    <div className="text-slate-400">&gt; {item.l3}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col space-y-1">
                      {item.xfhShow && <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 rounded w-fit border border-blue-100">鲜丰汇</span>}
                      {item.recommend && <span className="text-[10px] bg-purple-50 text-purple-600 px-1.5 rounded w-fit border border-purple-100">推荐</span>}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 max-w-[150px]">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] border border-orange-200 text-orange-600 bg-orange-50 px-1.5 rounded-sm">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-xs text-slate-500">{item.created.split(' ')[0]}</td>
                  
                  {/* Sticky Action Column */}
                  <td 
                    className="p-4 sticky right-0 bg-white group-hover:bg-blue-50/30 z-10 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] border-l border-slate-100 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-center space-x-1">
                      <button 
                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" 
                        title="编辑"
                        onClick={(e) => { e.stopPropagation(); handleEdit(item); }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="详情">
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      <div className="relative">
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleActionMenu(item.id); }}
                          className={`p-1.5 rounded-lg transition-colors ${activeActionId === item.id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        
                        {activeActionId === item.id && (
                          <div className="absolute right-0 bottom-full mb-2 w-40 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                             <button className="w-full text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center transition-colors">
                               <Archive className="w-3.5 h-3.5 mr-2 text-slate-400" />
                               {item.status === 1 ? '下架商品' : '上架商品'}
                             </button>
                             <button className="w-full text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center transition-colors">
                               <DollarSign className="w-3.5 h-3.5 mr-2 text-slate-400" />
                               设置区间价
                             </button>
                             <button className="w-full text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center transition-colors">
                               <Settings className="w-3.5 h-3.5 mr-2 text-slate-400" />
                               设置规格
                             </button>
                             <div className="h-px bg-slate-100 my-1"></div>
                             <button className="w-full text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center transition-colors">
                               <MessageSquare className="w-3.5 h-3.5 mr-2 text-slate-400" />
                               查看评论
                             </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 border-t border-slate-100 bg-white rounded-b-xl flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 z-20">
          <div className="mb-4 sm:mb-0">
            显示 <span className="font-medium text-slate-700">1</span> 到 <span className="font-medium text-slate-700">20</span> 条，共 <span className="font-medium text-slate-700">128</span> 条
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors" disabled>上一页</button>
            <div className="flex space-x-1">
              <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg shadow-sm shadow-blue-200">1</button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded-lg transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded-lg transition-colors">3</button>
              <span className="w-8 h-8 flex items-center justify-center text-slate-400">...</span>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded-lg transition-colors">8</button>
            </div>
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">下一页</button>
          </div>
        </div>
      </div>
      
      {/* Product Edit Modal */}
      <ProductEditModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={currentProduct}
      />
    </>
  );
};
