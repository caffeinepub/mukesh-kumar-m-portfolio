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

    // Design elements configuration
    const artboards: Array<{ x: number; y: number; width: number; height: number; rotation: number; speed: number }> = [];
    const boundingBoxes: Array<{ x: number; y: number; width: number; height: number; rotation: number; speed: number }> = [];
    
    // Initialize artboards (wireframe rectangles)
    for (let i = 0; i < 8; i++) {
      artboards.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 80 + Math.random() * 120,
        height: 60 + Math.random() * 100,
        rotation: Math.random() * Math.PI / 6,
        speed: 0.1 + Math.random() * 0.3,
      });
    }

    // Initialize bounding boxes (smaller design elements)
    for (let i = 0; i < 12; i++) {
      boundingBoxes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 30 + Math.random() * 50,
        height: 30 + Math.random() * 50,
        rotation: Math.random() * Math.PI / 4,
        speed: 0.15 + Math.random() * 0.4,
      });
    }

    let offset = 0;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid (design system baseline)
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;

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

      // Draw artboard wireframes
      artboards.forEach((artboard) => {
        ctx.save();
        ctx.translate(artboard.x, artboard.y);
        ctx.rotate(artboard.rotation);

        // Artboard outline
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
        ctx.lineWidth = 2;
        ctx.strokeRect(-artboard.width / 2, -artboard.height / 2, artboard.width, artboard.height);

        // Corner handles
        const handleSize = 8;
        ctx.fillStyle = 'rgba(168, 85, 247, 0.12)';
        ctx.fillRect(-artboard.width / 2 - handleSize / 2, -artboard.height / 2 - handleSize / 2, handleSize, handleSize);
        ctx.fillRect(artboard.width / 2 - handleSize / 2, -artboard.height / 2 - handleSize / 2, handleSize, handleSize);
        ctx.fillRect(-artboard.width / 2 - handleSize / 2, artboard.height / 2 - handleSize / 2, handleSize, handleSize);
        ctx.fillRect(artboard.width / 2 - handleSize / 2, artboard.height / 2 - handleSize / 2, handleSize, handleSize);

        ctx.restore();

        // Animate position
        artboard.y += artboard.speed;
        if (artboard.y > canvas.height + artboard.height) {
          artboard.y = -artboard.height;
          artboard.x = Math.random() * canvas.width;
        }
      });

      // Draw bounding boxes
      boundingBoxes.forEach((box) => {
        ctx.save();
        ctx.translate(box.x, box.y);
        ctx.rotate(box.rotation);

        // Box outline with dashed style
        ctx.strokeStyle = 'rgba(251, 146, 60, 0.1)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(-box.width / 2, -box.height / 2, box.width, box.height);
        ctx.setLineDash([]);

        // Center cross (alignment guide)
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -box.height / 2);
        ctx.lineTo(0, box.height / 2);
        ctx.moveTo(-box.width / 2, 0);
        ctx.lineTo(box.width / 2, 0);
        ctx.stroke();

        ctx.restore();

        // Animate position
        box.y += box.speed;
        if (box.y > canvas.height + box.height) {
          box.y = -box.height;
          box.x = Math.random() * canvas.width;
        }
      });

      offset += 0.2;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.4 }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-figma-500/5 via-transparent via-50% to-coral-500/5 animate-mesh-gradient" />
    </>
  );
};

export default AnimatedBackground;
