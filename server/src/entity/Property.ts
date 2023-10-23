import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Property {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    address: string

    @Column()
    description: string

}
