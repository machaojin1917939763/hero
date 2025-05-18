'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  icon?: string;
  color: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface SkillTreeProps {
  categories: SkillCategory[];
}

// 默认技能数据
const defaultCategories: SkillCategory[] = [
  {
    name: 'Java开发',
    skills: [
      { name: 'Java', level: 90, color: '#007396' },
      { name: 'Spring', level: 85, color: '#6DB33F' },
      { name: 'SpringBoot', level: 85, color: '#6DB33F' },
      { name: 'SpringCloud', level: 80, color: '#6DB33F' },
      { name: 'MyBatis', level: 85, color: '#3178C6' },
    ],
  },
  {
    name: '数据库',
    skills: [
      { name: 'MySQL', level: 85, color: '#4479A1' },
      { name: 'Redis', level: 80, color: '#DC382D' },
      { name: 'MongoDB', level: 75, color: '#47A248' },
      { name: 'ShardingSphere', level: 70, color: '#000000' },
    ],
  },
  {
    name: '中间件',
    skills: [
      { name: 'RocketMQ', level: 80, color: '#D77310' },
      { name: 'RabbitMQ', level: 75, color: '#FF6600' },
      { name: 'Docker', level: 75, color: '#2496ED' },
      { name: 'Nginx', level: 70, color: '#009639' },
    ],
  },
  {
    name: '其他技能',
    skills: [
      { name: 'Git', level: 85, color: '#F05032' },
      { name: 'Linux', level: 75, color: '#FCC624' },
      { name: 'Jenkins', level: 70, color: '#D24939' },
      { name: '设计模式', level: 80, color: '#FF61F6' },
    ],
  },
];

const SkillBar = ({ skill }: { skill: Skill }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-xs font-medium">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <motion.div
          className="h-2.5 rounded-full"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default function SkillTree({ categories = defaultCategories }: SkillTreeProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0].name);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const controls = useAnimation();
  
  // 动画效果
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    });
  }, [activeCategory, controls]);
  
  return (
    <div className="py-12">
      <motion.h2 
        className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        我的技能
      </motion.h2>
      
      {/* 分类选项卡 - 增强样式和动画 */}
      <div className="flex justify-center mb-12 space-x-6 overflow-x-auto pb-4">
        {categories.map((category, index) => (
          <motion.button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`px-6 py-3 rounded-full transition-all font-medium text-sm md:text-base ${activeCategory === category.name
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: activeCategory === category.name ? 1.05 : 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>
      
      {/* 技能列表 - 增强交互和视觉效果 */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {categories
            .filter((category) => category.name === activeCategory)
            .map((category) => (
              <motion.div 
                key={category.name} 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    custom={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: (i) => ({
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: i * 0.1,
                          duration: 0.5
                        }
                      })
                    }}
                    whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        {skill.icon && (
                          <span className="mr-2 text-xl" style={{ color: skill.color }}>
                            {skill.icon}
                          </span>
                        )}
                        {skill.name}
                      </h3>
                      <span 
                        className="text-sm font-bold px-3 py-1 rounded-full" 
                        style={{ 
                          backgroundColor: `${skill.color}20`, // 添加透明度
                          color: skill.color 
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-3 rounded-full relative"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${skill.level}%`,
                          transition: { duration: 1.5, delay: 0.2 + index * 0.1 }
                        }}
                      >
                        {hoveredSkill === skill.name && (
                          <motion.div 
                            className="absolute top-0 left-0 h-full w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ 
                              background: `linear-gradient(90deg, ${skill.color}00, ${skill.color}, ${skill.color}00)`,
                              backgroundSize: '200% 100%'
                            }}
                            transition={{ 
                              opacity: { duration: 0.3 },
                            }}
                          />
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}