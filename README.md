# The Artisans Platform User Authentication

[![Maintainability](https://api.codeclimate.com/v1/badges/7f8e94a77de88b6ae16e/maintainability)](https://codeclimate.com/github/The-Artisans-Platform/Back-End/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/7f8e94a77de88b6ae16e/test_coverage)](https://codeclimate.com/github/The-Artisans-Platform/Back-End/test_coverage)

**Core TechStack:**

- TypeScript
- TypeORM
- PostgresQL
- Type GraphQL
- Redis
- Nodemailer
- Express
- Apollo Server Express
- Bcrypt

## Local Startup Guide

### Step 1

You need to add a `.env` file with:

```bash
DATABASE_URL=postgres://tetris_player:password@localhost:5432/tetris_be
HEROKU_POSTGRESQL_MAUVE_URL=postgres://tetris_player:password@localhost:5432/tetris_test_be
SECRET=lksdhglef23092382efhsdof9p8whedfauiwhdgi02088234t9w3efhsx
REDIS_URL=6379
PORT=4000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
EMAIL_PASSWORD=*y2te^c7sb(*&3noU(W
FRONT_END_URL=http://localhost:3000/
```

> **Note:** Production env variables will vary. This is just the values you need to get this working locally.

### Step 2

Install Redis:

Use the following commands to install the last version of the Redis cli:

> Do this in a new terminal from your home directory.

```bash
wget http://download.redis.io/redis-stable.tar.gz

tar xvzf redis-stable.tar.gz

cd redis-stable

make
```

> What is Redis? TLDR: Is a local storage that holds cookies instead of tokens and hold them on the back end instead of on the browser. At least in terms of this project. [Read the docs here!](https://redis.io/topics/quickstart)

### Step 3

Yarn or npm install.

Then cd into the `src/` directory and run `redis-server`.

Once Redis server is running, open your repo directory in another terminal and run `yarn server`.

If everything was done correctly then your server should be successfully running on <http://localhost:4000/graphql!> Go to server url in browser and you should GraphQL Playground. Check out the docs tab and register your first user!
