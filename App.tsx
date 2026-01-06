
import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { ClayCard } from './components/ClayCard';
import { DISHES, SALES_BY_CATEGORY, WEEKLY_PERFORMANCE } from './constants';
import { Dish } from './types';
import { getDishInsights } from './services/geminiService';

const COLORS = ['#FF7DB1', '#FF9EC2', '#FFC0D9', '#FFF2F8'];

const App: React.FC = () => {
  const [dishes] = useState<Dish[]>(DISHES);
  const [insights, setInsights] = useState<any>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const data = await getDishInsights(dishes);
      setInsights(data);
      setLoadingInsights(false);
    };
    fetchInsights();
  }, [dishes]);

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-10 left-10 text-white/50 w-24 h-24 floating-cat">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20,40 Q25,20 40,30 T60,30 Q75,20 80,40 Q85,70 50,90 Q15,70 20,40 Z" />
          <circle cx="35" cy="45" r="3" fill="currentColor" />
          <circle cx="65" cy="45" r="3" fill="currentColor" />
          <path d="M45,55 Q50,60 55,55" />
          <path d="M10,45 L25,48" /> <path d="M10,50 L25,50" /> <path d="M10,55 L25,52" />
          <path d="M90,45 L75,48" /> <path d="M90,50 L75,50" /> <path d="M90,55 L75,52" />
        </svg>
      </div>

      <div className="absolute top-20 right-20 w-32 h-32 bg-white/20 rounded-lg transform rotate-12 flex items-center justify-center border-4 border-white/30 backdrop-blur-sm">
        <div className="grid grid-cols-3 gap-2 p-2 w-full h-full opacity-40">
           {[...Array(9)].map((_, i) => <div key={i} className="bg-white rounded-sm" />)}
        </div>
      </div>

      <ClayCard variant="pink" className="w-full max-w-6xl p-6 md:p-10 flex flex-col gap-6">
        {/* Header / Search Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 bg-white/60 rounded-full px-6 py-3 shadow-inner flex items-center gap-3">
            <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search your secret recipes..." 
              className="bg-transparent border-none outline-none w-full text-pink-600 placeholder-pink-300 font-medium"
            />
          </div>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition">
             <div className="w-8 h-8 bg-pink-100 rounded-full" />
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel - Pie & Bars (Mimicking Reference) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <ClayCard variant="blue" className="p-6 h-[400px] flex flex-col">
              <h3 className="text-white text-xl font-bold mb-4">Dish Popularity</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={SALES_BY_CATEGORY}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {SALES_BY_CATEGORY.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                 <ResponsiveContainer width="100%" height={100}>
                    <BarChart data={DISHES.slice(0, 4)}>
                      <Bar dataKey="popularityScore" fill="#FFC0D9" radius={[10, 10, 0, 0]} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
            </ClayCard>
          </div>

          {/* Right Panel - Large Line Graph & Insights */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <ClayCard variant="cyan" className="p-6 h-[250px] relative">
              <h3 className="text-white text-xl font-bold mb-2">Weekly Performance</h3>
              <div className="absolute top-4 right-4 clay-element-yellow w-12 h-8 flex items-center justify-center text-xs font-bold text-yellow-800">
                LIVE
              </div>
              <div className="flex-1 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={WEEKLY_PERFORMANCE}>
                    <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={6} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ClayCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                   <div className="w-10 h-10 clay-card-pink bg-blue-400 border-none rounded-full flex items-center justify-center text-white">
                      <div className="w-4 h-4 rounded-full border-2 border-white" />
                   </div>
                   <div className="h-2 flex-1 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[70%] clay-bar" />
                   </div>
                </div>
                <div className="flex gap-4 items-center">
                   <div className="w-10 h-10 clay-card-pink bg-blue-400 border-none rounded-full flex items-center justify-center text-white">
                      <div className="w-4 h-4 rounded-full border-2 border-white" />
                   </div>
                   <div className="h-2 flex-1 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[45%] clay-bar" />
                   </div>
                </div>
                
                {/* AI Insight Box */}
                <div className="bg-white/40 p-4 rounded-[2rem] border-2 border-white/50 mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">✨</span>
                    <h4 className="font-bold text-pink-600">Smart Insights</h4>
                  </div>
                  {loadingInsights ? (
                    <div className="animate-pulse flex flex-col gap-2">
                      <div className="h-4 bg-white/50 rounded w-3/4"></div>
                      <div className="h-4 bg-white/50 rounded w-1/2"></div>
                    </div>
                  ) : (
                    <p className="text-sm text-pink-700 leading-tight">
                      {insights?.recommendation || "Analyzing your data for flavor-packed wins..."}
                    </p>
                  )}
                </div>
              </div>

              {/* Mini Dish List */}
              <div className="bg-white/40 p-4 rounded-[2rem] border-2 border-white/50 flex flex-col gap-3">
                <h4 className="font-bold text-pink-600">Top Sellers</h4>
                {DISHES.slice(0, 3).map(dish => (
                  <div key={dish.id} className="flex items-center gap-3 bg-white/60 p-2 rounded-2xl hover:bg-white transition cursor-pointer">
                    <img src={dish.image} className="w-10 h-10 rounded-xl object-cover" alt={dish.name} />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-pink-800">{dish.name}</p>
                      <p className="text-[10px] text-pink-400">{dish.orders} orders this week</p>
                    </div>
                    <div className="text-pink-600 font-bold text-xs">${dish.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Area with "Watch" element like reference */}
        <div className="flex justify-end mt-4">
           <div className="relative w-24 h-24 text-white/40 opacity-50">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="50" cy="50" r="30" />
                <path d="M50,30 L50,50 L70,50" />
                <path d="M30,5 L70,5" />
                <path d="M30,95 L70,95" />
              </svg>
           </div>
        </div>
      </ClayCard>
    </div>
  );
};

export default App;
