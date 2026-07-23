// productos.js

// 1. LISTA COMPLETA DE EQUIPOS POR LIGA
const EQUIPOS_POR_LIGA = {
  "Premier League": ["Arsenal", "Aston Villa", "Chelsea", "Liverpool", "Manchester City", "Manchester United", "Newcastle", "Tottenham", "West Ham"],
  "La Liga": ["Athletic Club", "Atlético de Madrid", "Barcelona", "Betis", "Celta de Vigo", "Real Madrid", "Real Sociedad", "Sevilla", "Valencia", "Villarreal"],
  "Serie A": ["AC Milan", "Atalanta", "Fiorentina", "Inter", "Juventus", "Lazio", "Napoli", "Parma", "Roma", "Torino"],
  "Bundesliga": ["1. FC Köln", "Bayer Leverkusen", "Bayern München", "Borussia Dortmund", "Borussia Mönchengladbach", "Eintracht Frankfurt", "Hertha BSC", "RB Leipzig", "Schalke 04", "VfL Wolfsburg"],
  "Ligue 1": ["Lens", "Lille", "Lyon", "Marseille", "Monaco", "Nice", "Paris FC", "PSG"],
  "Liga chilena": ["Colo-Colo", "Universidad Católica", "Universidad de Chile"],
  "Liga argentina": ["Boca Juniors", "Estudiantes", "Independiente", "Newell's", "Racing Club", "River Plate", "Rosario Central", "San Lorenzo"],
  "Liga brasileña": ["Atlético Mineiro", "Botafogo", "Corinthians", "Flamengo", "Fluminense", "Gremio", "Inter de Porto Alegre", "Palmeiras", "RB Bragantino", "Santos", "São Paulo"],
  "Otras ligas": ["Ajax", "Al-Nassr", "América", "Atlas", "Benfica", "Braga", "Celtic", "Chivas de Guadalajara", "Cruz Azul", "Feyenoord", "Galatasaray", "Inter Miami", "Los Angeles FC", "Monterrey", "Necaxa", "New York City FC", "NY Red Bulls", "Porto", "PSV Eindhoven", "Pumas UNAM", "Rangers", "Tigres UANL", "Tijuana", "Toluca"]
};

// 2. GENERADOR AUTOMÁTICO DE PRODUCTOS (Variantes Fan, Jugador y Retro x Manga Corta/Larga)
function generarCatalogoCompleto() {
  const listaProductos = [];
  let idContador = 1001;

  // Configuraciones de cada tipo
  const configuraciones = [
    // VERSIÓN FAN
    {
      tipo: "Versión Fan",
      version: "Fan",
      carpetaPadre: "Version Fan",
      manga: "Manga Corta",
      subCarpetaManga: "Manga Corta",
      sufijoArchivo: "25-26",
      precio: 13000
    },
    {
      tipo: "Versión Fan",
      version: "Fan",
      carpetaPadre: "Version Fan",
      manga: "Manga Larga",
      subCarpetaManga: "Manga Larga",
      sufijoArchivo: "ML 25-26",
      precio: 20000
    },
    // VERSIÓN JUGADOR
    {
      tipo: "Versión Jugador",
      version: "Jugador",
      carpetaPadre: "Version Jugador",
      manga: "Manga Corta",
      subCarpetaManga: "Manga Corta",
      sufijoArchivo: "25-26",
      precio: 18000
    },
    {
      tipo: "Versión Jugador",
      version: "Jugador",
      carpetaPadre: "Version Jugador",
      manga: "Manga Larga",
      subCarpetaManga: "Manga Larga",
      sufijoArchivo: "ML 25-26",
      precio: 24000
    },
    // RETRO
    {
      tipo: "Retro",
      version: "Fan",
      carpetaPadre: "Version Retro",
      manga: "Manga Corta",
      subCarpetaManga: "Manga Corta",
      sufijoArchivo: "Retro",
      precio: 18000
    },
    {
      tipo: "Retro",
      version: "Fan",
      carpetaPadre: "Version Retro",
      manga: "Manga Larga",
      subCarpetaManga: "Manga Larga",
      sufijoArchivo: "ML Retro",
      precio: 24000
    }
  ];

  // Recorremos cada liga y equipo
  Object.keys(EQUIPOS_POR_LIGA).forEach(liga => {
    EQUIPOS_POR_LIGA[liga].forEach(equipo => {
      
      // Limpiamos el nombre de acentos para carpetas donde aplique si es necesario
      const equipoLimpio = equipo.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // Generamos las 6 variantes por equipo
      configuraciones.forEach(conf => {
        
        // Estructura exacta de la ruta:
        // Ej: Version Fan/Manga Corta/Premier League/Manchester United/Manchester United Local 25-26.jpg
        const rutaBase = `${conf.carpetaPadre}/${conf.subCarpetaManga}/${liga}/${equipo}`;
        const nombreArchivoFrontal = `${equipo} Local ${conf.sufijoArchivo}.jpg`;
        const nombreArchivoTrasero = `${equipo} Local ${conf.sufijoArchivo} 2.jpg`;

        listaProductos.push({
          id: `LO-${idContador}`,
          equipo: equipo,
          liga: liga,
          tipo: conf.tipo,
          manga: conf.manga,
          modelo: "Local",
          version: conf.version,
          temporada: conf.tipo === "Retro" ? "Retro" : "2025/26",
          disponible: true,
          price: conf.precio,
          nuevo: idContador % 5 === 0,
          popular: idContador % 3 === 0,
          tallas: ["S", "M", "L", "XL", "2XL"],
          imagen: `${rutaBase}/${nombreArchivoFrontal}`,
          imagenTrasera: `${rutaBase}/${nombreArchivoTrasero}`
        });

        idContador++;
      });
    });
  });

  return listaProductos;
}

// Exportamos la constante global PRODUCTS que consume index.html
const PRODUCTS = generarCatalogoCompleto();