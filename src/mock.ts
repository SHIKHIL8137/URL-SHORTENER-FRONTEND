import type { UserData } from "./interfaces/data.interfaces";

export interface UrlData {
  id: number;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: UserData;
}



export const mockApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email === 'user@example.com' && password === 'password') {
      return { token: 'mock-jwt-token', user: { email, name: 'John Doe' } };
    }
    throw new Error('Invalid credentials');
  },
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { token: 'mock-jwt-token', user: { email, name } };
  },
  shortenUrl: async (originalUrl: string): Promise<UrlData> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      id: Date.now(),
      originalUrl,
      shortUrl: `https://short.ly/${Math.random().toString(36).substr(2, 8)}`,
      clicks: 0,
      createdAt: new Date().toISOString()
    };
  },
  getUrls: async (): Promise<UrlData[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: 1,
        originalUrl: 'https://www.example.com/very-long-url-that-needs-shortening',
        shortUrl: 'https://short.ly/abc123',
        clicks: 42,
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: 2,
        originalUrl: 'https://www.another-example.com/another-very-long-url',
        shortUrl: 'https://short.ly/def456',
        clicks: 18,
        createdAt: '2024-01-14T15:45:00Z'
      }
    ];
  }
};