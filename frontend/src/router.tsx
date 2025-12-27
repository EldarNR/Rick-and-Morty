import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { CharacterList } from './pages/CharacterList';
import { CharacterDetail } from './pages/CharacterDetail';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Navigate to="/characters" replace /> },
            { path: 'characters', element: <CharacterList /> },
            { path: 'characters/:id', element: <CharacterDetail /> },
            {
                path: 'episodes',
                element: <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.5rem', color: '#f5f5f5' }}>Episodes functionality coming soon...</div>
            },
            {
                path: 'locations',
                element: <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.5rem', color: '#f5f5f5' }}>Locations functionality coming soon...</div>
            },
        ],
    },
]);

export default router;
