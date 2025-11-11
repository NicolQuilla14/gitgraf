import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { TeamSetup } from './components/TeamSetup';
import { GamePlay } from './components/GamePlay';
import { VictoryScreen } from './components/VictoryScreen';

export type GameStage = 'welcome' | 'setup' | 'playing' | 'victory';

export interface Team {
  id: string;
  name: string;
  color: string;
  cluesFound: number;
  currentLocation: string;
}

export default function App() {
  const [gameStage, setGameStage] = useState<GameStage>('welcome');
  const [teams, setTeams] = useState<Team[]>([]);
  const [winningTeam, setWinningTeam] = useState<Team | null>(null);

  const handleStartSetup = () => {
    setGameStage('setup');
  };

  const handleTeamsReady = (newTeams: Team[]) => {
    setTeams(newTeams);
    setGameStage('playing');
  };

  const handleTeamWin = (team: Team) => {
    setWinningTeam(team);
    setGameStage('victory');
  };

  const handleRestart = () => {
    setGameStage('welcome');
    setTeams([]);
    setWinningTeam(null);
  };

  return (
    <div className="min-h-screen">
      {gameStage === 'welcome' && <WelcomeScreen onStart={handleStartSetup} />}
      {gameStage === 'setup' && <TeamSetup onTeamsReady={handleTeamsReady} />}
      {gameStage === 'playing' && (
        <GamePlay 
          teams={teams} 
          setTeams={setTeams}
          onTeamWin={handleTeamWin} 
        />
      )}
      {gameStage === 'victory' && winningTeam && (
        <VictoryScreen team={winningTeam} onRestart={handleRestart} />
      )}
    </div>
  );
}
