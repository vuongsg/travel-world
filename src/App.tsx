import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import { About } from './components/About';
import { Root } from './components/Root';
import { Homepage } from './components/Homepage';

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Homepage />
        },
        {
          path: "about",
          element: <About />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={routers} />
  );
}

export default App;
