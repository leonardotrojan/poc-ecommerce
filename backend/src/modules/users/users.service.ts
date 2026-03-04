import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto) {

        const normalizedEmail = data.email.trim().toLowerCase()

        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: normalizedEmail
            }
        })

        if (existingUser) {
            throw new ConflictException('Email already in use')
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        return this.prisma.user.create({
            data: {
                name: data.name.trim(),
                email: normalizedEmail,
                password: hashedPassword,
                cart: {
                    create: {},
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            }
        })
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email }
        })
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({
            where: { id }
        })
    }
}
