import { Sale } from '../sale.entity'; // Asegúrate de importar el modelo de ventas adecuado
import { SaleService } from '../sale.service'; // Importa la interfaz del servicio de ventas
import { SaleModelMongo } from '../sale.model'; // Importa el modelo de ventas
import { ProductModelMongo } from '../../products/product.model';

export class SaleMongoService implements SaleService {
  private readonly saleModel = SaleModelMongo;

  async list(): Promise<Sale[]> {
    const allSales = await this.saleModel.find();
    return allSales;
  }

  async create(productId: string, saleType: string, quantity: number, price: number): Promise<Sale> {
    // Verifica si hay suficiente stock disponible del producto
    const product = await ProductModelMongo.findOne({ _id: productId });
  
    if (!product) {
      throw new Error('Producto no encontrado');
    }
  
    if (product.stock < quantity) {
      throw new Error('No hay suficiente stock disponible');
    }
  
    // Realiza la venta y registra los detalles
    const newSale = await this.saleModel.create({ productId, saleType, quantity, price });
  
    // Asocia la venta al producto
    product.sales.push(newSale);
    await product.save();
  
    // Actualiza el stock del producto restando la cantidad vendida
    product.stock -= quantity;
    await product.save();
  
    return newSale;
  }
   

  async update(saleId: string, saleType: string, quantity: number, price: number): Promise<Sale | null> {
    console.log(saleId, saleType, quantity, price);
    const sale = await this.saleModel.findOne({ _id: saleId });

    if (!sale) {
      return null; // Venta no encontrada
    }

    // Actualiza los campos de la venta con los nuevos datos
    sale.saleType = saleType;
    sale.quantity = quantity;
    sale.price = price;

    // Guarda la venta actualizada en la base de datos
    const updatedSale = await sale.save();
    return updatedSale;
  }

  async delete(saleId: string): Promise<Sale | null> {
    const deletedSale = await this.saleModel.findOneAndDelete({ _id: saleId });

    if (!deletedSale) {
      return null; // Venta no encontrada
    }

    return deletedSale;
  }
}