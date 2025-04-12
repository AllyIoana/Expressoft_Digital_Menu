import ProductCard from '../components/ProductCard'
import { menuData } from '../data/menuData'
const Menu = () => {
  return (
    <div>
      <h1>Menu Page</h1>
      <ProductCard
        id={menuData[0].products[0].id}
        name={menuData[0].products[0].name}
        description={menuData[0].products[0].description}
        price={menuData[0].products[0].price}
        available={menuData[0].products[1].available}
      />
      <ProductCard
        id={menuData[0].products[0].id}
        name={menuData[0].products[0].name}
        description={menuData[0].products[0].description}
        price={menuData[0].products[0].price}
        available={menuData[0].products[0].available}
      />
    </div>
  )
}

export default Menu
