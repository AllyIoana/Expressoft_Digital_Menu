import ProductCard from '../components/ProductCard'
import { MenuCategory, menuData, Product } from '../data/menuData'

const Menu = () => {
  return (
    <div className="bg-[url(/public/background.jpg)] bg-contain bg-center bg-repeat">
      <div className="size-full rounded-lg border bg-green-100 p-4 shadow-sm sm:p-8 dark:bg-green-100">
        <div className="flex items-center justify-center text-5xl font-extrabold tracking-tight text-green-900 dark:text-green-900">
          Menu Page
        </div>
      </div>
      {menuData.map((category: MenuCategory) => {
        return (
          <div key={category.id}>
            <div className="mb-3 mt-6 flex items-center justify-center rounded-lg border bg-green-100 p-4 text-3xl font-extrabold tracking-tight text-green-900  dark:bg-green-100 dark:text-green-900">
              {category.category}
            </div>
            <div className="grid grid-cols-1 items-stretch gap-4 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Menu
