import React from 'react';
import Blog from './blog/blog';
import wood from './image/wood.jpg';
import { Route, Routes } from 'react-router-dom';
import Pirates from './pirates';
import Results from './pirates/results';
import Shooter from './shooter';
import ShooterGame from './shooter/game';

function App() {
  return (
    <div style={{
      backgroundImage: `url(${wood})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100vh',
    }}>
      <Routes>
        <Route path="/shooter" element={<Shooter />} />
        <Route path="/shooter/game" element={<ShooterGame />} />
        <Route path="/pirates" element={<Pirates />} />
        <Route path="/pirates/results" element={<Results />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/" element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;
