import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GameBoard from './components/GameBoard'; 
import NotFound from './pages/NotFound';
import GameLobby from './components/GameLobby';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game/:id"
              element={
                <ProtectedRoute>
                  <GameBoard />
                </ProtectedRoute>
              }
            />
             <Route
              path="/gamelobby"
              element={
                <ProtectedRoute>
                  <GameLobby />
                </ProtectedRoute>
              }
            />

           
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Toaster position="top-right" reverseOrder={false} />
      </Router>
    </AuthProvider>
  );
}

export default App;