-- command to run the script in terminal
-- 🔻 use this command whit your terminal is pointing at the root directory of your project
-- psql -U postgres -f remakeDatabase.sql

-- env: DATABASE_URL=postgres://postgres:password@localhost:5432/tap

DROP DATABASE IF EXISTS tap;

CREATE DATABASE tap
  WITH
  OWNER = postgres
  ENCODING = 'UTF8'
  CONNECTION LIMIT = -1
;