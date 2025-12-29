export interface FileItem {
  name: string;
  isDirectory: boolean;
  content?: string;
  size?: number;
}

export interface ProcessItem {
  name: string;
  status: 'online' | 'stopped' | 'error';
  cpu: number;
  memory: number;
  uptime: string;
}

export interface SystemStats {
  timestamp: string;
  cpu: number;
  memory: number;
  network: number;
}
