import { ObjectId } from "mongodb";
import { BaseEntity, Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductEntity extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectId;
    @Column()
    name: string
}