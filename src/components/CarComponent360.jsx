import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';

const CarComponent360 = ({ initialModel, initialVersion, initialSubversion, initialColor }) => {
  // Validación de props iniciales
  if (!initialModel || !initialVersion || !initialSubversion || !initialColor) {
    console.error('Missing required props');
    return null;
  }

  const [currentModel, setCurrentModel] = useState(initialModel.toLowerCase());
  const [currentVersion, setCurrentVersion] = useState(initialVersion.toLowerCase());
  const [currentSubversion, setCurrentSubversion] = useState(initialSubversion);
  const [currentColor, setCurrentColor] = useState(initialColor);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [showAllDescriptions, setShowAllDescriptions] = useState(false);

  const viewerRef = useRef(null);
  const descriptionListRef = useRef(null);

  const totalFrames = 30;
  const frameWidthPercentage = 100 / totalFrames;

  const subversionDescriptions = {
    corolla: {
      "2.0 XLI CVT": [
        "Motor 2,0 litros de 4 cilindros y 16 válvulas con Regulación Variable de Válvulas con Inteligencia 13,0 con 171 CV de potencia máxima Automático CVT de 10 velocidades",
        "Espejos exteriores con regulación eléctrica, luz de giro incorporada y retráctiles",
        "Ópticas delanteras halógenos con proyector y regulación en altura",
        "Luces DRL de LED",
        "Ópticas traseras con LED",
        "Sistema automático de encendido de luces",
        "Llantas de aleación de 16\"",
        "Display de información múltiple con pantalla a color de 7\"",
        "Levanta cristales eléctricos con función 'One Touch' en las 4 puertas",
        "Volante con control de audio, display de información múltiple y teléfono",
        "Monitor con cámara de estacionamiento",
        "Audio con pantalla táctil de 9\" con manos libres y Bluetooth",
        "Conectividad: Apple CarPlay ® & Android Auto® inalámbrica**",
        "Modo de transmisión secuencial",
        "Control de estabilidad (VSC) y Control de tracción (TRC)",
        "Asistencia de arranque en pendientes (HAC)",
        "7 airbags: frontales (x2), de rodilla (conductor), laterales (x2) y de cortina (x2)",
        "Asistencia activa en curvas (ACA)",
        "Limitador automático de velocidad (ASL)",
        "Faros antiniebla de LED",
        "Alarma antirrobo e inmovilizador de motor",
        "Toyota Safety Sense:*",
        "Control de velocidad crucero adaptativo (ACC)*",
        "Sistema de pre colisión frontal (PCS)*",
        "Sistema de alerta de cambio de carril (LDA)*",
        "Sistema de luces altas automáticas (AHB)*",
        "Sistema de alerta de vaivén (SWS)*"
      ],
      "2.0 XEI CVT": [
        "Motor 2,0 litros de 4 cilindros y 16 válvulas con Regulación Variable de Válvulas con Inteligencia 13,0 con 171 CV de potencia máxima Automático CVT de 10 velocidades",
        "Incluye funciones selectas 2.0 XLI CVT, más:",
        "Faros delanteros Bi-LED con regulación en altura",
        "Aire acondicionado con climatizador automático digital Bi-Zona",
        "Salidas de aire acondicionado y regulador para plazas traseras",
        "2 puertos USB tipo 'C' en plazas traseras",
        "Asientos tapizados de tela combinado con cuero ecológico",
        "Apoyabrazos delantero tapizado en cuero ecológico",
        "Techo solar con apertura eléctrica",
        "Espejo retrovisor interno con anti-encandilamiento automático",
        "Volante revestido en cuero",
        "Sensores de estacionamiento delanteros y traseros",
        "Tuerca de seguridad para llantas"
      ],
      "2.0 SEG CVT": [
        "Motor 2,0 litros de 4 cilindros y 16 válvulas con Regulación Variable de Válvulas con Inteligencia 13,0 con 171 CV de potencia máxima Automático CVT de 10 velocidades",
        "Incluye funciones selectas 2.0 XEI CVT, más:",
        "Espejos exteriores retráctiles automáticos y con desempañador",
        "Ópticas traseras Full LED",
        "Llantas de aleación de 17\"",
        "Asientos tapizados de cuero natural y ecológico",
        "Asiento del conductor con regulación eléctrica",
        "Display de información múltiple con pantalla a color de 12.3\"",
        "Bandeja de baúl",
        "Cargador inalámbrico para celulares**",
        "Levas al volante",
        "Modo de conducción SPORT",
        "Sensor de lluvia",
        "Sistema de encendido por botón (Push Start Button) y Sistema de ingreso inteligente (Smart Entry System)",
        "Alerta de punto ciego (BSM)",
        "Alerta de tráfico trasero (RCTA)"
      ]
    },
    yaris_hatchback: {
      "XS 1.5 6M/T 5P": [
        "Motor 1,5 litros de 4 cilindros y 16 válvulas con Regulación Variable de Válvulas con Inteligencia 13,0 con 107 CV de potencia máxima Manual de 6 velocidades",
        "Espejos exteriores con regulación eléctrica y luz de de giro incorporada",
        "Luces de circulación diurnas de LED (DRL)",
        "Ópticas delanteras halógenas con regulación en altura",
        "Llantas de acero de 15”",
        "Levanta cristales eléctricos con función “One Touch” - conductor",
        "Computadora de abordo",
        "Volante con control de audio, display de información múltiple y teléfono",
        "Audio con pantalla táctil LCD de 6.8” y USB (en consola central)",
        "Conectividad: Apple Car Play® & Android Auto®",
        "Control de estabilidad (VSC), control de tracción (TRC) y asistente de arranque en pendientes (HAC)",
        "Faros antiniebla traseros",
        "7 airbags: frontales (x2), de rodilla (conductor), laterales (x2) y de cortina (x2)"
      ],
      "XS 1.5 CVT 5P": [
        "Motor 1,5 litros de 4 cilindros y 16 válvulas con Regulación Variable de Válvulas con Inteligencia 13,0 con 107 CV de potencia máxima Transmisión CVT de 7 velocidades",
        "Incluye funciones selectas XS MT, más: Caja automática CVT de 7 velocidades "
      ],
      "XLS 1.5 6M/T 5P": [
        "Motor 1,5 litros de 4 cilindros y 16 válvulas con Regulación Variable de Válvulas con Inteligencia 13,0 con 107 CV de potencia máxima Manual de 6 velocidades",
        "Incluye funciones selectas XS MT, más:",
        "Espejos exteriores retráctiles eléctricamente",
        "Ópticas delanteras halógenas con regulación en altura y proyector",
        "Ópticas traseras LED",
        "Llantas de aleación de 15”",
        "Aire acondicionado con climatizador automático digital",
        "Espejo retrovisor interno con anti-encandilamiento automático",
        "Levanta cristales eléctricos con función “One Touch” - 4 puertas",
        "Monitor con cámara de estacionamiento",
        "Faros antiniebla delanteros",
        "Sensores de estacionamiento frontales y traseros"
      ],
      "XLS 1.5 CVT 5P": [
        "Motor 1,5 litros de 4 cilindros y 16 válvulas con Regulación Variable de Válvulas con Inteligencia 13,0 con 107 CV de potencia máxima Automático CVT de 7 velocidades",
        "Incluye funciones selectas XLS MT, más:",
        "Caja automática CVT de 7 velocidades",
        "Control de velocidad crucero"
      ],
      "XLS+ 1.5 CVT 5P": [
        "Motor 1,5 litros de 4 cilindros y 16 válvulas con Regulación Variable de Válvulas con Inteligencia 13,0 con 107 CV de potencia máxima Automático CVT de 7 velocidades",
        "Incluye funciones selectas XLS+ CVT, más:",
        "Llantas de aleación de 16”"
      ],
      "XLS PACK 1.5 CVT 5P": [
        "Motor 1,5 litros de 4 cilindros y 16 válvulas con Regulación Variable de Válvulas con Inteligencia 13,0 con 107 CV de potencia máxima Automático CVT de 7 velocidades",
        "Incluye funciones selectas XLS+ CVT, más:",
        "Asientos con tapizado de cuero ecológico",
        "Paddle Shifts (levas al volante)",
        "Display de información múltiple de 4,2”",
        "Toyota Safety Sense*: Sistema de pre-colisión frontal (PCS)*, Sistema de alerta de cambio de carril (LDA)*"
      ],
      "S 1.5 CVT 5P": [
        "Motor 1,5 litros de 4 cilindros y 16 válvulas con Regulación Variable de Válvulas con Inteligencia 13,0 con 107 CV de potencia máxima",
        "Automático CVT de 7 velocidades",
        "Incluye funciones selectas XLS PACK CVT, más:",
        "Ópticas delanteras LED con regulación en altura",
        "Techo solar eléctrico",
        "Manijas exteriores cromadas",
        "Sistema de encendido por botón (Push Start Button) y Sistema de ingreso inteligente (Smart Entry System)"
      ]
    },
    yaris_sedan: {
      "XLS 1.5 6M/T 4P": [
        "Motor 1,5 litros de 4 cilindros y 16 válvulas con Regulación Variable de Válvulas con Inteligencia 13,0 con 107 CV de potencia máxima Manual de 6 velocidades",
        "Espejos exteriores retráctiles con regulación eléctrica y luz de de giro incorporada",
        "Llantas de aleación de 15”",
        "Luces de circulación diurnas de LED (DRL)",
        "Ópticas delanteras halógenas con regulación en altura y proyector",
        "Ópticas traseras LED",
        "Aire acondicionado con climatizador automático digital",
        "Espejo retrovisor interno con anti-encandilamiento automático",
        "Levanta cristales eléctricos con función “One Touch” - 4 puertas",
        "Computadora de abordo",
        "Volante con control de audio, display de información múltiple y teléfono",
        "Audio con pantalla táctil LCD de 6.8” y USB (en consola central)",
        "Conectividad: Apple Car Play® & Android Auto®",
        "Monitor con cámara de estacionamiento",
        "Control de estabilidad (VSC), control de tracción (TRC) y asistente de arranque en pendientes (HAC)",
        "Faros antiniebla",
        "7 airbags: frontales (x2), de rodilla (conductor), laterales (x2) y de cortina (x2)",
        "Sensores de estacionamiento frontales y traseros",
        "Tuerca de seguridad para llantas"
      ],
      "XLS 1.5 CVT 4P": [
        "Motor 1,5 litros de 4 cilindros y 16 válvulas con Regulación Variable de Válvulas con Inteligencia 13,0 con 107 CV de potencia máxima",
        "Automático CVT de 7 velocidades",
        "Incluye funciones selectas XLS MT, más:",
        "Caja automática CVT de 7 velocidades",
        "Control de velocidad crucero"
      ],
      "XLS PACK 1.5 CVT 4P": [
        "Motor 1,5 litros de 4 cilindros y 16 válvulas con Regulación Variable de Válvulas con Inteligencia 13,0 con 107 CV de potencia máxima",
        "Automático CVT de 7 velocidades",
        "Incluye funciones selectas XLS CVT, más:",
        "Llantas de aleación de 16”",
        "Asientos con tapizado de cuero ecológico",
        "Paddle Shifts (levas al volante)",
        "Display de información múltiple de 4,2”",
        "Toyota Safety Sense*: Sistema de pre-colisión frontal (PCS)*, Sistema de alerta de cambio de carril (LDA)*"
      ]
    },
    hilux_cabina_doble: {
      "DX 4X2/4X4 6MT": [
        "Motor 2,4 litros de 4 cilindros y 16 válvulas con 150 CV de potencia máxima Manual de 6 velocidades",
        "Audio con pantalla táctil de 9\" con USB y Bluetooth®",
        "Conectividad: Android Auto® y Apple CarPlay® inalámbrica*(1)",
        "7 airbags: frontales (x2), de rodilla (conductor), laterales (x2) y de cortina (x2)",
        "Control de estabilidad (VSC)",
        "Control de tracción (TRC)",
        "Asistente de arranque en pendientes (HAC)",
        "Control de balanceo de tráiler (TSC)",
        "Control de velocidad crucero (CCS)",
        "Protector de cárter \"Heavy Duty\", y de tanque de combustible",
        "Cierre centralizado de puertas con comando a distancia",
        "Levantacristales eléctricos",
        "Espejos exteriores con regulación eléctrica",
        "Guantera con llave",
        "Volante con control de audio y de teléfono",
        "Volante con regulación en altura y profundidad",
        "Inmovilizador de motor",
        "Cobertor de caja de carga"
      ],
      "DX 4X2/4X4 6AT": [
        "Motor 2,4 litros de 4 cilindros y 16 válvulas con 150 CV de potencia máxima Automático de 6 velocidades",
        "Audio con pantalla táctil de 9\" con USB y Bluetooth®",
        "Conectividad: Android Auto® y Apple CarPlay® inalámbrica*(1)",
        "7 airbags: frontales (x2), de rodilla (conductor), laterales (x2) y de cortina (x2)",
        "Control de estabilidad (VSC)",
        "Control de tracción (TRC)",
        "Asistente de arranque en pendientes (HAC)",
        "Control de balanceo de tráiler (TSC)",
        "Control de velocidad crucero (CCS)",
        "Protector de cárter \"Heavy Duty\", y de tanque de combustible",
        "Cierre centralizado de puertas con comando a distancia",
        "Levantacristales eléctricos",
        "Espejos exteriores con regulación eléctrica",
        "Guantera con llave",
        "Volante con control de audio y de teléfono",
        "Volante con regulación en altura y profundidad",
        "Inmovilizador de motor",
        "Cobertor de caja de carga"
      ],
      "SR 4X2/4X4 6MT": [
        "Motor 2,4 litros de 4 cilindros y 16 válvulas con 150 CV de potencia máxima Manual de 6 velocidades",
        "Carrocería extendida",
        "Display de información múltiple con pantalla a color de 4,2\" (TFT)",
        "Llantas de aleación 17\" con neumáticos 265/65 R17 AT",
        "Cámara de retroceso",
        "Servicios Conectados",
        "Faros antiniebla delanteros",
        "ECO y Power Mode",
        "Manijas exteriores color carrocería"
      ],
      "SR 4X2/4X4 6AT": [
        "Motor 2,8 litros de 4 cilindros y 16 válvulas con 204 CV de potencia máxima Automático de 6 velocidades",
        "Motor 2,8 l de 204 CV",
        "Carrocería extendida",
        "Display de información múltiple con pantalla a color de 4,2\" (TFT)",
        "Llantas de aleación 17\" con neumáticos 265/65 R17 AT",
        "Cámara de retroceso",
        "Servicios Conectados",
        "Faros antiniebla delanteros",
        "ECO y Power Mode",
        "Manijas exteriores color carrocería"
      ],
      "SRV 4X2/4X4 6AT": [
        "Motor 2,8 litros de 4 cilindros y 16 válvulas con 204 CV de potencia máxima Automático de 6 velocidades",
        "Faros delanteros Bi-LED",
        "Faros traseros de LED",
        "Sensores de estacionamiento delanteros (x2) y traseros (x4)",
        "Cargador inalámbrico para smartphones *(1)",
        "Estribos laterales",
        "Aire acondicionado con climatizador automático digital bizona y salidas para plazas traseras",
        "USB tipo C en plazas traseras (x2)",
        "Asistencia de apertura y cierre de portón trasero",
        "Cobertor de caja de carga"
      ],
      "SRX 4X2/4X4 6AT": [
        "Motor 2,8 litros de 4 cilindros y 16 válvulas con 204 CV de potencia máxima Automático de 6 velocidades",
        "Butacas con tapizado de cuero natural y ecológico, con función de ventilación",
        "Butaca del conductor con regulación eléctrica",
        "Llantas de aleación 18\" con neumáticos 265/60 R18",
        "Frenos delanteros y traseros de discos ventilados",
        "Barra tubular cromada",
        "Guardabarros extendidos con overfenders en color carrocería",
        "Toyota Safety Sense *(1): Control de velocidad crucero adaptativo (ACC); Sistema de pre colisión frontal"
      ]
    },
    
  };

  const colors = {
    corolla: {
      xli: {
        "2.0 XLI CVT": [
          { name: "Rojo Metalizado", code: "red", hex: "#AC1625" },
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ]
      },
      xei: {
        "2.0 XEI CVT": [
          { name: "Rojo Metalizado", code: "red", hex: "#AC1625" },
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ]
      },
      seg: {
        "2.0 SEG CVT": [
          { name: "Rojo Metalizado", code: "red", hex: "#AC1625" },
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ]
      }
    },
    hilux_cabina_doble: {
      dx: {
        "DX 4X2/4X4 6MT": [
          { name: "Plata Metalizado", code: "silver", hex: "#D3D3D3" },
          { name: "Negro Mica", code: "black", hex: "#191919" },
          { name: "Gris Oscuro Metalizado", code: "gray", hex: "#A6A6A6" },
          { name: "Super Blanco", code: "white", hex: "#F1F1EF" },
          { name: "Rojo Metalizado", code: "red", hex: "#8A0309" }
        ],
        "DX 4X2/4X4 6AT": [
          { name: "Plata Metalizado", code: "silver", hex: "#D3D3D3" },
          { name: "Negro Mica", code: "black", hex: "#191919" },
          { name: "Gris Oscuro Metalizado", code: "gray", hex: "#A6A6A6" },
          { name: "Super Blanco", code: "white", hex: "#F1F1EF" },
          { name: "Rojo Metalizado", code: "red", hex: "#8A0309" }
        ]
      },
      sr: {
        "SR 4X2/4X4 6MT": [
          { name: "Plata Metalizado", code: "silver", hex: "#D3D3D3" },
          { name: "Negro Mica", code: "black", hex: "#191919" },
          { name: "Gris Oscuro Metalizado", code: "gray", hex: "#A6A6A6" },
          { name: "Super Blanco", code: "white", hex: "#F1F1EF" },
          { name: "Rojo Metalizado", code: "red", hex: "#8A0309" }
        ],
        "SR 4X2/4X4 6AT": [
          { name: "Plata Metalizado", code: "silver", hex: "#D3D3D3" },
          { name: "Negro Mica", code: "black", hex: "#191919" },
          { name: "Gris Oscuro Metalizado", code: "gray", hex: "#A6A6A6" },
          { name: "Super Blanco", code: "white", hex: "#F1F1EF" },
          { name: "Rojo Metalizado", code: "red", hex: "#8A0309" }
        ]
      },
      srv: {
        "SRV 4X2/4X4 6AT": [
          { name: "Plata Metalizado", code: "silver", hex: "#D3D3D3" },
          { name: "Negro Mica", code: "black", hex: "#191919" },
          { name: "Gris Oscuro Metalizado", code: "gray", hex: "#A6A6A6" },
          { name: "Super Blanco", code: "white", hex: "#F1F1EF" },
          { name: "Rojo Metalizado", code: "red", hex: "#8A0309" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#E9E8E3" }
        ]
      },
      srx: {
        "SRX 4X2/4X4 6AT": [
          { name: "Plata Metalizado", code: "silver", hex: "#D3D3D3" },
          { name: "Negro Mica", code: "black", hex: "#191919" },
          { name: "Gris Oscuro Metalizado", code: "gray", hex: "#A6A6A6" },
          { name: "Super Blanco", code: "white", hex: "#F1F1EF" },
          { name: "Rojo Metalizado", code: "red", hex: "#8A0309" }
        ]
      }
    },
    hilux_cabina_simple: {
      dx: {
        "DX 4X2/4X4 MT": [
          { name: "Plata Metalizado", code: "silver", hex: "#D3D3D3" },
          { name: "Super Blanco", code: "white", hex: "#F1F1EF" }
        ]
      }
    },
    hilux_chasis_cabina: {
      dx: {
        "DX 4X2/4X4 MT": [
          { name: "Plata Metalizado", code: "silver", hex: "#D3D3D3" },
          { name: "Super Blanco", code: "white", hex: "#F1F1EF" }
        ]
      }
    },
    corolla_hybrid: {
      xei: {
        "HEV 1.8 XEI eCVT": [
          { name: "Rojo Metalizado", code: "red", hex: "#AC1625" },
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ]
      },
      seg: {
        "HEV 1.8 SEG eCVT": [
          { name: "Rojo Metalizado", code: "red", hex: "#AC1625" },
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ]
      }
    },
    corolla_gr_sport: {
      "gr-sport": {
        "2.0 CVT": [
          { name: "Negro Mica", code: "black", hex: "#191919" },
          { name: "Blanco Perlado Bitono", code: "white-perl", hex: "#D1D0CE" },
          { name: "Rojo Metalizado Bitono", code: "red", hex: "#8A0309" }
        ]
      }
    },
    yaris_hatchback: {
      xs: {
        "XS 1.5 6M/T 5P": [
          { name: "Rojo Metalizado", code: "red", hex: "#AC1625" },
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ],
        "XS 1.5 CVT 5P": [
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
        ]
      },
      xls: {
        "XLS 1.5 6M/T 5P": [
          { name: "Rojo Metalizado", code: "red", hex: "#AC1625" },
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ],
        "XLS 1.5 CVT 5P": [
          { name: "Rojo Metalizado", code: "red", hex: "#AC1625" },
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ],
        "XLS+ 1.5 CVT 5P": [
          { name: "Rojo Metalizado", code: "red", hex: "#AC1625" },
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ],
        "XLS PACK 1.5 CVT 5P": [
          { name: "Rojo Metalizado", code: "red", hex: "#AC1625" },
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ]
      },
      s: {
        "S 1.5 CVT 5P": [
          { name: "Rojo Metalizado", code: "red", hex: "#AC1625" },
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ]
      }
    },
    yaris_sedan: {
      xls: {
        "XLS 1.5 6M/T 4P": [
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ],
        "XLS 1.5 CVT 4P": [
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ],
        "XLS PACK 1.5 CVT 4P": [
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ]
      }
    },
    hilux_gr_sport_iv: {
      "gr-sport-iv": {
        "4X4": [
            { name: "Negro Mica", code: "black", hex: "#292826" }
        ]
      }
    },
    corolla_cross: {
      xli: {
        "XLI 2.0 CVT": [
          { name: "Rojo Metalizado", code: "red", hex: "#AC1625" },
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ]
          },
          xei: {
        "XEI 2.0 CVT": [
          { name: "Rojo Metalizado", code: "red", hex: "#AC1625" },
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ]
          },
          seg: {
        "SEG 2.0 CVT": [
          { name: "Rojo Metalizado", code: "red", hex: "#AC1625" },
          { name: "Negro Mica", code: "black", hex: "#292826" },
          { name: "Super Blanco", code: "white", hex: "#F8F8F8" },
          { name: "Gris Azulado", code: "blue", hex: "#61727B" },
          { name: "Blanco Perlado", code: "white-perl", hex: "#DBDAD6" },
          { name: "Gris Oscuro", code: "gray", hex: "#746D67" },
          { name: "Gris Plata", code: "silver", hex: "#DCDCDE" }
        ]
      }
    }
   


    
  };

  const versions = {
    corolla: [
      { name: "XLI", slug: "xli", subversions: ["2.0 XLI CVT"] },
      { name: "XEI", slug: "xei", subversions: ["2.0 XEI CVT"] },
      { name: "SEG", slug: "seg", subversions: ["2.0 SEG CVT"] }
    ],
    corolla_hybrid: [
      { name: "XEI", slug: "xei", subversions: ["HEV 1.8 XEI eCVT"] },
      { name: "SEG", slug: "seg", subversions: ["HEV 1.8 SEG eCVT"] }
    ],
    corolla_gr_sport: [
      { name: "GR-Sport", slug: "gr-sport", subversions: ["2.0 CVT"] }
    ],
    yaris_hatchback: [
      { name: "XS", slug: "xs", subversions: ["XS 1.5 6M/T 5P", "XS 1.5 CVT 5P"] },
      { name: "XLS", slug: "xls", subversions: ["XLS 1.5 6M/T 5P", "XLS 1.5 CVT 5P", "XLS+ 1.5 CVT 5P", "XLS PACK 1.5 CVT 5P"] },
      { name: "S", slug: "s", subversions: ["S 1.5 CVT 5P"] }
    ],
    yaris_sedan: [
      { name: "XLS", slug: "xls", subversions: ["XLS 1.5 6M/T 4P", "XLS 1.5 CVT 4P", "XLS PACK 1.5 CVT 4P"] }
    ],
    hilux_cabina_doble: [
      { name: "DX", slug: "dx", subversions: ["DX 4X2/4X4 6MT", "DX 4X2/4X4 6AT"] },
      { name: "SR", slug: "sr", subversions: ["SR 4X2/4X4 6MT", "SR 4X2/4X4 6AT"] },
      { name: "SRV", slug: "srv", subversions: ["SRV 4X2/4X4 6AT"] },
      { name: "SRX", slug: "srx", subversions: ["SRX 4X2/4X4 6AT"] }
    ],
    hilux_cabina_simple: [
      { name: "DX", slug: "dx", subversions: ["DX 4X2/4X4 MT"] }
    ],
    hilux_chasis_cabina: [
      { name: "DX", slug: "dx", subversions: ["DX 4X2/4X4 MT"] }
    ],
    hilux_gr_sport_iv: [
      { name: "GR-Sport IV", slug: "gr-sport-iv", subversions: ["4X4"] }
    ],
    corolla_cross: [
      { name: "XLI", slug: "xli", subversions: ["XLI 2.0 CVT"] },
      { name: "XEI", slug: "xei", subversions: ["XEI 2.0 CVT"] },
      { name: "SEG", slug: "seg", subversions: ["SEG 2.0 CVT"] }
    ],
    corolla_cross_hybrid: [
      { name: "XEI", slug: "xei", subversions: ["XEI HEV 1.8 eCVT"] },
      { name: "SEG", slug: "seg", subversions: ["SEG HEV 1.8 eCVT"] }
    ],
    corolla_cross_gr_sport: [
      { name: "GR-Sport", slug: "gr-sport", subversions: ["2.0 CVT GR-SPORT"] }
    ],
    sw4: [
      { name: "SRX", slug: "srx", subversions: ["SRX 4X4 6AT 7A"] },
      { name: "DIAMOND", slug: "diamond", subversions: ["DIAMOND 4X4 6AT 7A"] }
    ],
    sw4_gr_sport: [
      { name: "GR-Sport", slug: "gr-sport", subversions: ["4X4 6AT 7A"] }
    ],
    hiace_furgon: [
      { name: "L1H1", slug: "l1h1", subversions: ["2.8 TDI 6AT 3A"] },
      { name: "L2H2", slug: "l2h2", subversions: ["2.8 TDI 6AT 3A"] }
    ],
    hiace_commuter: [
      { name: "Commuter", slug: "commuter", subversions: ["2.8 TDI 6AT 14A"] }
    ],
    hiace_wagon: [
      { name: "Wagon", slug: "wagon", subversions: ["2.8 TDI 6AT 10A"] }
    ]
  };

  const imageCache = new Map();

  useEffect(() => {
    if (!versions[currentModel]) {
      console.error(`Invalid model: ${currentModel}`);
      return;
    }
    
    // Inicialización inicial
    preloadImages();
    renderAll();

    return () => clearImageCache();
  }, [currentModel]); // Solo se ejecuta cuando cambia el modelo

  useEffect(() => {
    renderAll();
  }, [currentVersion, currentSubversion, currentColor, showAllDescriptions]);

  const renderAll = () => {
    renderVersions();
    renderSubversions();
    renderColors();
    updateSprite();
    updateDescription();
  }

  const renderVersions = () => {
    const container = document.getElementById('versionTabs');
    if (!container) return;

    container.innerHTML = '';
    container.className = 'flex flex-wrap justify-center gap-4 w-full mb-2';
    
    versions[currentModel]?.forEach(version => {
      const btn = document.createElement('button');
      btn.textContent = version.name;
      btn.className = `px-8 py-3 font-bold rounded transition-all duration-300 transform ${
        currentVersion === version.slug 
          ? 'bg-[#eb001b] text-white shadow-lg scale-105 hover:bg-[#d10018]' 
          : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-[#eb001b] border-2 border-gray-200 hover:border-[#eb001b]'
      } mx-2 hover:shadow-md active:scale-95`;
      
      btn.onclick = () => {
        setCurrentVersion(version.slug);
        // Al cambiar versión, establecer primera subversión
        setCurrentSubversion(version.subversions[0]);
        // Establecer primer color disponible para la nueva configuración
        const firstAvailableColor = colors[currentModel]?.[version.slug]?.[version.subversions[0]]?.[0]?.code;
        if (firstAvailableColor) setCurrentColor(firstAvailableColor);
      };
      
      container.appendChild(btn);
    });
  };

  const renderSubversions = () => {
    const container = document.getElementById('subversionTabs');
    if (!container) return;

    const currentVersionData = versions[currentModel]?.find(v => v.slug === currentVersion);
    if (!currentVersionData) return;

    container.innerHTML = '';
    container.className = 'flex flex-wrap justify-center gap-3 max-w-4xl px-4';
    
    currentVersionData.subversions.forEach(subversion => {
      const btn = document.createElement('button');
      btn.textContent = subversion;
      btn.className = `px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 transform ${
        currentSubversion === subversion 
          ? 'bg-gradient-to-r from-[#eb001b] to-[#d10018] text-white shadow-lg scale-105' 
          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-[#eb001b] hover:text-[#eb001b]'
      } whitespace-nowrap hover:shadow active:scale-95`;
      
      btn.onclick = () => {
        setCurrentSubversion(subversion);
        // Al cambiar subversión, verificar si el color actual existe
        const availableColors = colors[currentModel]?.[currentVersion]?.[subversion];
        if (!availableColors?.some(c => c.code === currentColor)) {
          setCurrentColor(availableColors?.[0]?.code);
        }
      };
      
      container.appendChild(btn);
    });
  };

  const updateSelectedColorName = (colorName) => {
    const selectedColorNameElement = document.getElementById('selectedColorName');
    if (selectedColorNameElement && colorName) {
      selectedColorNameElement.textContent = `${colorName}`;
    }
  };

  const renderColors = () => {
    const container = document.getElementById('colorButtons');
    if (!container) return;

    const availableColors = colors[currentModel]?.[currentVersion]?.[currentSubversion];
    if (!availableColors) return;

    container.innerHTML = '';
    container.className = 'flex justify-center flex-wrap gap-3 max-w-xl px-4';
    
    availableColors.forEach(color => {
      const btn = document.createElement('button');
      btn.className = `w-10 h-10 rounded-full transition-all duration-300 transform ${
        currentColor === color.code 
          ? 'scale-110 shadow-lg ring-2 ring-[#eb001b] ring-offset-2' 
          : 'hover:scale-110 hover:shadow-md border-2 border-gray-200'
      }`;
      btn.style.backgroundColor = color.hex;
      btn.onclick = () => {
        setCurrentColor(color.code);
        updateSelectedColorName(color.name);
      };
      container.appendChild(btn);
    });

    // Actualizar nombre del color actual
    const currentColorData = availableColors.find(c => c.code === currentColor);
    if (currentColorData) {
      updateSelectedColorName(currentColorData.name);
    }
  };

  const preloadImages = () => {
    const imageUrls = [];
    versions[currentModel]?.forEach(version => {
      version.subversions.forEach(subversion => {
        colors[currentModel]?.[version.slug]?.[subversion]?.forEach(color => {
          const imageUrl = `/images-modelos/${currentModel}/${currentModel}-${version.slug}-${color.code}.png`;
          imageUrls.push(imageUrl);
          if (!imageCache.has(imageUrl)) {
            const img = new Image();
            img.src = imageUrl;
            imageCache.set(imageUrl, img);
          }
        });
      });
    });
  };

  const clearImageCache = () => {
    imageCache.clear();
  };

  const updateSprite = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const imageUrl = `/images-modelos/${currentModel}/${currentModel}-${currentVersion}-${currentColor}.png`;
    viewer.style.backgroundImage = `url('${imageUrl}')`;
    viewer.style.backgroundSize = '3000%';
    viewer.style.backgroundPosition = `${currentFrame * frameWidthPercentage}% 0`;
  };

  const updateDescription = () => {
    const descriptionList = descriptionListRef.current;
    if (!descriptionList) return;
    
    descriptionList.innerHTML = '';
    descriptionList.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
    
    const descriptions = subversionDescriptions[currentModel]?.[currentSubversion] || [];
    const itemsToShow = showAllDescriptions ? descriptions : descriptions.slice(0, 6);
    
    itemsToShow.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = `
        bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md 
        border border-gray-200 hover:border-[#eb001b]
        transform transition-all duration-500 ease-in-out
        opacity-0 translate-y-4
      `;
      
      // Aplicar la animación con un retraso basado en el índice
      setTimeout(() => {
        card.classList.remove('opacity-0', 'translate-y-4');
      }, index * 100);

      const text = document.createElement('p');
      text.className = 'text-xl text-gray-700 leading-relaxed';
      text.textContent = item;
      
      card.appendChild(text);
      descriptionList.appendChild(card);
    });

    // Si hay más de 6 descripciones, mostrar el botón correspondiente
    if (descriptions.length > 6) {
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'col-span-full flex justify-center mt-8';
      
      const button = document.createElement('button');
      button.className = `
        px-6 py-2 bg-[#eb001b] text-white rounded-full 
        hover:bg-[#d10018] transform transition-all duration-300 
        hover:scale-105 active:scale-95 flex items-center gap-2
      `;
      
      if (showAllDescriptions) {
        button.innerHTML = `
          Ver menos características
          <i class="ri-arrow-up-s-line text-xl transition-transform duration-300"></i>
        `;
      } else {
        button.innerHTML = `
          Ver más características
          <i class="ri-arrow-down-s-line text-xl transition-transform duration-300"></i>
        `;
      }
      
      button.onclick = () => {
        const cards = descriptionList.querySelectorAll('.bg-gray-50');
        
        // Animar la salida de las cards actuales
        cards.forEach((card, index) => {
          card.style.transition = 'all 30ms ease-in-out';
          card.style.transitionDelay = `${index * 50}ms`;
          card.classList.add('opacity-0', 'translate-y-4');
        });

        // Esperar a que termine la animación antes de actualizar
        setTimeout(() => {
          setShowAllDescriptions(!showAllDescriptions);
        }, cards.length * 50 + 30); // 30ms extra de margen para asegurar que todas las animaciones terminen
      };
      
      buttonContainer.appendChild(button);
      descriptionList.appendChild(buttonContainer);
    }
  };

  const updateFrame = diffX => {
    if (diffX > 20) {
      setCurrentFrame((currentFrame + 1) % totalFrames);
      setStartX(startX + 20);
    } else if (diffX < -20) {
      setCurrentFrame((currentFrame - 1 + totalFrames) % totalFrames);
      setStartX(startX - 20);
    }
    const offsetX = currentFrame * frameWidthPercentage;
    viewerRef.current.style.backgroundPosition = `${offsetX}% 0`;
  };

  const animate = () => {
    if (isDragging) {
      requestAnimationFrame(animate);
    }
  };

  const handleMouseDown = event => {
    setIsDragging(true);
    setStartX(event.pageX);
    viewerRef.current.classList.add('cursor-grabbing');
    requestAnimationFrame(animate);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    viewerRef.current.classList.remove('cursor-grabbing');
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    viewerRef.current.classList.remove('cursor-grabbing');
  };

  const handleMouseMove = event => {
    if (isDragging) {
      const diffX = event.pageX - startX;
      updateFrame(diffX);
    }
  };

  const handleTouchStart = event => {
    setIsDragging(true);
    setStartX(event.touches[0].pageX);
    requestAnimationFrame(animate);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = event => {
    if (isDragging) {
      const diffX = event.touches[0].pageX - startX;
      updateFrame(diffX);
    }
  };

  return (
    
      <div className="flex bg-white p-8 rounded-lg flex-col items-center space-y-20 w-full shadow-lg">
        <div className="flex flex-col items-center space-y-10 w-full md:w-2/3">
          <div id="versionTabs"></div>

          <div
            id="viewer"
            ref={viewerRef}
            className="aspect-video w-full lg:w-1/2 h-[200px] md:h-[316px] overflow-hidden cursor-grab bg-cover bg-no-repeat"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
          ></div>

          <div className="flex justify-center items-center space-x-4 font-semibold italic text-gray-400">
            <i className="ri-arrow-left-s-line h-7"></i>
            <p>Arrastra para girar</p>
            <i className="ri-arrow-right-s-line h-7"></i>
          </div>

          <div id="colorButtons"></div>
          <p id="selectedColorName" className="text-center font-semibold text-gray-700"></p>
        </div>

        <div className="flex flex-col space-y-6 w-full max-w-max items-center">
          <div id="subversionTabs"></div>
          <div className="bg-white p-6 w-full">
            <h2 className="text-3xl font-bold mb-6 text-[#eb001b] border-b pb-2">
              Características
            </h2>
            <div
              id="descriptionList"
              ref={descriptionListRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            ></div>
          </div>
        </div>
      </div>
    
  );
};

export default CarComponent360;
