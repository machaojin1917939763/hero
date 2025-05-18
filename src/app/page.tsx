import Image from 'next/image';
import ThreeHero from '@/components/ThreeHero';
import ProfileInfo from '@/components/ProfileInfo';
import SkillTree from '@/components/SkillTree';
import ProjectCards from '@/components/ProjectCards';
import ResumeButton from '@/components/ResumeButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 3D Hero Section */}
      <ThreeHero />
      
      {/* Profile Info Section */}
      <section className="container mx-auto px-4 py-12">
        <ProfileInfo 
          name="马超金"
          title="软件研发工程师 / Java开发工程师"
          description="黑龙江科技大学软件工程本科毕业，曾获三等奖学金、蓝桥杯省一等奖等多项荣誉。目前就职于小米科技有限责任公司系统架构部，负责EMM平台迭代升级与代码重构，以及系统升级驱动模块开发。擅长Java开发，熟悉Spring全家桶，对Redis、MySQL等技术有深入理解。"
          socialLinks={{
            github: 'https://github.com/yourusername',
            linkedin: 'https://linkedin.com/in/yourusername',
            email: 'mailto:1917939763@qq.com',
            website: 'https://yourwebsite.com'
          }}
        />
        <ResumeButton resumeUrl="/马超金简历.pdf" />
      </section>
      
      {/* Skills Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SkillTree />
        </div>
      </section>
      
      {/* Projects Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ProjectCards />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} 马超金 - 个人作品集</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              微信: 17384273601
            </a>
            <a href="mailto:1917939763@qq.com" className="hover:text-blue-400 transition-colors">
              Email: 1917939763@qq.com
            </a>
            <a href="tel:17384273601" className="hover:text-blue-400 transition-colors">
              电话: 17384273601
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
