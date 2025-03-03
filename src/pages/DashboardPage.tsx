import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Award, Users, CheckCircle, AlertTriangle, TrendingUp, 
  Download, Share2, Filter, Calendar, RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('month');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for charts
  const credentialsByType = [
    { name: 'Bachelor\'s', value: 45 },
    { name: 'Master\'s', value: 30 },
    { name: 'PhD', value: 15 },
    { name: 'Certificate', value: 60 },
    { name: 'Diploma', value: 25 },
  ];

  const credentialsByMonth = [
    { name: 'Jan', issued: 12, verified: 10 },
    { name: 'Feb', issued: 19, verified: 15 },
    { name: 'Mar', issued: 25, verified: 22 },
    { name: 'Apr', issued: 18, verified: 16 },
    { name: 'May', issued: 29, verified: 25 },
    { name: 'Jun', issued: 35, verified: 30 },
  ];

  const verificationRate = [
    { name: 'Week 1', rate: 92 },
    { name: 'Week 2', rate: 94 },
    { name: 'Week 3', rate: 96 },
    { name: 'Week 4', rate: 98 },
  ];

  const COLORS = ['#4f46e5', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              {user?.role === 'institution' 
                ? 'Monitor and manage your issued credentials' 
                : 'Track your academic credentials and verifications'}
            </p>
          </motion.div>
          
          <motion.div 
            className="mt-4 md:mt-0 flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <button 
              onClick={refreshData}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </motion.div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              title: 'Total Credentials', 
              value: '175', 
              change: '+12%', 
              icon: <Award className="h-6 w-6 text-indigo-600" />,
              positive: true
            },
            { 
              title: 'Verified Credentials', 
              value: '152', 
              change: '+8%', 
              icon: <CheckCircle className="h-6 w-6 text-green-600" />,
              positive: true
            },
            { 
              title: 'Pending Verifications', 
              value: '23', 
              change: '-5%', 
              icon: <AlertTriangle className="h-6 w-6 text-yellow-600" />,
              positive: true
            },
            { 
              title: user?.role === 'institution' ? 'Recipients' : 'Institutions', 
              value: user?.role === 'institution' ? '89' : '12', 
              change: '+15%', 
              icon: <Users className="h-6 w-6 text-blue-600" />,
              positive: true
            },
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="bg-indigo-50 p-3 rounded-full">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className={`h-4 w-4 mr-1 ${stat.positive ? 'text-green-500' : 'text-red-500'}`} />
                <span className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last {timeRange}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Credentials by Type</h2>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-500 hover:text-indigo-600">
                  <Download className="h-5 w-5" />
                </button>
                <button className="p-1 text-gray-500 hover:text-indigo-600">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={credentialsByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {credentialsByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Credentials Issued vs. Verified</h2>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-500 hover:text-indigo-600">
                  <Filter className="h-5 w-5" />
                </button>
                <button className="p-1 text-gray-500 hover:text-indigo-600">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={credentialsByMonth}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="issued" fill="#4f46e5" name="Issued" />
                  <Bar dataKey="verified" fill="#10b981" name="Verified" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
        
        {/* Verification Rate Chart */}
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Verification Success Rate</h2>
            <div className="flex space-x-2">
              <button className="p-1 text-gray-500 hover:text-indigo-600">
                <Filter className="h-5 w-5" />
              </button>
              <button className="p-1 text-gray-500 hover:text-indigo-600">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={verificationRate}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[90, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#4f46e5" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                  name="Success Rate (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Recent Activity */}
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-800">View all</button>
          </div>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {[
                { 
                  action: 'Credential Issued', 
                  target: 'Bachelor of Computer Science to John Doe', 
                  time: '2 hours ago',
                  icon: <Award className="h-5 w-5 text-indigo-600" />
                },
                { 
                  action: 'Credential Verified', 
                  target: 'Master of Data Science by Tech Innovations Inc.', 
                  time: '5 hours ago',
                  icon: <CheckCircle className="h-5 w-5 text-green-600" />
                },
                { 
                  action: 'New Institution Joined', 
                  target: 'Cambridge University', 
                  time: '1 day ago',
                  icon: <Users className="h-5 w-5 text-blue-600" />
                },
                { 
                  action: 'Verification Request', 
                  target: 'PhD in Physics by Global Research Corp.', 
                  time: '2 days ago',
                  icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />
                },
                { 
                  action: 'Credential Shared', 
                  target: 'Certificate in Blockchain Development with Employer', 
                  time: '3 days ago',
                  icon: <Share2 className="h-5 w-5 text-purple-600" />
                },
              ].map((activity, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {activity.target}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-sm text-gray-500">
                      {activity.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;