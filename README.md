## To run the project in docker

- docker-compose up
- docker-compose exec server npx prisma migrate dev --name <migration-name>

## To run the project as standalone services

CD into server and run

- npm i
- npx prisma generate
  or
  npx prisma migrate dev --name <migration-name>
- npm start

CD into client and run

- npm start

## TODO

- API Authentication
