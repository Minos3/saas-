import React, { useState } from 'react';
import { Search, Plus, Filter, Download, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';

interface GenericPageProps {
  title: string;
}

export const GenericPage: React.FC<GenericPageProps> = ({ title }) => {
  // Mock data generator based on title to make it look realistic for different sections
  const [loading, setLoading] = useState(false);
  
  const handleAction = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      {/* Header Toolbar */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <p className="text-sm text-slate-400 mt-1">管理和查看所有的 {title} 数据</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="搜索..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg border border-slate-200">
            <Filter className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-200">
            <Plus className="w-4 h-4" />
            <span>新增</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider sticky top-0 z-10">
              <th className="p-4 font-semibold border-b border-slate-100">ID</th>
              <th className="p-4 font-semibold border-b border-slate-100">名称/标题</th>
              <th className="p-4 font-semibold border-b border-slate-100">状态</th>
              <th className="p-4 font-semibold border-b border-slate-100">创建时间</th>
              <th className="p-4 font-semibold border-b border-slate-100">更新时间</th>
              <th className="p-4 font-semibold border-b border-slate-100 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <tr key={item} className="hover:bg-slate-50 transition-colors group">
                <td className="p-4 text-sm text-slate-600">#{1000 + item}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 mr-3">
                      {title.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-800">示例数据项 {item}</div>
                      <div className="text-xs text-slate-400">描述信息或副标题</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item % 3 === 0 ? 'bg-red-50 text-red-600' : 
                    item % 2 === 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {item % 3 === 0 ? '异常' : item % 2 === 0 ? '已启用' : '处理中'}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-500">2023-10-2{item}</td>
                <td className="p-4 text-sm text-slate-500">2023-11-0{item}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={handleAction} className="p-1.5 hover:bg-blue-50 text-blue-600 rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={handleAction} className="p-1.5 hover:bg-red-50 text-red-600 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-100 text-slate-400 rounded">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
        <div>显示 1 到 8 条，共 120 条</div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">上一页</button>
          <div className="space-x-1">
            <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 hover:bg-slate-50 rounded">2</button>
            <button className="px-3 py-1 hover:bg-slate-50 rounded">3</button>
          </div>
          <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">下一页</button>
        </div>
      </div>
    </div>
  );
};
