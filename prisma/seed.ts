import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const org = await prisma.org.create({ data: { name: "Demo Org" } });
  const svc = await prisma.service.createMany({
    data: [
      { name: "Therapy", slug: "therapy" },
      { name: "IOP", slug: "iop" },
      { name: "Detox", slug: "detox" },
    ],
  });
  console.log("seed complete", { orgId: org.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
