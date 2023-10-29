const express = require('express');
const router = express.Router();
const db = require('../db/db')

router.get('/dashboard', async (req, res) => {
    try {
    //   const totalUsers = await knex('users').count();
      const totalProducts = await db('products').count();
      const totalOrders = await db('orders').count();
  
      res.json({ totalProducts: totalProducts[0].count, totalOrders: totalOrders[0].count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/orders-chart/:year/:month', async (req, res) => {
    const { year, month } = req.params;
  
    try {
      const orders = await db('orders')
        .where(db.raw('EXTRACT(YEAR FROM created_at) = ?', [year]))
        .where(db.raw('EXTRACT(MONTH FROM created_at) = ?', [month]));
  
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/sales-chart/:year/:month', async (req, res) => {
    const { year, month } = req.params;
  
    try {
      const salesData = await db('orders')
        .where(db.raw('EXTRACT(MONTH FROM created_at) = ?', [month]))
        .where(db.raw('EXTRACT(YEAR FROM created_at) = ?', [year]))
        .where('status', 'Sudah Dibayar')
        .sum('total_amount as total_sales')
        .first();
   
   
    res.json(salesData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;