import { Router } from 'express'
import { ProductService } from './product.service'

// funcion de creacion de un enrutador de tareas
// recibe un servicio de tareas por parametro
function startProductRouter (ProductService: ProductService) {
  // instancia de un enrutador
  const productRouter = Router()

  // rutas
  productRouter.get('/', async (req, res) => {
    const allProducts = await ProductService.list()
    res.status(200).json(allProducts)
  })

  productRouter.post('/', async (req, res) => {
    const { name, stock, precio } = req.body
    const newProduct = await ProductService.create(name, stock, precio)
    res.status(201).json(newProduct)
  })

  productRouter.patch('/:_id', async (req, res) => {
    const productId = req.params._id; // Obtén el ID del producto de los parámetros de la URL
    const { name, stock, precio } = req.body; // Obtén los datos actualizados del cuerpo de la solicitud
    try {
      const updatedProduct = await ProductService.update( productId, name, stock, precio );
      res.status(200).json(updatedProduct);
      console.log("mandarina")
    } catch (error) {
      res.status(500).json({ error: 'No se pudo actualizar el producto' });
    }
  });

  productRouter.delete('/:_id', async (req, res) => {
    const productId = req.params._id;
  
    try {
      const deletedProduct = await ProductService.delete(productId);
      if (deletedProduct === null) {
        res.status(404).json({ error: 'Producto no encontrado' });
      } else {
        res.status(204).send(); // 204 significa "No Content" para indicar éxito sin datos en la respuesta
      }
    } catch (error) {
      res.status(500).json({ error: 'No se pudo eliminar el producto' });
    }
  });  

  return productRouter
}

export { startProductRouter }
