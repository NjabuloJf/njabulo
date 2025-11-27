# Modern Portfolio – Next.js + Tailwind + Shadcn/UI

<div align="center">
  <img src="https://lannytourl.vestia.icu/api/file/6926fa12fdcdd67351cb6d08.jpg" height="85" alt="Portfolio Logo" />
</div>

<div align="center"><b>Modern Portfolio – Next.js + Tailwind + Shadcn/UI</b></div>

<div class="card-blockquote blue">
  <strong>✨ Overview</strong>
  <blockquote>
    <p>A clean, fast, and fully responsive personal portfolio built with <strong>Next.js App Router</strong>, <strong>TypeScript</strong>, <strong>TailwindCSS</strong>, and <strong>Shadcn/UI</strong>.</p>
    <p>This project is a full portfolio website equipped with dynamic routes, API utilities, animations, theme switching, screenshot generator API, language detection API, and modular components.</p>
    <p>Struktur aplikasi mengikuti folder system Next.js 14 dengan pendekatan <strong>App Router</strong> (<code>app/</code>).</p>
  </blockquote>
</div>

<div class="card-blockquote purple">
  <strong>📦 Tech Stack</strong>
  <blockquote>
    <div class="tech-stack">
      <div><strong>Frontend Framework</strong><br>Next.js 14 (App Router) + React 18 + TypeScript</div>
      <div><strong>Styling & Components</strong><br>TailwindCSS, Shadcn/UI, clsx, tailwind-merge</div>
      <div><strong>Backend Utilities</strong><br>API Routes (<code>app/api/*</code>) – Language detector API & Screenshot generator API</div>
      <div><strong>Utilities & Hooks</strong><br>Custom hooks (<code>use-mobile</code>, <code>use-toast</code>) & Helper functions (<code>lib/utils.ts</code>)</div>
    </div>
  </blockquote>
</div>

<div class="card-blockquote green">
  <strong>📁 Project Structure</strong>
  <blockquote>
    <div class="project-structure">
      <div><strong><code>app/</code> – Main Application</strong><br>• <code>page.tsx</code> — Homepage<br>• <code>about/page.tsx</code> — About page<br>• <code>projects/page.tsx</code> — Projects showcase<br>• <code>contact/page.tsx</code> — Contact form<br>• <code>layout.tsx</code> — Main layout wrapper<br>• <code>globals.css</code> — Global styles</div>
      
      <div><strong><code>app/api/</code> – Serverless API Routes</strong><br>• <code>language-detect/route.ts</code> — Detect language<br>• <code>screenshot/route.ts</code> — Generate website screenshot</div>
      
      <div><strong><code>components/ui/</code> – UI Library</strong><br>• Buttons, Cards, Navigation, ThemeSwitcher<br>• Modal, Sheet, Toast, Carousel, etc.</div>
      
      <div><strong><code>components/main/</code> – Sections & Page Blocks</strong><br>• Navbar, Hero Section, About Section<br>• Skill Cards, Project Grid, Contact Form, Footer</div>
      
      <div><strong><code>hooks/</code> – Custom React Hooks</strong><br>• <code>use-mobile.ts</code><br>• <code>use-toast.ts</code></div>
      
      <div><strong><code>public/</code> – Static Assets</strong><br>• <code>anjay.jpg</code> + favicon + metadata</div>
    </div>
  </blockquote>
</div>

<div class="card-blockquote orange">
  <strong>🔧 API Features</strong>
  <blockquote>
    <div class="api-feature">
      <div class="api-badge">📌</div>
      <div>
        <strong>Language Detection API</strong><br>
        <strong>Endpoint:</strong> <code>/api/language-detect</code><br>
        Menerima text → mengembalikan bahasa yang terdeteksi.
      </div>
    </div>
    
    <div class="api-feature">
      <div class="api-badge">📸</div>
      <div>
        <strong>Screenshot Generator API</strong><br>
        <strong>Endpoint:</strong> <code>/api/screenshot</code><br>
        Generate screenshot dari URL website menggunakan Node screenshot utilities.
      </div>
    </div>
  </blockquote>
</div>

<div class="card-blockquote pink">
  <strong>🚀 Getting Started</strong>
  <blockquote>
    <div class="command-block">
      <strong>Install dependencies</strong>
      <div class="code-block">pnpm install</div>
    </div>
    
    <div class="command-block">
      <strong>Run development server</strong>
      <div class="code-block">pnpm dev</div>
      <p>Open browser: <code>http://localhost:3000</code></p>
    </div>
  </blockquote>
</div>

<div class="card-blockquote teal">
  <strong>🧪 Build for Production</strong>
  <blockquote>
    <div class="command-block">
      <strong>Build static production bundle</strong>
      <div class="code-block">pnpm build</div>
    </div>
    
    <div class="command-block">
      <strong>Start production server</strong>
      <div class="code-block">pnpm start</div>
    </div>
  </blockquote>
</div>

<div class="card-blockquote indigo">
  <strong>🎨 Customization Tips</strong>
  <blockquote>
    <ul>
      <li>Edit color theme inside <code>globals.css</code></li>
      <li>Modify sections inside <code>components/main/</code></li>
      <li>Add new pages under <code>app/yourpage/page.tsx</code></li>
      <li>Use Shadcn components to expand UI easily</li>
    </ul>
  </blockquote>
</div>

<div class="card-blockquote gray">
  <strong>📝 License</strong>
  <blockquote>
    <p>This project is free to use and modify for personal or commercial portfolio purposes.</p>
  </blockquote>
</div>

<div class="demo-section" align="center">
  <a href="https://your-portfolio-demo.vercel.app" target="_blank" class="demo-link">
    🚀 Live Demo
  </a>
  <span style="margin: 0 10px">•</span>
  <a href="https://github.com/yourusername/modern-portfolio" target="_blank" class="demo-link">
    📂 Source Code
  </a>
</div>

<style>
  .card-blockquote {
    position: relative;
    background: white;
    border-radius: 8px;
    padding: 24px;
    margin: 20px 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-left: 5px solid;
    transition: all 0.3s ease;
  }
  
  .card-blockquote:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
  
  .card-blockquote.blue { border-left-color: #3B82F6; }
  .card-blockquote.purple { border-left-color: #8B5CF6; }
  .card-blockquote.green { border-left-color: #10B981; }
  .card-blockquote.orange { border-left-color: #F59E0B; }
  .card-blockquote.pink { border-left-color: #EC4899; }
  .card-blockquote.teal { border-left-color: #14B8A6; }
  .card-blockquote.indigo { border-left-color: #6366F1; }
  .card-blockquote.gray { border-left-color: #6B7280; }
  
  .card-blockquote strong {
    display: block;
    font-size: 1.2em;
    margin-bottom: 12px;
    color: #1F2937;
  }
  
  .card-blockquote blockquote {
    margin: 0;
    padding: 0;
    border-left: none;
    font-style: normal;
  }
  
  .tech-stack, .project-structure {
    display: grid;
    gap: 16px;
  }
  
  .tech-stack > div, .project-structure > div {
    padding: 12px;
    background: #F8FAFC;
    border-radius: 6px;
    border-left: 3px solid #E2E8F0;
  }
  
  .api-feature {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin: 16px 0;
    padding: 16px;
    background: #F8FAFC;
    border-radius: 6px;
  }
  
  .api-badge {
    font-size: 1.5em;
    padding: 8px;
    background: white;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .command-block {
    margin: 16px 0;
  }
  
  .code-block {
    background: #1F2937;
    color: #E5E7EB;
    padding: 12px;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    margin: 8px 0;
    border-left: 3px solid #10B981;
  }
  
  .demo-link {
    display: inline-block;
    background: linear-gradient(45deg, #3B82F6, #8B5CF6);
    color: white;
    padding: 12px 24px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;
    animation: pulse 2s infinite;
  }
  
  .demo-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4);
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
    }
  }
  
  .demo-section {
    margin: 30px 0;
  }
  
  ul {
    margin: 12px 0;
    padding-left: 20px;
  }
  
  li {
    margin: 6px 0;
  }
  
  code {
    background: #E5E7EB;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }
</style>

<div align="center" style="margin-top: 30px;">
  <img src="https://lannytourl.vestia.icu/api/file/6926fa12fdcdd67351cb6d08.jpg" alt="Portfolio Preview" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 100%; height: auto;" />
  <p><em>Portfolio Website Preview</em></p>
</div>
