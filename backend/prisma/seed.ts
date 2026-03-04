import { Prisma, PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding products...')

    const products = [
        {   
            id: uuidv4(),
            name: 'Camiseta Básica',
            description: 'Camiseta de algodão, confortável e versátil.',
            price: new Prisma.Decimal(49.9),
        },
        {   
            id: uuidv4(),
            name: 'Tênis Esportivo',
            description: 'Tênis leve para corrida e treino.',
            price: new Prisma.Decimal(199.9),
        },
        {   
            id: uuidv4(),
            name: 'Mochila Casual',
            description: 'Mochila resistente para uso diário.',
            price: new Prisma.Decimal(89.9),
        },
        {   
            id: uuidv4(),
            name: 'Boné Streetwear',
            description: 'Boné estiloso e confortável.',
            price: new Prisma.Decimal(39.9),
        },
    ]

    for (const product of products) {
        await prisma.product.upsert({
            where: { id: product.id },
            update: {},
            create: product
        })
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })