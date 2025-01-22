import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';

const CarComponent360 = ({ initialModel, initialVersion, initialSubversion, initialColor }) => {
  const [currentModel, setCurrentModel] = useState(initialModel.toLowerCase());
  const [currentVersion, setCurrentVersion] = useState(initialVersion.toLowerCase());
  const [currentSubversion, setCurrentSubversion] = useState(initialSubversion);
  const [currentColor, setCurrentColor] = useState(initialColor);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const viewerRef = useRef(null);
  const descriptionListRef = useRef(null);
  const viewMoreButtonRef = useRef(null);

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
    initialize();
    preloadImages();
    window.addEventListener('beforeunload', clearImageCache);
    return () => {
      window.removeEventListener('beforeunload', clearImageCache);
    };
  }, [currentModel]);

  useEffect(() => {
    updateSprite();
    updateActiveVersionButton();
    updateActiveSubversionButton();
    renderSubversionTabs();
    renderColorButtons();
  }, [currentColor, currentModel, currentVersion, currentSubversion]);

  useEffect(() => {
    const colorName = colors[currentModel]?.[currentVersion]?.[currentSubversion]?.find(color => color.code === currentColor)?.name;
    if (colorName) {
      updateSelectedColorName(colorName);
    }
  }, [currentColor]);

  useEffect(() => {
    // Asegurar que el auto se cargue correctamente cuando la página se carga por primera vez.
    const model = initialModel.toLowerCase();
    const version = initialVersion.toLowerCase();
    const subversion = initialSubversion;
    const color = initialColor;

    if (versions[model] && versions[model].some(v => v.slug === version)) {
      setCurrentModel(model);
      setCurrentVersion(version);
      setCurrentSubversion(subversion);
      setCurrentColor(color);
      renderVersionTabs();
      renderSubversionTabs();
      renderColorButtons();
      updateSprite();
      updateDescription();
      resetViewMoreButton();
    } else {
      console.error('Invalid initial parameters:', { model, version, subversion, color });
    }
  }, []);

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

  const initialize = () => {
    renderVersionTabs();
    renderSubversionTabs();
    renderColorButtons();
    updateDescription();
    resetViewMoreButton();
  };

  const renderVersionTabs = () => {
    const versionTabs = document.getElementById('versionTabs');
    versionTabs.innerHTML = '';
    versions[currentModel]?.forEach(version => {
      const button = document.createElement('button');
      button.textContent = version.name;
      button.className = `version-tab px-4 py-2 font-semibold transition-transform duration-200 border-b-2 ${
        currentVersion === version.slug ? 'border-gray-800 text-gray-800' : 'border-transparent text-gray-500 hover:border-gray-400'
      }`;
      button.addEventListener('click', () => {
        setCurrentVersion(version.slug);
        setCurrentSubversion(version.subversions[0]);
        setCurrentColor(colors[currentModel]?.[version.slug]?.[version.subversions[0]]?.[0]?.code);
        renderSubversionTabs();
        renderColorButtons();
        updateSprite();
        updateDescription();
        resetViewMoreButton();
      });
      button.dataset.version = version.slug;
      versionTabs.appendChild(button);
    });
  };

  const updateActiveVersionButton = () => {
    document.querySelectorAll('.version-tab').forEach(button => {
      if (button.dataset.version === currentVersion) {
        button.classList.add('border-gray-800', 'text-gray-800');
        button.classList.remove('border-transparent', 'text-gray-500', 'hover:border-gray-400');
      } else {
        button.classList.add('border-transparent', 'text-gray-500', 'hover:border-gray-400');
        button.classList.remove('border-gray-800', 'text-gray-800');
      }
    });
  };

  const renderSubversionTabs = () => {
    const version = versions[currentModel]?.find(v => v.slug === currentVersion);
    if (!version) return;

    const subversionTabs = document.getElementById('subversionTabs');
    subversionTabs.innerHTML = '';
    version.subversions.forEach(subversion => {
      const tab = document.createElement('button');
      tab.textContent = subversion.toUpperCase();
      tab.className = `subversion-tab text-xs px-4 py-2 font-semibold transition-transform duration-200 border-b-2 ${
        currentSubversion === subversion ? 'border-gray-800 text-gray-800' : 'border-transparent text-gray-500 hover:border-gray-400'
      }`;
      tab.dataset.subversion = subversion;
      tab.addEventListener('click', () => {
        setCurrentSubversion(subversion);
        setCurrentColor(colors[currentModel]?.[currentVersion]?.[subversion]?.[0]?.code);
        updateActiveSubversionButton();
        renderColorButtons();
        updateSprite();
        updateDescription();
        resetViewMoreButton();
      });
      subversionTabs.appendChild(tab);
    });
  };

  const updateActiveSubversionButton = () => {
    document.querySelectorAll('.subversion-tab').forEach(tab => {
      if (tab.dataset.subversion === currentSubversion) {
        tab.classList.add('border-gray-800', 'text-gray-800');
        tab.classList.remove('border-transparent', 'text-gray-500', 'hover:border-gray-400');
      } else {
        tab.classList.add('border-transparent', 'text-gray-500', 'hover:border-gray-400');
        tab.classList.remove('border-gray-800', 'text-gray-800');
      }
    });
  };

  const renderColorButtons = () => {
    const colorButtons = document.getElementById('colorButtons');
    colorButtons.innerHTML = '';
    colors[currentModel]?.[currentVersion]?.[currentSubversion]?.forEach(color => {
      const button = document.createElement('button');
      button.className = `w-8 h-8 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform duration-200`;
      button.style.backgroundColor = color.hex;
      button.addEventListener('click', () => {
        setCurrentColor(color.code);
        updateSprite();
        updateSelectedColorName(color.name);
      });
      colorButtons.appendChild(button);
    });
    updateSelectedColorName(colors[currentModel]?.[currentVersion]?.[currentSubversion]?.[0]?.name);
  };

  const updateSelectedColorName = colorName => {
    const selectedColorNameElement = document.getElementById('selectedColorName');
    selectedColorNameElement.textContent = `Color seleccionado: ${colorName}`;
  };

  const updateSprite = () => {
    const viewer = viewerRef.current;
    viewer.classList.add('transition-all', 'duration-200');
    viewer.style.backgroundImage = `url('/images-modelos/${currentModel}/${currentModel}-${currentVersion}-${currentColor}.png')`;
    viewer.style.backgroundSize = '3000%';
    viewer.style.backgroundPosition = `${currentFrame * frameWidthPercentage}% 0`;
    setTimeout(() => {
      viewer.classList.remove('transition-all', 'duration-200');
    }, 200);
  };

  const updateDescription = () => {
    const descriptionList = descriptionListRef.current;
    descriptionList.innerHTML = '';
    subversionDescriptions[currentModel]?.[currentSubversion]?.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      descriptionList.appendChild(li);
    });
    descriptionList.classList.add('max-h-32');
    viewMoreButtonRef.current.textContent = 'Ver más';
  };

  const resetViewMoreButton = () => {
    const descriptionList = descriptionListRef.current;
    descriptionList.classList.remove('max-h-[1000px]', 'transition-all', 'duration-500', 'ease-in-out');
    descriptionList.classList.add('max-h-32');
    viewMoreButtonRef.current.textContent = 'Ver más';
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

  const handleViewMoreClick = () => {
    const descriptionList = descriptionListRef.current;
    if (descriptionList.classList.contains('max-h-32')) {
      descriptionList.classList.remove('max-h-32');
      descriptionList.classList.add('max-h-[1000px]', 'transition-all', 'duration-500', 'ease-in-out');
      viewMoreButtonRef.current.textContent = 'Ver menos';
    } else {
      descriptionList.classList.remove('max-h-[1000px]', 'transition-all', 'duration-500', 'ease-in-out');
      descriptionList.classList.add('max-h-32');
      viewMoreButtonRef.current.textContent = 'Ver más';
    }
  };

  return (
    
      <div className="flex bg-white p-5 rounded-lg flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 w-full shadow-lg">
        <div className="flex flex-col items-center space-y-4 w-full md:w-2/3">
          <div id="versionTabs" className="flex justify-center md:justify-start space-x-2 md:space-x-4 mb-4"></div>

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

          <div className="flex justify-center space-x-4 font-semibold italic text-gray-600">
            <p>Arrastra para girar</p>
          </div>

          <div id="colorButtons" className="flex justify-center space-x-2 md:space-x-4"></div>
          <p id="selectedColorName" className="text-center font-semibold mt-2 text-gray-700"></p>
        </div>

        <div className="flex flex-col space-y-4 w-full md:w-1/3 justify-center items-center">
          <div id="subversionTabs" className="flex justify-center space-x-2"></div>
          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">Descripción</h2>
            <ul
              id="descriptionList"
              ref={descriptionListRef}
              className="list-disc pl-5 text-sm md:text-base text-gray-700 max-h-32 overflow-hidden transition-all duration-300"
            ></ul>
            <button
              id="viewMoreButton"
              ref={viewMoreButtonRef}
              className="mt-2 text-blue-500 hover:underline"
              onClick={handleViewMoreClick}
            >
              Ver más
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default CarComponent360;
