import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATABASE_URL || "";

export const connectDB = async () => {
  // Eğer zaten bağlanıyorsa veya bağlıysa bekleme
  if (mongoose.connection.readyState >= 1) return;

  try {
    console.log("⏳ Veritabanına bağlanılıyor...");
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000, // Sunucu seçimi için 15 saniye tanı
      socketTimeoutMS: 45000,         // Soket işlemleri için 45 saniye tanı
    });
    console.log("🚀 Mongoose ile Ankamer DB'ye bağlandık!");
  } catch (error) {
    console.error("❌ Bağlantı başarısız:", error);
    throw error; // Hatayı fırlat ki API katmanı yakalayabilsin
  }
};