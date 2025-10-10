### About this directory

#### Migrations

- Contains all migration versions handled by prisma client.

#### Scheme.prisma

- Contains the table schema. Updates the migration version
- run npx prisma migrate dev --name <migration-name>
- or npx prisma db push to change db locally without creating a migration to the db
