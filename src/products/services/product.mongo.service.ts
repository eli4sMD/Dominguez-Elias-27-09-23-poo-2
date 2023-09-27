import { Product } from '../product.entity'
import { ProductModelMongo } from '../product.model'
import { ProductService } from '../product.service'

// Implementacion de un servicio de tareas con MongoDB
export class ProductServiceMongo implements ProductService {
  // se define el modelo de la entidad
  model = ProductModelMongo

  // Se implementan los metodos del servicio

  list (): Promise<Product[]> {
    return this.model.find()
  }

  find (id: string): Promise<Product | null> {
    throw new Error('Method not implemented.')
  }

  async create (name: string, stock: number, precio: number): Promise<Product> {
    const newProduct = await this.model.create({ name, stock, precio })
    return newProduct
  }

  async update(id: string, name: string, stock: number, precio: number): Promise<Product | null> {
    console.log(id, name, stock, precio)
    const product = await this.model.findOne({ _id: id });
  
    if (!product) {
      return null; // Producto no encontrado
    }
  
    // Actualiza los campos del producto con los nuevos datos
    product.name = name;
    product.stock = stock;
    product.precio = precio;
  
    // Guarda el producto actualizado en la base de datos
    const updatedProduct = await product.save();
    return updatedProduct;
  }

  async delete(id: string): Promise<Product | null> {
    const deletedProduct = await this.model.findOneAndDelete({ _id: id });
  
    if (!deletedProduct) {
      return null; // Producto no encontrado
    }
  
    return deletedProduct;
  }  
}