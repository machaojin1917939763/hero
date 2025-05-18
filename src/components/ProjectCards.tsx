'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

interface ProjectCardsProps {
  projects?: Project[];
}

// 默认项目数据
const defaultProjects: Project[] = [
  {
    id: '1',
    title: '12306铁路购票系统',
    description: '基于JDK17、SpringBoot3和SpringCloud Alibaba构建的铁路购票系统，完成会员注册、车票查询、车票下单以及支付等业务。底层采用缓存、消息队列以及分库分表等技术支持海量用户购票以及数据存储。',
    image: '/projects/portfolio.jpg',
    tags: ['SpringBoot', 'SpringCloudAlibaba', 'RocketMQ', 'ShardingSphere', 'Redis', 'MySQL'],
    github: 'https://github.com/yourusername/12306',
  },
  {
    id: '2',
    title: '企业移动管理平台(EMM)',
    description: '负责EMM平台的日常维护与功能迭代，涵盖新功能开发、测试与线上部署工作，平台已覆盖超1000万台设备。实现如电子围栏、保密区域自动禁用摄像头等敏感功能限制策略，提升设备在政务/安防场景下的合规性与安全性。',
    image: '/projects/ecommerce.jpg',
    tags: ['Java', 'Spring', 'Redis', 'MySQL', '设计模式', 'DDD'],
  },
  {
    id: '3',
    title: '小米系统升级驱动',
    description: '负责小米系统升级驱动模块的架构设计与技术方案制定，推动各方资源协同落地。开发系统升级驱动模块，实现异常场景下的自动升级逻辑：当系统检测到异常且存在新版本时，自动触发升级流程，提升系统自恢复能力与用户体验。',
    image: '/projects/dashboard.jpg',
    tags: ['Java', 'Android', '系统架构', '自动化'],
  },
  {
    id: '4',
    title: '文档云',
    description: '一个文档共享网站，用户可以上传、下载、预览和搜索各种类型的文档。负责后端接口的设计和开发，使用SpringBoot框架开发了文档的存储、检索和管理功能，使用MongoDB数据库存储文档和用户信息，利用Elasticsearch引擎实现了文档的全文检索。',
    image: '/projects/dashboard.jpg',
    tags: ['SpringBoot', 'MongoDB', 'Elasticsearch', 'Redis', 'Vue'],
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 卡片动画变体
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' } 
    },
    hover: { 
      y: -15, 
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };
  
  // 标签动画变体
  const tagVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: (i: number) => ({ 
      scale: 1, 
      opacity: 1, 
      transition: { delay: 0.1 * i, duration: 0.4 } 
    }),
    hover: { scale: 1.05, y: -2 }
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col h-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setShowDetails(!showDetails)}
      layoutId={`project-card-${project.id}`}
    >
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: isHovered ? 0.7 : 0.5 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div 
          className="absolute bottom-4 left-4 right-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{project.title}</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, i) => (
              <motion.span 
                key={tag} 
                className="px-2 py-1 text-xs font-medium bg-blue-500/80 text-white rounded-full backdrop-blur-sm"
                variants={tagVariants}
                custom={i}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                {tag}
              </motion.span>
            ))}
            {project.tags.length > 3 && (
              <motion.span 
                className="px-2 py-1 text-xs font-medium bg-purple-500/80 text-white rounded-full backdrop-blur-sm"
                variants={tagVariants}
                custom={3}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                +{project.tags.length - 3}
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
      
      <div className="p-6 flex-grow">
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{project.description}</p>
      </div>
      
      <div className="p-6 pt-0 flex justify-between items-center">
        <div className="flex space-x-4">
          {project.github && (
            <Link 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </Link>
          )}
          {project.link && (
            <Link 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              预览
            </Link>
          )}
        </div>
        
        <motion.button
          className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(!showDetails);
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showDetails ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
          </svg>
        </motion.button>
      </div>
      
      <AnimatePresence>
        {showDetails && (
          <motion.div 
            className="px-6 pb-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium mb-2">所有技术标签</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <motion.span 
                    key={tag} 
                    className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              
              <h4 className="font-medium mb-2">项目详情</h4>
              <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function ProjectCards({ projects = defaultProjects }: ProjectCardsProps) {
  // 项目过滤和排序功能可以在这里添加
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  // 容器动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div className="py-16">
      <motion.h2 
        className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        我的项目
      </motion.h2>
      
      <motion.p 
        className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        这些是我最近完成的一些项目，展示了我的技术能力和创造力。点击卡片查看更多详情。
      </motion.p>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </div>
  );
}