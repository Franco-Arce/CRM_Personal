import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import ProjectsCRM from './pages/ProjectsCRM';
import Accountability from './pages/Accountability';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-codeflow-bg">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectsCRM />} />
            <Route path="/accountability" element={<Accountability />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
