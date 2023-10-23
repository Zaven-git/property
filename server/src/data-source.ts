import "reflect-metadata"
import { DataSource } from "typeorm"
import { Property } from "./entity/Property"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Property],
    migrations: [],
    subscribers: [],
})
