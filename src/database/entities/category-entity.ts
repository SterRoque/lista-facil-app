import { Entity, Column, OneToMany, BaseEntity, PrimaryColumn, CreateDateColumn } from 'typeorm'
import { ProductEntity as Product } from './product-entity'

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @PrimaryColumn()
    id: number

  @Column('text')
    name: string

  @CreateDateColumn()
    created_at: Date

  @OneToMany(() => Product, product => product.category)
    products: Product[]
}
