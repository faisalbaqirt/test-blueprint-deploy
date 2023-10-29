/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    { name: 'paket ayam geprek', description: 'ayam geprek beserta nasi', price: 15000, gambar: 'https://res.cloudinary.com/dxgjnu4h8/image/upload/v1696627486/products/ayamgeprek1.jpg'},
    { name: 'ayam geprek', description: 'ayam geprek', price: 12000, gambar: 'https://res.cloudinary.com/dxgjnu4h8/image/upload/v1696535442/products/ayamgeprek2.jpg' }
  ]);
};
