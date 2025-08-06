export interface CreateBrandDto {
  name: string;
  description: string;
  logoUrl?: string;
  website?:string
}


export interface Brand {
  id: string;
  name: string;
  originStory: string;
  createdAt: string; // ISO date
}


export interface BrandSummary {
  id: string;
  name: string;
}
