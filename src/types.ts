export interface PortfolioPost {
  id: string;
  title: string;
  category?: 'Carrossel' | 'Feed Estático' | 'Oferta' | 'Lançamento' | 'Educativo';
  client?: string;
  description?: string;
  engagementStat?: string;
  tags?: string[];
  themeColor?: string;
  accentColor?: string;
  thumbnailSvgType?: 'carousel' | 'discount' | 'typography' | 'infographic' | 'luxury' | 'saas';
  imageUrl?: string;
}

export interface VideoProject {
  id: string;
  title: string;
  youtubeId: string;
  category?: 'Reels' | 'TikTok' | 'Institucional' | 'Anúncio' | 'Gastronomia' | 'Comércio';
  duration?: string;
  client?: string;
  highlight?: string;
  viewsStat?: string;
  aspectRatio?: '9/16' | '16/9';
}

export interface BrandIdentity {
  id: string;
  title: string;
  subtitle?: string;
  client?: string;
  year?: string;
  description?: string;
  palette?: string[];
  typography?: string;
  elements?: string[];
  style?: string;
  bannerUrl?: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  features?: string[];
  badge?: string;
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatarText: string;
  quote: string;
  metric: string;
}
