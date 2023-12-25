import { useEffect, useRef, useState } from 'react';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';

import './App.css';

function App() {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl) {
      setEditor(editor => {
        if (editor) return editor;

        return monaco.editor.create(monacoEl.current!, {
          value: ['function x() {', '\tconsole.log("Hello World!");', '}'].join('\n'),
          language: 'typescript',
        });
      });
    }

    return () => editor?.dispose();
  }, [editor]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div
        ref={monacoEl}
        style={{
          display: 'block',
          width: 800,
          height: 600,
          border: '1px solid grey',
        }}
      ></div>
    </>
  );
}

export default App;
