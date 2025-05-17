import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import About from './pages/About';
import Contact from './pages/Contact';
import Experiences from './pages/Experience';
import PageNotFound from './pages/PageNotFound';
import Projects from './pages/Projects';
import Research from './pages/Research';
import routes from './routes';



function App() {
  const router = createBrowserRouter([
    {
      path: routes.home,
      element: <AppLayout />,
      children: [
        {
          path: routes.about,
          element: <About name='annie' />
        },
        {
          path: routes.experience,
          element: <Experiences />
        },
        {
          path: routes.projects,
          element: <Projects />
        },
        {
          path: routes.research,
          element: <Research />
        },
        {
          path: routes.contact,
          element: <Contact />
        },
      ]
    },
    {
      path: '*',
      element: <PageNotFound />
    },
    // {
    //   path: routes.login,
    //   element: <Login />
    // }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
