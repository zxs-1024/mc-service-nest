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

## 目录规范 shared

```bash
src/
├── common/              # 公共模块
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   ├── pipes/
│   ├── dto/
│   └── utils/
├── config/              # 配置模块
│   └── config.module.ts
├── modules/             # 业务逻辑模块
│   ├── auth/            # 身份验证模块
│   │   ├── dto/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   └── jwt-auth.guard.ts
│   ├── user/            # 用户模块
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   ├── update-user.dto.ts
│   │   ├── user.controller.ts
│   │   ├── user.module.ts
│   │   ├── user.service.ts
├── prisma/              # Prisma配置
│   └── prisma.service.ts
├── app.controller.ts    # 应用的根控制器
├── app.module.ts        # 应用的根模块
├── app.service.ts       # 应用的根服务
├── main.ts              # 应用入口文件

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

### 环境安装

- prisma vscode 插件
- pnpm 的安装

## 使用 Prisma

是的，你可以使用 Prisma 的 db pull 命令从现有的数据库导出表并生成 Prisma 模型。以下是具体步骤：

### 配置 Prisma 数据源

确保你的 .env 文件中配置了正确的 DATABASE_URL：

```bash
DATABASE_URL="mysql://test_admin:Pet20230206!%23%24_sDYsss@localhost:3307/plan"
```

### 初始化 Prisma

如果还没有初始化 Prisma，可以先初始化：

```bash
npx prisma init
```

### 导出数据库表到 Prisma 项目

使用以下命令从现有数据库导出表并生成 Prisma 模型：

```bash
npx prisma db pull
```

这会连接到你的数据库并自动生成 prisma/schema.prisma 文件中的模型定义。

### 生成 Prisma 客户端

```bash
npx prisma generate
```

### prisma studio

在所有 Prisma 项目中探索和操作数据的最简单方法。

```bash
npx prisma studio
```

### 生成模块

```bash
nest g module user
```
