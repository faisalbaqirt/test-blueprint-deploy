/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

exports.seed = async function(knex) {
  const passAdmin1 = await hashPassword('123admin1');
  const passAdmin2 = await hashPassword('123admin2');
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {username: 'admin1', email: 'admin1@mangiyok.com', name: 'Admin 1', password: passAdmin1, photo: 'https://res.cloudinary.com/dxgjnu4h8/image/upload/v1698433031/users/profile_ccs4ks.jpg', role: 'admin'},
    {username: 'admin2', email: 'admin2@mangiyok.com', name: 'Admin 2', password: passAdmin2, photo: 'https://res.cloudinary.com/dxgjnu4h8/image/upload/v1698433031/users/profile_ccs4ks.jpg', role: 'admin'}
  ]);
};
