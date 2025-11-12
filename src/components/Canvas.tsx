import React, { useRef, useEffect, useState } from 'react'
import type { OrderItem } from './OrderItem'

type CanvasProps = {
  setShowCanvas: React.Dispatch<React.SetStateAction<boolean>>
  setCakeBlob: React.Dispatch<React.SetStateAction<Blob | null>>
  setCurrentOrder: React.Dispatch<React.SetStateAction<OrderItem[]>>
}

export default function Canvas(props: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D>(null);

  const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    ctx.current = canvasRef.current.getContext("2d")!;
    canvasRef.current.width = 500;
    canvasRef.current.height = 500;
    ctx.current.fillStyle = '#000000'
    var imageData = new Image();
    imageData.src = 'src/assets/cake-500.png';
    imageData.onload = () => ctx.current?.drawImage(imageData, 0, 0);

    // ctx.current.putImageData(new ImageData(720, 480), 0, 0);
    // ctx.current.fillRect(0, 0, 720, 480);

    ctx.current.strokeStyle = '#0000FF';
    ctx.current.lineWidth = 5;
    ctx.current.beginPath();
  }, [canvasRef])

    function Draw() {      
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
  
  return <>
    <canvas ref={canvasRef}
      // onMouseEnter={(e) => SetPos(e)}
      onMouseDown={(e) => { SetPos(e); setIsDrawing(true) }}
      onMouseUp={(e) => { SetPos(e); setIsDrawing(false) }}
      onMouseMove={(e) => { Draw(); SetPos(e) }}
       />
    <button onClick={() => {
      if (canvasRef.current) {
        canvasRef.current.toBlob((blob) => {
          if (!blob) return;
          props.setCakeBlob(blob);
          props.setShowCanvas(false);
          props.setCurrentOrder(prev => {
            var next = [...prev]
            next.push({ name: 'Birthday Cake', imageBlob: blob })
            return next
          });
        })
      }
    }}>Add Cake to Order</button>
  </>
}