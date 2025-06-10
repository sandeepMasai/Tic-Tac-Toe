
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Play,  Trophy } from "lucide-react";
const Dashboard = () => {
  const { user, } = useAuth();

  const totalGames = (user?.wins || 0) + (user?.losses || 0) + (user?.draws || 0);
  const winRate =
    totalGames > 0 ? Math.round(((user?.wins || 0) / totalGames) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
     
      {/* Welcome Message */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">Welcome back, {user?.username}!</h2>
          <p className="text-white/70 text-lg">Ready for your next match?</p>
        </div>

        {/* Game Mode Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/gamelobby"
            className="group border border-white/20 p-6 rounded-lg hover:bg-white/10 transition-all"
          >
            <div className="flex flex-col items-center">
              <div className="bg-white/10 p-3 rounded-full mb-4 group-hover:bg-white/20">
                <Play size={32} />
              </div>
             
            Play with Friends
             
              
              <p className="text-white/70 text-center">Join a random opponent</p>
            </div>
          </Link>

          {/* <Link
            to="/game?mode=friends"
            className="group border border-white/20 p-6 rounded-lg hover:bg-white/10 transition-all"
          >
            <div className="flex flex-col items-center">
              <div className="bg-white/10 p-3 rounded-full mb-4 group-hover:bg-white/20">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-1">Play with Friends</h3>
              <p className="text-white/70 text-center">Create a private room</p>
            </div>
          </Link> */}

          <div className="group border border-white/20 p-6 rounded-lg bg-white/5 cursor-not-allowed opacity-50">
            <div className="flex flex-col items-center">
              <div className="bg-white/10 p-3 rounded-full mb-4">
                <Trophy size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-1">Tournament</h3>
              <p className="text-white/70 text-center">Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Profile & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Card */}
          <div className="border border-white/20 p-6 rounded-lg bg-white/5">
            <h3 className="text-2xl font-semibold mb-4">Your Profile</h3>
            {user ? (
              <ul className="space-y-2 text-white/90">
                <li><strong>Username:</strong> {user.username}</li>
                <li><strong>Email:</strong> {user.email}</li>
                <li><strong>Wins:</strong> {user.wins || 0}</li>
                <li><strong>Losses:</strong> {user.losses || 0}</li>
                <li><strong>Draws:</strong> {user.draws || 0}</li>
              </ul>
            ) : (
              <p className="text-white/60">Loading user data...</p>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="border border-white/20 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold">{totalGames}</div>
              <div className="text-white/70">Games Played</div>
            </div>
            <div className="border border-white/20 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-400">{user?.wins || 0}</div>
              <div className="text-white/70">Wins</div>
            </div>
            <div className="border border-white/20 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold">{winRate}%</div>
              <div className="text-white/70">Win Rate</div>
            </div>
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default Dashboard;
