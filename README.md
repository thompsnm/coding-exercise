## Decisions to Justify

- Relational DB vs NoSQL
- Storing decimal values as STRING vs DECIMAL

## Seed Database

- Create a .env.production.local file with the following information:
```
DATABASE_HOST = <host>
DATABASE_NAME = <name>
DATABASE_PASS = <password>
DATABASE_USER = <user>
```
- Run the following command:
```
npm run reset-db
```