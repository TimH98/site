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
import About from './about';
import ColorCue from './color-cue';
import Build from './four-words/build';
import Solve from './four-words/solve';
import FourWordsAbout from './four-words/about';

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
        <Route path="/four-words" element={<FourWordsAbout />} />
        <Route path="/four-words/build" element={<Build />} />
        <Route path="/four-words/play" element={<Solve />} />
        <Route path="/color-cue" element={<ColorCue />} />
        <Route path="/lyric-cloud" element={<LyricCloud />} />
        <Route path="/evo" element={<Evo />} />
        <Route path="/evo/about" element={<EvoAbout />} />
        <Route path="/schmoovst" element={<Schmoovst />} />
        <Route path="/schmoovst/game" element={<ShooterGame />} />
        <Route path="/pirates" element={<Pirates />} />
        <Route path="/pirates/results" element={<Results />} />
        <Route path="/blog" element={<Blog key="blog" />} />
        <Route path="/portfolio" element={<Blog key="portfolio" filter="portfolio" />} />
        <Route path="/" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
