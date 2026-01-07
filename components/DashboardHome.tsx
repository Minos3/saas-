import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';
import { StatsCard } from './StatsCard';

const salesData = [
  { name: '周一', value: 4000, value2: 2400 },
  { name: '周二', value: 3000, value2: 1398 },
  { name: '周三', value: 2000, value2: 9800 },
  { name: '周四', value: 2780, value2: 3908 },
  { name: '周五', value: 1890, value2: 4800 },
  { name: '周六', value: 2390, value2: 3800 },
  { name: '周日', value: 3490, value2: 4300 },
];

const categoryData = [
  { name: '美妆护肤', value: 400 },
  { name: '数码家电', value: 300 },
  { name: '食品生鲜', value: 300 },
  { name: '家居百货', value: 200 },
];

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

export const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">欢迎回来，管理员</h2>
          <p className="text-blue-100">今日系统运行平稳，有 12 个待处理事项需要您的关注。</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 bg-white/5 skew-x-12 transform origin-bottom-right"></div>
        <div className="absolute right-10 bottom-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="今日总销售额" 
          value="¥128,490" 
          trend="+12.5%" 
          trendUp={true} 
          icon={DollarSign} 
          colorClass="bg-blue-500 text-blue-500" 
        />
        <StatsCard 
          title="新增用户数" 
          value="1,294" 
          trend="+8.2%" 
          trendUp={true} 
          icon={Users} 
          colorClass="bg-emerald-500 text-emerald-500" 
        />
        <StatsCard 
          title="待处理订单" 
          value="48" 
          trend="-2.4%" 
          trendUp={false} 
          icon={ShoppingCart} 
          colorClass="bg-violet-500 text-violet-500" 
        />
        <StatsCard 
          title="系统活跃度" 
          value="98.5%" 
          trend="+1.2%" 
          trendUp={true} 
          icon={Activity} 
          colorClass="bg-orange-500 text-orange-500" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">销售趋势分析</h3>
            <div className="flex space-x-2">
              <span className="flex items-center text-xs text-slate-500"><div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>总销售额</span>
              <span className="flex items-center text-xs text-slate-500"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></div>订单量</span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                <Area type="monotone" dataKey="value2" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">品类销售占比</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {categoryData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-600">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                  {item.name}
                </div>
                <span className="font-semibold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};