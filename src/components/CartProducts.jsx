import React from 'react';
import ProductCard from './ProductCard';

const CartProducts = ({cartProducts,cartProductIncrease,cartProductDecrease}) => {

    return( cartProducts.map((obj)=>{
        return <ProductCard  key = {obj.ID} product={obj} cartProductIncrease={cartProductIncrease} cartProductDecrease={cartProductDecrease} />
      }))
}

export default CartProducts
