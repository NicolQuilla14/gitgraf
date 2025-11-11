import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { AlertCircle, TrendingUp, Shield } from 'lucide-react';

interface Decision {
  id: string;
  scenario: string;
  context: string;
  options: {
    text: string;
    isCorrupt: boolean;
    points: number;
    corruptionIncrease: number;
    consequence: string;
  }[];
}

const decisions: Decision[] = [
  {
    id: '1',
    scenario: '🏛️ El Funcionario Público',
    context: 'Eres un funcionario. Una empresa constructora te ofrece un "regalo" de $50,000 para agilizar su permiso de construcción.',
    options: [
      {
        text: 'Aceptar el dinero y agilizar el permiso',
        isCorrupt: true,
        points: 50,
        corruptionIncrease: 25,
        consequence: 'Ganaste dinero pero aumentó tu corrupción. La constructora ahora espera más favores.'
      },
      {
        text: 'Rechazar el soborno y procesar el permiso legalmente',
        isCorrupt: false,
        points: 20,
        corruptionIncrease: 0,
        consequence: '¡Bien hecho! Mantuviste tu integridad. Tu reputación mejora.'
      },
      {
        text: 'Reportar el intento de soborno',
        isCorrupt: false,
        points: 30,
        corruptionIncrease: -5,
        consequence: '¡Excelente! Ayudaste a combatir la corrupción. Tu nivel de corrupción disminuye.'
      }
    ]
  },
  {
    id: '2',
    scenario: '🚓 El Control Policial',
    context: 'Te detienen por exceso de velocidad. El oficial sugiere que "pueden arreglarlo" por $200 en efectivo.',
    options: [
      {
        text: 'Pagar la coima',
        isCorrupt: true,
        points: 10,
        corruptionIncrease: 15,
        consequence: 'Evitaste la multa pero fomentaste la corrupción policial.'
      },
      {
        text: 'Exigir la multa oficial',
        isCorrupt: false,
        points: 25,
        corruptionIncrease: 0,
        consequence: 'Pagaste más, pero hiciste lo correcto. El oficial se retira incómodo.'
      }
    ]
  },
  {
    id: '3',
    scenario: '🏫 La Universidad',
    context: 'Un profesor te ofrece aprobar el examen a cambio de $1,000. De otra forma, tendrás que estudiar mucho.',
    options: [
      {
        text: 'Pagar por la nota',
        isCorrupt: true,
        points: 30,
        corruptionIncrease: 20,
        consequence: 'Aprobaste sin estudiar, pero no aprendiste nada. Tu futuro profesional es dudoso.'
      },
      {
        text: 'Estudiar y dar el examen honestamente',
        isCorrupt: false,
        points: 40,
        corruptionIncrease: 0,
        consequence: 'Te esforzaste y aprendiste. Eso vale más que cualquier atajo.'
      },
      {
        text: 'Denunciar al profesor',
        isCorrupt: false,
        points: 50,
        corruptionIncrease: -10,
        consequence: 'Tu denuncia ayudó a limpiar la universidad. ¡Héroe académico!'
      }
    ]
  },
  {
    id: '4',
    scenario: '🏥 El Hospital',
    context: 'Necesitas una cirugía urgente. El médico insinúa que pagando "extra" serás atendido antes que otros pacientes.',
    options: [
      {
        text: 'Pagar para adelantarte en la lista',
        isCorrupt: true,
        points: 20,
        corruptionIncrease: 30,
        consequence: 'Te atendieron primero, pero otros pacientes esperaron más. La injusticia tiene consecuencias.'
      },
      {
        text: 'Esperar tu turno legítimo',
        isCorrupt: false,
        points: 45,
        corruptionIncrease: 0,
        consequence: 'Esperaste como todos. El sistema de salud debe ser justo para todos.'
      }
    ]
  },
  {
    id: '5',
    scenario: '🏢 El Contrato Empresarial',
    context: 'Tu empresa puede ganar un contrato millonario si "contribuyes" $100,000 al funcionario que decide la licitación.',
    options: [
      {
        text: 'Pagar la coima para ganar el contrato',
        isCorrupt: true,
        points: 100,
        corruptionIncrease: 35,
        consequence: 'Ganaste el contrato pero a un costo moral alto. Este sistema corrupto perjudica a todos.'
      },
      {
        text: 'Competir limpiamente con tu propuesta',
        isCorrupt: false,
        points: 60,
        corruptionIncrease: 0,
        consequence: 'Puede que no ganes, pero competiste con integridad. Eso construye un país mejor.'
      },
      {
        text: 'Denunciar la solicitud de soborno',
        isCorrupt: false,
        points: 80,
        corruptionIncrease: -15,
        consequence: '¡Valiente! Tu denuncia puede cambiar el sistema. La justicia está de tu lado.'
      }
    ]
  }
];

