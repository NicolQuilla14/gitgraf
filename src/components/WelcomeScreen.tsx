import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AlertTriangle, Users, MapPin, Eye, Target } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1641736047736-020e658328a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMYSUyMFBheiUyMEJvbGl2aWElMjBjaXR5fGVufDF8fHx8MTc2Mjg5OTQ4OXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="La Paz, Bolivia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-yellow-900/90 to-green-900/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <div className="max-w-5xl w-full space-y-8">
          
          {/* Main Title Card */}
          <Card className="p-8 md:p-12 bg-yellow-50/95 backdrop-blur-sm border-4 border-yellow-600 shadow-2xl">
            <div className="text-center space-y-6">
              <Badge className="bg-red-600 text-white px-4 py-2 text-sm">
                🕵️ Juego de Investigación en Equipos
              </Badge>
              
              <h1 className="text-yellow-900 leading-tight">
                La Ruta de las Coimas
                <span className="block text-yellow-800 mt-2">
                  Una Realidad Boliviana
                </span>
              </h1>

              <div className="flex justify-center gap-4 flex-wrap">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1573046171946-cd2fc7594af9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25leSUyMGVudmVsb3BlJTIwYnJpYmV8ZW58MXx8fHwxNzYyODk5NDkwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Coima"
                  className="w-32 h-32 object-cover rounded-lg border-4 border-yellow-600 shadow-lg"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1641736047556-4227453b1019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCb2xpdmlhJTIwc3RyZWV0JTIwbWFya2V0fGVufDF8fHx8MTc2Mjg5OTQ4OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Bolivia"
                  className="w-32 h-32 object-cover rounded-lg border-4 border-yellow-600 shadow-lg"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1626148749358-5b3b3f45b41a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXRlY3RpdmUlMjBpbnZlc3RpZ2F0aW9uJTIwY2x1ZXN8ZW58MXx8fHwxNzYyODk5NDkwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Investigación"
                  className="w-32 h-32 object-cover rounded-lg border-4 border-yellow-600 shadow-lg"
                />
              </div>

              <div className="bg-red-100 border-2 border-red-600 p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <p className="text-red-900">
                      <span className="font-bold">¿Qué son las coimas?</span> Son sobornos que funcionarios, 
                      policías y otras autoridades exigen o aceptan ilegalmente. En Bolivia, esta práctica 
                      corrupta afecta la administración pública, trámites, controles de tránsito, y muchos 
                      otros servicios. ¡Es hora de desenmascarar esta realidad!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* How to Play Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-green-600">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-green-600" />
                  <h2 className="text-green-800">Objetivo del Juego</h2>
                </div>
                <p className="text-gray-800">
                  Tu equipo de investigadores debe recorrer diferentes ubicaciones de Bolivia, 
                  buscar pistas sobre casos de corrupción, y ser el <span className="font-bold">primer equipo 
                  en identificar y capturar al "coimeador"</span> principal antes que los demás equipos.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-blue-600">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  <h2 className="text-blue-800">Modo de Juego</h2>
                </div>
                <p className="text-gray-800">
                  Es un <span className="font-bold">juego competitivo en equipos</span>. Cada equipo 
                  explora ubicaciones, interroga testigos, y recolecta evidencia. El primer equipo 
                  en reunir todas las pistas correctas y atrapar al corrupto ¡GANA!
                </p>
              </div>
            </Card>
          </div>

          {/* Game Instructions */}
          <Card className="p-8 bg-white/95 backdrop-blur-sm border-2 border-purple-600">
            <h2 className="text-purple-900 mb-6 text-center">📋 Cómo Jugar</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-purple-900 font-bold">Forma tu Equipo</p>
                    <p className="text-gray-700">Crea tu equipo de investigadores con un nombre boliviano.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-purple-900 font-bold">Explora Ubicaciones</p>
                    <p className="text-gray-700">Visita lugares como La Paz, Cochabamba, Santa Cruz, El Alto y más.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-purple-900 font-bold">Busca Pistas</p>
                    <p className="text-gray-700">Interroga testigos, revisa documentos y encuentra evidencia de coimas.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="text-purple-900 font-bold">Analiza la Información</p>
                    <p className="text-gray-700">Cada pista te acerca más al coimeador principal.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                    5
                  </div>
                  <div>
                    <p className="text-purple-900 font-bold">Identifica al Corrupto</p>
                    <p className="text-gray-700">Usa las pistas para descubrir quién es el coimeador.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                    6
                  </div>
                  <div>
                    <p className="text-purple-900 font-bold">¡Sé el Primero!</p>
                    <p className="text-gray-700">El primer equipo en capturar al corrupto gana el juego.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Locations Preview */}
          <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-orange-600">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-orange-600" />
              <h2 className="text-orange-900">Ubicaciones a Explorar</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-orange-600 text-white">🏛️ Palacio de Gobierno - La Paz</Badge>
              <Badge className="bg-orange-600 text-white">🚔 Comandancia Policial - El Alto</Badge>
              <Badge className="bg-orange-600 text-white">🏥 Hospital del Sur - Santa Cruz</Badge>
              <Badge className="bg-orange-600 text-white">🏫 Universidad Mayor - Cochabamba</Badge>
              <Badge className="bg-orange-600 text-white">🏗️ Obras Públicas - Oruro</Badge>
              <Badge className="bg-orange-600 text-white">⚖️ Juzgado Central - Sucre</Badge>
              <Badge className="bg-orange-600 text-white">🚗 Control de Tránsito - Tarija</Badge>
              <Badge className="bg-orange-600 text-white">📄 Oficina de Trámites - Potosí</Badge>
            </div>
          </Card>

          {/* Start Button */}
          <Card className="p-8 bg-gradient-to-r from-green-600 to-yellow-600 border-4 border-yellow-700 shadow-2xl">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Eye className="w-8 h-8 text-white" />
                <p className="text-white">
                  ¿Estás listo para desenmascarar la corrupción en Bolivia?
                </p>
              </div>
              <Button
                onClick={onStart}
                className="w-full md:w-auto px-12 py-6 bg-white text-green-700 hover:bg-yellow-100 shadow-lg"
              >
                ¡Iniciar la Investigación!
              </Button>
            </div>
          </Card>

          {/* Disclaimer */}
          <Card className="p-4 bg-gray-800/90 backdrop-blur-sm border-2 border-gray-600">
            <p className="text-white text-center text-sm">
              <span className="font-bold">Nota Importante:</span> Este juego es educativo y busca generar conciencia 
              sobre la corrupción. Los personajes y situaciones son ficticios, pero representan una realidad 
              que afecta a Bolivia y que todos debemos combatir.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
