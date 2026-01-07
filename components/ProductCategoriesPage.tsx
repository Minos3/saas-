import React, { useState } from 'react';
import { 
  Search, Plus, ChevronRight, ChevronDown, Edit2, Trash2, 
  MoreHorizontal, FolderTree, Image as ImageIcon, CheckCircle, XCircle 
} from 'lucide-react';
import { CategoryEditModal } from './CategoryEditModal';

// Mock Data
const INITIAL_CATEGORIES = [
  { id: 1, name: '水果蔬菜', level: 1, sort: 1, visible: true, icon: '🍎', children: [
      { id: 11, name: '热带水果', level: 2, sort: 1, visible: true, children: [
          { id: 111, name: '芒果', level: 3, sort: 1, visible: true, icon: '🥭' },
          { id: 112, name: '香蕉', level: 3, sort: 2, visible: true, icon: '🍌' },
      ]},
      { id: 12, name: '新鲜蔬菜', level: 2, sort: 2, visible: true, children: [] },
  ]},
  { id: 2, name: '肉蛋水产', level: 1, sort: 2, visible: true, icon: '🥩', children: [] },
  { id: 3, name: '粮油副食', level: 1, sort: 3, visible: true, icon: '🌾', children: [] },
  { id: 4, name: '乳饮冲调', level: 1, sort: 4, visible: true, icon: '🥛', children: [] },
  { id: 5, name: '节日食品', level: 1, sort: 5, visible: true, icon: '🥮', children: [] },
  { id: 6, name: '休闲食品', level: 1, sort: 6, visible: true, icon: '🍟', children: [] },
  { id: 7, name: '饮料酒水', level: 1, sort: 7, visible: true, icon: '🍺', children: [] },
  { id: 8, name: '冷冻冷藏', level: 1, sort: 8, visible: true, icon: '❄️', children: [] },
  { id: 9, name: '企业定制', level: 1, sort: 9, visible: false, icon: '🏢', children: [] },
];

export const ProductCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [expandedIds, setExpandedIds] = useState<number[]>([1, 11]); // Default expand first item for demo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [parentForNew, setParentForNew] = useState<any>(null);

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAddRoot = () => {
    setEditingCategory(null);
    setParentForNew(null);
    setIsModalOpen(true);
  };

  const handleAddChild = (parent: any) => {
    setEditingCategory(null);
    setParentForNew(parent);
    setIsModalOpen(true);
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setParentForNew(null);
    setIsModalOpen(true);
  };

  // Recursive render function
  const renderRows = (cats: any[]) => {
    return cats.map(item => (
      <React.Fragment key={item.id}>
        <tr className="hover:bg-slate-50 transition-colors group">
          <td className="p-4">
            <div className="flex items-center" style={{ paddingLeft: `${(item.level - 1) * 24}px` }}>
              {item.children && item.children.length > 0 ? (
                <button 
                  onClick={() => toggleExpand(item.id)}
                  className="p-1 rounded hover:bg-slate-200 text-slate-400 mr-2 transition-colors"
                >
                  {expandedIds.includes(item.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              ) : (
                <span className="w-6 h-6 mr-2 inline-block"></span>
              )}
              
              {/* Level Indicator Dot */}
              <div className={`w-2 h-2 rounded-full mr-3 ${
                item.level === 1 ? 'bg-blue-500' : 
                item.level === 2 ? 'bg-emerald-400' : 'bg-slate-300'
              }`}></div>
              
              <span className={`text-sm ${item.level === 1 ? 'font-bold text-slate-800' : 'font-medium text-slate-600'}`}>
                {item.name}
              </span>
            </div>
          </td>
          
          <td className="p-4 text-center">
            {item.icon ? (
              <span className="text-xl">{item.icon}</span>
            ) : (
              <span className="text-slate-300">-</span>
            )}
          </td>

          <td className="p-4 text-center">
            {item.level === 1 ? (
              <div className="flex justify-center">
                <div className="w-16 h-8 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-xs text-slate-400">
                  <ImageIcon className="w-4 h-4 mr-1" /> Banner
                </div>
              </div>
            ) : (
              <span className="text-slate-300 text-xs">-</span>
            )}
          </td>

          <td className="p-4 text-center text-sm font-mono text-slate-500">
            {item.sort}
          </td>

          <td className="p-4 text-center">
            {item.visible ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                <CheckCircle className="w-3 h-3 mr-1" /> 显示
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                <XCircle className="w-3 h-3 mr-1" /> 隐藏
              </span>
            )}
          </td>

          <td className="p-4 text-center">
             <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-slate-100 text-slate-500 text-xs font-bold">
               {item.level}级
             </span>
          </td>

          <td className="p-4 text-right">
            <div className="flex items-center justify-end space-x-2">
              {item.level < 3 && (
                <button 
                  onClick={() => handleAddChild(item)}
                  className="flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded border border-blue-100 transition-colors"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  新增子类
                </button>
              )}
              <button 
                onClick={() => handleEdit(item)}
                className="p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600 rounded-lg transition-colors" 
                title="编辑"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button 
                className="p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors" 
                title="删除"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
        {/* Recursive call for children if expanded */}
        {item.children && item.children.length > 0 && expandedIds.includes(item.id) && renderRows(item.children)}
      </React.Fragment>
    ));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-[calc(100vh-140px)] w-full">
        {/* Header Toolbar */}
        <div className="p-5 border-b border-slate-100 bg-white rounded-t-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FolderTree className="w-6 h-6 text-blue-600" />
              商品分类管理
            </h2>
            <p className="text-sm text-slate-400 mt-1">管理商品的三级分类结构，支持排序与图标设置</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="搜索分类..." 
                className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 bg-slate-50 focus:bg-white transition-all"
              />
            </div>
            <button 
              onClick={handleAddRoot}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm shadow-blue-200"
            >
              <Plus className="w-4 h-4" />
              <span>新增一级分类</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-xs font-semibold sticky top-0 z-10">
              <tr>
                <th className="p-4 border-b border-slate-200 min-w-[300px]">分类名称 (层级结构)</th>
                <th className="p-4 border-b border-slate-200 text-center w-24">图标</th>
                <th className="p-4 border-b border-slate-200 text-center w-32">Banner</th>
                <th className="p-4 border-b border-slate-200 text-center w-20">排序</th>
                <th className="p-4 border-b border-slate-200 text-center w-24">状态</th>
                <th className="p-4 border-b border-slate-200 text-center w-20">级别</th>
                <th className="p-4 border-b border-slate-200 text-right w-48">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {renderRows(categories)}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 text-xs text-slate-400 flex justify-between items-center bg-slate-50/50 rounded-b-xl">
          <span>提示：拖拽分类可快速调整排序 (功能开发中)</span>
          <span>共 {INITIAL_CATEGORIES.length} 个一级分类</span>
        </div>
      </div>

      <CategoryEditModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        category={editingCategory}
        parentCategory={parentForNew}
      />
    </>
  );
};
