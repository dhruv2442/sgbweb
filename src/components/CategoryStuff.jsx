import React,{useContext} from 'react';
import Products from './Products'
import { Data } from './Home';

const All = ({addToCart}) => {
  const products = useContext(Data).data;
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
const Sweets = ({addToCart}) => {
  const products = useContext(Data).data;
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
const Namkeen = ({addToCart}) => {
  const products = useContext(Data).data;
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