interface GameBoardProps {
  onGameEnd: (state: 'won' | 'lost', score: number) => void;
}

export function GameBoard({ onGameEnd }: GameBoardProps) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [corruptionLevel, setCorruptionLevel] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastConsequence, setLastConsequence] = useState('');

  const handleDecision = (option: Decision['options'][0]) => {
    const newScore = score + option.points;
    const newCorruption = Math.max(0, Math.min(100, corruptionLevel + option.corruptionIncrease));
    
    setScore(newScore);
    setCorruptionLevel(newCorruption);
    setLastConsequence(option.consequence);
    setShowResult(true);

    // Check if game is lost
    if (newCorruption >= 100) {
      setTimeout(() => {
        onGameEnd('lost', newScore);
      }, 2000);
      return;
    }

    // Check if game is won
    if (currentLevel === decisions.length - 1) {
      setTimeout(() => {
        onGameEnd('won', newScore);
      }, 2000);
      return;
    }
  };

  const nextLevel = () => {
    setShowResult(false);
    setCurrentLevel(currentLevel + 1);
  };

  const currentDecision = decisions[currentLevel];

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Stats */}
        <Card className="p-6 bg-yellow-50 border-2 border-yellow-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-yellow-900">Puntos</span>
              </div>
              <p className="text-yellow-900">{score}</p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-yellow-900">Nivel de Corrupción</span>
              </div>
              <Progress value={corruptionLevel} className="h-3" />
              <p className="text-yellow-900 mt-1">{corruptionLevel}%</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-yellow-900">Nivel</span>
              </div>
              <p className="text-yellow-900">{currentLevel + 1} / {decisions.length}</p>
            </div>
          </div>
        </Card>

        {/* Main Game Card */}
        <Card className="p-8 bg-white border-2 border-yellow-600 shadow-xl">
          {!showResult ? (
            <>
              <div className="text-center mb-6">
                <Badge className="mb-4 bg-yellow-600 text-white">
                  Escenario {currentLevel + 1}
                </Badge>
                <h2 className="text-yellow-900 mb-4">{currentDecision.scenario}</h2>
                <p className="text-yellow-800">{currentDecision.context}</p>
              </div>

              <div className="space-y-4 mt-8">
                <p className="text-yellow-900">¿Qué decides hacer?</p>
                {currentDecision.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleDecision(option)}
                    variant={option.isCorrupt ? "destructive" : "default"}
                    className={`w-full py-6 text-left justify-start h-auto whitespace-normal ${
                      option.isCorrupt 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    <span className="mr-3">{option.isCorrupt ? '💰' : '✅'}</span>
                    <span>{option.text}</span>
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center space-y-6">
              <h2 className="text-yellow-900">Consecuencias</h2>
              <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-300">
                <p className="text-yellow-900">{lastConsequence}</p>
              </div>
              
              {corruptionLevel < 100 && currentLevel < decisions.length - 1 && (
                <Button
                  onClick={nextLevel}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-8"
                >
                  Continuar al Siguiente Nivel
                </Button>
              )}
            </div>
          )}
        </Card>

        {/* Warning if corruption is high */}
        {corruptionLevel >= 70 && corruptionLevel < 100 && (
          <Card className="p-4 bg-red-100 border-2 border-red-600">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <p className="text-red-900">
                ⚠️ ¡Cuidado! Tu nivel de corrupción es muy alto. Un movimiento más y serás arrestado.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
