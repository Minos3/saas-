import React, { useState } from 'react';
import { 
  Search, Filter, Eye, Edit, Truck, Calendar, 
  ChevronDown, ChevronUp, Download, RefreshCw, MapPin, User, Phone, Upload, FileText 
} from 'lucide-react';

// Mock Data Generator
const MOCK_ORDERS = Array.from({ length: 20 }).map((_, i) => {
  const status = i % 4; // 0: Pending, 1: Paid, 2: Shipped, 3: Completed
  return {
    id: 20000 + i,
    orderTime: '2023-10-24 10:00:00',
    completeTime: status === 3 ? '2023-10-26 14:20:00' : '-',
    status: status,
    merchantOrderNo: `M${20231024000 + i}`,
    platformOrderNo: `P${20231024000 + i}`,
    jdOrderNo: i % 3 === 0 ? `JD${20231024000 + i}` : '-',
    amount: (150 + i * 20.5).toFixed(2),
    buyerPhone: `138${String(i).padStart(4, '0')}8888`,
    receiverName: i % 2 === 0 ? '张三' : '李四',
    receiverPhone: `139${String(i).padStart(4, '0')}9999`,
    receiverAddress: '北京市朝阳区建国路88号',
    supplier: i % 3 === 0 ? '' : `云商供应链 ${String.fromCharCode(65 + (i % 3))}`,
  };
});

