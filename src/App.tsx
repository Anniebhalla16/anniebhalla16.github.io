import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import About from './pages/About';
import Contact from './pages/Contact';
import Experiences from './pages/Experience';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import Projects from './pages/Projects';
import Research from './pages/Research';
import routes from './routes';



function App() {
  const router = createBrowserRouter([
    {
      path: routes.layout,
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Navigate to={routes.home} replace />,
        },
        {
          path: routes.home,
          element: <Home />
        },
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
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
