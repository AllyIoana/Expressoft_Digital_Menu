import { Product } from 'data/menuData'
function ProductCard({ name, description, price, available }: Product) {
  return (
    <div className="m-2">
      <div className="w-full max-w-sm rounded-lg border border-green-200 bg-white p-4 shadow-sm sm:p-8 dark:border-green-600 dark:bg-green-900">
        <h5 className="mb-4 text-2xl font-medium text-green-600 dark:text-green-200">
          {name}
        </h5>
        <div className="mb-4 flex items-baseline text-green-900 dark:text-white">
          <span className="text-3xl font-semibold">$</span>
          <span className="text-5xl font-extrabold tracking-tight">
            {price}
          </span>
        </div>
        <div className="mb-4">
          <span className="text-base font-medium leading-tight text-green-600 dark:text-green-200">
            {description}
          </span>
        </div>
        <div className="mb-4 flex items-center justify-center">
          <span
            className={`text-base font-medium leading-tight ${
              available ? 'text-green-200' : 'text-red-500'
            }`}
          >
            {available ? 'IN STOCK' : 'OUT OF STOCK'}
          </span>
        </div>
        <button
          type="button"
          className={`inline-flex w-full justify-center rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none ${
            available
              ? 'bg-green-600 text-white hover:bg-green-800 focus:ring-4 focus:ring-blue-200'
              : 'cursor-not-allowed bg-green-800 text-white'
          }

          dark:focus:ring-green-900`}
        >
          Add to Order
        </button>
      </div>
    </div>
  )
}

export default ProductCard
