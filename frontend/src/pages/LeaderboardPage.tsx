// import React from 'react';
import Leaderboard from '../components/Leaderboard';

const LeaderboardPage = () => {
  // Mock data with both profile and score avatars
  const players = [
    { 
      id: '1', 
      name: 'Abbas', 
      level: 56, 
      score: 50000,
      avatar: 'https://i.pravatar.cc/150?img=1',
      scoreAvatar: 'https://cdn-icons-png.flaticon.com/512/3132/3132693.png' // Gold coin
    },
    { 
      id: '2', 
      name: 'John', 
      level: 53, 
      score: 45000,
      avatar: 'https://i.pravatar.cc/150?img=2',
      scoreAvatar: 'https://cdn-icons-png.flaticon.com/512/3132/3132691.png' // Silver coin
    },
    { 
      id: '3', 
      name: 'Robert', 
      level: 47, 
      score: 39000,
      avatar: 'https://i.pravatar.cc/150?img=3',
      scoreAvatar: 'https://cdn-icons-png.flaticon.com/512/3132/3132688.png' // Bronze coin
    },
    { 
      id: '4', 
      name: 'Duncan', 
      level: 46, 
      score: 41000,
      avatar: 'https://i.pravatar.cc/150?img=4',
      scoreAvatar: 'https://cdn-icons-png.flaticon.com/512/1792/1792691.png' // Dollar bill
    },
    { 
      id: '5', 
      name: 'Sam', 
      level: 44, 
      score: 39000,
      avatar: 'https://i.pravatar.cc/150?img=5',
      scoreAvatar: 'https://cdn-icons-png.flaticon.com/512/1792/1792691.png' // Dollar bill
    },
    { 
      id: '6', 
      name: 'John', 
      level: 40, 
      score: 39000,
      avatar: 'https://i.pravatar.cc/150?img=6',
      scoreAvatar: 'https://cdn-icons-png.flaticon.com/512/1792/1792691.png' // Dollar bill
    },
    { 
      id: '7', 
      name: 'Duncan', 
      level: 38, 
      score: 39000,
      avatar: 'https://i.pravatar.cc/150?img=7',
      scoreAvatar: 'https://cdn-icons-png.flaticon.com/512/1792/1792691.png' // Dollar bill
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <Leaderboard players={players} />
        
        {/* Alternative styling example */}
        <div className="mt-8">
          <Leaderboard 
            players={players.slice(0, 5)} 
            title="Top 5 Players" 
            className="border-2 border-indigo-200"
          />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
