import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/Home.page';
import { SettingsPage } from './pages/Settings.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
