import React, { useRef, useState, useEffect } from 'react';
import { Language } from '../../types';

export const SignaturePad: React.FC<{
    language: Language;
    signature: string | null;
    onSignatureChange: (signature: string | null) => void;
}> = ({ language, signature, onSignatureChange }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(!!signature);

    useEffect(() => {
        if (signature && canvasRef.current && !hasDrawn) {
            const ctx = canvasRef.current.getContext('2d');
            const img = new Image();
            img.onload = () => {
                ctx?.drawImage(img, 0, 0);
            };
            img.src = signature;
            setHasDrawn(true);
        }
    }, [signature, hasDrawn]);

    const getCoordinates = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        
        if (event.type.includes('touch')) {
            const touch = (event as React.TouchEvent).touches[0];
            return {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
        } else {
            const mouse = (event as React.MouseEvent);
            return {
                x: mouse.clientX - rect.left,
                y: mouse.clientY - rect.top
            };
        }
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        const coords = getCoordinates(e);
        if (!coords || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(coords.x, coords.y);
            setIsDrawing(true);
            setHasDrawn(true);
        }
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        if (!isDrawing || !canvasRef.current) return;
        const coords = getCoordinates(e);
        if (!coords) return;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctx.lineTo(coords.x, coords.y);
            ctx.stroke();
        }
    };

    const stopDrawing = () => {
        if (isDrawing && canvasRef.current) {
            setIsDrawing(false);
            const dataUrl = canvasRef.current.toDataURL('image/png');
            onSignatureChange(dataUrl);
        }
    };

    const clear = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            setHasDrawn(false);
            onSignatureChange(null);
        }
    };

    // Prevent scrolling while drawing on touch devices
    useEffect(() => {
        const preventScroll = (e: TouchEvent) => e.preventDefault();
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.addEventListener('touchmove', preventScroll, { passive: false });
        }
        return () => {
            if (canvas) {
                canvas.removeEventListener('touchmove', preventScroll);
            }
        };
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 mt-6 shadow-sm">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <i className="fa-solid fa-signature text-purple-600"></i>
                    {language === 'en' ? 'Digital Signature (Optional)' : 'ডিজিটাল স্বাক্ষর (ঐচ্ছিক)'}
                </h3>
                {hasDrawn && (
                    <button 
                        onClick={clear}
                        type="button"
                        className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors"
                    >
                        {language === 'en' ? 'Clear' : 'মুছুন'}
                    </button>
                )}
            </div>
            
            <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex justify-center w-full touch-none" style={{ touchAction: 'none' }}>
                <canvas 
                    ref={canvasRef}
                    width={400}
                    height={150}
                    className="max-w-full cursor-crosshair touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    style={{ touchAction: 'none' }}
                />
            </div>
            {!hasDrawn && (
                <p className="text-center text-gray-400 mt-2 text-sm">
                    {language === 'en' ? 'Use mouse or finger to sign' : 'স্বাক্ষর করতে মাউস বা আঙুল ব্যবহার করুন'}
                </p>
            )}
        </div>
    );
};
