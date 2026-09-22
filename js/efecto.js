const logo = document.getElementById('logo');
const text = logo.textContent;
logo.innerHTML = '';

// Paleta de colores suaves y difuminados para el halo de luz (glow)
const hoverColors = [
  { color: '#00ff88', glow: 'rgba(0, 255, 136, 0.45)' },  // Verde Terminal (Matrix)
  { color: '#00e5ff', glow: 'rgba(0, 229, 255, 0.45)' },  // Cian Neón
  { color: '#3a86ff', glow: 'rgba(58, 134, 255, 0.45)' },  // Azul Eléctrico
  { color: '#00b4d8', glow: 'rgba(0, 180, 216, 0.45)' },  // Azul Turquesa / Dev
  { color: '#7000ff', glow: 'rgba(112, 0, 255, 0.45)' }   // Púrpura Código / Sintaxis
];

// Separar cada letra en su propio <span>
[...text].forEach(char => {
  const span = document.createElement('span');
  span.textContent = char === ' ' ? '\u00A0' : char;
  span.classList.add('char');
  span.style.display = 'inline-block'; 
  logo.appendChild(span);
});

// Crear una línea de tiempo infinita
const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

// Subida de las letras con rebote elástico (Efecto original de la caída)
tl.to('.char', {
  y: -20,
  scaleY: 1.15,
  scaleX: 0.94,
  duration: 0.85,
  ease: "elastic.out(1.1, 0.35)", // Rebote elástico al subir
  color: () => hoverColors[Math.floor(Math.random() * hoverColors.length)].color,
  textShadow: () => {
    const randomGlow = hoverColors[Math.floor(Math.random() * hoverColors.length)].glow;
    return `0px 12px 25px ${randomGlow}, 0px 0px 30px ${randomGlow}`;
  },
  stagger: 0.08
})
// Regreso a la posición base con el mismo rebote elástico
.to('.char', {
  y: 0,
  scaleY: 1,
  scaleX: 1,
  color: '#e2e8f0',
  textShadow: '0px 6px 15px rgba(0, 0, 0, 0.6)',
  duration: 0.85,
  ease: "elastic.out(1.1, 0.35)", // Rebote elástico al bajar
  stagger: 0.08
}, "-=0.4");