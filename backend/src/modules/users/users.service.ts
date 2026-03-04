import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { emit } from 'process';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

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


        const user = await this.prisma.user.create({
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

        const payload = { sub: user.id, email: user.email }
        const access_token = this.jwtService.sign(payload)

        return { user, access_token }

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
