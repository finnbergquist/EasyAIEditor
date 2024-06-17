import React, { useState, useRef } from "react";

const Mask = ({ form, selectedArea, setSelectedArea }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
  const [endCoords, setEndCoords] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStartCoords({ x: Math.max(0, Math.min(x, rect.width)), y: Math.max(0, Math.min(y, rect.height)) });
    setEndCoords({ x: Math.max(0, Math.min(x, rect.width)), y: Math.max(0, Math.min(y, rect.height)) });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setEndCoords({ x: Math.max(0, Math.min(x, rect.width)), y: Math.max(0, Math.min(y, rect.height)) });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedArea(getHighlightStyle());
  };

  const getHighlightStyle = () => {
    const left = Math.min(startCoords.x, endCoords.x);
    const top = Math.min(startCoords.y, endCoords.y);
    const width = Math.abs(startCoords.x - endCoords.x);
    const height = Math.abs(startCoords.y - endCoords.y);

    return {
      left,
      top,
      width,
      height,
    };
  };

  const handleMouseEnter = () => {
    if (!isDragging) {
      containerRef.current.style.cursor = "crosshair";
    }
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      containerRef.current.style.cursor = "auto";
    }
  };

  return (
    <div className="overflow-auto">
      <div
        className="relative"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ width: "600px", height: "600px" }}
      >
        <img
          ref={imgRef}
          src={form.selectedImage}
          alt="Selected Image"
          className="object-contain w-full h-full"
          draggable="false"
        />
        {isDragging && (
          <div
            className="absolute bg-red-200"
            style={{
              ...getHighlightStyle(),
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        )}
        {selectedArea && (
          <div
            className="absolute bg-gray-500 opacity-50"
            style={{
              left: `${selectedArea.left}px`,
              top: `${selectedArea.top}px`,
              width: `${selectedArea.width}px`,
              height: `${selectedArea.height}px`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Mask;
