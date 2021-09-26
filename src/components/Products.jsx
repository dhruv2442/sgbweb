import React from 'react'
import ProductItem from './ProductItem';

const Products = ({products,addToCart}) => {
    return (
        <div className='products'>
        {products.map((item, index) => {
          return <ProductItem item={item} key={item.ID} addToCart={addToCart}/>;
        })}
      </div>
    )
}

export default Products;