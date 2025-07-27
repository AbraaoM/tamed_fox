export interface DisplayInfo {
  profile_id: string;
  display_name?: string;
  avatar_url?: string;
  phone_number?: string;
  email_contact?: string;
  agenda_link?: string;
  whatsapp_link?: string;
  facebook_link?: string;
  instagram_link?: string;
  linkedin_link?: string;
  website_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateDisplayInfoData {
  profile_id: string;
  display_name?: string;
  avatar_url?: string;
  phone_number?: string;
  email_contact?: string;
  agenda_link?: string;
  whatsapp_link?: string;
  facebook_link?: string;
  instagram_link?: string;
  linkedin_link?: string;
  website_url?: string;
  bio?: string;
}

export interface UpdateDisplayInfoData {
  display_name?: string;
  avatar_url?: string;
  phone_number?: string;
  email_contact?: string;
  agenda_link?: string;
  whatsapp_link?: string;
  facebook_link?: string;
  instagram_link?: string;
  linkedin_link?: string;
  website_url?: string;
  bio?: string;
}

// Tipo para formulários (sem campos do sistema)
export interface DisplayInfoFormData {
  display_name: string;
  avatar_url: string;
  phone_number: string;
  email_contact: string;
  agenda_link: string;
  whatsapp_link: string;
  facebook_link: string;
  instagram_link: string;
  linkedin_link: string;
  website_url: string;
  bio: string;
}

// Tipo para resposta da API
export interface DisplayInfoResponse {
  data: DisplayInfo | null;
  error: string | null;
}

export interface DisplayInfosResponse {
  data: DisplayInfo[] | null;
  error: string | null;
}

// Validações
export const validateDisplayInfo = (data: Partial<DisplayInfoFormData>) => {
  const errors: Record<string, string> = {};

  if (data.email_contact && !isValidEmail(data.email_contact)) {
    errors.email_contact = "Email inválido";
  }

  if (data.phone_number && !isValidPhone(data.phone_number)) {
    errors.phone_number = "Telefone inválido";
  }

  if (data.avatar_url && !isValidUrl(data.avatar_url)) {
    errors.avatar_url = "URL do avatar inválida";
  }

  if (data.website_url && !isValidUrl(data.website_url)) {
    errors.website_url = "URL do website inválida";
  }

  if (data.agenda_link && !isValidUrl(data.agenda_link)) {
    errors.agenda_link = "URL da agenda inválida";
  }

  if (data.whatsapp_link && !isValidWhatsAppUrl(data.whatsapp_link)) {
    errors.whatsapp_link = "URL do WhatsApp inválida";
  }

  if (data.facebook_link && !isValidSocialUrl(data.facebook_link, 'facebook')) {
    errors.facebook_link = "URL do Facebook inválida";
  }

  if (data.instagram_link && !isValidSocialUrl(data.instagram_link, 'instagram')) {
    errors.instagram_link = "URL do Instagram inválida";
  }

  if (data.linkedin_link && !isValidSocialUrl(data.linkedin_link, 'linkedin')) {
    errors.linkedin_link = "URL do LinkedIn inválida";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Funções auxiliares de validação
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isValidWhatsAppUrl = (url: string): boolean => {
  const whatsappRegex = /^https:\/\/wa\.me\/\d+$/;
  return whatsappRegex.test(url) || isValidUrl(url);
};

const isValidSocialUrl = (url: string, platform: 'facebook' | 'instagram' | 'linkedin'): boolean => {
  const patterns = {
    facebook: /^https:\/\/(www\.)?facebook\.com\//,
    instagram: /^https:\/\/(www\.)?instagram\.com\//,
    linkedin: /^https:\/\/(www\.)?linkedin\.com\//,
  };
  
  return patterns[platform].test(url) || isValidUrl(url);
};

// Constantes
export const DISPLAY_INFO_FIELDS = {
  DISPLAY_NAME: 'display_name',
  AVATAR_URL: 'avatar_url',
  PHONE_NUMBER: 'phone_number',
  EMAIL_CONTACT: 'email_contact',
  AGENDA_LINK: 'agenda_link',
  WHATSAPP_LINK: 'whatsapp_link',
  FACEBOOK_LINK: 'facebook_link',
  INSTAGRAM_LINK: 'instagram_link',
  LINKEDIN_LINK: 'linkedin_link',
  WEBSITE_URL: 'website_url',
  BIO: 'bio'
} as const;

export const DISPLAY_INFO_LABELS = {
  [DISPLAY_INFO_FIELDS.DISPLAY_NAME]: 'Nome de Exibição',
  [DISPLAY_INFO_FIELDS.AVATAR_URL]: 'URL do Avatar',
  [DISPLAY_INFO_FIELDS.PHONE_NUMBER]: 'Telefone',
  [DISPLAY_INFO_FIELDS.EMAIL_CONTACT]: 'Email de Contato',
  [DISPLAY_INFO_FIELDS.AGENDA_LINK]: 'Link da Agenda',
  [DISPLAY_INFO_FIELDS.WHATSAPP_LINK]: 'Link do WhatsApp',
  [DISPLAY_INFO_FIELDS.FACEBOOK_LINK]: 'Facebook',
  [DISPLAY_INFO_FIELDS.INSTAGRAM_LINK]: 'Instagram',
  [DISPLAY_INFO_FIELDS.LINKEDIN_LINK]: 'LinkedIn',
  [DISPLAY_INFO_FIELDS.WEBSITE_URL]: 'Website',
  [DISPLAY_INFO_FIELDS.BIO]: 'Biografia'
} as const;

// Categorias para organização da UI
export const DISPLAY_INFO_CATEGORIES = {
  PERSONAL: {
    label: 'Informações Pessoais',
    fields: [
      DISPLAY_INFO_FIELDS.DISPLAY_NAME,
      DISPLAY_INFO_FIELDS.AVATAR_URL,
      DISPLAY_INFO_FIELDS.BIO
    ]
  },
  CONTACT: {
    label: 'Informações de Contato',
    fields: [
      DISPLAY_INFO_FIELDS.EMAIL_CONTACT,
      DISPLAY_INFO_FIELDS.PHONE_NUMBER,
      DISPLAY_INFO_FIELDS.WHATSAPP_LINK
    ]
  },
  SOCIAL: {
    label: 'Redes Sociais',
    fields: [
      DISPLAY_INFO_FIELDS.FACEBOOK_LINK,
      DISPLAY_INFO_FIELDS.INSTAGRAM_LINK,
      DISPLAY_INFO_FIELDS.LINKEDIN_LINK
    ]
  },
  LINKS: {
    label: 'Links Úteis',
    fields: [
      DISPLAY_INFO_FIELDS.WEBSITE_URL,
      DISPLAY_INFO_FIELDS.AGENDA_LINK
    ]
  }
} as const;

// Utilitários
export const createEmptyDisplayInfo = (): DisplayInfoFormData => ({
  display_name: '',
  avatar_url: '',
  phone_number: '',
  email_contact: '',
  agenda_link: '',
  whatsapp_link: '',
  facebook_link: '',
  instagram_link: '',
  linkedin_link: '',
  website_url: '',
  bio: ''
});

export const formatDisplayInfoData = (displayInfo: DisplayInfo): DisplayInfoFormData => ({
  display_name: displayInfo.display_name || '',
  avatar_url: displayInfo.avatar_url || '',
  phone_number: displayInfo.phone_number || '',
  email_contact: displayInfo.email_contact || '',
  agenda_link: displayInfo.agenda_link || '',
  whatsapp_link: displayInfo.whatsapp_link || '',
  facebook_link: displayInfo.facebook_link || '',
  instagram_link: displayInfo.instagram_link || '',
  linkedin_link: displayInfo.linkedin_link || '',
  website_url: displayInfo.website_url || '',
  bio: displayInfo.bio || ''
});

export const isDisplayInfoComplete = (displayInfo: DisplayInfo): boolean => {
  return !!(
    displayInfo.display_name &&
    displayInfo.email_contact &&
    displayInfo.phone_number
  );
};

export const getDisplayInfoCompletionPercentage = (displayInfo: DisplayInfo): number => {
  const fields = [
    displayInfo.display_name,
    displayInfo.avatar_url,
    displayInfo.phone_number,
    displayInfo.email_contact,
    displayInfo.agenda_link,
    displayInfo.whatsapp_link,
    displayInfo.facebook_link,
    displayInfo.instagram_link,
    displayInfo.linkedin_link,
    displayInfo.website_url,
    displayInfo.bio
  ];
  
  const filledFields = fields.filter(field => field && field.trim() !== '').length;
  return Math.round((filledFields / fields.length) * 100);
};

// Helpers para formatação de links
export const formatWhatsAppLink = (phoneNumber: string): string => {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}`;
};

export const formatSocialLink = (username: string, platform: 'facebook' | 'instagram' | 'linkedin'): string => {
  const baseUrls = {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/in/',
  };
  
  const cleanUsername = username.replace(/^@/, '').replace(/^https?:\/\/(www\.)?(facebook|instagram|linkedin)\.com\/(in\/)?/, '');
  return `${baseUrls[platform]}${cleanUsername}`;
};

// Tipos para links sociais
export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'whatsapp';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  username?: string;
  isValid: boolean;
}

export const extractSocialLinks = (displayInfo: DisplayInfo): SocialLink[] => {
  const links: SocialLink[] = [];
  
  if (displayInfo.facebook_link) {
    links.push({
      platform: 'facebook',
      url: displayInfo.facebook_link,
      isValid: isValidSocialUrl(displayInfo.facebook_link, 'facebook')
    });
  }
  
  if (displayInfo.instagram_link) {
    links.push({
      platform: 'instagram',
      url: displayInfo.instagram_link,
      isValid: isValidSocialUrl(displayInfo.instagram_link, 'instagram')
    });
  }
  
  if (displayInfo.linkedin_link) {
    links.push({
      platform: 'linkedin',
      url: displayInfo.linkedin_link,
      isValid: isValidSocialUrl(displayInfo.linkedin_link, 'linkedin')
    });
  }
  
  if (displayInfo.whatsapp_link) {
    links.push({
      platform: 'whatsapp',
      url: displayInfo.whatsapp_link,
      isValid: isValidWhatsAppUrl(displayInfo.whatsapp_link)
    });
  }
  
  return links;
};