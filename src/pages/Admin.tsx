import { MenuCategory, menuData, Product } from 'data/menuData'
import { useEffect, useState } from 'react'

const Admin = () => {
  /*--------------------------------------------------------
  --- Variables used for product availability management ---
  ----------------------------------------------------------*/
  const [productAvailability, setProductAvailability] = useState(() => {
    const availability = localStorage.getItem('productAvailability') ?? ''
    if (availability != '') return JSON.parse(availability)
    else {
      const newAvailability = Object.fromEntries(
        menuData.flatMap((category: MenuCategory) =>
          category.products.map((product: Product) => [
            product.id,
            product.available
          ])
        )
      )
      localStorage.setItem(
        'productAvailability',
        JSON.stringify(newAvailability)
      )
      return newAvailability
    }
  })

  /* Update the stored values every time something is changed */
  useEffect(() => {
    localStorage.setItem(
      'productAvailability',
      JSON.stringify(productAvailability)
    )
  }, [productAvailability])

  return (
    <div className="min-h-screen bg-[url(/public/background.jpg)] bg-[length:auto_1300px] bg-top bg-repeat">
      {/* --- Admin Page title --- */}

      <div className="rounded-lg border bg-green-100 p-4 shadow-sm dark:bg-green-100">
        <div className="flex items-center justify-center text-5xl font-extrabold tracking-tight text-green-900 dark:text-green-900">
          Admin Page
        </div>
      </div>

      <div className=" bg-green-200">
        {menuData
          .flatMap((category: MenuCategory) => category.products)
          .map((product: Product) => (
            <div
              key={product.id}
              className="my-4 flex items-center justify-center"
            >
              <div className="w-20 shrink-0">
                <input
                  id={product.id}
                  type="checkbox"
                  checked={productAvailability[product.id]}
                  onChange={() =>
                    setProductAvailability({
                      ...productAvailability,
                      [product.id]: !productAvailability[product.id]
                    })
                  }
                  className="size-6 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
              </div>
              <label
                htmlFor={product.id}
                className="ms-2 w-60 text-xl font-medium text-black dark:text-black"
              >
                {product.name}
              </label>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Admin
