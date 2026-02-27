import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Granit' },
  origin: String,
  image: String,
  features: String,
  hardness: String,
  usageArea: String,
  createdAt: { type: Date, default: Date.now },
});

// Eğer model zaten varsa onu kullan, yoksa yeni oluştur
const Product = models.Product || model('Product', ProductSchema);
export default Product;