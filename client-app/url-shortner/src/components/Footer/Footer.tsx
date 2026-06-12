import * as React from 'react';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <div className="bg-slate-900 text-white text-base text-center py-5">
       Copyright &#169; URLShortner | Shreesha Kuragayala
    </div>
  );
};

export default App;
