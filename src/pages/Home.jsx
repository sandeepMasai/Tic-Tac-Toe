
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { GamepadIcon, Users, Trophy, Zap } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen gradient-game-bg flex flex-col">
      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 text-center text-white">
        <div className="bounce-in">
          <GamepadIcon size={80} className="mx-auto mb-6 text-white drop-shadow-lg" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Tic-Tac-Toe Online
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed opacity-90">
          Challenge friends or random opponents in the ultimate strategy showdown. 
          Join thousands of players in fast-paced matches!
        </p>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl">
          <div className="gradient-game-card p-6 rounded-xl text-center">
            <Users size={40} className="mx-auto mb-3 text-game-accent" />
            <h3 className="text-lg font-bold mb-2">Multiplayer</h3>
            <p className="text-sm opacity-80">Play against friends or find random opponents</p>
          </div>
          
          <div className="gradient-game-card p-6 rounded-xl text-center">
            <Zap size={40} className="mx-auto mb-3 text-game-warning" />
            <h3 className="text-lg font-bold mb-2">Real-time</h3>
            <p className="text-sm opacity-80">Instant moves with live game updates</p>
          </div>
          
          <div className="gradient-game-card p-6 rounded-xl text-center">
            <Trophy size={40} className="mx-auto mb-3 text-game-accent" />
            <h3 className="text-lg font-bold mb-2">Competitive</h3>
            <p className="text-sm opacity-80">Track wins and climb the leaderboards</p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {user ? (
            <Link to="/dashboard">
              <button size="lg" className="bg-game-accent hover:bg-game-accent/90 text-white font-bold py-4 px-8 rounded-full text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 game-glow">
                Enter Game Lobby
              </button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <button size="lg" className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/30">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button size="lg" className="bg-game-accent hover:bg-game-accent/90 text-white font-bold py-4 px-8 rounded-full text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 game-glow">
                  Start Playing
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-white/60 p-6 border-t border-white/20">
        <p>&copy; 2024 Tic-Tac-Toe Online. Ready to play?</p>
      </footer>
    </div>
  );
};

export default Home;