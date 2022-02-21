import React from 'react';

function App() {
  const [test, setTest] = React.useState('');
  
  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:8000/test');
      const text = response.ok ? 'All good' : 'Oh noes';
      setTest(text);
    };

    getData();
  }, []);

  return (
    <div>
      <p>{test}</p>
    </div>
  );
}

export default App;
