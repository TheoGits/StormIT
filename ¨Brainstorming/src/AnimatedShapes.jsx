import React, { useEffect, useState } from 'react';

const FallingShapes = () => {
    const [shapes, setShapes] = useState([]);

    useEffect(() => {
        // Generate random shapes
        const generateShapes = () => {
            const newShapes = [];
            for (let i = 0; i < 20; i++) {
                const size = Math.random() * 50 + 20;
                const left = Math.random() * 100;
                const duration = Math.random() * 12 + 4;
                const shapeType = ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)];
                const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
                const initialSpin = Math.random() * 360; // Initial spin angle
                const startTop = Math.random() * -30 - 20; // Random start position between -20% and -50%

                newShapes.push({
                    id: i,
                    size,
                    left,
                    duration,
                    shapeType,
                    color,
                    initialSpin,
                    startTop,
                });
            }
            setShapes(newShapes);
        };

        generateShapes();
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '140%',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: -1,
        }}>
            {shapes.map((shape) => (
                <div
                    key={shape.id}
                    style={{
                        position: 'absolute',
                        top: `${shape.startTop}%`, // Start at a random top position
                        width: shape.shapeType === 'triangle' ? 0 : shape.size,
                        height: shape.shapeType === 'triangle' ? 0 : shape.size,
                        left: `${shape.left}%`,
                        animation: `fall-spin ${shape.duration}s linear infinite`,
                        opacity: 0.7,
                        backgroundColor: shape.shapeType === 'triangle' ? 'transparent' : shape.color,
                        borderRadius: shape.shapeType === 'circle' ? '50%' : 0,
                        borderLeft: shape.shapeType === 'triangle' ? `${shape.size / 2}px solid transparent` : 'none',
                        borderRight: shape.shapeType === 'triangle' ? `${shape.size / 2}px solid transparent` : 'none',
                        borderBottom: shape.shapeType === 'triangle' ? `${shape.size}px solid ${shape.color}` : 'none',
                    }}
                ></div>
            ))}
            <style>
                {`
                @keyframes fall-spin {
                    0% {
                        transform: translateY(0) rotate(0deg);
                    }
                    100% {
                        transform: translateY(200vh) rotate(180deg); /* Move and rotate the shape */
                    }
                }
                `}
            </style>
        </div>
    );
};

export default FallingShapes;
