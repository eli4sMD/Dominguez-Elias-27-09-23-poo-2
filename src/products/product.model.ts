import { Schema, model } from 'mongoose';
import { Product } from './product.entity';

const ProductSchemaMongo = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  sales: [{ type: Schema.Types.ObjectId, ref: 'Sale' }], // Referencia a las ventas asociadas
}, {
  timestamps: true,
  id: true,
});

const ProductModelMongo = model<Product>('Product', ProductSchemaMongo);

export { ProductModelMongo };