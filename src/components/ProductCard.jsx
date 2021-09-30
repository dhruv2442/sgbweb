import React from "react";
import { fs,auth } from "../config/Config";
import { deleteDoc,doc,collection } from "@firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCard = ({ cartPktQty,cartProductIncrease,cartProductDecrease, product }) => {
  const { title, price, downloadURL, category, qty, TotalProductPrice,pktQty } =
    product;

  const handleCartProductIncrease = () => {
    cartProductIncrease(product);
  };
  const handleCartProductDecrease = () => {
    cartProductDecrease(product);
  };
  const handlePktQty = (e) =>{
    cartPktQty(e.target.value,product)
  }
  const handleCartProductDelete=()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          deleteDoc(doc(collection(fs,'Cart' + user.uid),product.ID)).then(()=>{
            console.log("successfully Deleted")
          })
          }
        else {
          console.log('user is not logged in to increment');
        }
      });
  }

  return (
    <>
      <hr style={{ background: 'blue', height: '3px' }} />
      <div className='row'>
        {/* cart images div */}
        <div className='col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img my-2'>
          <LazyLoadImage effect="blur" src={downloadURL} alt='img' className='img-fluid img' placeholderSrc={process.env.PUBLIC_URL + "logo.png"}/>
        </div>
        {/* cart product details */}
        <div className='col-md-7 col-11 mx-auto px-4 mt-2'>
          <div className='row'>
            <div className='card-title col-md-6 col-11 '>
              <div className='mb-4 product_name'>{title}</div>
              <p className='mb-1'>{category}</p>
              <div class='col-md-10 mb-4'>
                <label for='inputState' class='form-label'>
                  Packet of
                </label>
                <select
                  id='inputState'
                  class='form-select'
                  value={pktQty}
                  onChange={handlePktQty}
                >
                  <option selected>Choose Qty..</option>
                  <option>1 Kg</option>
                  <option>500 gm</option>
                  <option>250 gm</option>
                </select>
              </div>
            </div>
            <div className='col-md-6 col-11'>
              <ul className='col-md-11 col-5 pagination justify-content-md-end justify-content-start set_quantity '>
                <li className='page-item'>
                  <button
                    className='page-link qtyset }'
                    onClick={handleCartProductDecrease}
                  >
                    <i className='fas fa-minus'></i>
                  </button>
                </li>
                <li className='page-item'>
                  <input
                    type='text'
                    name=''
                    className='page-link'
                    id='textbox'
                    value={qty}
                  />
                </li>
                <li className='page-item'>
                  <button
                    className='page-link qtyset bg-gradient'
                    onClick={handleCartProductIncrease}
                    // disabled={qty >= 5}
                  >
                    <i className='fas fa-plus'></i>
                  </button>
                </li>
              </ul>
              <div className='col-md-11 col-6 mb-4 mt-4 product_price text-end'>
                Price: {price} / Kg
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-5 d-flex justify-content-between remove_wish'>
              <p className = " btn btn-outline-danger p-1" onClick={handleCartProductDelete}>
                <i className='fas fa-trash-alt '></i> <span className="d-none d-md-block position-relative"> Remove Item</span>
              </p>
            </div>
            <div className='col-7 d-flex justify-content-end price_money'>
              <h4>
                Total Price: <span>{TotalProductPrice}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
