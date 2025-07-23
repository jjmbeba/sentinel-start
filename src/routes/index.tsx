// src/routes/index.tsx

import { createFileRoute } from '@tanstack/react-router';
import { useSession } from '@/lib/auth-client';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Home page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
