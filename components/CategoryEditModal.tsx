import React from 'react';
import { X, UploadCloud, ChevronDown } from 'lucide-react';

interface CategoryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: any; // If editing
  parentCategory?: any; // If creating a sub-category
}

export const CategoryEditModal: React.FC<CategoryEditModalProps> = ({ isOpen, onClose, category, parentCategory }) => {
  if (!isOpen) return null;

  // Determine the level of the category being created or edited
  let level = 1;
  if (category) {
    level = category.level;
  } else if (parentCategory) {
    level = parentCategory.level + 1;
  }

  // Helper title
  const getModalTitle = () => {
    if (category) return `编辑 ${level} 级分类`;
    if (parentCategory) return `新增 ${parentCategory.name} 的子分类`;
    return '新增一级分类';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-slate-900/5">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white">
          <h3 className="text-lg font-bold text-slate-800">{getModalTitle()}</h3>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Common Fields: Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 flex">
              类别名称 <span className="text-red-500 ml-1">*</span>
            </label>
            <input 
              type="text" 
              defaultValue={category?.name || ''}
              placeholder="请输入分类名称" 
              className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
            />
          </div>

          {/* Common Fields: Sort */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">
              排序权重
            </label>
            <input 
              type="number" 
              defaultValue={category?.sort || 100}
              placeholder="数字越小越靠前" 
              className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
            />
          </div>

          {/* Common Fields: Visibility */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block mb-2">
              是否可见
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="visible" 
                  defaultChecked={category ? category.visible : true}
                  className="text-blue-600 focus:ring-blue-500" 
                />
                <span className="text-sm text-slate-700">显示</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="visible" 
                  defaultChecked={category ? !category.visible : false}
                  className="text-blue-600 focus:ring-blue-500" 
                />
                <span className="text-sm text-slate-700">隐藏</span>
              </label>
            </div>
          </div>

          {/* Level 1 Specific Fields */}
          {level === 1 && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">分类图标 (Icon)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer group">
                  <UploadCloud className="w-8 h-8 mb-2 group-hover:text-blue-500 transition-colors" />
                  <span className="text-xs">点击上传图标</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Banner 图片</label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer group h-24">
                  <UploadCloud className="w-8 h-8 mb-2 group-hover:text-blue-500 transition-colors" />
                  <span className="text-xs">点击上传 Banner</span>
                </div>
              </div>
            </>
          )}

          {/* Level 2 Specific Fields - None extra requested, just Name, Sort, Visible */}

          {/* Level 3 Specific Fields */}
          {level === 3 && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">分类图标 (Icon)</label>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer group">
                <UploadCloud className="w-8 h-8 mb-2 group-hover:text-blue-500 transition-colors" />
                <span className="text-xs">点击上传图标</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end space-x-3 bg-slate-50">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            取消
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-200 transition-colors">
            保存分类
          </button>
        </div>
      </div>
    </div>
  );
};
