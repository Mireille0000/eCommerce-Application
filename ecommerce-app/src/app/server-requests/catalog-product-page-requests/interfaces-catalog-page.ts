interface Images {
  dimensions: object;
  url: string;
}

export interface Prices {
  id: string;
  key: string;
  value: {
    centAmount: number;
    currencyCode: string;
    fractationDigits: number;
    type: string;
  };
}

interface MasterVarinatData {
  assets: [];
  attributes: [];
  id: number;
  images: Array<Images>;
  key: string;
  prices: [Prices];
  sku: string;
}

export default interface StagedData {
  categories: [];
  categoryOrderHints: object;
  description: { 'en-US': string };
  masterVariant: MasterVarinatData;
  metaDescription: { 'en-US': string };
  metaTitle: { 'en-US': string };
  name: { 'en-US': string };
  searchKeywords: object;
  slug: { 'en-US': string };
  variants: [];
}

interface MasterData {
  current?: object;
  hasStagedChanges?: boolean;
  published?: boolean;
  staged: StagedData;
}

interface ProductsArr {
  createdAt?: Date;
  createdBy?: object;
  id?: string;
  key?: string;
  lastMessageSequenceNumber?: number;
  lastModifiedAt?: Date;
  lastModifiedBy?: object;
  lastVariantId?: number;
  masterData: MasterData;
  priceMode?: number;
  productType?: object;
  version?: number;
  versionModifiedAt?: Date;
}

interface ProductArrItem {
  //
  description: { 'en-US': string };
  key: string;
  masterVariant: {
    images: Array<{ url: string }>;
    prices: Array<{
      id: string;
      key: string;
      value: {
        centAmount: number;
        currencyCode: string;
        fractionDigits: number;
        type: string;
      };
    }>;
    sku: string;
  };
  name: { 'en-US': string };
}

export interface ProductsListData {
  count: number;
  limit: 20;
  offset: number;
  results: Array<ProductsArr>;
  total: number;
}

export interface ProductsListDataNew {
  //
  count: number;
  limit: 20;
  offset: number;
  results: Array<ProductArrItem>;
  total: number;
}

// discounts

export interface Discounts {
  value: {
    type: string;
    permyriad: number;
  };
  predicate: string;
}
