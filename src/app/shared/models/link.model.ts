export interface Link {
  id: string;
  url: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  folderId?: string | null;
  createdAt?: string;
}

export interface CreateLinkRequest {
  url: string;
  folderId?: string | null;
}
