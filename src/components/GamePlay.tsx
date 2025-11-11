import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  MapPin, 
  Search, 
  FileText, 
  Users, 
  CheckCircle,
  AlertCircle,
  Eye,
  Building2,
  Banknote
} from 'lucide-react';
import type { Team } from '../App';
import { locations } from '../data/locations';
import { suspects } from '../data/suspects';

interface GamePlayProps {
  teams: Team[];
  setTeams: (teams: Team[]) => void;
  onTeamWin: (team: Team) => void;
}

export function GamePlay({ teams, setTeams, onTeamWin }: GamePlayProps) {
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showClue, setShowClue] = useState(false);
  const [currentClue, setCurrentClue] = useState<any>(null);
  const [showSuspects, setShowSuspects] = useState(false);

  const activeTeam = teams[activeTeamIndex];
  const totalCluesNeeded = 8;

  const selectLocation = (locationId: string) => {
    setSelectedLocation(locationId);
    setShowClue(false);
    setShowSuspects(false);
  };

  const investigateLocation = () => {
    if (!selectedLocation) return;

    const location = locations.find(loc => loc.id === selectedLocation);
    if (!location) return;

    const clueIndex = Math.min(activeTeam.cluesFound, location.clues.length - 1);
    const clue = location.clues[clueIndex];

    setCurrentClue(clue);
    setShowClue(true);

    // Update team's clues
    const updatedTeams = teams.map((team, index) => {
      if (index === activeTeamIndex) {
        return {
          ...team,
          cluesFound: team.cluesFound + 1,
          currentLocation: location.name,
        };
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  const nextTurn = () => {
    setShowClue(false);
    setSelectedLocation(null);
    setCurrentClue(null);
    setShowSuspects(false);
    setActiveTeamIndex((activeTeamIndex + 1) % teams.length);
  };

  const accuseSuspect = (suspectId: string) => {
    const suspect = suspects.find(s => s.id === suspectId);
    
    if (suspect?.isGuilty && activeTeam.cluesFound >= totalCluesNeeded) {
      // Team wins!
      onTeamWin(activeTeam);
    } else {
      alert(suspect?.isGuilty 
        ? '¡Casi! Necesitas más pistas antes de acusar.' 
        : '¡No es el corrupto correcto! Pierdes un turno.');
      nextTurn();
    }
  };

  const viewSuspects = () => {
    setShowSuspects(true);
    setShowClue(false);
  };

  const selectedLoc = selectedLocation ? locations.find(loc => loc.id === selectedLocation) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header - Current Turn */}
        <Card className={`p-6 border-4 ${teams[activeTeamIndex].color} bg-white/95 backdrop-blur-sm`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${activeTeam.color} border-4 border-white shadow-lg`} />
              <div>
                <p className="text-gray-600 text-sm">Turno de:</p>
                <h2 className="text-gray-900">{activeTeam.name}</h2>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-gray-600 text-sm">Pistas Encontradas</p>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900">{activeTeam.cluesFound} / {totalCluesNeeded}</span>
                </div>
              </div>
              <div>
                <Progress 
                  value={(activeTeam.cluesFound / totalCluesNeeded) * 100} 
                  className="w-40 h-3"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Main Game Area */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Column - Locations */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-4 bg-white/95 backdrop-blur-sm border-2 border-purple-600">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-6 h-6 text-purple-600" />
                <h3 className="text-purple-900">Ubicaciones en Bolivia</h3>
              </div>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => selectLocation(location.id)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedLocation === location.id
                        ? 'border-purple-600 bg-purple-50 shadow-md scale-105'
                        : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xl mt-1">{location.icon}</span>
                      <div className="flex-1">
                        <p className="text-gray-900 text-sm">{location.name}</p>
                        <p className="text-gray-600 text-xs">{location.city}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Middle Column - Investigation Area */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Location Detail */}
            {selectedLoc && !showClue && !showSuspects && (
              <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-blue-600">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{selectedLoc.icon}</span>
                    <div className="flex-1">
                      <h2 className="text-blue-900">{selectedLoc.name}</h2>
                      <p className="text-gray-600">{selectedLoc.city}</p>
                    </div>
                  </div>

                  <ImageWithFallback
                    src={selectedLoc.image}
                    alt={selectedLoc.name}
                    className="w-full h-64 object-cover rounded-lg border-4 border-blue-600"
                  />

                  <p className="text-gray-800">{selectedLoc.description}</p>

                  <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-600">
                    <div className="flex items-start gap-2">
                      <Banknote className="w-5 h-5 text-yellow-700 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-yellow-900 font-bold text-sm">Tipo de Coima Común:</p>
                        <p className="text-yellow-800 text-sm">{selectedLoc.corruptionType}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={investigateLocation}
                    className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Investigar esta Ubicación
                  </Button>
                </div>
              </Card>
            )}

            {/* No Location Selected */}
            {!selectedLocation && !showSuspects && (
              <Card className="p-12 bg-white/95 backdrop-blur-sm border-2 border-gray-300">
                <div className="text-center text-gray-500">
                  <Building2 className="w-20 h-20 mx-auto mb-4 opacity-30" />
                  <h3 className="text-gray-700 mb-2">Selecciona una Ubicación</h3>
                  <p>Elige un lugar de la lista para comenzar tu investigación</p>
                </div>
              </Card>
            )}

            {/* Clue Display */}
            {showClue && currentClue && (
              <Card className="p-6 bg-white/95 backdrop-blur-sm border-4 border-green-600 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <h2 className="text-green-900">¡Pista Encontrada!</h2>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border-2 border-green-600">
                    <p className="text-green-900 mb-2">{currentClue.type}</p>
                    <p className="text-gray-800">{currentClue.description}</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-600">
                    <div className="flex items-start gap-2">
                      <Eye className="w-5 h-5 text-blue-700 mt-1" />
                      <div>
                        <p className="text-blue-900 font-bold text-sm">Evidencia:</p>
                        <p className="text-blue-800 text-sm">{currentClue.evidence}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={nextTurn}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
                    >
                      Siguiente Turno
                    </Button>
                    {activeTeam.cluesFound >= totalCluesNeeded && (
                      <Button
                        onClick={viewSuspects}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      >
                        ¡Acusar al Corrupto!
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Suspects View */}
            {showSuspects && (
              <Card className="p-6 bg-white/95 backdrop-blur-sm border-4 border-red-600">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                    <h2 className="text-red-900">Sospechosos</h2>
                  </div>

                  <p className="text-gray-800">
                    Basándote en las pistas que has recolectado, ¿quién crees que es el coimeador principal? 
                    <span className="font-bold text-red-700"> ¡Cuidado! Si te equivocas, pierdes el turno.</span>
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {suspects.map((suspect) => (
                      <Card 
                        key={suspect.id}
                        className="p-4 border-2 border-gray-300 hover:border-red-600 transition-all cursor-pointer"
                        onClick={() => accuseSuspect(suspect.id)}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                              <Users className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-gray-900 font-bold">{suspect.name}</p>
                              <p className="text-gray-600 text-sm">{suspect.position}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm">{suspect.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {suspect.clues.map((clue, index) => (
                              <Badge key={index} className="text-xs bg-gray-600 text-white">
                                {clue}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Button
                    onClick={() => setShowSuspects(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Cancelar
                  </Button>
                </div>
              </Card>
            )}

            {/* Action Buttons */}
            {!showClue && !showSuspects && selectedLocation && (
              <Card className="p-4 bg-white/95 backdrop-blur-sm border-2 border-yellow-600">
                <div className="flex gap-3">
                  {activeTeam.cluesFound >= totalCluesNeeded && (
                    <Button
                      onClick={viewSuspects}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-6"
                    >
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Acusar al Corrupto
                    </Button>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Teams Status */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-gray-600">
          <h3 className="text-gray-900 mb-4">Estado de los Equipos</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team, index) => (
              <div
                key={team.id}
                className={`p-4 rounded-lg border-2 ${
                  index === activeTeamIndex ? 'border-yellow-600 bg-yellow-50 ring-2 ring-yellow-600' : 'border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-full ${team.color} border-2 border-white`} />
                  <p className="text-gray-900">{team.name}</p>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>📍 {team.currentLocation}</p>
                  <p>🔍 Pistas: {team.cluesFound}/{totalCluesNeeded}</p>
                  <Progress value={(team.cluesFound / totalCluesNeeded) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
