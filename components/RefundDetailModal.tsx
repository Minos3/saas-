import React from 'react';
import { X, Package, Info, CreditCard, Tag, Barcode } from 'lucide-react';

interface RefundDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  refund: any;
}

export const RefundDetailModal: React.FC<RefundDetailModalProps> = ({ isOpen, onClose, refund }) => {
  if (!isOpen || !refund) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 ring-1 ring-slate-900/5">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white rounded-t-xl">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              退款详情
              <span className={`px-2 py-0.5 rounded text-xs font-normal border ${
                 refund.status === 1 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
              }`}>
                {refund.status === 1 ? '已完成' : '处理中'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-1 flex gap-4">
              <span>退款单号: <span className="font-mono text-slate-700">{refund.platformRefundNo}</span></span>
              <span>申请时间: <span className="font-mono text-slate-700">{refund.applyTime}</span></span>
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
               <div className="text-xs text-slate-500 mb-1">退款总金额</div>
               <div className="text-xl font-bold text-slate-800">¥{refund.refundAmount}</div>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
               <div className="text-xs text-slate-500 mb-1">退款成本</div>
               <div className="text-xl font-bold text-slate-500">¥{refund.costAmount}</div>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
               <div className="text-xs text-slate-500 mb-1">涉及商品数量</div>
               <div className="text-xl font-bold text-blue-600">{refund.refundQuantity} 件</div>
            </div>
          </div>

          {/* Product List Table */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
              <Package className="w-4 h-4 text-slate-500" />
              <h4 className="font-semibold text-sm text-slate-700">退款商品明细</h4>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-slate-500 font-medium border-b border-slate-100">
                <tr>
                  <th className="p-4 w-[40%]">商品名称 / 规格</th>
                  <th className="p-4">规格编码</th>
                  <th className="p-4 text-right">退款数量</th>
                  <th className="p-4 text-right">退款金额</th>
                  <th className="p-4 text-right">成本金额</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Normally this would map through a items array, but we'll use the single mock item for demo */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-start gap-3">
                       <div className="w-10 h-10 rounded bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-300">
                          <Package className="w-5 h-5" />
                       </div>
                       <div>
                         <div className="font-medium text-slate-800 mb-1">{refund.productName}</div>
                         <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {refund.spec}
                            </span>
                         </div>
                       </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-slate-600 font-mono text-xs bg-slate-50 px-2 py-1 rounded w-fit">
                      <Barcode className="w-3 h-3" />
                      {refund.specCode}
                    </div>
                  </td>
                  <td className="p-4 text-right font-medium text-slate-700">
                    x {refund.refundQuantity}
                  </td>
                  <td className="p-4 text-right font-bold text-slate-800">
                    ¥{refund.refundAmount}
                  </td>
                  <td className="p-4 text-right text-slate-500 font-mono">
                    ¥{refund.costAmount}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50/50">
                 <tr>
                   <td colSpan={5} className="p-3 text-xs text-slate-400 text-center">
                     已显示全部退款商品
                   </td>
                 </tr>
              </tfoot>
            </table>
          </div>

          {/* Info Section */}
          <div className="mt-6 flex flex-col gap-3">
             <h4 className="font-semibold text-sm text-slate-700 flex items-center gap-2">
               <Info className="w-4 h-4 text-blue-500" />
               其他信息
             </h4>
             <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                   <span className="text-slate-500">商户名称:</span>
                   <span className="text-slate-700 font-medium">{refund.merchantName}</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-slate-500">供应商名称:</span>
                   <span className="text-slate-700 font-medium">{refund.supplierName}</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-slate-500">退款类型:</span>
                   <span className="text-slate-700 font-medium">{refund.type}</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-slate-500">退款方式:</span>
                   <span className="text-slate-700 font-medium">原路退回</span>
                </div>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
