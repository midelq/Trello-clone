import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import BoardsPage from './pages/BoardsPage';
import DashboardPage from './pages/DashboardPage';
import BoardView from './pages/BoardView';
import { UserProvider } from './contexts/UserContext';


function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/board/:boardId" element={<BoardView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
