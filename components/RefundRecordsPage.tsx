import React, { useState } from 'react';
import { 
  Search, Filter, RefreshCw, Download, Plus, ChevronDown, ChevronUp, 
  Calendar, Eye, FileText, CreditCard, User, Building2, ShoppingBag 
} from 'lucide-react';
import { RefundDetailModal } from './RefundDetailModal';

// Mock Data Generator
const MOCK_REFUNDS = Array.from({ length: 15 }).map((_, i) => ({
  id: 30001 + i,
  merchantName: `合作商户 ${String.fromCharCode(65 + (i % 5))}`,
  supplierName: `云商供应链 ${String.fromCharCode(65 + (i % 3))}`,
  source: i % 3 === 0 ? '小程序' : (i % 3 === 1 ? 'APP' : 'H5'),
  applyTime: '2023-10-26 14:30:00',
  completeTime: i % 4 === 0 ? '-' : '2023-10-26 16:45:00',
  orderTime: '2023-10-25 09:20:00',
  type: i % 3 === 0 ? '售后退款' : (i % 3 === 1 ? '操作退款' : '部分退款'),
  merchantOrderNo: `M${20231025000 + i}`,
  platformOrderNo: `P${20231025000 + i}`,
  merchantRefundNo: `MR${20231026000 + i}`,
  platformRefundNo: `PR${20231026000 + i}`,
  refundAmount: (50 + i * 12.5).toFixed(2),
  costAmount: (40 + i * 10).toFixed(2),
  status: i % 4 === 0 ? 0 : 1, // 0: Processing, 1: Completed
  // Added Mock Product Details
  productName: i % 2 === 0 ? '高级定制商务休闲西装外套' : '智能家用多功能空气炸锅 Pro版',
  refundQuantity: Math.floor(Math.random() * 5) + 1,
  specCode: `SKU${2023000 + i}`,
  spec: i % 2 === 0 ? '黑色 / XL / 常规款' : '白色 / 4L / 智能触控',
}));

