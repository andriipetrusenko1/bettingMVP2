"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  CheckCircle, 
  CreditCard, 
  DollarSign, 
  HistoryIcon,
  BarChart3,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip as RechartTooltip, 
  ResponsiveContainer, 
  PieChart,
  Pie,
  Cell
} from "recharts";
import { format } from "date-fns";
import DashboardActiveBets from "@/components/dashboard/active-bets";
import DashboardBetHistory from "@/components/dashboard/bet-history";

// Mock data for charts
const balanceHistory = [
  { date: "05/01", balance: 500 },
  { date: "05/05", balance: 450 },
  { date: "05/10", balance: 600 },
  { date: "05/15", balance: 580 },
  { date: "05/20", balance: 750 },
  { date: "05/25", balance: 800 },
  { date: "05/30", balance: 920 },
];

const betStats = [
  { name: "Win", value: 65, color: "#7ED957" },
  { name: "Loss", value: 30, color: "#FF4C4C" },
  { name: "Push", value: 5, color: "#00D4FF" }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="bg-[#121212] min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold font-manrope">Dashboard</h1>
            <Button className="bg-[#7ED957] hover:bg-[#6BC047] text-black">Deposit</Button>
          </div>
          
          {/* Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#CCCCCC]">Account Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-[#7ED957] mr-2" />
                  <span className="text-2xl font-bold">$920.00</span>
                </div>
                <p className="text-xs text-[#CCCCCC] mt-1">Last deposit: {format(new Date(), "MMM d, yyyy")}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#CCCCCC]">Active Bets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-[#00D4FF] mr-2" />
                  <span className="text-2xl font-bold">3</span>
                </div>
                <p className="text-xs text-[#CCCCCC] mt-1">Potential Returns: $250.50</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#CCCCCC]">Win Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#7ED957] mr-2" />
                  <span className="text-2xl font-bold">65%</span>
                </div>
                <p className="text-xs text-[#CCCCCC] mt-1">Last 30 days (65/100 bets)</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#CCCCCC]">Total Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-[#7ED957] mr-2" />
                  <span className="text-2xl font-bold">+$420.00</span>
                </div>
                <p className="text-xs text-[#CCCCCC] mt-1">All time profit</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Dashboard Content */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-[#252525]">
                <TabsTrigger value="overview" className="data-[state=active]:bg-[#7ED957] data-[state=active]:text-[#121212]">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="active" className="data-[state=active]:bg-[#7ED957] data-[state=active]:text-[#121212]">
                  Active Bets
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-[#7ED957] data-[state=active]:text-[#121212]">
                  Bet History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Balance Trend Chart */}
                  <Card className="bg-[#1E1E1E] border-[#333333] lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg font-manrope">Balance Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={balanceHistory}>
                            <defs>
                              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#7ED957" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#7ED957" stopOpacity={0.1}/>
                              </linearGradient>
                            </defs>
                            <XAxis 
                              dataKey="date" 
                              stroke="#CCCCCC" 
                              fontSize={12} 
                              tickLine={false}
                              axisLine={{ stroke: '#333333' }}
                            />
                            <YAxis 
                              stroke="#CCCCCC" 
                              fontSize={12}
                              tickLine={false}
                              axisLine={{ stroke: '#333333' }}
                              tickFormatter={(value) => `$${value}`}
                            />
                            <RechartTooltip 
                              contentStyle={{ 
                                backgroundColor: '#252525', 
                                border: '1px solid #333333',
                                borderRadius: '4px',
                                color: '#F5F5F5'
                              }}
                              formatter={(value: number) => [`$${value}`, 'Balance']}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="balance" 
                              stroke="#7ED957"
                              strokeWidth={2}
                              activeDot={{ r: 6, fill: '#7ED957', stroke: '#1E1E1E' }}
                              dot={{ r: 4, fill: '#1E1E1E', stroke: '#7ED957', strokeWidth: 2 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Bet Stats Chart */}
                  <Card className="bg-[#1E1E1E] border-[#333333]">
                    <CardHeader>
                      <CardTitle className="text-lg font-manrope">Bet Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={betStats}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={90}
                              paddingAngle={2}
                              dataKey="value"
                              stroke="none"
                            >
                              {betStats.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <RechartTooltip 
                              contentStyle={{ 
                                backgroundColor: '#252525', 
                                border: '1px solid #333333',
                                borderRadius: '4px',
                                color: '#F5F5F5'
                              }}
                              formatter={(value: number, name: string) => [`${value}%`, name]}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="flex justify-center mt-2 gap-6">
                        {betStats.map((stat) => (
                          <div key={stat.name} className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: stat.color }}></div>
                            <span className="text-sm">{stat.name} ({stat.value}%)</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Recent Bets */}
                <Card className="bg-[#1E1E1E] border-[#333333]">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-manrope">Recent Bets</CardTitle>
                      <Button variant="link" className="text-[#00D4FF] p-0 h-auto">View All</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { id: 1, match: "Lakers vs Celtics", selection: "Lakers", stake: 50, odds: 2.10, status: "win", result: "+$55.00", date: "2 days ago" },
                        { id: 2, match: "Chiefs vs Ravens", selection: "Ravens", stake: 30, odds: 1.85, status: "loss", result: "-$30.00", date: "5 days ago" },
                        { id: 3, match: "Arsenal vs Chelsea", selection: "Draw", stake: 25, odds: 3.40, status: "win", result: "+$60.00", date: "1 week ago" }
                      ].map((bet) => (
                        <div key={bet.id} className="flex justify-between items-center p-3 bg-[#252525] rounded-lg">
                          <div>
                            <p className="text-sm font-medium">{bet.match}</p>
                            <div className="flex items-center mt-1 gap-2">
                              <Badge variant="outline" className="text-xs bg-[#121212]">
                                {bet.selection} @ {bet.odds}
                              </Badge>
                              <span className="text-xs text-[#CCCCCC]">${bet.stake}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${bet.status === 'win' ? 'text-[#7ED957]' : 'text-[#FF4C4C]'}`}>
                              {bet.result}
                            </div>
                            <p className="text-xs text-[#CCCCCC]">{bet.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="active" className="mt-6">
                <DashboardActiveBets />
              </TabsContent>
              
              <TabsContent value="history" className="mt-6">
                <DashboardBetHistory />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}