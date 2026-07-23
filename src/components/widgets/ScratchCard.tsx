import { useRef, useEffect, useState, useCallback } from 'react';

const CARD_WIDTH = 320;
const CARD_HEIGHT = 240;
const BRUSH_RADIUS = 20;
const AUTO_REVEAL_PCT = 0.5;
const REVEAL_FADE_MS = 800;

const HIDDEN_MESSAGE =
  "Happy 19th Ibhi! 🎉\n\nYou're the most amazing person\nI know. Every moment with you\nhas been a treasure. Keep shining\nand never forget how much\nyou're appreciated!\n\nWith lots of love and laughter,\nYour friend ⭐";

function drawTopLayer(ctx: CanvasRenderingContext2D) {
  // Gold gradient base
  const gradient = ctx.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
  gradient.addColorStop(0, '#FFD700');
  gradient.addColorStop(0.25, '#FFC125');
  gradient.addColorStop(0.5, '#FFD700');
  gradient.addColorStop(0.75, '#DAA520');
  gradient.addColorStop(1, '#FFD700');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  // Radial shine overlay
  const shine = ctx.createRadialGradient(60, 40, 10, 160, 120, 280);
  shine.addColorStop(0, 'rgba(255,255,255,0.35)');
  shine.addColorStop(0.4, 'rgba(255,255,255,0.08)');
  shine.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = shine;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  // Decorative border
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.strokeRect(10, 10, CARD_WIDTH - 20, CARD_HEIGHT - 20);
  ctx.setLineDash([]);

  // "SCRATCH HERE" text with glow
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;
  ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#FFF8E7';
  ctx.fillText('✨ SCRATCH HERE ✨', CARD_WIDTH / 2, CARD_HEIGHT / 2 - 8);

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Subtle hint below
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.fillText('drag to reveal', CARD_WIDTH / 2, CARD_HEIGHT / 2 + 30);
}

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);
  const isRevealing = useRef(false);
  const canvasOpacity = useRef(1);

  const getCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    return canvas?.getContext('2d') ?? null;
  }, []);

  // --- Draw initial top layer ---
  useEffect(() => {
    const ctx = getCanvas();
    if (!ctx) return;
    drawTopLayer(ctx);
  }, [getCanvas]);

  // --- Coordinate from mouse / touch event ---
  const getPos = useCallback(
    (e: MouseEvent | TouchEvent): { x: number; y: number } => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const scaleX = CARD_WIDTH / rect.width;
      const scaleY = CARD_HEIGHT / rect.height;

      const clientX = 'touches' in e ? e.touches[0]?.clientX ?? e.changedTouches[0]?.clientX ?? 0 : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY ?? e.changedTouches[0]?.clientY ?? 0 : e.clientY;

      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    },
    [],
  );

  // --- Erase a circle ---
  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }, []);

  // --- Sample alpha to determine what % is scratched ---
  const getPercentScratched = useCallback((): number => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, CARD_WIDTH, CARD_HEIGHT);
    const pixels = imageData.data;
    let transparent = 0;
    let checked = 0;

    // Sample every 4th pixel for performance
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) transparent++;
      checked++;
    }

    return checked > 0 ? transparent / checked : 0;
  }, []);

  // --- Smooth fade out of the top canvas ---
  const fadeAndReveal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / REVEAL_FADE_MS, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      canvas!.style.opacity = String(1 - eased);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setIsRevealed(true);
        isRevealing.current = false;
      }
    }

    requestAnimationFrame(tick);
  }, []);

  // --- Scratch handlers ---
  const handlePointerDown = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (isRevealed || isRevealing.current) return;
      e.preventDefault();
      isDrawing.current = true;
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    },
    [getPos, scratch],
  );

  const handlePointerMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current || isRevealed || isRevealing.current) return;
      e.preventDefault();
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    },
    [getPos, scratch],
  );

  const handlePointerUp = useCallback(() => {
    if (!isDrawing.current) return;
    isDrawing.current = false;

    const pct = getPercentScratched();
    if (pct > AUTO_REVEAL_PCT && !isRevealing.current) {
      isRevealing.current = true;
      fadeAndReveal();
    }
  }, [getPercentScratched, fadeAndReveal]);

  // --- Attach / detach DOM-level listeners for reliable up/cancel ---
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => handlePointerDown(e);
    const onMouseMove = (e: MouseEvent) => handlePointerMove(e);
    const onMouseUp = () => handlePointerUp();

    const onTouchStart = (e: TouchEvent) => handlePointerDown(e);
    const onTouchMove = (e: TouchEvent) => handlePointerMove(e);
    const onTouchEnd = () => handlePointerUp();

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [handlePointerDown, handlePointerMove, handlePointerUp]);

  // --- Reset ---
  const reset = useCallback(() => {
    isRevealing.current = false;
    isDrawing.current = false;
    setIsRevealed(false);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.style.transition = 'none';
    canvas.style.opacity = '1';
    canvasOpacity.current = 1;
    drawTopLayer(ctx);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: CARD_WIDTH,
        margin: '0 auto',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Card container */}
      <div
        style={{
          position: 'relative',
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.08)',
        }}
      >
        {/* Bottom layer — hidden message */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 28,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            textAlign: 'center',
            whiteSpace: 'pre-line',
            fontSize: 13,
            lineHeight: 1.7,
            fontFamily: 'Georgia, "Times New Roman", serif',
            letterSpacing: '0.01em',
          }}
        >
          {HIDDEN_MESSAGE}
        </div>

        {/* Top layer — scratch canvas */}
        <canvas
          ref={canvasRef}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            cursor: 'crosshair',
            touchAction: 'none',
            pointerEvents: isRevealed ? 'none' : 'auto',
          }}
        />
      </div>

      {/* Reset button */}
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <button
          onClick={reset}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px 12px',
            color: '#C8A46B',
            fontSize: 13,
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            textDecorationColor: '#C8A46B',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#B8944F';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#C8A46B';
          }}
        >
          Scratch Again
        </button>
      </div>
    </div>
  );
}
