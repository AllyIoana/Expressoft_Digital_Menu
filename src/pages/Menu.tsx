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
  const [sortOpenDropdown, setSortOpenDropdown] = useState(false)
  const [sortAscending, setSortAscending] = useState(true)
  function changeDropdownValue(key: string) {
    setDropdownValues((dropdownValues) => ({
      ...dropdownValues,
      [key]: !dropdownValues[key]
    }))
  }

  /*-------------------------------------------------
  --- Variables used for Order Summary management ---
  -------------------------------------------------*/

  /* --- Dictionary used to save the ordered products --- */
  const [orderedProducts, setOrderedProducts] = useState(
    Object.fromEntries(
      menuData
        .flatMap((category: MenuCategory) =>
          category.products.map((product: Product) => product.id)
        )
        .map((productID: string) => [
          productID,
          {
            categoryID: '',
            product: '',
            quantity: 0,
            subtotal: 0
          }
        ])
    )
  )

  /* --- Function used to add a product to order --- */
  function addToOrder(categoryID: string, productID: string) {
    const p: Product | undefined = menuData
      .find((category: MenuCategory) => category.id == categoryID)
      ?.products.find((product: Product) => product.id == productID)
    if (p == undefined) {
      return
    }
    const previousProduct = orderedProducts[productID]
    setOrderedProducts({
      ...orderedProducts,
      [productID]: {
        categoryID: categoryID,
        product: p.name,
        quantity: previousProduct.quantity + 1,
        subtotal: previousProduct.subtotal + p.price
      }
    })
  }

  const [searchText, setSearchText] = useState('')

  return (
    <div className="min-h-screen bg-[url(/public/background.jpg)] bg-[length:auto_1300px] bg-top bg-repeat">
      {/* --- Menu Page title --- */}

      <div className="rounded-lg border bg-green-100 p-4 shadow-sm dark:bg-green-100">
        <div className="flex items-center justify-center text-5xl font-extrabold tracking-tight text-green-900 dark:text-green-900">
          Menu Page
        </div>
      </div>

      <div className="mt-2 flex justify-center text-5xl text-green-900 dark:text-green-900">
        {/*---------------
        --- Search bar ---
        ------------------*/}
        <div className="p-2">
          <input
            type="text"
            id="default-input"
            className="mt-4 block w-full rounded-lg border border-gray-300 bg-gray-50 px-5 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
        {/*--------------------------------
        --- Filter by Category dropdown ---
        --------------------------------*/}
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
        {/*---------------------------
        --- Sort Products dropdown ---
        ------------------------------*/}
        <div className="p-2">
          {/*Dropdown: button*/}
          <button
            id="sortDropdownBgHoverButton"
            onClick={() => setSortOpenDropdown(!sortOpenDropdown)}
            className="inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-200 dark:bg-green-600 dark:hover:bg-green-800 dark:focus:ring-green-800"
            type="button"
          >
            Sort by...
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
            id="sortDropdownBgHover"
            className={`absolute z-10 w-48 rounded-lg bg-white shadow-sm dark:bg-green-900 ${
              sortOpenDropdown ? '' : 'hidden'
            }`}
          >
            <ul
              className="space-y-1 p-3 text-sm text-green-700 dark:text-green-200"
              aria-labelledby="sortDropdownBgHoverButton"
            >
              <li>
                <div className="flex items-center rounded-sm p-2 hover:bg-green-200 dark:hover:bg-green-800">
                  <input
                    id="ASC"
                    type="checkbox"
                    onChange={() => {
                      setSortAscending(true)
                      setSortOpenDropdown(false)
                    }}
                    checked={sortAscending}
                    className="size-4 rounded-sm border-green-200 bg-green-200 text-green-600"
                  />
                  <label
                    htmlFor="ASC"
                    className="ms-2 w-full rounded-sm text-sm font-medium text-green-900 dark:text-green-200"
                  >
                    Sort by: price ascending
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center rounded-sm p-2 hover:bg-green-200 dark:hover:bg-green-800">
                  <input
                    id="DESC"
                    type="checkbox"
                    onChange={() => {
                      setSortAscending(false)
                      setSortOpenDropdown(false)
                    }}
                    checked={!sortAscending}
                    className="size-4 rounded-sm border-green-200 bg-green-200 text-green-600"
                  />
                  <label
                    htmlFor="DESC"
                    className="ms-2 w-full rounded-sm text-sm font-medium text-green-900 dark:text-green-200"
                  >
                    Sort by: price descending
                  </label>
                </div>
              </li>
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
                {category.products
                  .filter(
                    (product: Product) =>
                      searchText.length == 0 ||
                      product.name
                        .toLowerCase()
                        .indexOf(searchText.toLowerCase()) >= 0
                  )
                  .sort((productA: Product, productB: Product) => {
                    if (productA.price == productB.price) return 0
                    if (productA.price < productB.price)
                      return sortAscending ? -1 : 1
                    else return sortAscending ? 1 : -1
                  })
                  .map((product: Product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => addToOrder(category.id, product.id)}
                    />
                  ))}
              </div>
            </div>
          )
        })}

      {/*--------------------------
      --- Order Summary Section ---
      --------------------------*/}

      <div className="bg-green-100 bg-top bg-repeat pb-20">
        {/* --- Order Summary title --- */}
        <div className="mt-6 flex items-center justify-center rounded-lg bg-green-100 p-6 text-3xl font-extrabold tracking-tight text-green-900  dark:bg-green-100 dark:text-green-900">
          Order Summary
        </div>

        {/* --- Order Summary header --- */}
        <div className="grid grid-cols-3 gap-5">
          <span className="inline-flex w-full justify-center text-xl font-medium leading-tight text-green-900 dark:text-green-900">
            Product
          </span>
          <span className="inline-flex w-full justify-center text-xl font-medium leading-tight text-green-900 dark:text-green-900">
            Quantity
          </span>
          <span className="inline-flex w-full justify-center text-xl font-medium leading-tight text-green-900 dark:text-green-900">
            Subtotal
          </span>
        </div>
        <hr className="my-8 h-px border-0 bg-green-600 dark:bg-green-700"></hr>

        {/* --- Order Summary content --- */}
        {Object.keys(orderedProducts)
          .filter((key: string) => orderedProducts[key].quantity > 0)
          .map((key: string) => {
            return (
              <div key={key} className="my-5 grid grid-cols-3 gap-5">
                <span className="inline-flex w-full justify-center font-medium leading-tight text-green-900 dark:text-green-900">
                  {orderedProducts[key].product}
                </span>
                <span className="inline-flex w-full justify-center font-medium leading-tight text-green-900 dark:text-green-900">
                  {orderedProducts[key].quantity}
                </span>
                <span className="inline-flex w-full justify-center font-medium leading-tight text-green-900 dark:text-green-900">
                  ${orderedProducts[key].subtotal.toFixed(2)}
                </span>
              </div>
            )
          })}

        {/* --- Order Summary footer --- */}
        <hr className="my-8 h-px border-0 bg-green-600 dark:bg-green-700"></hr>
        <div className="grid grid-cols-3 gap-5">
          <span className="inline-flex w-full justify-center text-xl font-medium leading-tight text-green-900 dark:text-green-900">
            Total
          </span>
          <span className="inline-flex w-full justify-center text-xl font-medium leading-tight text-green-900 dark:text-green-900"></span>
          <span className="inline-flex w-full justify-center text-xl font-medium leading-tight text-green-900 dark:text-green-900">
            $
            {Object.keys(orderedProducts)
              .map((key: string) => orderedProducts[key].subtotal)
              .reduce(
                (previousSum: number, currentSubtotal: number) =>
                  previousSum + currentSubtotal,
                0
              )
              .toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Menu
