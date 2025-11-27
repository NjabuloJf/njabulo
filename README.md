<h1 align='center'><img alt="Baileys logo" src="https://raw.githubusercontent.com/WhiskeySockets/Baileys/refs/heads/master/Media/logo.png" height="75"/></h1>

<div align='center'><b>Baileys - WhatsApp Web API Library</b></div>

<div class="card-blockquote red">
  <strong>⚠️ CRITICAL NOTICE</strong>
  <p><strong>NOTICE OF BREAKING CHANGE</strong></p>
  <p>As of 7.0.0, multiple breaking changes were introduced into the library.</p>
  <p>Please check out <a href="https://whiskey.so/migrate-latest">https://whiskey.so/migrate-latest</a> for more information.</p>
</div>

<div class="card-blockquote blue">
  <strong>📖 About Baileys</strong>
  <p>Baileys is a WebSockets-based TypeScript library for interacting with the WhatsApp Web API.</p>
  <p>A clean, efficient, and fully featured library for WhatsApp automation.</p>
</div>

<div class="card-blockquote yellow">
  <strong>ℹ️ Important Notes</strong>
  <p>This is a temporary README.md, the new guide is in development and will this file will be replaced with .github/README.md (already a default on GitHub).</p>
  <p>New guide link: <a href="https://baileys.wiki">https://baileys.wiki</a></p>
</div>

<div class="card-blockquote green">
  <strong>💖 Sponsor</strong>
  <p>If you'd like to financially support this project, you can do so by supporting the current maintainer <a href="https://purpshell.dev/sponsor">here</a>.</p>
</div>

<div class="card-blockquote orange">
  <strong>⚖️ Disclaimer</strong>
  <p>This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or its affiliates.</p>
  <p>The official WhatsApp website can be found at whatsapp.com. "WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners.</p>
</div>

<div class="card-blockquote purple">
  <strong>🚀 Key Features</strong>
  <ul>
    <li>Baileys does not require Selenium or any other browser to interface with WhatsApp Web</li>
    <li>Saves significant RAM compared to browser-based solutions</li>
    <li>Supports multi-device & web versions of WhatsApp</li>
    <li>Built with TypeScript for better development experience</li>
  </ul>
</div>

<div class="demo-section" align="center">
  <a href="https://github.com/WhiskeySockets/Baileys" target="_blank" class="demo-link">
    📂 Source Code
  </a>
  <span style="margin: 0 10px">•</span>
  <a href="https://discord.gg/WeJM5FP9GG" target="_blank" class="demo-link">
    💬 Discord Community
  </a>
  <span style="margin: 0 10px">•</span>
  <a href="https://baileys.wiki" target="_blank" class="demo-link">
    📚 Documentation
  </a>
</div>

<style>
  .card-blockquote {
    position: relative;
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-left: 5px solid;
    transition: all 0.3s ease;
  }
  
  .card-blockquote:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
  
  .card-blockquote.red { border-left-color: #EF4444; }
  .card-blockquote.blue { border-left-color: #3B82F6; }
  .card-blockquote.yellow { border-left-color: #F59E0B; }
  .card-blockquote.green { border-left-color: #10B981; }
  .card-blockquote.orange { border-left-color: #F97316; }
  .card-blockquote.purple { border-left-color: #8B5CF6; }
  
  .card-blockquote strong {
    display: block;
    font-size: 1.1em;
    margin-bottom: 10px;
    color: #1F2937;
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
</style>
