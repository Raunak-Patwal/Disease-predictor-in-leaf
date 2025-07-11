import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Assuming Framer Motion for overall page animations

function SmokeTransition({ children }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2500); // 2.5 seconds for smoke to dissipate
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {!showContent && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-gray-900">
          {/* This is where your smoke animation logic would go */}
          {/* You might have multiple div elements animating out, or a particle system */}
          <div className="smoke-effect"></div> {/* Example smoke element */}
          <div className="smoke-effect-2"></div> {/* Another smoke element */}
          {/* ... more smoke elements or a particle component */}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default SmokeTransition;