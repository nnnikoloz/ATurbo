// ========================================
// CANVAS 1: Neural Network Flow Animation
// ========================================
const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');

let width1, height1;
let nodes1 = [];
let connections1 = [];

function initCanvas1() {
  width1 = canvas1.width = window.innerWidth;
  height1 = canvas1.height = window.innerHeight;
  
  // Create network nodes
  nodes1 = [];
  for (let i = 0; i < 80; i++) {
    nodes1.push({
      x: Math.random() * width1,
      y: Math.random() * height1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      pulsePhase: Math.random() * Math.PI * 2
    });
  }
}

function animateCanvas1() {
  ctx1.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx1.fillRect(0, 0, width1, height1);
  
  // Update and draw nodes
  nodes1.forEach((node, i) => {
    node.x += node.vx;
    node.y += node.vy;
    
    if (node.x < 0 || node.x > width1) node.vx *= -1;
    if (node.y < 0 || node.y > height1) node.vy *= -1;
    
    node.pulsePhase += 0.05;
    const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
    
    // Draw node
    ctx1.fillStyle = `rgba(255, 255, 255, ${pulse * 0.8})`;
    ctx1.beginPath();
    ctx1.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx1.fill();
    
    // Draw connections
    for (let j = i + 1; j < nodes1.length; j++) {
      const dx = nodes1[j].x - node.x;
      const dy = nodes1[j].y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const opacity = (1 - distance / 150) * 0.3;
        ctx1.strokeStyle = `rgba(160, 224, 171, ${opacity})`;
        ctx1.lineWidth = 1;
        ctx1.beginPath();
        ctx1.moveTo(node.x, node.y);
        ctx1.lineTo(nodes1[j].x, nodes1[j].y);
        ctx1.stroke();
        
        // Animate data flow
        const progress = (Date.now() / 1000) % 1;
        const flowX = node.x + dx * progress;
        const flowY = node.y + dy * progress;
        
        ctx1.fillStyle = `rgba(255, 172, 46, ${opacity * 2})`;
        ctx1.beginPath();
        ctx1.arc(flowX, flowY, 2, 0, Math.PI * 2);
        ctx1.fill();
      }
    }
  });
  
  requestAnimationFrame(animateCanvas1);
}

// ========================================
// CANVAS 2: Speed Lines Animation
// ========================================
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

let width2, height2;
let lines2 = [];

function initCanvas2() {
  width2 = canvas2.width = window.innerWidth;
  height2 = canvas2.height = window.innerHeight;
  
  lines2 = [];
  for (let i = 0; i < 100; i++) {
    lines2.push({
      x: Math.random() * width2,
      y: Math.random() * height2,
      length: Math.random() * 100 + 50,
      speed: Math.random() * 15 + 5,
      opacity: Math.random() * 0.5 + 0.3
    });
  }
}

function animateCanvas2() {
  ctx2.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx2.fillRect(0, 0, width2, height2);
  
  lines2.forEach(line => {
    line.x += line.speed;
    
    if (line.x > width2 + line.length) {
      line.x = -line.length;
      line.y = Math.random() * height2;
      line.speed = Math.random() * 15 + 5;
    }
    
    const gradient = ctx2.createLinearGradient(line.x, line.y, line.x + line.length, line.y);
    gradient.addColorStop(0, 'rgba(255, 172, 46, 0)');
    gradient.addColorStop(0.5, `rgba(255, 172, 46, ${line.opacity})`);
    gradient.addColorStop(1, 'rgba(160, 224, 171, 0)');
    
    ctx2.strokeStyle = gradient;
    ctx2.lineWidth = 2;
    ctx2.beginPath();
    ctx2.moveTo(line.x, line.y);
    ctx2.lineTo(line.x + line.length, line.y);
    ctx2.stroke();
  });
  
  requestAnimationFrame(animateCanvas2);
}

// ========================================
// CANVAS 3: Particle Acceleration
// ========================================
const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');

let width3, height3;
let particles3 = [];

function initCanvas3() {
  width3 = canvas3.width = window.innerWidth;
  height3 = canvas3.height = window.innerHeight;
  
  particles3 = [];
  for (let i = 0; i < 200; i++) {
    particles3.push(createParticle3());
  }
}

function createParticle3() {
  return {
    x: Math.random() * width3,
    y: Math.random() * height3,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
    radius: Math.random() * 3 + 1,
    life: 1,
    decay: Math.random() * 0.005 + 0.002
  };
}

