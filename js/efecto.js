const logo = document.getElementById('logo');
const text = logo.textContent;
logo.innerHTML = '';

// Paleta de colores suaves y difuminados para el halo de luz (glow)
const hoverColors = [
  { color: '#5ec2fb', glow: 'rgba(94, 194, 251, 0.35)' },  // Cían pastel
  { color: '#ff7ebb', glow: 'rgba(255, 126, 187, 0.35)' }, // Rosa tenue
  { color: '#ffd166', glow: 'rgba(255, 209, 102, 0.35)' }, // Amarillo cálido
  { color: '#06d6a0', glow: 'rgba(6, 214, 160, 0.35)' },   // Menta
  { color: '#a29bfe', glow: 'rgba(162, 155, 254, 0.35)' }  // Violeta
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
  color: '#ff3b30',
  textShadow: '0px 6px 15px rgba(0, 0, 0, 0.6)',
  duration: 0.85,
  ease: "elastic.out(1.1, 0.35)", // Rebote elástico al bajar
  stagger: 0.08
}, "-=0.4");