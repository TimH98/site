import React from 'react';
import dumb from './image/dumb.jpg'

function App() {
  return (
    <div style={{textAlign: 'center'}}>
      <h1>Sup fam</h1>
      <img src={dumb} alt='me' style={{
        maxHeight: '80vh'
      }} />
    </div>
  );
}

export default App;
