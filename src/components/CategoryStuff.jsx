import React from 'react';
import Products from './Products'

const All = ({products,addToCart}) => {
    const allProducts = products.filter((elem) => {
        return elem.category !== 'Home';
      });
    return (
        <>
        {allProducts.length > 0 && (
            <div className='all container-fluid'>
              <h4 className='text-center'>Featured Products</h4>
              <Products products={products} addToCart={addToCart} />
            </div>
          )}
          {allProducts.length < 1 && (
              <div className="container-fluid d-flex justify-content-center align-items-center">
                  Please wait...Products are coming.
              </div>
          )}
          </>
    )
}
const Sweets = ({products,addToCart}) => {
    const sweetProducts = products.filter((elem) => {
        return elem.category === "Sweets";
      });
    return (
        <>
        {sweetProducts.length > 0 && (
            <div className='all container-fluid'>
              <h4 className='text-center'>Sweets</h4>
              <Products products={sweetProducts} addToCart={addToCart} />
            </div>
          )}
          {sweetProducts.length < 1 && (
              <div className="container-fluid d-flex justify-content-center align-items-center">
                  Please wait...Products are coming.
              </div>
          )}
          </>
    )
}
const Namkeen = ({products,addToCart}) => {
    const namkeenProducts = products.filter((elem) => {
        return elem.category === "Namkeen";
      });
    return (
        <>
        {namkeenProducts.length > 0 && (
            <div className='all container-fluid'>
              <h4 className='text-center'>Namkeen</h4>
              <Products products={namkeenProducts} addToCart={addToCart} />
            </div>
          )}
          {namkeenProducts.length < 1 && (
              <div className="container-fluid d-flex justify-content-center align-items-center">
                  Please wait...Products are coming.
              </div>
          )}
          </>
    )
}

export {All,Sweets,Namkeen};