const STATUS_MAP: Record<number, { text: string; style: string }> = {
  0: { text: '待支付', style: 'bg-slate-100 text-slate-500 border-slate-200' },
  1: { text: '待发货', style: 'bg-orange-50 text-orange-600 border-orange-100' },
  2: { text: '已发货', style: 'bg-blue-50 text-blue-600 border-blue-100' },
  3: { text: '已完成', style: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
};

export const OrderQueryPage: React.FC = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Edit Shipping Modal State
  const handleEditShipping = (order: any) => {
    setCurrentOrder({ ...order }); // Clone to avoid direct mutation
    setIsEditModalOpen(true);
  };

  const handleSaveShipping = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    setOrders(prev => prev.map(o => o.id === currentOrder.id ? currentOrder : o));
    setIsEditModalOpen(false);
  };

  const handleAssignSupplier = (order: any, supplierName: string) => {
     // Direct assignment for demo
     setOrders(prev => prev.map(o => o.id === order.id ? { ...o, supplier: supplierName } : o));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-[calc(100vh-140px)] w-full">
        {/* Header & Filter */}
        <div className="p-5 border-b border-slate-100 bg-white rounded-t-xl flex-shrink-0 transition-all">
            {/* Top Bar: Title */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-blue-600" />
                  订单查询
                </h2>
                <p className="text-sm text-slate-400 mt-1">查询全渠道订单明细，分配供应商并管理发货流程</p>
              </div>
            </div>

            {/* Main Filter Bar (Always Visible) */}
            <div className="flex flex-col xl:flex-row gap-4">
                 {/* Left side inputs */}
                 <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Search */}
                      <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <input 
                            type="text" 
                            placeholder="搜索订单号 / 手机号 / 收货人" 
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                          />
                      </div>

                      {/* Order Time */}
                      <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"><Calendar className="w-3.5 h-3.5" /></span>
                            <input type="date" className="w-full pl-9 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none focus:bg-white transition-colors" />
                          </div>
                          <span className="text-slate-400">-</span>
                          <div className="relative flex-1">
                             <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"><Calendar className="w-3.5 h-3.5" /></span>
                            <input type="date" className="w-full pl-9 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none focus:bg-white transition-colors" />
                          </div>
                      </div>

                      {/* Order Status */}
                      <div className="relative">
                        <select className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors">
                          <option value="">订单状态: 全部</option>
                          <option value="0">待支付</option>
                          <option value="1">待发货</option>
                          <option value="2">已发货</option>
                          <option value="3">已完成</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                     </div>
                 </div>

                 {/* Buttons */}
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
               <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-in slide-in-from-top-2 fade-in duration-200">
                  
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">商户订单号</label>
                    <input type="text" placeholder="输入商户单号" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">平台订单号</label>
                    <input type="text" placeholder="输入平台单号" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">京东订单号</label>
                    <input type="text" placeholder="输入京东单号" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">订单来源</label>
                    <div className="relative">
                        <select className="w-full appearance-none pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">全部来源</option>
                          <option value="mini">小程序</option>
                          <option value="app">APP</option>
                          <option value="web">Web</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    </div>
                  </div>

                   <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">供应商</label>
                     <div className="relative">
                        <input list="suppliers" type="text" placeholder="输入或选择供应商" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                        <datalist id="suppliers">
                           <option value="云商供应链 A" />
                           <option value="云商供应链 B" />
                        </datalist>
                     </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">商户</label>
                     <div className="relative">
                        <input list="merchants" type="text" placeholder="输入或选择商户" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                        <datalist id="merchants">
                           <option value="测试商户001" />
                           <option value="测试商户002" />
                        </datalist>
                     </div>
                  </div>

                   <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">未发货超过</label>
                    <div className="relative">
                       <input type="number" placeholder="24" className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                       <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs">小时</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">订单金额大于</label>
                    <div className="relative">
                       <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs">¥</span>
                       <input type="number" placeholder="0.00" className="w-full pl-6 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>

                   <div className="space-y-1 lg:col-span-2">
                    <label className="text-xs font-medium text-slate-500">完成时间</label>
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

                 <div className="space-y-1 lg:col-span-2">
                    <label className="text-xs font-medium text-slate-500">下单人手机号 (批量)</label>
                    <input type="text" placeholder="可输入多个手机号，用逗号分隔，最多200个" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div className="space-y-1 lg:col-span-2">
                    <label className="text-xs font-medium text-slate-500">收货人手机号 (批量)</label>
                    <input type="text" placeholder="可输入多个手机号，用逗号分隔，最多200个" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

               </div>
            )}
        </div>

        {/* Action Toolbar */}
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center gap-3 animate-in fade-in duration-300">
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Upload className="w-4 h-4 mr-2 text-blue-100" />
              导入商品备注
           </button>
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Upload className="w-4 h-4 mr-2 text-blue-100" />
              导入发货信息
           </button>
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Upload className="w-4 h-4 mr-2 text-blue-100" />
              导入PC发货信息
           </button>
           
           <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>
           
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Download className="w-4 h-4 mr-2 text-blue-100" />
              导出
           </button>
           <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <FileText className="w-4 h-4 mr-2 text-blue-100" />
              导出运费
           </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto relative scroll-smooth">
          <table className="min-w-[1600px] w-full text-left border-collapse text-sm">
            <thead className="bg-slate-50 sticky top-0 z-10 font-medium text-slate-500">
              <tr>
                <th className="p-4 border-b border-slate-200 min-w-[160px]">订单时间</th>
                <th className="p-4 border-b border-slate-200">状态</th>
                <th className="p-4 border-b border-slate-200 min-w-[240px]">订单编号</th>
                <th className="p-4 border-b border-slate-200">实付金额</th>
                <th className="p-4 border-b border-slate-200 min-w-[120px]">下单人</th>
                <th className="p-4 border-b border-slate-200 min-w-[180px]">收货信息</th>
                <th className="p-4 border-b border-slate-200 min-w-[180px]">供应商</th>
                <th className="p-4 border-b border-slate-200 min-w-[160px]">完成时间</th>
                <th className="p-4 border-b border-slate-200 text-center sticky right-0 bg-slate-50 z-20 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 text-slate-600">
                    <div className="font-mono text-sm">{item.orderTime}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium border ${STATUS_MAP[item.status].style}`}>
                      {STATUS_MAP[item.status].text}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-slate-400 w-11 shrink-0 text-right">商户:</span>
                        <span className="font-mono text-slate-700">{item.merchantOrderNo}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-slate-400 w-11 shrink-0 text-right">平台:</span>
                        <span className="font-mono text-slate-600">{item.platformOrderNo}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-slate-400 w-11 shrink-0 text-right">JD:</span>
                        <span className="font-mono text-slate-600">{item.jdOrderNo}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-800 text-sm">
                    ¥{item.amount}
                  </td>
                  <td className="p-4 text-sm text-slate-600 font-mono">
                    {item.buyerPhone}
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-slate-700">{item.receiverName}</div>
                    <div className="text-sm text-slate-500 font-mono mt-0.5">{item.receiverPhone}</div>
                  </td>
                  <td className="p-4">
                    {item.supplier ? (
                      <div className="flex items-center text-sm text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200 w-fit">
                        <Truck className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {item.supplier}
                      </div>
                    ) : (
                      <div className="relative group">
                         <select 
                           className="text-sm border border-dashed border-blue-300 bg-blue-50 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-100 focus:outline-none appearance-none pr-6"
                           onChange={(e) => handleAssignSupplier(item, e.target.value)}
                           value=""
                         >
                           <option value="" disabled>分配供应商</option>
                           <option value="云商供应链 A">云商供应链 A</option>
                           <option value="云商供应链 B">云商供应链 B</option>
                         </select>
                         <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-blue-400 pointer-events-none" />
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-slate-600 text-sm font-mono">
                    {item.completeTime}
                  </td>
                  <td className="p-4 sticky right-0 bg-white shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] border-l border-slate-100 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                      >
                        查看
                      </button>
                      <span className="text-slate-200">|</span>
                      <button 
                        onClick={() => handleEditShipping(item)}
                        className="text-slate-600 hover:text-blue-600 text-sm font-medium hover:underline"
                      >
                        编辑收货
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
           <div>显示 1 到 20 条，共 1280 条</div>
           <div className="flex gap-2">
             <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">上一页</button>
             <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">下一页</button>
           </div>
        </div>
      </div>

      {/* Edit Shipping Modal */}
      {isEditModalOpen && currentOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200">
             <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">编辑收货信息</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <Filter className="w-5 h-5 rotate-45" /> {/* Using rotate-45 Filter as Close for variety or just generic X */}
                </button>
             </div>
             
             <form onSubmit={handleSaveShipping} className="p-6 space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700 mb-4 border border-blue-100">
                   正在编辑订单 <span className="font-mono font-bold">{currentOrder.platformOrderNo}</span> 的收货信息。
                   修改后将同步至供应商系统。
                </div>

                <div className="space-y-1.5">
                   <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      <User className="w-3 h-3" /> 收货人姓名
                   </label>
                   <input 
                      type="text" 
                      value={currentOrder.receiverName}
                      onChange={e => setCurrentOrder({...currentOrder, receiverName: e.target.value})}
                      className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                   />
                </div>

                <div className="space-y-1.5">
                   <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> 收货人手机号
                   </label>
                   <input 
                      type="text" 
                      value={currentOrder.receiverPhone}
                      onChange={e => setCurrentOrder({...currentOrder, receiverPhone: e.target.value})}
                      className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                   />
                </div>

                <div className="space-y-1.5">
                   <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> 收货地址
                   </label>
                   <textarea 
                      rows={3}
                      value={currentOrder.receiverAddress}
                      onChange={e => setCurrentOrder({...currentOrder, receiverAddress: e.target.value})}
                      className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
                   />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                   <button 
                     type="button" 
                     onClick={() => setIsEditModalOpen(false)}
                     className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
                   >
                     取消
                   </button>
                   <button 
                     type="submit"
                     className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-200"
                   >
                     保存修改
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </>
  );
};
