
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import AirportGame from './components/AirportGame';
import ResultsPage from './components/ResultsPage';
import HardModeGame from './components/game/HardModeGame';
import HardModeResults from './components/game/HardModeResults';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/game" element={<AirportGame />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/hard-game" element={<HardModeGame />} />
            <Route path="/hard-results" element={<HardModeResults />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
