import React, { useState, useEffect } from 'react';
   import './styles.css';
import { Heart, Activity, Droplet, Moon, TrendingUp, AlertCircle, Users, Clock, CheckCircle, Bell, Sparkles, Send, Download, MessageCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const NuvienAI = () => {
  const [activeView, setActiveView] = useState('caregiver');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  const weeklyData = [
    { day: 'Mon', heartRate: 70, steps: 3200, mood: 7, sleep: 6.2 },
    { day: 'Tue', heartRate: 72, steps: 3400, mood: 8, sleep: 6.5 },
    { day: 'Wed', heartRate: 71, steps: 3100, mood: 7, sleep: 6.0 },
    { day: 'Thu', heartRate: 73, steps: 3600, mood: 8, sleep: 6.8 },
    { day: 'Fri', heartRate: 72, steps: 3420, mood: 8, sleep: 6.5 },
    { day: 'Sat', heartRate: 70, steps: 2900, mood: 7, sleep: 6.3 },
    { day: 'Sun', heartRate: 71, steps: 3200, mood: 8, sleep: 6.4 }
  ];

  const [residents] = useState([
    {
      id: 1,
      name: 'Mr. Amani Thompson',
      room: '204',
      age: 78,
      photo: '👴🏾',
      wearableData: { heartRate: 72, steps: 3420, sleep: 6.5, hydration: 78 },
      vitals: { bloodPressure: '128/82', temperature: 98.2, oxygen: 97 },
      weeklyData: weeklyData,
      recentLogs: [
        { time: '08:30 AM', note: 'Morning vitals stable. Enjoyed breakfast with good appetite.' },
        { time: '11:00 AM', note: 'Participated in group activity - seated exercises.' },
        { time: '02:15 PM', note: 'Calm afternoon walk in garden. Mood positive.' }
      ],
      medications: [
        { name: 'Lisinopril', time: '8:00 AM', status: 'taken' },
        { name: 'Metformin', time: '12:00 PM', status: 'taken' },
        { name: 'Atorvastatin', time: '8:00 PM', status: 'pending' }
      ],
      aiSummary: 'Mr. Amani had a wonderful day with stable vitals and positive engagement. His heart rate remained steady throughout the day, and he enjoyed a peaceful walk after lunch. Sleep quality was good last night at 6.5 hours. Overall showing steady improvement in mobility and mood.',
      trends: { mood: 'improving', activity: 'stable', sleep: 'good' }
    },
    {
      id: 2,
      name: 'Mrs. Elena Rodriguez',
      room: '312',
      age: 82,
      photo: '👵🏻',
      wearableData: { heartRate: 68, steps: 1890, sleep: 5.2, hydration: 65 },
      vitals: { bloodPressure: '142/88', temperature: 98.6, oxygen: 95 },
      weeklyData: [
        { day: 'Mon', heartRate: 69, steps: 2100, mood: 6, sleep: 5.5 },
        { day: 'Tue', heartRate: 70, steps: 2000, mood: 6, sleep: 5.3 },
        { day: 'Wed', heartRate: 68, steps: 1950, mood: 7, sleep: 5.8 },
        { day: 'Thu', heartRate: 67, steps: 1800, mood: 6, sleep: 5.0 },
        { day: 'Fri', heartRate: 68, steps: 1890, mood: 6, sleep: 5.2 },
        { day: 'Sat', heartRate: 69, steps: 1750, mood: 6, sleep: 5.1 },
        { day: 'Sun', heartRate: 68, steps: 1900, mood: 7, sleep: 5.4 }
      ],
      recentLogs: [
        { time: '09:00 AM', note: 'Quiet morning. Blood pressure slightly elevated.' },
        { time: '01:30 PM', note: 'Low appetite at lunch. Encouraged hydration.' }
      ],
      medications: [
        { name: 'Amlodipine', time: '8:00 AM', status: 'taken' },
        { name: 'Levothyroxine', time: '8:00 AM', status: 'taken' }
      ],
      aiSummary: 'Mrs. Elena had a quieter day today. Her blood pressure is slightly elevated and hydration levels could use attention. Sleep was lighter than usual at 5.2 hours. Recommend gentle encouragement for fluid intake and monitoring BP tomorrow morning.',
      trends: { mood: 'stable', activity: 'decreased', sleep: 'needs_attention' },
      alerts: ['Hydration below target', 'BP elevated']
    }
  ]);

  const [selectedResident, setSelectedResident] = useState(residents[0]);
  const [newLog, setNewLog] = useState({ note: '' });

  useEffect(() => {
    const saved = localStorage.getItem('nuvienai-messages');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessages = [...messages, { text: message, time: new Date().toLocaleTimeString(), resident: selectedResident.name }];
      setMessages(newMessages);
      localStorage.setItem('nuvienai-messages', JSON.stringify(newMessages));
      setMessage('');
    }
  };

  const generateReport = () => {
    alert('✓ Daily Report Generated!\n\nDownloading comprehensive care summary for ' + selectedResident.name + '...\n\nIncludes: Vitals, Activities, Medications, AI Insights, and Weekly Trends.');
  };

  const CaregiverDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#E6B800] to-[#f5c842] text-[#FAFAFA] p-6 rounded-3xl shadow-lg transition-all hover:shadow-xl">
        <h2 className="text-2xl font-semibold mb-2 text-[#FAFAFA]">Caregiver Dashboard</h2>
        <p className="opacity-90 text-[#FAFAFA]">You're caring for {residents.length} residents today — great work!</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {residents.map(r => (
          <div key={r.id} onClick={() => setSelectedResident(r)} className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 ${selectedResident.id === r.id ? 'bg-white border-2 border-[#E6B800] shadow-lg scale-105' : 'bg-white hover:shadow-md hover:scale-102'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-4xl">{r.photo}</div>
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-[#E6B800] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
            <div className="font-semibold text-gray-800">{r.name}</div>
            <div className="text-sm text-gray-600 mb-2">Room {r.room}</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-[#E6B800]/20 text-[#E6B800] rounded-full font-medium">HR: {r.wearableData.heartRate}</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">{r.wearableData.steps} steps</span>
            </div>
            {r.alerts && <div className="mt-3 text-[#F5C2C7] text-xs bg-[#FFF5F7] p-2 rounded-lg">{r.alerts.length} needs attention</div>}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Active Resident: {selectedResident.name}</h3>
          <button onClick={generateReport} className="flex items-center gap-2 px-4 py-2 bg-[#E6B800] text-white rounded-xl hover:bg-[#d4a700] transition-all hover:shadow-lg transform hover:scale-105">
            <Download className="w-4 h-4" />
            Generate Report
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-[#A9D6E5]" />
              Live Wearable Data
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl transition-all hover:shadow-md">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                  </div>
                  <span className="text-gray-700 font-medium">Heart Rate</span>
                </div>
                <span className="font-bold text-red-600 text-xl">{selectedResident.wearableData.heartRate}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl transition-all hover:shadow-md">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Activity className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-gray-700 font-medium">Steps</span>
                </div>
                <span className="font-bold text-blue-600 text-xl">{selectedResident.wearableData.steps}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl transition-all hover:shadow-md">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Moon className="w-5 h-5 text-purple-500" />
                  </div>
                  <span className="text-gray-700 font-medium">Sleep</span>
                </div>
                <span className="font-bold text-purple-600 text-xl">{selectedResident.wearableData.sleep}h</span>
              </div>
              <div className="p-4 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center mr-3">
                      <Droplet className="w-5 h-5 text-cyan-500" />
                    </div>
                    <span className="text-gray-700 font-medium">Hydration</span>
                  </div>
                  <span className="font-bold text-cyan-600">{selectedResident.wearableData.hydration}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full transition-all duration-500" style={{width: `${selectedResident.wearableData.hydration}%`}}></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-gray-700">Manual Vitals</h4>
            <div className="space-y-3">
              <div className="p-4 bg-[#FAFAFA] rounded-2xl transition-all hover:shadow-md border border-gray-100">
                <div className="text-sm text-gray-600 mb-1">Blood Pressure</div>
                <div className="font-bold text-gray-800 text-xl">{selectedResident.vitals.bloodPressure} <span className="text-sm text-gray-500 font-normal">mmHg</span></div>
              </div>
              <div className="p-4 bg-[#FAFAFA] rounded-2xl transition-all hover:shadow-md border border-gray-100">
                <div className="text-sm text-gray-600 mb-1">Temperature</div>
                <div className="font-bold text-gray-800 text-xl">{selectedResident.vitals.temperature}°F</div>
              </div>
              <div className="p-4 bg-[#FAFAFA] rounded-2xl transition-all hover:shadow-md border border-gray-100">
                <div className="text-sm text-gray-600 mb-1">Oxygen Saturation</div>
                <div className="font-bold text-gray-800 text-xl">{selectedResident.vitals.oxygen}%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-[#E6B800]" />
            7-Day Wellness Trends
          </h4>
          <div className="bg-gradient-to-br from-[#A9D6E5]/10 to-[#B5E2FA]/10 p-4 rounded-2xl border border-[#B5E2FA]/30">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={selectedResident.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="day" stroke="#666" style={{fontSize: '12px'}} />
                <YAxis stroke="#666" style={{fontSize: '12px'}} />
                <Tooltip contentStyle={{backgroundColor: '#fff', border: '2px solid #E6B800', borderRadius: '12px', padding: '8px'}} />
                <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={3} dot={{fill: '#ef4444', r: 5}} name="Heart Rate" />
                <Line type="monotone" dataKey="steps" stroke="#3b82f6" strokeWidth={3} dot={{fill: '#3b82f6', r: 5}} name="Steps (÷10)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 p-4 bg-gradient-to-r from-[#E6B800]/10 to-[#E6B800]/5 rounded-2xl border-l-4 border-[#E6B800]">
            <div className="flex items-center mb-2">
              <Sparkles className="w-4 h-4 text-[#E6B800] mr-2 animate-pulse" />
              <span className="font-semibold text-gray-800 text-sm">AI Insight</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">Heart rate shows excellent stability this week with average 71 bpm. Activity levels increased 12% since Monday, indicating positive engagement with care activities. Sleep quality remains consistently good.</p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-gray-700">Medications</h4>
          {selectedResident.medications.map((med, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-[#FAFAFA] rounded-2xl mb-2 transition-all hover:shadow-md border border-gray-100">
              <div>
                <div className="font-medium text-gray-800">{med.name}</div>
                <div className="text-sm text-gray-600">{med.time}</div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${med.status === 'taken' ? 'bg-[#E6B800] text-white shadow-sm' : 'bg-[#F5C2C7] text-white'}`}>
                {med.status === 'taken' ? '✓ Taken' : 'Pending'}
              </span>
            </div>
          ))}
        </div>

        <div className="p-5 bg-gradient-to-br from-[#A9D6E5]/10 to-white rounded-2xl border-l-4 border-[#E6B800] mb-6 transition-all hover:shadow-lg">
          <div className="flex items-center mb-3">
            <Sparkles className="w-5 h-5 text-[#E6B800] mr-2 animate-pulse" />
            <h4 className="font-semibold text-gray-800">AI Care Insight</h4>
          </div>
          <p className="text-gray-700 leading-relaxed">Based on today's data, {selectedResident.name.split(' ')[1]} is showing stable vitals with good engagement. Sleep pattern improved from yesterday. Continue current care plan and monitor hydration levels throughout afternoon activities.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gray-700">Add Care Note</h4>
          <textarea value={newLog.note} onChange={(e) => setNewLog({note: e.target.value})} placeholder="Enter wellness observation, activity, or care notes..." className="w-full p-4 border border-gray-200 rounded-2xl mb-3 focus:outline-none focus:border-[#A9D6E5] focus:ring-2 focus:ring-[#A9D6E5]/20 transition-all" rows="3" />
          <button className="bg-[#E6B800] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#d4a700] transition-all hover:shadow-lg transform hover:scale-105 active:scale-95">Log Care Update</button>
        </div>
      </div>
    </div>
  );

  const FamilyDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#F5C2C7] to-[#ffb3ba] text-[#FAFAFA] p-6 rounded-3xl shadow-lg transition-all hover:shadow-xl">
        <h2 className="text-2xl font-semibold mb-2 text-[#FAFAFA]">Family Connection</h2>
        <p className="opacity-90 text-[#FAFAFA]">Here's how your loved one is doing today</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {residents.map(r => (
          <div key={r.id} onClick={() => setSelectedResident(r)} className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 ${selectedResident.id === r.id ? 'bg-[#FFFDF9] border-2 border-[#EADBC8] shadow-lg scale-105' : 'bg-white hover:shadow-md'}`}>
            <div className="text-4xl mb-2">{r.photo}</div>
            <div className="font-semibold text-gray-800">{r.name}</div>
            <div className="text-sm text-gray-600">Room {r.room}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#FFFDF9] rounded-3xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="text-6xl mr-5">{selectedResident.photo}</div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">{selectedResident.name}</h3>
              <p className="text-gray-600">Room {selectedResident.room} • Age {selectedResident.age}</p>
            </div>
          </div>
          <button onClick={generateReport} className="flex items-center gap-2 px-4 py-2 bg-[#D8C3A5] text-white rounded-xl hover:bg-[#c9b494] transition-all hover:shadow-lg transform hover:scale-105 active:scale-95">
            <Download className="w-4 h-4" />
            Report
          </button>
        </div>

        <div className="bg-gradient-to-br from-[#EADBC8]/30 to-[#C9E4CA]/20 p-6 rounded-3xl mb-6 border border-[#EADBC8]/50 transition-all hover:shadow-lg">
          <h4 className="font-semibold text-lg mb-3 flex items-center text-[#A89078]">
            <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
            Today's Wellness Summary
          </h4>
          <p className="text-gray-800 leading-relaxed text-lg">{selectedResident.aiSummary}</p>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-[#88D498]" />
            Weekly Mood Trends
          </h4>
          <div className="bg-white/50 p-4 rounded-2xl border border-[#EADBC8]">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={selectedResident.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="day" stroke="#666" style={{fontSize: '12px'}} />
                <YAxis stroke="#666" style={{fontSize: '12px'}} />
                <Tooltip contentStyle={{backgroundColor: '#FFFDF9', border: '2px solid #EADBC8', borderRadius: '12px', padding: '8px'}} />
                <Area type="monotone" dataKey="mood" stroke="#88D498" fill="#C9E4CA" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 p-4 bg-gradient-to-r from-[#C9E4CA]/20 to-[#C9E4CA]/10 rounded-2xl border-l-4 border-[#88D498]">
            <div className="flex items-center mb-2">
              <Sparkles className="w-4 h-4 text-[#88D498] mr-2" />
              <span className="font-semibold text-gray-800 text-sm">AI Insight</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">Mood scores trending positively this week with consistent engagement. Your loved one is responding well to afternoon activities and social interaction.</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-5 rounded-2xl bg-[#C9E4CA]/40 border-2 border-[#C9E4CA] transition-all hover:shadow-md hover:scale-105">
            <div className="text-sm text-gray-600 mb-2">Mood Trend</div>
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-[#88D498]" />
              <span className="font-semibold capitalize text-gray-800">{selectedResident.trends.mood}</span>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-[#D8C3A5]/30 border-2 border-[#D8C3A5] transition-all hover:shadow-md hover:scale-105">
            <div className="text-sm text-gray-600 mb-2">Activity Level</div>
            <div className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-[#A89078]" />
              <span className="font-semibold capitalize text-gray-800">{selectedResident.trends.activity}</span>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-[#EADBC8]/40 border-2 border-[#EADBC8] transition-all hover:shadow-md hover:scale-105">
            <div className="text-sm text-gray-600 mb-2">Sleep Quality</div>
            <div className="flex items-center">
              <Moon className="w-5 h-5 mr-2 text-[#A89078]" />
              <span className="font-semibold capitalize text-gray-800">{selectedResident.trends.sleep.replace('_', ' ')}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white/50 rounded-2xl border border-[#EADBC8] transition-all hover:shadow-md">
            <div className="flex items-center mb-2">
              <Heart className="w-5 h-5 text-red-400 mr-2" />
              <div className="text-sm text-gray-600">Heart Rate</div>
            </div>
            <div className="font-bold text-2xl text-gray-800">{selectedResident.wearableData.heartRate} <span className="text-sm text-[#C9E4CA] font-normal">bpm</span></div>
            <div className="text-xs text-[#C9E4CA] font-medium mt-1">Normal range</div>
          </div>
          <div className="p-4 bg-white/50 rounded-2xl border border-[#EADBC8] transition-all hover:shadow-md">
            <div className="flex items-center mb-2">
              <Activity className="w-5 h-5 text-blue-400 mr-2" />
              <div className="text-sm text-gray-600">Steps Today</div>
            </div>
            <div className="font-bold text-2xl text-gray-800">{selectedResident.wearableData.steps}</div>
            <div className="text-xs text-[#C9E4CA] font-medium mt-1">Active day</div>
          </div>
        </div>

        <div className="bg-white/70 p-5 rounded-2xl border border-[#EADBC8]">
          <div className="flex items-center mb-3">
            <MessageCircle className="w-5 h-5 text-[#D8C3A5] mr-2" />
            <h4 className="font-semibold text-gray-700">Send a Message</h4>
          </div>
          <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
            {messages.filter(m => m.resident === selectedResident.name).slice(-3).map((m, i) => (
              <div key={i} className="p-3 bg-[#EADBC8]/20 rounded-xl text-sm transition-all hover:bg-[#EADBC8]/30">
                <span className="text-xs text-gray-500 font-medium">{m.time}</span>
                <p className="text-gray-700 mt-1">{m.text}</p>
              </div>
            ))}
            {messages.filter(m => m.resident === selectedResident.name).length === 0 && (
              <p className="text-sm text-gray-400 italic p-2">No messages yet. Send a note to the care team!</p>
            )}
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Send gratitude or ask a question..."
              className="flex-1 p-3 border border-[#EADBC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8C3A5]/30 transition-all"
            />
           <button onClick={sendMessage} className="px-4 py-3 bg-[#D8C3A5] text-white rounded-xl hover:bg-[#c9b494] transition-all hover:shadow-lg transform hover:scale-105 active:scale-95">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminDashboard = () => {
    const total = residents.length;
    const alerts = residents.filter(r => r.alerts).length;
    const avgSteps = Math.round(residents.reduce((sum, r) => sum + r.wearableData.steps, 0) / total);
    const avgHR = Math.round(residents.reduce((sum, r) => sum + r.wearableData.heartRate, 0) / total);

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#4a5568] to-[#2d3748] text-[#FAFAFA] p-8 rounded-3xl shadow-lg transition-all hover:shadow-xl border-2 border-[#E6B800]">
          <h2 className="text-3xl font-bold mb-2 text-[#FAFAFA]">Administrative Console</h2>
          <p className="text-[#FAFAFA] opacity-90 text-lg">Auren Vale Haven • Facility-wide analytics</p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-md transition-all hover:shadow-lg hover:scale-105">
            <Users className="w-8 h-8 text-[#1B263B] mb-3" />
            <div className="text-4xl font-bold text-[#1B263B] mb-2">{total}</div>
            <div className="text-gray-600 font-medium">Total Residents</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md transition-all hover:shadow-lg hover:scale-105">
            <CheckCircle className="w-8 h-8 text-[#88D498] mb-3" />
            <div className="text-4xl font-bold text-[#88D498] mb-2">{total - alerts}</div>
            <div className="text-gray-600 font-medium">Stable Status</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md transition-all hover:shadow-lg hover:scale-105">
            <AlertCircle className="w-8 h-8 text-[#E59866] mb-3" />
            <div className="text-4xl font-bold text-[#E59866] mb-2">{alerts}</div>
            <div className="text-gray-600 font-medium">Active Alerts</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md transition-all hover:shadow-lg hover:scale-105">
            <Activity className="w-8 h-8 text-[#E6B800] mb-3" />
            <div className="text-4xl font-bold text-[#E6B800] mb-2">{avgSteps}</div>
            <div className="text-gray-600 font-medium">Avg Steps/Day</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-[#1B263B]">
              <Bell className="w-5 h-5 mr-2 text-[#E59866]" />
              Active Alerts
            </h3>
            <div className="space-y-3">
              {residents.map(r => r.alerts && r.alerts.map((alert, i) => (
                <div key={`${r.id}-${i}`} className="p-4 bg-[#E59866]/10 rounded-2xl border-l-4 border-[#E59866] transition-all hover:shadow-md">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-[#E59866] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-[#1B263B]">{r.name}</div>
                      <div className="text-sm text-gray-700">{alert}</div>
                      <div className="text-xs text-gray-500 mt-1">Room {r.room} • Priority: Medium</div>
                    </div>
                  </div>
                </div>
              )))}
              {!residents.some(r => r.alerts) && (
                <div className="text-center text-gray-500 py-8">
                  <CheckCircle className="w-12 h-12 text-[#88D498] mx-auto mb-3" />
                  <p className="font-medium">No active alerts - all residents stable</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-[#1B263B]">
              <Sparkles className="w-5 h-5 mr-2 text-[#E6B800]" />
              AI-Generated Insights
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-[#A9D6E5]/10 rounded-2xl border-l-4 border-[#A9D6E5] transition-all hover:shadow-md">
                <div className="font-semibold text-[#1B263B] mb-2">Hydration Trend</div>
                <p className="text-sm text-gray-700 leading-relaxed">Facility-wide hydration levels are 8% below target. Recommend increased fluid encouragement during afternoon activities.</p>
              </div>
              <div className="p-4 bg-[#88D498]/10 rounded-2xl border-l-4 border-[#88D498] transition-all hover:shadow-md">
                <div className="font-semibold text-[#1B263B] mb-2">Activity Optimization</div>
                <p className="text-sm text-gray-700 leading-relaxed">Morning exercise participation up 15% this week. Consider expanding morning programming capacity.</p>
              </div>
              <div className="p-4 bg-[#E6B800]/10 rounded-2xl border-l-4 border-[#E6B800] transition-all hover:shadow-md">
                <div className="font-semibold text-[#1B263B] mb-2">Sleep Quality</div>
                <p className="text-sm text-gray-700 leading-relaxed">Average sleep duration: 6.2 hours. Within healthy range for age group. One resident showing lighter sleep patterns - monitoring recommended.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1B263B]">Facility-Wide Health Trends</h3>
            <button onClick={generateReport} className="flex items-center gap-2 px-4 py-2 bg-[#1B263B] text-white rounded-xl hover:bg-[#2d3e5f] transition-all hover:shadow-lg transform hover:scale-105 active:scale-95">
              <Download className="w-4 h-4" />
              Export Analytics
            </button>
          </div>
          <div className="bg-[#F7F7F7] p-4 rounded-2xl">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d0d0d0" />
                <XAxis dataKey="day" stroke="#666" style={{fontSize: '12px'}} />
                <YAxis stroke="#666" style={{fontSize: '12px'}} />
                <Tooltip contentStyle={{backgroundColor: '#fff', border: '2px solid #1B263B', borderRadius: '12px', padding: '8px'}} />
                <Line type="monotone" dataKey="heartRate" stroke="#E59866" strokeWidth={3} dot={{fill: '#E59866', r: 5}} name="Avg Heart Rate" />
                <Line type="monotone" dataKey="sleep" stroke="#88D498" strokeWidth={3} dot={{fill: '#88D498', r: 5}} name="Avg Sleep (hrs)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 p-4 bg-[#E6B800]/10 rounded-2xl border-l-4 border-[#E6B800]">
            <div className="flex items-center mb-2">
              <Sparkles className="w-4 h-4 text-[#E6B800] mr-2 animate-pulse" />
              <span className="font-semibold text-[#1B263B] text-sm">Predictive AI Analysis</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">Facility health metrics showing positive trajectory. Average heart rate stable at {avgHR} bpm across all residents. Sleep quality improving week-over-week. Recommend maintaining current care protocols with enhanced hydration focus.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-[#1B263B]">Resident Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Resident</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Room</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Heart Rate</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Steps</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Sleep</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {residents.map(r => (
                  <tr key={r.id} className="border-b hover:bg-[#F7F7F7] transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{r.photo}</span>
                        <span className="font-medium text-gray-800">{r.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{r.room}</td>
                    <td className="py-4 px-4 text-gray-700">{r.wearableData.heartRate} bpm</td>
                    <td className="py-4 px-4 text-gray-700">{r.wearableData.steps}</td>
                    <td className="py-4 px-4 text-gray-700">{r.wearableData.sleep}h</td>
                    <td className="py-4 px-4">
                      {r.alerts ? (
                        <span className="px-3 py-1 bg-[#E59866]/20 text-[#E59866] rounded-full text-sm font-medium">⚠ Alert</span>
                      ) : (
                        <span className="px-3 py-1 bg-[#88D498]/20 text-[#88D498] rounded-full text-sm font-medium">✓ Stable</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-md border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-3xl mr-3">🧠</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">NuvienAI</h1>
                <p className="text-sm text-gray-600">Auren Vale Haven Assisted Living</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setActiveView('caregiver')} className={`px-6 py-2 rounded-lg font-medium transition-all ${activeView === 'caregiver' ? 'bg-[#A9D6E5] text-gray-800 shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Caregiver
              </button>
              <button onClick={() => setActiveView('family')} className={`px-6 py-2 rounded-lg font-medium transition-all ${activeView === 'family' ? 'bg-[#D8C3A5] text-gray-800 shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Family
              </button>
              <button onClick={() => setActiveView('admin')} className={`px-6 py-2 rounded-lg font-medium transition-all ${activeView === 'admin' ? 'bg-[#1B263B] text-white shadow-md scale-105' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeView === 'caregiver' && <CaregiverDashboard />}
        {activeView === 'family' && <FamilyDashboard />}
        {activeView === 'admin' && <AdminDashboard />}
      </div>

      <div className="bg-gradient-to-r from-[#1B263B] to-[#2d3e5f] text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">NuvienAI MVP — Powered by Dual AI Integration</p>
              <p className="text-sm opacity-80 mt-1">Gemini + OpenAI • Real-time Wearable Data • Compassionate Care Technology</p>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-70">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuvienAI;
