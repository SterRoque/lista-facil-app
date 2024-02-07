import { Entity, Column, ManyToOne, BaseEntity, PrimaryColumn, CreateDateColumn } from 'typeorm'
import { CategoryEntity as Category } from './category-entity'

@Entity('product')
export class ProductEntity extends BaseEntity {
  @PrimaryColumn()
    id: number

  @Column('string')
    name: string

  @Column('numeric')
    price: number

  @Column('numeric')
    quantity: number

  @CreateDateColumn()
    created_at: Date

  @ManyToOne(() => Category, category => category.products)
    category: Category
}
