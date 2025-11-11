export const locations = [
  {
    id: 'palacio-gobierno',
    name: 'Palacio de Gobierno',
    city: 'La Paz',
    icon: '🏛️',
    image: 'https://images.unsplash.com/photo-1610528524188-d6b8ac7be34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBjb3JydXB0aW9ufGVufDF8fHx8MTc2Mjg5OTQ4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'El centro del poder político boliviano. Aquí se toman decisiones importantes, pero también circulan sobres con dinero bajo la mesa.',
    corruptionType: 'Licitaciones amañadas, contratos inflados, nombramientos a cambio de dinero',
    clues: [
      {
        type: '📄 Documento Confidencial',
        description: 'Encontraste un documento que menciona pagos "extraordinarios" a un director de Obras Públicas.',
        evidence: 'Transferencias bancarias sospechosas de Bs. 500,000 a una cuenta personal'
      },
      {
        type: '🎤 Testimonio de Empleado',
        description: 'Un funcionario menor revela que vio sobres amarillos siendo entregados en la oficina del piso 5.',
        evidence: 'El director de Obras Públicas tiene su oficina en el piso 5'
      },
      {
        type: '📸 Fotografía',
        description: 'Una foto de seguridad muestra a un empresario constructor entrando con un maletín.',
        evidence: 'El mismo empresario ganó 3 licitaciones importantes el mes pasado'
      }
    ]
  },
  {
    id: 'comandancia-policial',
    name: 'Comandancia Policial',
    city: 'El Alto',
    icon: '🚔',
    image: 'https://images.unsplash.com/photo-1641736047556-4227453b1019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCb2xpdmlhJTIwc3RyZWV0JTIwbWFya2V0fGVufDF8fHx8MTc2Mjg5OTQ4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'El cuartel central de la policía en El Alto. Los controles de tránsito son frecuentes, y también las coimas.',
    corruptionType: 'Coimas en controles de tránsito, liberación de detenidos, falsificación de documentos',
    clues: [
      {
        type: '🗣️ Denuncia Anónima',
        description: 'Un ciudadano denuncia que los policías entregan el 30% de las coimas a "alguien importante".',
        evidence: 'Se menciona a un director que coordina con las autoridades locales'
      },
      {
        type: '📊 Registro de Multas',
        description: 'Hay menos multas registradas de las que deberían existir. El dinero desaparece.',
        evidence: 'Las coimas no entran al sistema oficial, alguien las desvía'
      },
      {
        type: '💼 Maletín Olvidado',
        description: 'Encuentras un maletín con Bs. 50,000 en efectivo y una nota: "Para el Director - R.M."',
        evidence: 'Las iniciales R.M. aparecen en varios documentos de Obras Públicas'
      }
    ]
  },
  {
    id: 'hospital-sur',
    name: 'Hospital del Sur',
    city: 'Santa Cruz',
    icon: '🏥',
    image: 'https://images.unsplash.com/photo-1641736047736-020e658328a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMYSUyMFBheiUyMEJvbGl2aWElMjBjaXR5fGVufDF8fHx8MTc2Mjg5OTQ4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Hospital público donde pacientes desesperados a veces pagan para acelerar su atención.',
    corruptionType: 'Adelantar turnos, acceso preferencial a medicamentos, cirugías prioritarias',
    clues: [
      {
        type: '🩺 Testimonio de Enfermera',
        description: 'Una enfermera dice que el presupuesto de medicamentos se desvía. Alguien en Obras Públicas coordina los contratos.',
        evidence: 'El director de Obras Públicas es hermano del ex-director del hospital'
      },
      {
        type: '💊 Factura Falsa',
        description: 'Facturas infladas de medicamentos. El proveedor es una empresa fantasma.',
        evidence: 'La empresa tiene la misma dirección que una oficina de Obras Públicas'
      },
      {
        type: '📱 Mensaje de WhatsApp',
        description: 'Un mensaje recuperado dice: "R. dice que todo está arreglado para la entrega del próximo mes".',
        evidence: 'R. podría ser Roberto, un nombre mencionado en otras investigaciones'
      }
    ]
  },
  {
    id: 'universidad-mayor',
    name: 'Universidad Mayor de San Simón',
    city: 'Cochabamba',
    icon: '🏫',
    image: 'https://images.unsplash.com/photo-1677148891683-d5ccdb882e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCb2xpdmlhJTIwdHJhZGl0aW9uYWwlMjBjdWx0dXJlfGVufDF8fHx8MTc2Mjg5OTQ5MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Universidad pública donde algunos profesores venden notas y títulos falsos circulan.',
    corruptionType: 'Venta de notas, títulos falsos, aprobación de exámenes sin estudiar',
    clues: [
      {
        type: '📝 Lista de Pagos',
        description: 'Una lista oculta muestra pagos de Bs. 5,000 por "aprobación garantizada".',
        evidence: 'El dinero se enviaba a una cuenta que recibe fondos de proyectos de construcción'
      },
      {
        type: '🎓 Estudiante Arrepentido',
        description: 'Un estudiante confiesa que pagó su título. El intermediario trabajaba con funcionarios de gobierno.',
        evidence: 'Menciona que el corrupto principal es un director con mucho poder'
      },
      {
        type: '🔍 Investigación Interna',
        description: 'La universidad inició una investigación pero fue bloqueada por presiones externas.',
        evidence: 'La presión vino del Ministerio de Obras Públicas'
      }
    ]
  },
  {
    id: 'obras-publicas',
    name: 'Ministerio de Obras Públicas',
    city: 'Oruro',
    icon: '🏗️',
    image: 'https://images.unsplash.com/photo-1610528524188-d6b8ac7be34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBjb3JydXB0aW9ufGVufDF8fHx8MTc2Mjg5OTQ4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'El centro de todos los proyectos de construcción. Aquí se aprueban obras millonarias, y también se negocian coimas enormes.',
    corruptionType: 'Sobornos en licitaciones, obras fantasma, sobrecostos del 200-300%',
    clues: [
      {
        type: '🏗️ Obra Fantasma',
        description: 'Descubres que un puente "construido" nunca existió. El proyecto costó Bs. 3 millones.',
        evidence: 'El director Roberto Mamani aprobó personalmente el proyecto falso'
      },
      {
        type: '💰 Cuenta Bancaria Secreta',
        description: 'Una cuenta offshore recibe transferencias de constructoras. El beneficiario es "R. Mamani".',
        evidence: 'Roberto Mamani, Director de Obras Públicas, tiene acceso a esa cuenta'
      },
      {
        type: '📞 Grabación Telefónica',
        description: 'Una llamada interceptada: "Don Roberto, su sobre está listo. Bs. 800,000 como acordamos".',
        evidence: 'Roberto "El Sobres" Mamani es el apodo del director más corrupto'
      }
    ]
  },
  {
    id: 'juzgado-central',
    name: 'Juzgado Central',
    city: 'Sucre',
    icon: '⚖️',
    image: 'https://images.unsplash.com/photo-1626148749358-5b3b3f45b41a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXRlY3RpdmUlMjBpbnZlc3RpZ2F0aW9uJTIwY2x1ZXN8ZW58MXx8fHwxNzYyODk5NDkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Los juzgados donde se imparte justicia, pero también donde algunos jueces aceptan sobornos para favorecer ciertos casos.',
    corruptionType: 'Sentencias compradas, liberación de criminales, archivado de casos',
    clues: [
      {
        type: '⚖️ Sentencia Sospechosa',
        description: 'Un empresario corrupto fue absuelto a pesar de pruebas contundentes.',
        evidence: 'Ese empresario tenía contratos con Obras Públicas y pagaba coimas al director'
      },
      {
        type: '📂 Expediente Desaparecido',
        description: 'El expediente contra un director de Obras Públicas desapareció misteriosamente.',
        evidence: 'Roberto Mamani estaba siendo investigado, pero todo se archivó'
      },
      {
        type: '🤝 Acuerdo Secreto',
        description: 'Un abogado revela que hay un "padrino" que protege a varios corruptos.',
        evidence: 'Ese padrino es Roberto Mamani, quien tiene conexiones políticas poderosas'
      }
    ]
  },
  {
    id: 'control-transito',
    name: 'Control de Tránsito',
    city: 'Tarija',
    icon: '🚗',
    image: 'https://images.unsplash.com/photo-1641736047556-4227453b1019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCb2xpdmlhJTIwc3RyZWV0JTIwbWFya2V0fGVufDF8fHx8MTc2Mjg5OTQ4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Los controles de tránsito más conocidos por pedir coimas. "¿Arreglamos?" es la frase más común.',
    corruptionType: 'Coimas por infracciones, licencias falsas, vehículos sin documentos',
    clues: [
      {
        type: '🚨 Oficial Arrepentido',
        description: 'Un oficial confiesa que el 40% de las coimas va a un "jefe grande" en el gobierno.',
        evidence: 'Ese jefe coordina con el director de Obras Públicas para proteger negocios ilegales'
      },
      {
        type: '📋 Registro de Coimas',
        description: 'Un cuaderno secreto registra Bs. 200,000 mensuales en coimas de tránsito.',
        evidence: 'El dinero se divide entre policías y Roberto Mamani de Obras Públicas'
      },
      {
        type: '🚛 Camiones Sobrecargados',
        description: 'Camiones de construcción pasan sin ser multados. Tienen un "pase libre".',
        evidence: 'El pase lo otorga el director de Obras Públicas a cambio de coimas'
      }
    ]
  },
  {
    id: 'oficina-tramites',
    name: 'Oficina de Trámites',
    city: 'Potosí',
    icon: '📄',
    image: 'https://images.unsplash.com/photo-1573046171946-cd2fc7594af9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25leSUyMGVudmVsb3BlJTIwYnJpYmV8ZW58MXx8fHwxNzYyODk5NDkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Oficina de trámites municipales donde todo toma "meses" a menos que pagues para "agilizar".',
    corruptionType: 'Agilización de trámites, permisos de construcción, certificados falsos',
    clues: [
      {
        type: '⏰ Trámite Agilizado',
        description: 'Un trámite que toma 6 meses se resolvió en 2 días después de un "regalo".',
        evidence: 'El regalo fue coordinado por el director de Obras Públicas'
      },
      {
        type: '🏢 Permiso de Construcción Ilegal',
        description: 'Se otorgaron permisos en zonas protegidas. Alguien con mucho poder los autorizó.',
        evidence: 'Roberto Mamani firma todos los permisos especiales de construcción'
      },
      {
        type: '💵 Sobre Amarillo',
        description: 'Un empleado encontró un sobre con Bs. 30,000 y una nota: "Gracias Don Roberto El Sobres".',
        evidence: '¡PISTA DEFINITIVA! Roberto "El Sobres" Mamani es el coimeador principal'
      }
    ]
  }
];
