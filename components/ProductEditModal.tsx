import React, { useState } from 'react';
import { X, Calendar, ChevronDown, HelpCircle, UploadCloud } from 'lucide-react';

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
}

export const ProductEditModal: React.FC<ProductEditModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 ring-1 ring-slate-900/5">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white rounded-t-xl sticky top-0 z-10">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              {product ? '编辑商品档案' : '发布新商品'}
              <span className="px-2 py-0.5 rounded text-xs font-normal bg-blue-50 text-blue-600 border border-blue-100">
                {product ? 'ID: ' + product.id : 'Draft'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">请完善商品基础信息及小程序配置，带 * 为必填项</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <form className="space-y-8">
            
            {/* Section 1: Basic Information */}
            <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100">
              <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center border-l-4 border-blue-500 pl-3">
                基础信息
                <span className="ml-2 text-xs font-normal text-slate-400">商品核心档案数据</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                {/* Row 1 */}
                <div className="space-y-1.5 col-span-1 lg:col-span-2">
                  <label className="text-xs font-semibold text-slate-600 flex">
                    商品名称 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input type="text" placeholder="请输入完整商品名称" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 flex">
                    商品条码 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input type="text" placeholder="69..." className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                </div>

                {/* Row 2 */}
                <div className="space-y-1.5 col-span-1 lg:col-span-3">
                  <label className="text-xs font-medium text-slate-600">商品子标题</label>
                  <input type="text" placeholder="用于前端展示的营销短语" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                </div>

                {/* Row 3 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">规格型号</label>
                  <input type="text" placeholder="如: 500g/盒" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">计量单位</label>
                  <input type="text" placeholder="如: 个、包、箱" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 flex">
                    供应商 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      <option value="">请选择供应商</option>
                      <option value="A">云商供应链 A</option>
                      <option value="B">云商供应链 B</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                {/* Row 4 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">产地</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      <option value="">请选择地区</option>
                      <option value="CN">中国大陆</option>
                      <option value="US">美国</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">保质期</label>
                  <input type="text" placeholder="如: 12个月" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">包装率</label>
                  <input type="number" placeholder="1" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                {/* Row 5 - Finance */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">税率编码</label>
                  <input type="text" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">结算税率 (%)</label>
                  <input type="number" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                 <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">参与活动</label>
                  <div className="flex gap-4 pt-1.5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="isEvent" className="text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm">是</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="isEvent" defaultChecked className="text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm">否</span>
                    </label>
                  </div>
                </div>

                {/* Row 6 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">限制日期</label>
                  <div className="relative">
                    <input type="date" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">品类等级</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      <option value="A">A 级</option>
                      <option value="B">B 级</option>
                      <option value="S">S 级</option>
                      <option value="SS">SS 级</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">虚拟销量</label>
                  <input type="number" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                {/* Row 7 - Status & Tags */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">商品状态</label>
                  <div className="flex gap-4 pt-1.5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="status" defaultChecked className="text-emerald-500 focus:ring-emerald-500" />
                      <span className="text-sm text-emerald-600 font-medium">上架</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="status" className="text-slate-400 focus:ring-slate-400" />
                      <span className="text-sm text-slate-500">下架</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">品牌</label>
                  <input type="text" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-semibold text-slate-600 flex">
                    商品展示标签 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      <option value="">请选择标签</option>
                      <option value="hot">热销</option>
                      <option value="new">新品</option>
                      <option value="rec">推荐</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                {/* Row 8 - Full Width Tags */}
                <div className="space-y-1.5 col-span-1 lg:col-span-3">
                  <label className="text-xs font-medium text-slate-600">商品属性标签</label>
                  <input type="text" placeholder="多标签请用逗号分隔" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                {/* Row 9 - Return Info */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">退货人联系姓名</label>
                  <input type="text" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">退货人联系电话</label>
                  <input type="tel" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">退货地址</label>
                  <input type="text" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                {/* Row 10 - Links & Date Range */}
                <div className="space-y-1.5 col-span-1 lg:col-span-2">
                  <label className="text-xs font-medium text-slate-600">主流电商平台同商品链接</label>
                  <input type="url" placeholder="https://" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-medium text-slate-600">暂停销售日期</label>
                   <div className="flex items-center gap-2">
                     <input type="date" className="w-full px-2 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
                     <span className="text-slate-400">-</span>
                     <input type="date" className="w-full px-2 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
                   </div>
                </div>

                {/* Row 11 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">跨境商品类型</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      <option value="none">非跨境</option>
                      <option value="bond">保税备货</option>
                      <option value="direct">直邮</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5 col-span-1 lg:col-span-2">
                  <label className="text-xs font-medium text-slate-600">商品管理标签</label>
                  <input type="text" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>

            {/* Section 2: Mini-program Info */}
            <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100">
              <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center border-l-4 border-emerald-500 pl-3">
                小程序信息
                <span className="ml-2 text-xs font-normal text-slate-400">前端显示与交易配置</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                {/* Price Row */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 flex">
                    成本价 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs">¥</span>
                    <input type="number" step="0.01" className="w-full pl-6 pr-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 flex">
                    原价 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs">¥</span>
                    <input type="number" step="0.01" className="w-full pl-6 pr-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 flex">
                    建议零售价 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs">¥</span>
                    <input type="number" step="0.01" className="w-full pl-6 pr-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                   {/* Spacer for grid alignment or extra field if needed */}
                </div>

                {/* Limits Row */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">最小购买量</label>
                  <input type="number" defaultValue={1} className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">最大购买量</label>
                  <input type="number" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                {/* Category & Tags */}
                <div className="space-y-1.5 col-span-1 lg:col-span-2">
                   <label className="text-xs font-medium text-slate-600">小程序分类</label>
                   <div className="relative">
                    <select className="w-full appearance-none px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      <option value="">选择分类...</option>
                      <option value="1">首页推荐 / 热门</option>
                      <option value="2">生鲜 / 水果</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5 col-span-1 lg:col-span-4">
                  <label className="text-xs font-medium text-slate-600">小程序标签</label>
                  <input type="text" className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                {/* Switches */}
                <div className="space-y-1.5">
                   <label className="text-xs font-medium text-slate-600 block mb-2">小程序商品</label>
                   <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="isMp" defaultChecked className="text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm">是</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="isMp" className="text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm">否</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-1.5">
                   <label className="text-xs font-medium text-slate-600 block mb-2">展示商品推荐</label>
                   <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="showRec" className="text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm">是</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="showRec" defaultChecked className="text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm">否</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end space-x-3 bg-slate-50/80 rounded-b-xl backdrop-blur sticky bottom-0 z-10">
          <button 
            onClick={onClose}
            className="px-5 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            取消
          </button>
          <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all transform active:scale-95">
            {product ? '保存修改' : '确认发布'}
          </button>
        </div>
      </div>
    </div>
  );
};
