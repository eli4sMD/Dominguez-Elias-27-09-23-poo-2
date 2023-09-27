export interface Sale {
    _id: string;
    productId: {}; // ID del producto vendido
    saleType: string; // Tipo de venta (por unidad, por cantidad, por bolsa, etc.)
    quantity: number; // Cantidad vendida
    price: number; // Precio unitario o total
    sales: [];
    createdAt: Date;
    updatedAt: Date;
  }