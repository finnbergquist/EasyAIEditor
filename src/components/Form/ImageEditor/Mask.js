import React, { useState, useEffect, useRef } from "react";

const Mask = ({ form }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [mask, setMask] = useState(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const maskContextRef = useRef(null);
  const imageRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      const { width, height } = dimensions;
      const canvas = canvasRef.current;
      const maskCanvas = maskCanvasRef.current;
      canvas.width = width;
      canvas.height = height;
      maskCanvas.width = width;
      maskCanvas.height = height;
      if (contextRef.current && maskContextRef.current) {
        const image = imageRef.current;
        contextRef.current.drawImage(image, 0, 0, width, height);
        maskContextRef.current.drawImage(image, 0, 0, width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dimensions]);

  const startDrawing = ({ nativeEvent }) => {
    const { clientX, clientY } = nativeEvent;
    const { top, left } = canvasRef.current.getBoundingClientRect();
    contextRef.current.beginPath();
    contextRef.current.moveTo(clientX - left, clientY - top);
    maskContextRef.current.beginPath();
    maskContextRef.current.moveTo(clientX - left, clientY - top);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    if (!isDrawing) return;
    contextRef.current.closePath();
    maskContextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { clientX, clientY } = nativeEvent;
    const { top, left } = canvasRef.current.getBoundingClientRect();
    contextRef.current.lineTo(clientX - left, clientY - top);
    contextRef.current.stroke();
    maskContextRef.current.lineTo(clientX - left, clientY - top);
    maskContextRef.current.stroke();
  };

  const handleImageLoad = (e) => {
    const image = e.target;
    const { naturalWidth, naturalHeight } = image;
    setDimensions({ width: naturalWidth, height: naturalHeight });

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const maskCanvas = maskCanvasRef.current;
    const maskContext = maskCanvas.getContext("2d");

    canvas.width = naturalWidth;
    canvas.height = naturalHeight;
    maskCanvas.width = naturalWidth;
    maskCanvas.height = naturalHeight;

    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = "rgba(255, 255, 0, 0.4)";
    contextRef.current = context;

    maskContext.lineWidth = 5;
    maskContext.lineCap = "round";
    maskContext.strokeStyle = "rgba(0, 0, 0, 1)";
    maskContextRef.current = maskContext;

    context.drawImage(image, 0, 0, naturalWidth, naturalHeight);
  };

  const exportMask = () => {
    const maskCanvas = maskCanvasRef.current;
    const maskDataUrl = maskCanvas.toDataURL();
    setMask(maskDataUrl);
  };

  return (
    <div className="flex-grow h-full p-2 bg-gray-100 rounded-lg border border-gray-300 relative">
      <img
        src={form.selectedImage}
        alt="Selected Image"
        onLoad={handleImageLoad}
        ref={imageRef}
        style={{ display: 'none' }}
      />
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
        className="absolute top-0 left-0"
      />
      <canvas
        ref={maskCanvasRef}
        style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px`, display: 'none' }}
        className="absolute top-0 left-0"
      />
    </div>
  );
};

export default Mask;
