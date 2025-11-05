import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Mulai seeding program...");

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@example.com",
      password: await bcrypt.hash("password123", 10),
      role: "ADMIN",
    },
  });

  const programs = ["Ala Sekolah", "Prisma", "Brainy"];
  for (const name of programs) {
    await prisma.program.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("✅ Seeding program selesai!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("❌ Seeding error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
