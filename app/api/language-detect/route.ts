import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { tags } = await request.json()

    if (!tags || !Array.isArray(tags)) {
      return NextResponse.json({ error: "Tags array is required" }, { status: 400 })
    }

    const languages = detectProgrammingLanguagesFromTags(tags)
    
    return NextResponse.json({
      languages,
      success: true
    })

  } catch (error) {
    return NextResponse.json({ 
      error: "Failed to detect languages",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

function detectProgrammingLanguagesFromTags(tags: string[]): { name: string; percentage: number }[] {
  const techStack = new Set<string>()
  
  const technologyMapping: { [key: string]: string } = {
    // Frontend
    "react": "React",
    "next.js": "Next.js",
    "nextjs": "Next.js",
    "vue": "Vue.js",
    "vue.js": "Vue.js",
    "angular": "Angular",
    "svelte": "Svelte",
    "typescript": "TypeScript",
    "javascript": "JavaScript",
    "html": "HTML",
    "css": "CSS",
    "tailwind": "Tailwind CSS",
    "tailwindcss": "Tailwind CSS",
    "bootstrap": "Bootstrap",
    "mui": "Material-UI",
    "material-ui": "Material-UI",
    "chakra": "Chakra UI",
    
    // Backend
    "node": "Node.js",
    "node.js": "Node.js",
    "express": "Express.js",
    "express.js": "Express.js",
    "nestjs": "NestJS",
    "python": "Python",
    "django": "Django",
    "flask": "Flask",
    "java": "Java",
    "spring": "Spring Boot",
    "php": "PHP",
    "laravel": "Laravel",
    "symfony": "Symfony",
    "wordpress": "WordPress",
    "go": "Go",
    "golang": "Go",
    "c#": "C#",
    "csharp": "C#",
    "asp.net": "ASP.NET",
    ".net": ".NET",
    "ruby": "Ruby",
    "rails": "Ruby on Rails",
    "rust": "Rust",
    
    // Mobile
    "react native": "React Native",
    "react-native": "React Native",
    "flutter": "Flutter",
    "dart": "Dart",
    "swift": "Swift",
    "kotlin": "Kotlin",
    
    // Database
    "mysql": "MySQL",
    "postgresql": "PostgreSQL",
    "postgres": "PostgreSQL",
    "mongodb": "MongoDB",
    "mongo": "MongoDB",
    "redis": "Redis",
    "sqlite": "SQLite",
    "firebase": "Firebase",
    "supabase": "Supabase",
    "prisma": "Prisma",
    
    // Tools & Others
    "docker": "Docker",
    "aws": "AWS",
    "vercel": "Vercel",
    "netlify": "Netlify",
    "github": "GitHub",
    "gitlab": "GitLab",
    "webpack": "Webpack",
    "vite": "Vite",
    "jwt": "JWT",
    "socket.io": "Socket.io",
    "socketio": "Socket.io"
  }

  // Process each tag
  tags.forEach(tag => {
    const normalizedTag = tag.toLowerCase().trim()
    
    // Direct mapping
    if (technologyMapping[normalizedTag]) {
      techStack.add(technologyMapping[normalizedTag])
    } else {
      // Fuzzy matching for partial matches
      for (const [key, value] of Object.entries(technologyMapping)) {
        if (normalizedTag.includes(key) || key.includes(normalizedTag)) {
          techStack.add(value)
          break
        }
      }
    }
  })

  // If no technologies detected, use common defaults based on tags
  if (techStack.size === 0) {
    tags.slice(0, 4).forEach(tag => {
      techStack.add(tag)
    })
  }

  const languagesArray = Array.from(techStack)
  const basePercentage = Math.floor(100 / languagesArray.length)
  const remainder = 100 - (basePercentage * languagesArray.length)

  const languages = languagesArray.map((lang, index) => ({
    name: lang,
    percentage: index === 0 ? basePercentage + remainder : basePercentage
  }))

  return languages.sort((a, b) => b.percentage - a.percentage)
}
