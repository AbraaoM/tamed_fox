export interface Profile {
  id: string;
  user_id: string;
  full_name?: string;
  internal_email?: string;
  internal_phone?: string;
  company_name?: string;
  document_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProfileData {
  user_id: string;
  full_name?: string;
  internal_email?: string;
  internal_phone?: string;
  company_name?: string;
  document_id?: string;
}

export interface UpdateProfileData {
  full_name?: string;
  internal_email?: string;
  internal_phone?: string;
  company_name?: string;
  document_id?: string;
}

// Tipo para formulários (sem campos do sistema)
export interface ProfileFormData {
  full_name: string;
  internal_email: string;
  internal_phone: string;
  company_name: string;
  document_id: string;
}

// Tipo para resposta da API
export interface ProfileResponse {
  data: Profile | null;
  error: string | null;
}

export interface ProfilesResponse {
  data: Profile[] | null;
  error: string | null;
}

// Validações
export const validateProfile = (data: Partial<ProfileFormData>) => {
  const errors: Record<string, string> = {};

  if (data.internal_email && !isValidEmail(data.internal_email)) {
    errors.internal_email = "Email inválido";
  }

  if (data.internal_phone && !isValidPhone(data.internal_phone)) {
    errors.internal_phone = "Telefone inválido";
  }

  if (data.document_id && !isValidDocument(data.document_id)) {
    errors.document_id = "Documento inválido";
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

const isValidDocument = (document: string): boolean => {
  // Remove caracteres não numéricos
  const cleanDoc = document.replace(/\D/g, '');
  
  // Verifica se é CPF (11 dígitos) ou CNPJ (14 dígitos)
  return cleanDoc.length === 11 || cleanDoc.length === 14;
};

// Constantes
export const PROFILE_FIELDS = {
  FULL_NAME: 'full_name',
  INTERNAL_EMAIL: 'internal_email',
  INTERNAL_PHONE: 'internal_phone',
  COMPANY_NAME: 'company_name',
  DOCUMENT_ID: 'document_id'
} as const;

export const PROFILE_LABELS = {
  [PROFILE_FIELDS.FULL_NAME]: 'Nome Completo',
  [PROFILE_FIELDS.INTERNAL_EMAIL]: 'Email Interno',
  [PROFILE_FIELDS.INTERNAL_PHONE]: 'Telefone Interno',
  [PROFILE_FIELDS.COMPANY_NAME]: 'Nome da Empresa',
  [PROFILE_FIELDS.DOCUMENT_ID]: 'Documento (CPF/CNPJ)'
} as const;

// Utilitários
export const createEmptyProfile = (): ProfileFormData => ({
  full_name: '',
  internal_email: '',
  internal_phone: '',
  company_name: '',
  document_id: ''
});

export const formatProfileData = (profile: Profile): ProfileFormData => ({
  full_name: profile.full_name || '',
  internal_email: profile.internal_email || '',
  internal_phone: profile.internal_phone || '',
  company_name: profile.company_name || '',
  document_id: profile.document_id || ''
});

export const isProfileComplete = (profile: Profile): boolean => {
  return !!(
    profile.full_name &&
    profile.internal_email &&
    profile.internal_phone
  );
};

export const getProfileCompletionPercentage = (profile: Profile): number => {
  const fields = [
    profile.full_name,
    profile.internal_email,
    profile.internal_phone,
    profile.company_name,
    profile.document_id
  ];
  
  const filledFields = fields.filter(field => field && field.trim() !== '').length;
  return Math.round((filledFields / fields.length) * 100);
};