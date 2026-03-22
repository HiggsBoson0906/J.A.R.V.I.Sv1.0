import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeDashboard from './components/HomeDashboard';
import AiStudyPlanner from './components/AiStudyPlanner';
import FocusTimer from './components/FocusTimer';
import PerformanceInsights from './components/PerformanceInsights';
import Resources from './components/Resources';
import ProfileSettings from './components/ProfileSettings';
import VideoProcessor from './components/VideoProcessor';
import EnhancedAITutor from './components/EnhancedAITutor';
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
          <Route path="/resources" element={<Resources />} />
          <Route path="/ai-tutor" element={<EnhancedAITutor />} />
          <Route path="/video-processor" element={<VideoProcessor />} />
          <Route path="/profile" element={<ProfileSettings />} />
        </Routes>
      </BrowserRouter>
    </TimerProvider>
  );
}

export default App;
