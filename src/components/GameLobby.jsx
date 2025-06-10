import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

const GameLobby = () => {
  const [availableGames, setAvailableGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAvailableGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get('/games/available');
      setAvailableGames(response.data);
    } catch (err) {
      console.error('Error fetching available games:', err);
      setError('Failed to fetch games.');
      toast.error('Failed to load available games.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableGames();
    // Poll for new games every few seconds (optional, Websockets are better)
    const interval = setInterval(fetchAvailableGames, 5000);
    return () => clearInterval(interval);
  }, []);

//   const handleCreateGame = async () => {
//     try {
//       const response = await API.post('/games');
//       toast.success('Game created! Waiting for opponent...');
//       // Redirect to the newly created game
//       window.location.href = `/game/${response.data.game._id}`;
//     } catch (err) {
//       console.error('Error creating game:', err);
//       const errorMessage = err.response?.data?.message || 'Failed to create game.';
//       toast.error(errorMessage);
//     }
//   };



  const handleJoinGame = async (gameId) => {
    try {
      const response = await API.put(`/games/${gameId}/join`);
      toast.success('Joined game!');
      window.location.href = `/game/${response.data.game._id}`;
    } catch (err) {
      console.error('Error joining game:', err);
      const errorMessage = err.response?.data?.message || 'Failed to join game.';
      toast.error(errorMessage);
    }
  };
  const handleCreateGame = async () => {
  try {
    const response = await API.post('/games'); // ✅ token will be attached automatically
    toast.success('Game created! Waiting for opponent...');
    window.location.href = `/game/${response.data.game._id}`;
  } catch (err) {
    console.error('Error creating game:', err);
    const errorMessage = err.response?.data?.message || 'Failed to create game.';
    toast.error(errorMessage);
  }
};


  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500 font-bold mt-8">{error}</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl bg-white shadow-lg rounded-lg my-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Game Lobby</h2>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleCreateGame}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Create New Game
        </button>
      </div>

      <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Available Games</h3>
      {availableGames.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No games waiting for players. Create one!</p>
      ) : (
        <ul className="space-y-4">
          {availableGames.map((game) => (
            <li
              key={game._id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100 transition duration-200"
            >
              <div className="flex-1">
                <span className="font-semibold text-blue-700">Game ID:</span> {game._id.slice(-6)}
                <span className="ml-4 font-semibold text-purple-700">Creator:</span> {game.players[0]?.username || 'Unknown'}
              </div>
              <button
                onClick={() => handleJoinGame(game._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Join Game
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GameLobby;