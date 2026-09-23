// Paleta de colores para el halo de luz (glow)
const HOVER_COLORS = [
  { color: '#00ff88', glow: 'rgba(0, 255, 136, 0.45)' },
  { color: '#00e5ff', glow: 'rgba(0, 229, 255, 0.45)' },
  { color: '#3a86ff', glow: 'rgba(58, 134, 255, 0.45)' },
  { color: '#00b4d8', glow: 'rgba(0, 180, 216, 0.45)' },
  { color: '#7000ff', glow: 'rgba(112, 0, 255, 0.45)' }
];

const getRandomColor = () => HOVER_COLORS[Math.floor(Math.random() * HOVER_COLORS.length)];

// 1. Seleccionar TODOS los elementos con la clase .animated-title
const titulosAnimados = document.querySelectorAll('.animated-title');

titulosAnimados.forEach((titulo) => {
  // Accesibilidad
  titulo.setAttribute('aria-label', titulo.textContent.trim());

  // Fragmentación por <br>
  const lineas = titulo.innerHTML.split(/<br\s*\/?>/i);
  titulo.innerHTML = '';

  lineas.forEach((linea, index) => {
    const textoLimpio = linea.replace(/<[^>]*>/g, '');

    [...textoLimpio].forEach(char => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      titulo.appendChild(span);
    });

    if (index < lineas.length - 1) {
      titulo.appendChild(document.createElement('br'));
    }
  });

  // 2. Animar ÚNICAMENTE los .char pertenecientes a este título en particular
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