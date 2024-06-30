import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  const mockPrismaService = {
    user: {
      findMany: jest
        .fn()
        .mockResolvedValue([
          { id: 1, name: 'John Doe', email: 'john@example.com' },
        ]),
      findUnique: jest.fn().mockResolvedValue({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      }),
      create: jest.fn().mockResolvedValue({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      }),
      delete: jest.fn().mockResolvedValue({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
    ]);
  });

  it('should return a user by id', async () => {
    const user = await service.findOne(1);
    expect(user).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    });
  });

  it('should create a new user', async () => {
    const user = await service.create({
      name: 'John Doe',
      email: 'john@example.com',
    });
    expect(user).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    });
  });

  it('should delete a user by id', async () => {
    const user = await service.remove(1);
    expect(user).toEqual(undefined);
  });
});
