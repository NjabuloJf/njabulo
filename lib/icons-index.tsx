// Katsumi Bot - Icon Index
// All icons used throughout the application

import {
  Sparkles,
  Zap,
  Play,
  MessageCircle,
  ChevronRight,
  X,
  Menu,
  Moon,
  Sun,
  Phone,
  Download,
  Share2,
  Heart,
  Star,
  Check,
  AlertCircle,
  ArrowLeft,
  Search,
  Settings,
  User,
  LogOut,
  MoreVertical,
  Copy,
  ExternalLink,
  Github,
  Twitter,
  Mail,
  Bell,
  Shield,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Loader,
  Loader2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  HelpCircle,
  MapPin,
  Calendar,
  Clock,
  Home,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  BarChart3,
  TrendingUp,
  Users,
  Layers,
  Cpu,
  Wifi,
  WifiOff,
  Activity,
  FileText,
  ImageIcon,
  Music,
  Video,
  Code,
  GitBranch,
  Package,
  Terminal,
  Inbox,
  Send,
  Paperclip,
  Smile,
  Grid,
  List,
  Square,
  Circle,
  Triangle,
  Type,
  Bold,
  Italic,
  Underline,
} from "lucide-react"

export const Icons = {
  // Navigation & UI
  chevronRight: ChevronRight,
  chevronLeft: ArrowLeft, // Updated to use ArrowLeft instead of ChevronLeft
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  menu: Menu,
  close: X,
  moreOptions: MoreVertical,

  // Theme
  moon: Moon,
  sun: Sun,

  // Communication
  message: MessageCircle,
  mail: Mail,
  phone: Phone,
  send: Send,
  paperclip: Paperclip,

  // Connection
  wifi: Wifi,
  wifiOff: WifiOff,

  // Actions
  play: Play,
  download: Download,
  share: Share2,
  copy: Copy,
  externalLink: ExternalLink,

  // Status
  check: Check,
  checkCircle: CheckCircle,
  alert: AlertCircle,
  alertTriangle: AlertTriangle,
  error: XCircle,
  info: Info,
  help: HelpCircle,

  // User & Account
  user: User,
  users: Users,
  logout: LogOut,
  shield: Shield,
  lock: Lock,
  unlock: Unlock,
  eye: Eye,
  eyeOff: EyeOff,

  // Content
  heart: Heart,
  star: Star,
  bell: Bell,
  search: Search,
  settings: Settings,

  // Data & Analytics
  barChart: BarChart3,
  trending: TrendingUp,
  activity: Activity,

  // Media & Files
  fileText: FileText,
  image: ImageIcon, // Updated to use ImageIcon instead of Image
  music: Music,
  video: Video,
  code: Code,

  // Development
  github: Github,
  twitter: Twitter,
  gitBranch: GitBranch,
  package: Package,
  terminal: Terminal,
  cpu: Cpu,

  // Form & Input
  plus: Plus,
  minus: Minus,
  grid: Grid,
  list: List,
  square: Square,
  circle: Circle,
  triangle: Triangle,
  type: Type,
  bold: Bold,
  italic: Italic,
  underline: Underline,

  // Special
  sparkles: Sparkles,
  zap: Zap,
  loader: Loader,
  loader2: Loader2,
  home: Home,
  mapPin: MapPin,
  calendar: Calendar,
  clock: Clock,
  inbox: Inbox,
  smile: Smile,
  layers: Layers,
}

export type IconName = keyof typeof Icons

export function getIcon(name: IconName, size = 24, color?: string) {
  const Icon = Icons[name]
  if (!Icon) return null
  return <Icon size={size} color={color} />
}
