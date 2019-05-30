import { Category } from './';

export function getCategoryFactory(categories: Category[]) {
  return (categoryId: number): Category | undefined =>
    categories.find((category: Category) => category.id === categoryId);
}
