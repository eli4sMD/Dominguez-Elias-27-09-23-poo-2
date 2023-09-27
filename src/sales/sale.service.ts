import { Sale } from './sale.entity';

export interface SaleService {
  list(): Promise<Sale[]>;
  create(productId: string, saleType: string, quantity: number, price: number): Promise<Sale>;
  update(saleId: string, saleType: string, quantity: number, price: number): Promise<Sale | null>;
  delete(saleId: string): Promise<Sale | null>;
}