export const RefundRecordsPage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewDetail = (refund: any) => {
    setSelectedRefund(refund);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-[calc(100vh-140px)] w-full">
        {/* Header Section */}
        <div className="p-5 border-b border-slate-100 bg-white rounded-t-xl flex-shrink-0">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
               <div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    退款记录
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">查询商品订单中心商品在各销售端产生的退款记录及资金明细</p>
               </div>
            </div>

            {/* Primary Filters */}
            <div className="flex flex-col xl:flex-row gap-4">
               <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Merchant Order No */}
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                     <input 
                       type="text" 
                       placeholder="商户订单号" 
                       className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                     />
                  </div>

                  {/* Platform Order No */}
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                     <input 
                       type="text" 
                       placeholder="平台订单号" 
                       className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                     />
                  </div>

                  {/* Apply Time Range */}
                  <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"><Calendar className="w-3.5 h-3.5" /></span>
                        <input type="date" className="w-full pl-9 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none focus:bg-white transition-colors" placeholder="申请开始" />
                      </div>
                      <span className="text-slate-400">-</span>
                      <div className="relative flex-1">
                         <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"><Calendar className="w-3.5 h-3.5" /></span>
                        <input type="date" className="w-full pl-9 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none focus:bg-white transition-colors" placeholder="申请结束" />
                      </div>
                  </div>
               </div>

               {/* Action Buttons */}
               <div className="flex items-center gap-2 shrink-0">
                   <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
                      查询
                   </button>
                   <button className="px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                      <RefreshCw className="w-4 h-4" />
                   </button>
                   <button 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className={`flex items-center px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${isExpanded ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                   >
                      <Filter className="w-4 h-4 mr-1.5" />
                      筛选
                      {isExpanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                   </button>
               </div>
            </div>

            {/* Expanded Filters */}
            {isExpanded && (
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-in slide-in-from-top-2 fade-in duration-200">
                 
                 <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">商户退款单号</label>
                    <input type="text" placeholder="输入单号" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>

                 <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">平台退款单号</label>
                    <input type="text" placeholder="输入单号" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>

                 <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">供应商</label>
                    <div className="relative">
                      <input list="suppliers" type="text" placeholder="选择供应商" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                      <datalist id="suppliers">
                         <option value="云商供应链 A" />
                         <option value="云商供应链 B" />
                      </datalist>
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">商户</label>
                    <div className="relative">
                      <input list="merchants" type="text" placeholder="选择商户" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                      <datalist id="merchants">
                         <option value="测试商户001" />
                      </datalist>
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">退款方式</label>
                    <div className="relative">
                       <select className="w-full appearance-none px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                          <option value="">全部</option>
                          <option value="original">原路返回</option>
                          <option value="balance">退回余额</option>
                          <option value="offline">线下打款</option>
                       </select>
                       <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">订单来源</label>
                    <div className="relative">
                       <select className="w-full appearance-none px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                          <option value="">全部</option>
                          <option value="mini">小程序</option>
                          <option value="app">APP</option>
                          <option value="h5">H5</option>
                       </select>
                       <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    </div>
                 </div>

                 <div className="space-y-1 lg:col-span-2">
                    <label className="text-xs font-medium text-slate-500">退款完成时间</label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"><Calendar className="w-3.5 h-3.5" /></span>
                        <input type="date" className="w-full pl-9 pr-2 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <span className="text-slate-400">-</span>
                      <div className="relative flex-1">
                         <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"><Calendar className="w-3.5 h-3.5" /></span>
                        <input type="date" className="w-full pl-9 pr-2 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    </div>
                 </div>

              </div>
            )}
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center gap-3">
           <button className="flex items-center px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200">
              <Plus className="w-4 h-4 mr-1.5 text-emerald-100" />
              添加退款
           </button>
           
           <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>
           
           <button className="flex items-center px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4 mr-1.5 text-slate-500" />
              导出
           </button>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto relative scroll-smooth">
          <table className="min-w-[1800px] w-full text-left border-collapse text-sm">
             <thead className="bg-slate-50 sticky top-0 z-10 font-medium text-slate-500">
               <tr>
                 <th className="p-4 border-b border-slate-200 min-w-[120px]">商户名称</th>
                 <th className="p-4 border-b border-slate-200 min-w-[120px]">供应商名称</th>
                 <th className="p-4 border-b border-slate-200 w-24">订单来源</th>
                 <th className="p-4 border-b border-slate-200 min-w-[120px]">退款类型</th>
                 <th className="p-4 border-b border-slate-200 text-right">退款金额</th>
                 <th className="p-4 border-b border-slate-200 text-right">成本金额</th>
                 <th className="p-4 border-b border-slate-200 min-w-[220px]">单号信息 (商户/平台)</th>
                 <th className="p-4 border-b border-slate-200 min-w-[220px]">退款单号 (商户/平台)</th>
                 <th className="p-4 border-b border-slate-200 min-w-[160px]">时间节点</th>
                 <th className="p-4 border-b border-slate-200 text-center sticky right-0 bg-slate-50 z-20 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] w-20">操作</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {MOCK_REFUNDS.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-4">
                       <div className="flex items-center gap-2">
                         <Building2 className="w-4 h-4 text-slate-400" />
                         <span className="text-slate-700 font-medium truncate max-w-[120px]" title={item.merchantName}>{item.merchantName}</span>
                       </div>
                    </td>
                    <td className="p-4 text-slate-600">
                       <div className="truncate max-w-[120px]" title={item.supplierName}>{item.supplierName}</div>
                    </td>
                    <td className="p-4">
                       <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs border border-slate-200">
                         {item.source}
                       </span>
                    </td>
                    <td className="p-4">
                       <span className={`inline-block px-2 py-0.5 rounded text-xs border ${
                          item.type === '售后退款' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                          item.type === '操作退款' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          'bg-purple-50 text-purple-600 border-purple-100'
                       }`}>
                         {item.type}
                       </span>
                    </td>
                    <td className="p-4 text-right font-medium text-slate-800">
                      ¥{item.refundAmount}
                    </td>
                    <td className="p-4 text-right text-slate-500">
                      ¥{item.costAmount}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-sm">
                         <div className="flex items-center gap-1">
                           <span className="text-slate-400 w-12 shrink-0 text-right">商户:</span>
                           <span className="font-mono text-slate-600">{item.merchantOrderNo}</span>
                         </div>
                         <div className="flex items-center gap-1">
                           <span className="text-slate-400 w-12 shrink-0 text-right">平台:</span>
                           <span className="font-mono text-slate-600">{item.platformOrderNo}</span>
                         </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-sm">
                         <div className="flex items-center gap-1">
                           <span className="text-slate-400 w-12 shrink-0 text-right">商户:</span>
                           <span className="font-mono text-slate-600">{item.merchantRefundNo}</span>
                         </div>
                         <div className="flex items-center gap-1">
                           <span className="text-slate-400 w-12 shrink-0 text-right">平台:</span>
                           <span className="font-mono text-slate-600">{item.platformRefundNo}</span>
                         </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1 text-sm text-slate-500">
                        <div className="flex items-center gap-1" title="下单时间">
                          <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.orderTime}</span>
                        </div>
                        <div className="flex items-center gap-1" title="申请时间">
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.applyTime}</span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600" title="完成时间">
                          <CheckIcon className="w-3.5 h-3.5" />
                          <span>{item.completeTime}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 sticky right-0 bg-white shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] border-l border-slate-100 text-center">
                      <button 
                        onClick={() => handleViewDetail(item)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                        title="查看详情"
                      >
                         <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 bg-white rounded-b-xl z-20">
           <div>显示 1 到 15 条，共 342 条</div>
           <div className="flex gap-2">
             <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>上一页</button>
             <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">下一页</button>
           </div>
        </div>
      </div>

      <RefundDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        refund={selectedRefund}
      />
    </>
  );
};

// Helper Icon
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
