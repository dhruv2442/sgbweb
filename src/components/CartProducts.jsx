import React from 'react';
import ProductCard from './ProductCard';

const CartProducts = ({cartPktQty,cartProducts,cartProductIncrease,cartProductDecrease}) => {

    return( cartProducts.map((obj)=>{
        return <ProductCard  key = {obj.ID} product={obj} cartPktQty={cartPktQty} cartProductIncrease={cartProductIncrease} cartProductDecrease={cartProductDecrease} />
      }))
}

export default CartProducts
