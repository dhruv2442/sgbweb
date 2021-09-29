import React,{useContext} from 'react'
import Products from './Products'
import { Data } from './Home';

const HomeMain = ({addToCart}) => {
    const products = useContext(Data).data;
    return (
        <>
        {products.length > 0 && (
            <div className='all container-fluid'>
              <h4 className='text-center'>Featured Products</h4>
              <Products products={products} addToCart={addToCart} />
            </div>
          )}
          {products.length < 1 && (
              <div className="container-fluid d-flex justify-content-center align-items-center">
                  Please wait...Products are coming.
              </div>
          )}
          </>
    )
}

export default HomeMain
