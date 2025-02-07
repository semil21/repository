export type tableType = {
  _id?: string;
  user?: string;
  name?: string;
  address?: string;
  city?: string;
  tables?: Array<{
    number?: number;
    capacity?: number;
  }>;
};
