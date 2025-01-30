import { Navigate, Route, Routes } from 'react-router-dom';
// import ChatBox from './components/ChatBox';
import ResearchPage from './pages/Research';
import LeaderboardPage from './pages/LeaderBoard';
import InfluencerDetailPage from './pages/InfluencerDetail';

const AppRoutes = () => {
  return (
      // <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/research" />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/detail" element={<InfluencerDetailPage />} />
        </Routes>
      // </Router>
  );
};

export default AppRoutes;
