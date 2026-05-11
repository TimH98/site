import React from 'react';
import Blog from './blog/blog';
import wood from './image/wood.jpg';
import { Route, Routes } from 'react-router-dom';
import Pirates from './pirates';
import Results from './pirates/results';
import Schmoovst from './schmoovst';
import ShooterGame from './schmoovst/game';
import Evo from './evo';
import EvoAbout from './evo/about';
import LyricCloud from './lyric-cloud/index';
import ColorCueSetup from './color-cue/index';
import ColorCue from './color-cue/game';
import About from './about';

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
        <Route path="/about" element={<About />} />
        <Route path="/color-cue" element={<ColorCueSetup />} />
        <Route path="/color-cue/start" element={<ColorCue />} />
        <Route path="/lyric-cloud" element={<LyricCloud />} />
        <Route path="/evo" element={<Evo />} />
        <Route path="/evo/about" element={<EvoAbout />} />
        <Route path="/schmoovst" element={<Schmoovst />} />
        <Route path="/schmoovst/game" element={<ShooterGame />} />
        <Route path="/pirates" element={<Pirates />} />
        <Route path="/pirates/results" element={<Results />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/portfolio" element={<Blog filter="portfolio" />} />
        <Route path="/" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
