import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ChapterViewer from './components/ChapterViewer.tsx';
import { ThemeProvider } from './components/ui/theme-provider'
import App from './App.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <span> 404 Not Found </span>,
    children: [
      {
        index: true,
        element: <Navigate to="/chapters/0-introduction" replace />
      },
      {
        path: "chapters/:chapterId",
        element: <ChapterViewer />
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
