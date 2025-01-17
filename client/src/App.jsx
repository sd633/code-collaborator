import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import MonacoEditor from '@monaco-editor/react';

const socket = io('http://localhost:3000');

const App = () => {
  const [code, setCode] = useState('// Start coding...');

  useEffect(() => {
    
    socket.on('load-code', (initialCode) => {
      setCode(initialCode);
    });

    
    socket.on('code-change', (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off('load-code');
      socket.off('code-change');
    };
  }, []);

  const handleEditorChange = (value) => {
    setCode(value);
    socket.emit('code-change', value); 
  };

  return (
    <div>
      <h1>Real-time Collaborative Code Editor</h1>
      <MonacoEditor
        height="90vh"
        language="javascript"
        value={code}
        theme="vs-dark"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default App;

