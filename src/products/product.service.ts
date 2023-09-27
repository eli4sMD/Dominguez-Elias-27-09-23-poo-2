import { Product } from './product.entity'

// Molde de un servicio de tareas
export interface ProductService {
    list (): Promise<Product[]>
    find (id: string): Promise<Product | null>
    create (name: string, stock: number, precio: number): Promise<Product>
    update (_id: string, name: string, stock: number, precio: number): Promise<Product | null>
    delete (id: string): Promise<Product | null>
}