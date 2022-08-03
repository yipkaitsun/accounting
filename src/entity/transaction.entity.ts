import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction')
export class Transaction {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int' })
    group: number;

    @Column({ type: "int" })
    userId: number;

    @Column({ type: "datetime" })
    date: Date

    @Column({ type: "varchar", length: 50 })
    description: string

    @Column({ type: "float" })
    amount: number
}