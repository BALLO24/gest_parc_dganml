import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/LoginPage';
import AppLayout from './components/AppLayout';
import MaterielsPage from './pages/MaterielsPage';
import AgentsPage from './pages/AgentsPage.jsx';
import SitesPage from './pages/SitesPage';
import TypesMaterielsPage from './pages/TypesMaterielsPage';
import UtilisateursPage from './pages/UtilisateursPage';
import PageIntrouvable from './pages/PageIntrouvable.jsx';

import { AuthProvider } from './components/AuthProvider.jsx';
import PrivateRoute from './components/PrivateRoute';
import AuthChecker from './components/AuthChecker.jsx';

function App() {
    return (
    <AuthProvider>
      <Router>
            <AuthChecker />
        <Routes>

          {/* Route publique */}
          <Route path="/" element={<LoginForm />} />

          {/* Routes protégées */}
          <Route 
            path="/app" 
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="materiels" />} />
            <Route path="materiels" element={<MaterielsPage />} />
            <Route path="agents" element={<AgentsPage />} />
            <Route path="sites" element={<SitesPage />} />
            <Route path="types-materiels" element={<TypesMaterielsPage />} />
            <Route path="utilisateurs" element={<UtilisateursPage />} />
          </Route>
          <Route path="*" element={<PageIntrouvable/>}/>

        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
