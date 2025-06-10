

import  { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import API from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import Square from './Board'; 
import Spinner from './Spinner';
import toast from 'react-hot-toast';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const GameBoard = () => {
  const { id: gameId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Fetch game data
  const fetchGame = useCallback(async () => {
    try {
      const response = await API.get(`/games/${gameId}`);
      setGame(response.data);
    } catch (err) {
      console.error('Error fetching game:', err);
      setError('Failed to load game. It might not exist or you are not authorized.');
      toast.error('Failed to load game.');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  }, [gameId, navigate]);

  // Setup WebSocket
  useEffect(() => {
    fetchGame();
    const socket = io(SOCKET_URL, { transports: ['websocket'] });

    socket.on('connect', () => {
      console.log('Connected to socket:', socket.id);
      socket.emit('joinGameRoom', gameId);
    });

    socket.on('gameUpdated', updatedGame => {
      console.log('Game updated:', updatedGame);
      setGame(updatedGame);

      if (updatedGame.status === 'finished') {
        const isWinner = updatedGame.winner?._id === user._id;
        if (updatedGame.draw) {
          toast('It\'s a Draw!', { icon: '🤝' });
        } else if (isWinner) {
          toast.success('🎉 You Win! 🎉');
        } else {
          toast.info(`${updatedGame.winner?.username} wins!`);
        }
      }
    });

    socket.on('connect_error', err => {
      console.error('Socket connection failed:', err);
      toast.error('Socket connection failed.');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected.');
    });

    return () => {
      socket.emit('leaveGameRoom', gameId);
      socket.disconnect();
    };
  }, [fetchGame, gameId, user]);

  // Handle user move
  const handleSquareClick = async (position) => {
    if (!game || game.status !== 'in-progress') return;

    const isMyTurn = game.currentPlayer?._id === user._id;
    const isPositionTaken = game.board[position] !== null;

    if (!isMyTurn || isPositionTaken) {
      toast.error("Invalid move or not your turn.");
      return;
    }

    const playerMark = game.players[0]._id === user._id ? 'X' : 'O';
    const updatedBoard = [...game.board];
    updatedBoard[position] = playerMark;
    const nextPlayer = game.players.find(p => p._id !== user._id);

    setGame(prev => ({
      ...prev,
      board: updatedBoard,
      currentPlayer: nextPlayer,
    }));

    try {
      await API.put(`/games/${gameId}/move`, { position });
    } catch (err) {
      console.error('Move failed:', err);
      toast.error(err.response?.data?.message || 'Failed to make move.');
      fetchGame(); 
    }
  };

  // Cancel game with confirmation
  const handleCancelGame = async () => {
    try {
      await API.delete(`/games/${gameId}`);
      toast.success("Game cancelled.");
      navigate('/dashboard');
    } catch (err) {
      console.error('Cancel failed:', err);
      toast.error(err.response?.data?.message || 'Failed to cancel game.');
    } finally {
      setShowCancelModal(false);
    }
  };

  // Start new game
  const handleNewGame = async () => {
    try {
      const response = await API.post('/games');
      const newGameId = response.data._id;
      navigate(`/game/${newGameId}`);
    } catch (err) {
      console.error('New game creation failed:', err);
      toast.error(err.response?.data?.message || 'Failed to create new game.');
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500 font-bold mt-8">{error}</div>;
  if (!game) return <div className="text-center text-gray-500 mt-8">Game data not found.</div>;

  const [player1, player2] = game.players;
  const currentPlayerId = game.currentPlayer?._id;
  const isMyTurn = currentPlayerId === user._id;
  const myMark = player1?._id === user._id ? 'X' : 'O';
  const opponentMark = myMark === 'X' ? 'O' : 'X';

  let statusText = '';
  let statusColor = 'text-gray-700';

  if (game.status === 'waiting') {
    statusText = `Waiting for Player 2... (Share this URL: ${window.location.href})`;
    statusColor = 'text-yellow-600';
  } else if (game.status === 'in-progress') {
    statusText = isMyTurn ? "It's your turn!" : `Waiting for ${game.currentPlayer?.username}'s turn...`;
    statusColor = isMyTurn ? 'text-green-600' : 'text-blue-600';
  } else if (game.status === 'finished') {
    if (game.winner) {
      const won = game.winner._id === user._id;
      statusText = won ? 'You won!' : `${game.winner.username} won!`;
      statusColor = won ? 'text-green-700' : 'text-red-700';
    } else if (game.draw) {
      statusText = "It's a Draw!";
      statusColor = 'text-purple-700';
    }
  }

  return (
    <div className="container mx-auto p-4 mt-8 bg-white shadow-xl rounded-lg max-w-4xl">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Tic-Tac-Toe Game</h2>

      {/* Players Info */}
      <div className="flex justify-between items-center mb-6 px-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-blue-800">Player X: {player1?.username || 'Waiting...'}</p>
          {currentPlayerId === player1?._id && <span className="text-blue-500 text-sm font-medium"> (Current Turn)</span>}
          {player1?._id === user._id && <p className="text-gray-500 text-sm">(You)</p>}
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold italic">VS</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-red-800">Player O: {player2?.username || 'Waiting...'}</p>
          {currentPlayerId === player2?._id && <span className="text-red-500 text-sm font-medium"> (Current Turn)</span>}
          {player2?._id === user._id && <p className="text-gray-500 text-sm">(You)</p>}
        </div>
      </div>

      {/* Game status */}
      <div className="text-center mb-8">
        <p className={`text-2xl font-bold ${statusColor}`}>{statusText}</p>
        {game.status === 'waiting' && (
          <p className="text-sm text-gray-600 mt-2">
            Your game ID: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{gameId}</span>
          </p>
        )}
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-sm mx-auto">
        {game.board.map((value, i) => (
          <Square key={i} value={value} onClick={() => handleSquareClick(i)} />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="text-center mt-8 space-y-4">
        {game.status === 'finished' && (
          <>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleNewGame}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Start New Game
            </button>
          </>
        )}

        {game.status !== 'finished' && (
          <button
            onClick={() => setShowCancelModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Cancel Game
          </button>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Cancel Game?</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to cancel this game? This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelGame}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Yes, Cancel
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
