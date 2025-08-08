"use client";

import { useState } from 'react';
import { vercelCache } from '@/lib/vercel-cache';
import { toast } from 'sonner';

export interface BerryType {
  id: string;
  type: 'profile' | 'header' | 'hero' | 'settings';
  data: any;
  updated_at: string;
}

// 🍃 Leafs que afetam os 🌳 Bushes
const BUSH_AFFECTING_LEAFS = ['header', 'hero'] as const;
type BushLeafType = typeof BUSH_AFFECTING_LEAFS[number];

export function useBerrySync() {
  const [isInvalidating, setIsInvalidating] = useState(false);

  const shouldInvalidateCache = (leafType: string): leafType is BushLeafType => {
    return BUSH_AFFECTING_LEAFS.includes(leafType as BushLeafType);
  };

  const invalidateBushCache = async (leafType?: string) => {
    setIsInvalidating(true);
    
    try {
      // Invalidar cache da Vercel para 🌳 Bushes
      const success = await vercelCache.invalidateCache();
      
      if (success) {
        toast.success(
          `🌳 Cache dos Bushes invalidado! As mudanças aparecerão em breve.`,
          {
            description: leafType ? `🍃 Leaf: ${leafType}` : '🍒 Berries atualizadas',
            duration: 5000,
          }
        );
      } else {
        toast.warning(
          '⚠️ Não foi possível invalidar o cache automaticamente',
          {
            description: 'As mudanças podem demorar alguns minutos para aparecer nos 🌳 Bushes',
            duration: 7000,
          }
        );
      }
      
      return success;
    } catch (error) {
      console.error('Error invalidating bush cache:', error);
      toast.error('❌ Erro ao invalidar cache dos 🌳 Bushes');
      return false;
    } finally {
      setIsInvalidating(false);
    }
  };

  const syncBerryToBushes = async (berry: BerryType) => {
    // Verificar se este 🍃 Leaf afeta os 🌳 Bushes
    if (!shouldInvalidateCache(berry.type)) {
      console.log(`🍒 Berry ${berry.type} updated, but doesn't affect 🌳 Bushes. Skipping cache invalidation.`);
      return true; // Sucesso, mas sem invalidação
    }

    console.log(`🍒 Berry ${berry.type} updated, syncing to 🌳 Bushes...`);
    return await invalidateBushCache(berry.type);
  };

  const syncLeafToBushes = async (berry: BerryType) => {
    // Específico para 🍃 Leafs
    if (!shouldInvalidateCache(berry.type)) {
      console.log(`🍃 Leaf ${berry.type} updated, but doesn't affect 🌳 Bushes. Skipping cache invalidation.`);
      return true;
    }

    console.log(`🍃 Leaf ${berry.type} updated, syncing 🍒 Berry to 🌳 Bushes...`);
    return await invalidateBushCache(berry.type);
  };

  const syncTwigToBushes = async (twigName: string, affectedLeafs: BushLeafType[]) => {
    console.log(`🌿 Twig ${twigName} updated, syncing affected 🍃 Leafs to 🌳 Bushes...`);
    
    // Para um 🌿 Twig, invalidamos o cache se algum 🍃 Leaf dele afeta 🌳 Bushes
    if (affectedLeafs.length > 0) {
      return await invalidateBushCache(`twig-${twigName}`);
    }
    
    console.log(`🌿 Twig ${twigName} has no 🍃 Leafs that affect 🌳 Bushes. Skipping cache invalidation.`);
    return true;
  };

  const syncAllBushBerries = async () => {
    console.log('🍒 Syncing all Bush-affecting Berries to 🌳 Bushes...');
    return await invalidateBushCache();
  };

  return {
    // Cache management
    invalidateBushCache,
    
    // 🍒 Berry sync
    syncBerryToBushes,
    
    // 🍃 Leaf sync
    syncLeafToBushes,
    
    // 🌿 Twig sync
    syncTwigToBushes,
    
    // Sync all
    syncAllBushBerries,
    
    // Utilities
    shouldInvalidateCache,
    isInvalidating,
    bushLeafTypes: BUSH_AFFECTING_LEAFS
  };
}

// Helper function para determinar se uma 🍒 Berry afeta 🌳 Bushes
export const isBushAffectingBerry = (berryType: string): boolean => {
  return ['header', 'hero'].includes(berryType);
};

// Helper function para obter emoji do tipo
export const getBerryTypeEmoji = (type: string): string => {
  switch (type) {
    case 'header':
    case 'hero':
      return '🍃'; // Leaf que afeta Bush
    case 'profile':
    case 'settings':
      return '🦊'; // Interno do Tamed Fox
    default:
      return '🍒'; // Berry genérica
  }
};

// Helper function para obter descrição do tipo
export const getBerryTypeDescription = (type: string): string => {
  switch (type) {
    case 'header':
      return '🍃 Header Leaf - Afeta cabeçalho dos 🌳 Bushes';
    case 'hero':
      return '🍃 Hero Leaf - Afeta seção principal dos 🌳 Bushes';
    case 'profile':
      return '🦊 Profile - Interno do Tamed Fox';
    case 'settings':
      return '🦊 Settings - Configurações do Tamed Fox';
    default:
      return '🍒 Berry';
  }
};