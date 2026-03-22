import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeDashboard from './components/HomeDashboard';
import AiStudyPlanner from './components/AiStudyPlanner';
import FocusTimer from './components/FocusTimer';
import PerformanceInsights from './components/PerformanceInsights';
import ProfileSettings from './components/ProfileSettings';
import VideoProcessor from './components/VideoProcessor';
import EnhancedAITutor from './components/EnhancedAITutor';
import AdaptivePracticeDashboard from './components/AdaptivePracticeDashboard';
import { TimerProvider } from './components/TimerContext';

function App() {
  return (
    <TimerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/planner" element={<AiStudyPlanner />} />
          <Route path="/timer" element={<FocusTimer />} />
          <Route path="/performance" element={<PerformanceInsights />} />
          <Route path="/ai-tutor" element={<EnhancedAITutor />} />
          <Route path="/video-processor" element={<VideoProcessor />} />
          <Route path="/practice" element={<AdaptivePracticeDashboard />} />
          <Route path="/profile" element={<ProfileSettings />} />
        </Routes>
      </BrowserRouter>
    </TimerProvider>
  );
}

export default App;
