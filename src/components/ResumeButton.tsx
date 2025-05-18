'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeButtonProps {
  resumeUrl: string;
  label?: string;
}

export default function ResumeButton({ 
  resumeUrl, 
  label = '下载我的简历' 
}: ResumeButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="w-full flex justify-center md:justify-start py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.a
          href={resumeUrl}
          download
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-3 relative overflow-hidden group"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 背景动画效果 */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* 图标动画 */}
          <motion.div
            className="relative z-10"
            animate={{ 
              rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
              y: isHovered ? [0, -5, 0] : 0 
            }}
            transition={{ 
              duration: 0.5,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1]
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </motion.div>
          
          {/* 文本 */}
          <span className="relative z-10 text-base md:text-lg">{label}</span>
          
          {/* 光效果 */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                className="absolute inset-0 bg-white opacity-20"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                exit={{ x: '200%' }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
        </motion.a>
      </motion.div>
    </div>
  );
}