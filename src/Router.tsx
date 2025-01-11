import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/Home.page';
import { SettingsPage } from './pages/Settings.page';
import { TestPage } from './pages/Test.page';

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
      {
        path: 'demo',
        element: <TestPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
