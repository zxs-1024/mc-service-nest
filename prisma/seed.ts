import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 删除所有现有数据（可选）
  await prisma.user.deleteMany();

  // 插入模拟数据
  await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
      { name: 'Charlie', email: 'charlie@example.com' },
    ],
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
