export interface CreateCompanyModel {
    name: string;
    description?: string;
    website?: string;
    industry?: string;
    location?: string;
    foundedYear?: number;
    size?: string;
    logoUrl?: string;
    userId: string;
  }