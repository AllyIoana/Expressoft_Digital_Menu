import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { MenuCategory, menuData, Product } from '../data/menuData'

const Menu = () => {
  /*--------------------------------------------
  --- Variables used for dropdown management ---
  --------------------------------------------*/

  const [openDropdown, setOpenDropdown] = useState(false)
  const [dropdownValues, setDropdownValues] = useState(
    Object.fromEntries(
      menuData.map((category: MenuCategory) => [category.category, true])
    )
  )

  function changeDropdownValue(key: string) {
    setDropdownValues((dropdownValues) => ({
      ...dropdownValues,
      [key]: !dropdownValues[key]
    }))
  }

  return (
    <div className="min-h-screen bg-[url(/public/background.jpg)] bg-[length:auto_1300px] bg-top bg-repeat">
      {/* --- Menu Page title --- */}

      <div className="rounded-lg border bg-green-100 p-4 shadow-sm dark:bg-green-100">
        <div className="flex items-center justify-center text-5xl font-extrabold tracking-tight text-green-900 dark:text-green-900">
          Menu Page
        </div>
      </div>

      {/*--------------------------------
      --- Filter by Category dropdown ---
      --------------------------------*/}

      <div className="mt-2 flex justify-center text-5xl text-green-900 dark:text-green-900">
        <div className="p-2">
          {/*Dropdown: button*/}
          <button
            id="dropdownBgHoverButton"
            onClick={() => setOpenDropdown(!openDropdown)}
            className="inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-200 dark:bg-green-600 dark:hover:bg-green-800 dark:focus:ring-green-800"
            type="button"
          >
            Select menu category{' '}
            <svg
              className="ms-3 size-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/*Dropdown: list of elements*/}
          <div
            id="dropdownBgHover"
            className={`absolute z-10 w-48 rounded-lg bg-white shadow-sm dark:bg-green-900 ${
              openDropdown ? '' : 'hidden'
            }`}
          >
            <ul
              className="space-y-1 p-3 text-sm text-green-700 dark:text-green-200"
              aria-labelledby="dropdownBgHoverButton"
            >
              {menuData.map((category: MenuCategory) => {
                return (
                  <li key={category.id}>
                    <div className="flex items-center rounded-sm p-2 hover:bg-green-200 dark:hover:bg-green-800">
                      <input
                        id={category.id}
                        type="checkbox"
                        checked={dropdownValues[category.category]}
                        onChange={() => changeDropdownValue(category.category)}
                        className="size-4 rounded-sm border-green-200 bg-green-200 text-green-600"
                      />
                      <label
                        htmlFor={category.id}
                        className="ms-2 w-full rounded-sm text-sm font-medium text-green-900 dark:text-green-200"
                      >
                        {category.category}
                      </label>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      {/*-----------------------------
      --- Menu Display by Category ---
      -----------------------------*/}

      {menuData
        .filter((category: MenuCategory) => dropdownValues[category.category])
        .map((category: MenuCategory) => {
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
