import express, { Application } from 'express'
import { connectToMongo } from './configs/database'
import { startProductRouter } from './products/product.routes'
import { startSaleRouter } from './sales/sale.routes'
import 'dotenv/config'

// import { TaskServiceMysql } from './tasks/services/task.mysql.service'
// import { TaskServiceFileSystem } from './tasks/services/task.filesystem.service'

import { ProductServiceMongo } from './products/services/product.mongo.service'
import { SaleMongoService } from './sales/services/sale.mongo.service'

// función de inicio del servidor

export function startServer () {
  // instancia de express
  const app: Application = express()

  // middlewares
  app.use(express.json())

  // rutas
  app.use('/api/products', startProductRouter(new ProductServiceMongo()))
  app.use('/api/sales', startSaleRouter(new SaleMongoService()))

  // levantar el servidor
  app.listen(3000, () => {
    // Conectarse a la base de datos

    // * MongoDB
    connectToMongo()

    // mensaje de éxito
    console.log('Server is running on port 3000')
    console.log("mucha chamba")
  })

  return app
}