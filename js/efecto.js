const logo = document.getElementById('logo');
const text = logo.textContent;
logo.innerHTML = '';

// Paleta de colores suaves y difuminados para el halo de luz (glow)
const hoverColors = [
  { color: '#38ef7d', glow: 'rgba(56, 239, 125, 0.45)' },  // Menta / Verde neón
  { color: '#ff77a9', glow: 'rgba(255, 119, 169, 0.45)' }, // Rosa neón
  { color: '#ffd166', glow: 'rgba(255, 209, 102, 0.45)' }, // Amarillo cálido vibrante
  { color: '#4cc9f0', glow: 'rgba(76, 201, 240, 0.45)' },  // Cían brillante
  { color: '#b5179e', glow: 'rgba(181, 23, 158, 0.45)' }   // Violeta / Magenta neón
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