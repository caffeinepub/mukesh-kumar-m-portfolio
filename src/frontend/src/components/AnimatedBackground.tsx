import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced color palette matching Hero text gradient
    // oklch(0.68 0.28 295) - figma purple
    // oklch(0.72 0.24 10) - coral pink
    // oklch(0.76 0.22 40) - tangerine orange
    const figmaPurple = 'rgba(139, 92, 246, 0.15)';
    const coralPink = 'rgba(249, 117, 131, 0.12)';
    const tangerineOrange = 'rgba(255, 156, 110, 0.10)';
    const accentGlow = 'rgba(139, 92, 246, 0.08)';

    // Design elements
    const artboards: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }> = [];

    // Create artboard elements
    for (let i = 0; i < 8; i++) {
      artboards.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 80 + Math.random() * 120,
        height: 100 + Math.random() * 150,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.0005,
        opacity: 0.3 + Math.random() * 0.3,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid pattern
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 50;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw and animate artboards
      artboards.forEach((artboard, index) => {
        ctx.save();
        ctx.translate(artboard.x + artboard.width / 2, artboard.y + artboard.height / 2);
        ctx.rotate(artboard.rotation);

        // Enhanced gradient fill matching Hero text gradient colors
        const gradient = ctx.createLinearGradient(
          -artboard.width / 2,
          -artboard.height / 2,
          artboard.width / 2,
          artboard.height / 2
        );

        if (index % 3 === 0) {
          gradient.addColorStop(0, figmaPurple);
          gradient.addColorStop(1, coralPink);
        } else if (index % 3 === 1) {
          gradient.addColorStop(0, coralPink);
          gradient.addColorStop(1, tangerineOrange);
        } else {
          gradient.addColorStop(0, tangerineOrange);
          gradient.addColorStop(1, accentGlow);
        }

        ctx.fillStyle = gradient;
        ctx.globalAlpha = artboard.opacity;

        // Draw artboard with rounded corners
        const radius = 8;
        ctx.beginPath();
        ctx.moveTo(-artboard.width / 2 + radius, -artboard.height / 2);
        ctx.lineTo(artboard.width / 2 - radius, -artboard.height / 2);
        ctx.quadraticCurveTo(artboard.width / 2, -artboard.height / 2, artboard.width / 2, -artboard.height / 2 + radius);
        ctx.lineTo(artboard.width / 2, artboard.height / 2 - radius);
        ctx.quadraticCurveTo(artboard.width / 2, artboard.height / 2, artboard.width / 2 - radius, artboard.height / 2);
        ctx.lineTo(-artboard.width / 2 + radius, artboard.height / 2);
        ctx.quadraticCurveTo(-artboard.width / 2, artboard.height / 2, -artboard.width / 2, artboard.height / 2 - radius);
        ctx.lineTo(-artboard.width / 2, -artboard.height / 2 + radius);
        ctx.quadraticCurveTo(-artboard.width / 2, -artboard.height / 2, -artboard.width / 2 + radius, -artboard.height / 2);
        ctx.closePath();
        ctx.fill();

        // Enhanced border with glow effect matching Hero gradient colors
        ctx.strokeStyle = index % 3 === 0 ? 'rgba(139, 92, 246, 0.4)' : 
                         index % 3 === 1 ? 'rgba(249, 117, 131, 0.35)' : 
                         'rgba(255, 156, 110, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw bounding box handles with matching colors
        const handleSize = 6;
        ctx.fillStyle = index % 3 === 0 ? 'rgba(139, 92, 246, 0.6)' : 
                       index % 3 === 1 ? 'rgba(249, 117, 131, 0.55)' : 
                       'rgba(255, 156, 110, 0.5)';
        
        // Corner handles
        [-1, 1].forEach((xDir) => {
          [-1, 1].forEach((yDir) => {
            ctx.fillRect(
              (xDir * artboard.width) / 2 - handleSize / 2,
              (yDir * artboard.height) / 2 - handleSize / 2,
              handleSize,
              handleSize
            );
          });
        });

        ctx.restore();

        // Update rotation
        artboard.rotation += artboard.rotationSpeed;

        // Wrap around screen
        if (artboard.x > canvas.width + artboard.width) artboard.x = -artboard.width;
        if (artboard.x < -artboard.width) artboard.x = canvas.width + artboard.width;
        if (artboard.y > canvas.height + artboard.height) artboard.y = -artboard.height;
        if (artboard.y < -artboard.height) artboard.y = canvas.height + artboard.height;

        // Slow drift
        artboard.x += Math.sin(Date.now() * 0.0001 + index) * 0.1;
        artboard.y += Math.cos(Date.now() * 0.0001 + index) * 0.1;
      });

      // Draw alignment guides
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);

      // Vertical guides
      [0.25, 0.5, 0.75].forEach((ratio) => {
        ctx.beginPath();
        ctx.moveTo(canvas.width * ratio, 0);
        ctx.lineTo(canvas.width * ratio, canvas.height);
        ctx.stroke();
      });

      // Horizontal guides
      [0.25, 0.5, 0.75].forEach((ratio) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * ratio);
        ctx.lineTo(canvas.width, canvas.height * ratio);
        ctx.stroke();
      });

      ctx.setLineDash([]);

      // Enhanced gradient mesh overlay matching Hero text gradient sequence
      const meshGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
      meshGradient.addColorStop(0, 'rgba(139, 92, 246, 0.05)');
      meshGradient.addColorStop(0.5, 'rgba(249, 117, 131, 0.03)');
      meshGradient.addColorStop(1, 'rgba(255, 156, 110, 0.02)');

      ctx.fillStyle = meshGradient;
      ctx.globalAlpha = 0.4;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default AnimatedBackground;
