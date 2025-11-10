import React, { useRef, useEffect } from 'react'
import type { JSX } from 'react/jsx-runtime'

const Canvas = (props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLCanvasElement> & React.CanvasHTMLAttributes<HTMLCanvasElement>) => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D>(null);

  const [mouseData, setMouseData] = React.useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = React.useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    ctx.current = canvasRef.current.getContext("2d")!;
    canvasRef.current.width = 720;
    canvasRef.current.height = 480;
    ctx.current.fillStyle = '#000000'
    ctx.current.fillRect(0, 0, 720, 480);

    ctx.current.strokeStyle = '#0000FF';
    ctx.current.lineWidth = 5;
    ctx.current.beginPath();
  }, [canvasRef])

    function Draw(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {      
      if (!ctx.current) return;
      ctx.current.strokeStyle = '#0000FF';
      ctx.current.lineWidth = 5;
      if (isDrawing) {
        ctx.current.lineTo(mouseData.x, mouseData.y);
        ctx.current.stroke();
      }
      ctx.current.moveTo(mouseData.x, mouseData.y);
    }
    function offsetPos(x: number, y: number, element: HTMLCanvasElement) {
        const rect = element.getBoundingClientRect();
        return {   
            x: x - rect.left,
            y: y - rect.top
        };
    }   

    const SetPos = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (!ctx.current) return;
      setMouseData(offsetPos(e.clientX,  e.clientY, e.currentTarget));
      ctx.current.moveTo(mouseData.x, mouseData.y);
    }
  
  return <canvas ref={canvasRef}
    // onMouseEnter={(e) => SetPos(e)}
    onMouseDown={(e) => { SetPos(e); setIsDrawing(true)} }
    onMouseUp={(e) => { SetPos(e); setIsDrawing(false)} }
    onMouseMove={(e) => { Draw(e); SetPos(e) } }
    {...props}/>
}

export default Canvas