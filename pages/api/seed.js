import nc from 'next-connect';
import db from '../../utils/db';
import { data } from '../../utils/data';
import User from '../../models/User';
import Product from '../../models/Product';

const handler = nc();

// .deleteMany va a resetear la base de datos
handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
});

export default handler;
