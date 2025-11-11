import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Trophy, Sparkles, RotateCcw } from 'lucide-react';
import type { Team } from '../App';

interface VictoryScreenProps {
  team: Team;
  onRestart: () => void;
}

export function VictoryScreen({ team, onRestart }: VictoryScreenProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1641736047736-020e658328a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMYSUyMFBheiUyMEJvbGl2aWElMjBjaXR5fGVufDF8fHx8MTc2Mjg5OTQ4OXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="La Paz Bolivia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/90 via-green-900/90 to-blue-900/90" />
      </div>

      {/* Confetti Effect */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="animate-pulse absolute top-10 left-10 text-4xl">🎉</div>
        <div className="animate-bounce absolute top-20 right-20 text-4xl">🎊</div>
        <div className="animate-pulse absolute bottom-20 left-20 text-4xl">⭐</div>
        <div className="animate-bounce absolute bottom-10 right-10 text-4xl">🏆</div>
        <div className="animate-pulse absolute top-1/2 left-1/4 text-4xl">✨</div>
        <div className="animate-bounce absolute top-1/3 right-1/3 text-4xl">🎈</div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-6">
          
          {/* Victory Card */}
          <Card className={`p-12 bg-white/95 backdrop-blur-sm border-4 ${team.color} shadow-2xl`}>
            <div className="text-center space-y-8">
              
              {/* Trophy Animation */}
              <div className="relative">
                <Trophy className="w-32 h-32 text-yellow-600 mx-auto animate-bounce" />
                <Sparkles className="w-12 h-12 text-yellow-500 absolute top-0 right-1/3 animate-pulse" />
                <Sparkles className="w-12 h-12 text-yellow-500 absolute top-0 left-1/3 animate-pulse" />
              </div>

              <div>
                <h1 className="text-green-800 mb-4">¡Victoria!</h1>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-full ${team.color} border-4 border-white shadow-xl`} />
                  <div className="text-left">
                    <p className="text-gray-600">Equipo Ganador:</p>
                    <h2 className="text-gray-900">{team.name}</h2>
                  </div>
                </div>
                <p className="text-gray-700">
                  ¡Felicitaciones! Fueron los primeros en descubrir y capturar al corrupto.
                </p>
              </div>

              {/* Story Resolution */}
              <Card className="p-6 bg-green-50 border-2 border-green-600 text-left">
                <h3 className="text-green-900 mb-3">🎯 Misión Cumplida</h3>
                <div className="space-y-3 text-gray-800">
                  <p>
                    Después de una intensa investigación por todo Bolivia, el equipo <span className="font-bold">{team.name}</span> logró 
                    reunir suficientes pruebas para identificar al funcionario corrupto responsable de una 
                    red de coimas que operaba en múltiples instituciones.
                  </p>
                  <p>
                    <span className="font-bold">Don Roberto "El Sobres" Mamani</span>, Director de Obras Públicas, 
                    fue arrestado gracias a su investigación. Se encontró evidencia de sobornos por más de 
                    2 millones de bolivianos, documentos falsos, y una red de cómplices en diferentes ciudades.
                  </p>
                  <p>
                    Su valentía y perseverancia han ayudado a combatir la corrupción en Bolivia. 
                    ¡Cada acción cuenta en la lucha por un país más justo y transparente!
                  </p>
                </div>
              </Card>

              {/* Statistics */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4 bg-blue-50 border-2 border-blue-600">
                  <p className="text-blue-900">Pistas Encontradas</p>
                  <p className="text-blue-700">{team.cluesFound}</p>
                </Card>
                <Card className="p-4 bg-purple-50 border-2 border-purple-600">
                  <p className="text-purple-900">Última Ubicación</p>
                  <p className="text-purple-700">{team.currentLocation}</p>
                </Card>
                <Card className="p-4 bg-yellow-50 border-2 border-yellow-600">
                  <p className="text-yellow-900">Estado</p>
                  <p className="text-yellow-700">¡Campeones!</p>
                </Card>
              </div>

              {/* Message */}
              <Card className="p-6 bg-red-50 border-2 border-red-600">
                <h3 className="text-red-900 mb-3">💡 Reflexión Final</h3>
                <p className="text-gray-800">
                  Este juego es una representación de la realidad que vive Bolivia. Las coimas son 
                  un problema serio que afecta a todos los ciudadanos. Cada uno de nosotros puede 
                  contribuir a combatir la corrupción: denunciando, exigiendo transparencia, y nunca 
                  participando en actos corruptos. <span className="font-bold">¡El cambio empieza con cada uno de nosotros!</span>
                </p>
              </Card>

              {/* Play Again Button */}
              <Button
                onClick={onRestart}
                className="w-full md:w-auto px-12 py-6 bg-green-600 hover:bg-green-700 text-white shadow-lg"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Jugar Nuevamente
              </Button>
            </div>
          </Card>

          {/* Credits */}
          <Card className="p-4 bg-gray-800/90 backdrop-blur-sm border-2 border-gray-600">
            <p className="text-white text-center text-sm">
              "La Ruta de las Coimas" - Un juego educativo sobre la realidad de la corrupción en Bolivia 🇧🇴
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