function animateCanvas3() {
  ctx3.fillStyle = 'rgba(0, 0, 0, 0.08)';
  ctx3.fillRect(0, 0, width3, height3);
  
  // Center attractor
  const centerX = width3 / 2;
  const centerY = height3 / 2;
  const time = Date.now() / 1000;
  
  particles3.forEach((particle, i) => {
    // Attraction to center
    const dx = centerX - particle.x;
    const dy = centerY - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 50) {
      particle.vx += (dx / distance) * 0.1;
      particle.vy += (dy / distance) * 0.1;
    }
    
    // Apply velocity with spiral
    const angle = Math.atan2(dy, dx);
    particle.vx += Math.cos(angle + Math.PI / 2) * 0.05;
    particle.vy += Math.sin(angle + Math.PI / 2) * 0.05;
    
    // Damping
    particle.vx *= 0.99;
    particle.vy *= 0.99;
    
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    // Wrap around
    if (particle.x < 0) particle.x = width3;
    if (particle.x > width3) particle.x = 0;
    if (particle.y < 0) particle.y = height3;
    if (particle.y > height3) particle.y = 0;
    
    // Draw particle
    const hue = (distance / width3) * 120 + 80;
    ctx3.fillStyle = `hsla(${hue}, 70%, 60%, ${particle.life * 0.8})`;
    ctx3.beginPath();
    ctx3.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx3.fill();
    
    // Trail
    ctx3.strokeStyle = `hsla(${hue}, 70%, 60%, ${particle.life * 0.3})`;
    ctx3.lineWidth = 1;
    ctx3.beginPath();
    ctx3.moveTo(particle.x, particle.y);
    ctx3.lineTo(particle.x - particle.vx * 2, particle.y - particle.vy * 2);
    ctx3.stroke();
  });
  
  requestAnimationFrame(animateCanvas3);
}

// ========================================
// CANVAS 4: Data Flow Visualization
// ========================================
const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');

let width4, height4;
let streams4 = [];

function initCanvas4() {
  width4 = canvas4.width = window.innerWidth;
  height4 = canvas4.height = window.innerHeight;
  
  streams4 = [];
  for (let i = 0; i < 30; i++) {
    streams4.push({
      points: [],
      x: Math.random() * width4,
      y: Math.random() * height4,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 3 + 2,
      hue: Math.random() * 60 + 100,
      maxLength: Math.random() * 50 + 30
    });
  }
}

function animateCanvas4() {
  ctx4.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx4.fillRect(0, 0, width4, height4);
  
  streams4.forEach(stream => {
    // Update position
    stream.angle += (Math.random() - 0.5) * 0.2;
    stream.x += Math.cos(stream.angle) * stream.speed;
    stream.y += Math.sin(stream.angle) * stream.speed;
    
    // Wrap around
    if (stream.x < 0) stream.x = width4;
    if (stream.x > width4) stream.x = 0;
    if (stream.y < 0) stream.y = height4;
    if (stream.y > height4) stream.y = 0;
    
    // Add point
    stream.points.push({ x: stream.x, y: stream.y });
    if (stream.points.length > stream.maxLength) {
      stream.points.shift();
    }
    
    // Draw stream
    for (let i = 1; i < stream.points.length; i++) {
      const opacity = i / stream.points.length;
      ctx4.strokeStyle = `hsla(${stream.hue}, 70%, 60%, ${opacity * 0.6})`;
      ctx4.lineWidth = 2;
      ctx4.beginPath();
      ctx4.moveTo(stream.points[i - 1].x, stream.points[i - 1].y);
      ctx4.lineTo(stream.points[i].x, stream.points[i].y);
      ctx4.stroke();
    }
    
    // Draw head
    ctx4.fillStyle = `hsla(${stream.hue}, 70%, 70%, 0.9)`;
    ctx4.beginPath();
    ctx4.arc(stream.x, stream.y, 3, 0, Math.PI * 2);
    ctx4.fill();
  });
  
  requestAnimationFrame(animateCanvas4);
}

// ========================================
// Counter Animation for Metrics
// ========================================
function animateValue(element, start, end, duration) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (end - start) * easeOutQuart);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Intersection Observer for metrics
const metricsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const metrics = entry.target.querySelectorAll('.metric-value');
      metrics.forEach(metric => {
        const target = parseInt(metric.getAttribute('data-target'));
        animateValue(metric, 0, target, 2000);
      });
      metricsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// ========================================
// Initialize All
// ========================================
window.addEventListener('load', () => {
  initCanvas1();
  initCanvas2();
  initCanvas3();
  initCanvas4();
  
  animateCanvas1();
  animateCanvas2();
  animateCanvas3();
  animateCanvas4();
  
  // Observe metrics section
  const metricsSection = document.querySelector('.speed-metrics');
  if (metricsSection) {
    metricsObserver.observe(metricsSection.closest('.visual-section'));
  }
});

window.addEventListener('resize', () => {
  initCanvas1();
  initCanvas2();
  initCanvas3();
  initCanvas4();
});
