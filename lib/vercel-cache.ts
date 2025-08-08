interface VercelCacheInvalidationOptions {
  projectId?: string;
  deploymentUrl?: string;
  paths?: string[];
}

export class VercelCacheService {
  private token: string;
  private baseUrl = 'https://api.vercel.com';

  constructor() {
    this.token = process.env.VERCEL_TOKEN || '';
    
    if (!this.token) {
      console.warn('VERCEL_TOKEN not found. Cache invalidation will be skipped.');
    }
  }

  /**
   * Invalida o cache da Vercel usando Deploy Hook
   */
  async invalidateCache(options: VercelCacheInvalidationOptions = {}): Promise<boolean> {
    try {
      const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
      
      if (!deployHookUrl) {
        console.warn('VERCEL_DEPLOY_HOOK_URL not configured');
        return false;
      }

      // Trigger redeploy usando Deploy Hook
      const response = await fetch(deployHookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: 'Berry updated - cache invalidation requested'
        })
      });

      if (!response.ok) {
        throw new Error(`Deploy hook failed: ${response.status} ${response.statusText}`);
      }

      console.log('✅ Vercel cache invalidation triggered successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to invalidate Vercel cache:', error);
      return false;
    }
  }

  /**
   * Invalida cache usando Vercel API (método alternativo)
   */
  async invalidateCacheByPaths(paths: string[]): Promise<boolean> {
    try {
      if (!this.token) {
        console.warn('VERCEL_TOKEN not configured');
        return false;
      }

      const projectId = process.env.VERCEL_PROJECT_ID;
      if (!projectId) {
        console.warn('VERCEL_PROJECT_ID not configured');
        return false;
      }

      const response = await fetch(`${this.baseUrl}/v1/projects/${projectId}/invalidate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paths: paths
        })
      });

      if (!response.ok) {
        throw new Error(`Cache invalidation failed: ${response.status} ${response.statusText}`);
      }

      console.log('✅ Vercel cache invalidated for paths:', paths);
      return true;
    } catch (error) {
      console.error('❌ Failed to invalidate cache by paths:', error);
      return false;
    }
  }

  /**
   * Obter informações do projeto Vercel
   */
  async getProjectInfo(projectId: string) {
    try {
      if (!this.token) {
        throw new Error('VERCEL_TOKEN not configured');
      }

      const response = await fetch(`${this.baseUrl}/v1/projects/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get project info: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('❌ Failed to get project info:', error);
      return null;
    }
  }
}

// Instância singleton
export const vercelCache = new VercelCacheService();