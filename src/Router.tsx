import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatBox from './components/ChatBox';
import ResearchPage from './pages/Research';
import LeaderboardPage from './pages/LeaderBoard';
import InfluencerDetailPage from './pages/InfluencerDetail';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ResearchPage />} />
        <Route path="/chatbox" element={<ChatBox />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/detail" element={<InfluencerDetailPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
