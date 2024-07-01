## Description

基于 Nestjs 的最佳实践。

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## generator

```bash
nest --help
nest g co demo
nest g mo demo
nest g s demo
nest g res user
```

## 目录规范

```bash
src/
├── app.module.ts
├── main.ts
├── core/
│   ├── interceptors/
│   ├── middlewares/
│   └── guards/
├── modules/
│   ├── users/
│   └── auth/
└── shared/
```

## 中间件

- logs.middleware

## 拦截器

- 请求拦截
- 响应拦截
- 异常拦截
- prisma 错误拦截

## cors

## 版本控制

## redis

- ioredis

## 代码风格

- restful

## 日志系统

- Winston

## 监控系统

- sentry

## 登录鉴权

- jwt
- guard
- express-session

## 缓存

- redis

## 阿里云 oss

- ali-oss

## 数据路

- mysql

## ORM

- prisma

## 文档

- swagger

## 单测

- jest

## 分页

-

## 定时任务

-

## 数据迁移

运行以下命令以确保数据库迁移和 Prisma 客户端生成正确：

生成并应用迁移：

```bash
pnpx prisma migrate dev --name init
pnpx prisma generate
pnpx prisma studio
pnpm run start:dev
```

验证数据库结构：

```bash
pnpx prisma studio
```
