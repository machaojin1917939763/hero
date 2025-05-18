# 3D个人主页

一个使用Three.js、React和Next.js构建的炫酷3D个人作品集网站。

## 功能特点

- 炫酷的3D粒子效果背景
- 响应式设计，适配桌面和移动设备
- 个人信息展示
- 技能树可视化
- 项目作品展示
- 简历下载功能

## 技术栈

- **前端框架**: Next.js (React)
- **3D渲染**: Three.js, React Three Fiber, Drei
- **样式**: Tailwind CSS
- **动画**: Framer Motion

## 本地开发

1. 克隆仓库

```bash
git clone https://github.com/yourusername/3d-portfolio.git
cd 3d-portfolio
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 构建和部署

### 构建项目

```bash
npm run build
```

### 本地预览构建结果

```bash
npm run start
```

### 部署到Vercel

这个项目可以轻松部署到Vercel平台：

1. 在GitHub上创建一个仓库并推送代码
2. 在Vercel上创建一个新项目
3. 导入GitHub仓库
4. 点击部署

## 自定义

### 个人信息

编辑 `src/app/page.tsx` 文件中的个人信息部分。

### 技能

在 `src/components/SkillTree.tsx` 文件中修改技能数据。

### 项目

在 `src/components/ProjectCards.tsx` 文件中更新项目数据。

### 简历

将你的简历PDF文件放在 `public` 目录下，并在 `src/app/page.tsx` 中更新简历链接。

## 许可

MIT
