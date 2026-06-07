import { config } from "dotenv";
import { seedDatabase } from "../src/lib/repositories";
import { SAMPLE_CATEGORIES, SAMPLE_PRODUCTS } from "../src/lib/seed-data";

config({ path: ".env.local" });
config({ path: ".env" });

async function seed() {
  console.log("Seeding local database (data/ folder)...");

  await seedDatabase({
    adminEmail: process.env.ADMIN_EMAIL || "admin@houseofmojari.com",
    adminPassword: process.env.ADMIN_PASSWORD || "Admin@123456",
    products: SAMPLE_PRODUCTS,
    categories: SAMPLE_CATEGORIES,
  });

  console.log("✓ Admin: admin@houseofmojari.com / Admin@123456");
  console.log(`✓ ${SAMPLE_PRODUCTS.length} products seeded`);
  console.log(`✓ ${SAMPLE_CATEGORIES.length} categories seeded`);
  console.log("✓ Data saved to ./data/ folder");
  console.log("\nSeed completed successfully!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
