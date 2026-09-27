const HOVER_COLORS = [
  { color: '#00ff88', glow: 'rgba(0, 255, 136, 0.45)' },
  { color: '#00e5ff', glow: 'rgba(0, 229, 255, 0.45)' },
  { color: '#3a86ff', glow: 'rgba(58, 134, 255, 0.45)' },
  { color: '#00b4d8', glow: 'rgba(0, 180, 216, 0.45)' },
  { color: '#7000ff', glow: 'rgba(112, 0, 255, 0.45)' }
];

const getRandomColor = () => HOVER_COLORS[Math.floor(Math.random() * HOVER_COLORS.length)];

const titulosAnimados = document.querySelectorAll('.animated-title');

titulosAnimados.forEach((titulo) => {
  // Accesibilidad
  titulo.setAttribute('aria-label', titulo.textContent.trim());

  // Dividir por líneas según los <br>
  const lineasTexto = titulo.innerHTML.split(/<br\s*\/?>/i);
  titulo.innerHTML = '';

  lineasTexto.forEach((linea) => {
    const textoLimpio = linea.replace(/<[^>]*>/g, '').trim();
    if (!textoLimpio) return;

    // Crear un contenedor de bloque por cada línea para forzar el centrado
    const lineaContainer = document.createElement('div');
    lineaContainer.style.display = 'block';
    lineaContainer.style.textAlign = 'center';
    lineaContainer.style.width = '100%';

    [...textoLimpio].forEach(char => {
      const span = document.createElement('span');
      span.className = 'char';
      
      if (char === ' ') {
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = char;
      }
      
      lineaContainer.appendChild(span);
    });

    titulo.appendChild(lineaContainer);
  });

  // Animar los .char pertenecientes a este título
  const letrasDeEsteTitulo = titulo.querySelectorAll('.char');

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

  tl.to(letrasDeEsteTitulo, {
    y: -20,
    scaleY: 1.15,
    scaleX: 0.94,
    duration: 0.85,
    ease: 'elastic.out(1.1, 0.35)',
    stagger: 0.08,
    color: () => getRandomColor().color,
    textShadow: () => {
      const { glow } = getRandomColor();
      return `0px 12px 25px ${glow}, 0px 0px 30px ${glow}`;
    }
  })
  .to(letrasDeEsteTitulo, {
    y: 0,
    scaleY: 1,
    scaleX: 1,
    color: '#e2e8f0',
    textShadow: '0px 6px 15px rgba(0, 0, 0, 0.6)',
    duration: 0.85,
    ease: 'elastic.out(1.1, 0.35)',
    stagger: 0.08
  }, '-=0.4');
});