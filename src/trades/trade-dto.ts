export interface TradeDto {
  collectionId: string;
  tokenId: string;
  price: string;
  quoteId: string;
  seller: string;
  metadata: object | null;
  creationDate: Date;
  buyer: string;
  tradeDate: Date;
}
