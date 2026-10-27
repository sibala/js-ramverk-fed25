import { createBrowserRouter, RouterProvider } from 'react-router';
import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import Notes from './pages/Notes';
import NewNote from './pages/NewNote';
import NoteDetail from './pages/NoteDetail';
import NotFound from './pages/NotFound';
import EditNote from './pages/EditNote';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "notes", Component: Notes },
      { path: "notes/new", Component: NewNote },
      { path: "notes/:noteId", Component: NoteDetail },
      { path: "notes/:noteId/edit", Component: EditNote },
      { path: "about", Component: About },
      { path: "*", Component:  NotFound },
    ],
  },
]);


const RouterExample = () => {
  return <RouterProvider router={router} />
}

export default RouterExample