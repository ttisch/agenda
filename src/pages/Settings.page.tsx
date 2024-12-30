import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';

export function SettingsPage() {
  const navigate = useNavigate();
  return (
    <>
      <h3>Settings</h3>
      <p>Coming soon...</p>
      <Button variant="filled" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </>
  );
}
