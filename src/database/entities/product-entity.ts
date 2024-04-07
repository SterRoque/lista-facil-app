import {
   Entity,
   Column,
   ManyToOne,
   BaseEntity,
   CreateDateColumn,
   PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity as Category } from './category-entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column('text')
   name: string;

   @Column('numeric')
   price: number;

   @Column('numeric')
   quantity: number;

   @CreateDateColumn()
   created_at: Date;

   @ManyToOne(() => Category, (category) => category.products)
   category: Category;
}
