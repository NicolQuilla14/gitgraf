import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Users, Plus, Trash2, Play } from 'lucide-react';
import type { Team } from '../App';

interface TeamSetupProps {
  onTeamsReady: (teams: Team[]) => void;
}

const teamColors = [
  { color: 'bg-red-600', name: 'Rojo', border: 'border-red-600' },
  { color: 'bg-blue-600', name: 'Azul', border: 'border-blue-600' },
  { color: 'bg-green-600', name: 'Verde', border: 'border-green-600' },
  { color: 'bg-yellow-600', name: 'Amarillo', border: 'border-yellow-600' },
  { color: 'bg-purple-600', name: 'Morado', border: 'border-purple-600' },
  { color: 'bg-pink-600', name: 'Rosa', border: 'border-pink-600' },
];

const bolivianTeamSuggestions = [
  'Los Tata Bombos',
  'Las Cholas Investigadoras',
  'Los Ajayu Justos',
  'Equipo Illimani',
  'Los K\'alachis',
  'La Ch\'alla Anti-Coimas',
  'Los Pututeros',
  'Equipo Wiphala',
  'Los Charqueños',
];

export function TeamSetup({ onTeamsReady }: TeamSetupProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);

  const addTeam = () => {
    if (newTeamName.trim() && teams.length < 6) {
      const newTeam: Team = {
        id: Date.now().toString(),
        name: newTeamName.trim(),
        color: teamColors[selectedColor].color,
        cluesFound: 0,
        currentLocation: 'La Paz',
      };
      setTeams([...teams, newTeam]);
      setNewTeamName('');
      setSelectedColor((selectedColor + 1) % teamColors.length);
    }
  };

  const removeTeam = (id: string) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  const startGame = () => {
    if (teams.length >= 2) {
      onTeamsReady(teams);
    }
  };

  const useSuggestion = (suggestion: string) => {
    setNewTeamName(suggestion);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1677148891683-d5ccdb882e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCb2xpdmlhJTIwdHJhZGl0aW9uYWwlMjBjdWx0dXJlfGVufDF8fHx8MTc2Mjg5OTQ5MXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Bolivia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-pink-900/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen p-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <Card className="p-8 bg-white/95 backdrop-blur-sm border-4 border-purple-600">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Users className="w-10 h-10 text-purple-600" />
                <h1 className="text-purple-900">Formación de Equipos</h1>
              </div>
              <p className="text-gray-700">
                Crea al menos 2 equipos de investigadores. ¡Que comience la competencia!
              </p>
            </div>
          </Card>

          {/* Team Creation */}
          <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-blue-600">
            <h2 className="text-blue-900 mb-4">Crear Nuevo Equipo</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-700 mb-2 block">Nombre del Equipo</label>
                <div className="flex gap-2">
                  <Input
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Ej: Los Tata Bombos"
                    onKeyPress={(e) => e.key === 'Enter' && addTeam()}
                    className="flex-1"
                  />
                  <Button
                    onClick={addTeam}
                    disabled={!newTeamName.trim() || teams.length >= 6}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-gray-700 mb-2 block">Sugerencias de Nombres Bolivianos</label>
                <div className="flex flex-wrap gap-2">
                  {bolivianTeamSuggestions.map((suggestion, index) => (
                    <Badge
                      key={index}
                      className="cursor-pointer bg-yellow-600 hover:bg-yellow-700 text-white"
                      onClick={() => useSuggestion(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-700 mb-2 block">Color del Equipo</label>
                <div className="flex gap-2">
                  {teamColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-12 h-12 rounded-full ${color.color} border-4 ${
                        selectedColor === index ? 'border-white ring-4 ring-blue-600' : 'border-gray-300'
                      } transition-all hover:scale-110`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Teams List */}
          <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-green-600">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-green-900">Equipos Registrados ({teams.length})</h2>
              {teams.length >= 2 && teams.length < 6 && (
                <Badge className="bg-green-600 text-white">Mínimo alcanzado ✓</Badge>
              )}
            </div>

            {teams.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-3 opacity-30" />
                <p>Aún no hay equipos registrados. ¡Crea el primero!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                      teamColors.find(c => c.color === team.color)?.border || 'border-gray-300'
                    } bg-white`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${team.color} border-2 border-white shadow-md`} />
                      <span className="text-gray-900">{team.name}</span>
                    </div>
                    <Button
                      onClick={() => removeTeam(team.id)}
                      variant="ghost"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Start Button */}
          {teams.length >= 2 && (
            <Card className="p-6 bg-gradient-to-r from-green-600 to-blue-600 border-4 border-green-700">
              <div className="text-center space-y-4">
                <p className="text-white">
                  ¡{teams.length} equipos listos para investigar! ¿Comenzamos?
                </p>
                <Button
                  onClick={startGame}
                  className="w-full md:w-auto px-12 py-6 bg-white text-green-700 hover:bg-yellow-100 shadow-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  ¡Comenzar la Investigación!
                </Button>
              </div>
            </Card>
          )}

          {teams.length < 2 && (
            <Card className="p-4 bg-yellow-100 border-2 border-yellow-600">
              <p className="text-yellow-900 text-center">
                ⚠️ Se necesitan al menos 2 equipos para jugar
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
