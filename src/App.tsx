import React from 'react';
import Blog from './blog/blog';
import wood from './image/wood.jpg';
import { Route, Routes } from 'react-router-dom';
import Pirates from './pirates';
import Results from './pirates/results';
import Schmoovst from './schmoovst';
import ShooterGame from './schmoovst/game';
import Evo from './evo';

function App() {
  return (
    <div style={{
      backgroundImage: `url(${wood})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      width: '100%',
      minHeight: '100vh',
    }}>
      <Routes>
        <Route path="/evo" element={<Evo />} />
        <Route path="/schmoovst" element={<Schmoovst />} />
        <Route path="/schmoovst/game" element={<ShooterGame />} />
        <Route path="/pirates" element={<Pirates />} />
        <Route path="/pirates/results" element={<Results />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/" element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;
