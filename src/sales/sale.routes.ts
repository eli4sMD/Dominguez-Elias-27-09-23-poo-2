// sales.router.ts
import { Router } from 'express';
import { SaleService } from './sale.service';

function startSaleRouter(saleService: SaleService) {
  const saleRouter = Router();

  saleRouter.get('/', async (req, res) => {
    const allSales = await saleService.list();
    res.status(200).json(allSales);
    console.log("estoy cansado jefe")
  });

  saleRouter.post('/', async (req, res) => {
    const { productId, saleType, quantity, price } = req.body;
    const newSale = await saleService.create(productId, saleType, quantity, price);
    res.status(201).json(newSale);
  });

  saleRouter.patch('/:_id', async (req, res) => {
    const saleId = req.params._id;
    const { saleType, quantity, price } = req.body;
    const updatedSale = await saleService.update(saleId, saleType, quantity, price);

    if (!updatedSale) {
      res.status(404).json({ error: 'Venta no encontrada' });
    } else {
      res.status(200).json(updatedSale);
    }
  });

  saleRouter.delete('/:_id', async (req, res) => {
    const saleId = req.params._id;
    const deletedSale = await saleService.delete(saleId);

    if (!deletedSale) {
      res.status(404).json({ error: 'Venta no encontrada' });
    } else {
      res.status(204).send(); // 204 significa "No Content"
    }
  });

  return saleRouter;
}

export { startSaleRouter };
