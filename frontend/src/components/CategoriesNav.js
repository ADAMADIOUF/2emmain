import React, { useEffect, useState } from 'react'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import { FaPlus, FaMinus, FaBars } from 'react-icons/fa'
import Loader from "./Loader"
import Error from "./Error"
const CategoriesNav = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery()
  const [categories, setCategories] = useState([])
  const [expandedCategory, setExpandedCategory] = useState(null)
const [menuOpen, setMenuOpen] = useState(false)

const toggleMenu = () => {
  setMenuOpen(!menuOpen)
}
  useEffect(() => {
    if (products) {
      const uniqueCategories = Array.from(
        new Set(products.map((p) => p.category))
      )
      setCategories(uniqueCategories)
    }
  }, [products])

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  const getBrandsForCategory = (category) => {
    return [
      ...new Set(
        products.filter((p) => p.category === category).map((p) => p.brand)
      ),
    ]
  }

  return (
    <div>
      <div onClick={toggleMenu}>
        <FaBars /> 
      </div>
      {menuOpen && ( 
        <div className='categories-nav'>
          <h3>Categories</h3>
          {isLoading && <Loader/>}
          {isError && <Error/>}
          <ul className='categories-links'>
            {categories.map((category) => (
              <li key={category} className='categories-link'>
                <div onClick={() => toggleCategory(category)}>
                  {expandedCategory === category ? <FaMinus /> : <FaPlus />}{' '}
                  {category}
                </div>
                {expandedCategory === category && (
                  <ul>
                    {getBrandsForCategory(category).map((brand) => (
                      <li key={brand}>{brand}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CategoriesNav
