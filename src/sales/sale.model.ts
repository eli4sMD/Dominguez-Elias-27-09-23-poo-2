import { Schema, model } from 'mongoose';
import { Sale } from './sale.entity';

const SaleSchemaMongo = new Schema<Sale>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Referencia al modelo de productos
    required: true,
  },
  saleType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
  id: true,
});

const SaleModelMongo = model<Sale>('Sale', SaleSchemaMongo);

export { SaleModelMongo };