export interface itemType {
  _id?: string;
  user?: string;
  restaurant: string;
  name?: string;
  category?: string;
  price?: number;
  quantity?: string;
  status?: boolean;
}

export interface itemTypes {
  _id?: string;
  user?: string;
  restaurant?: {
    name?: string;
  };
  name?: string;
  category?: {
    name?: string;
  };
  price?: number;
  quantity?: string;
  status?: boolean;
}
