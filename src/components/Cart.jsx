import React, { useEffect, useState } from 'react';
import { auth, fs } from '../config/Config';
import { onAuthStateChanged } from '@firebase/auth';
import Navbar from './Navbar';
import { doc, getDoc,collection, onSnapshot,updateDoc } from '@firebase/firestore';
import CartProducts from './CartProducts';
import  Modal  from "./Modal";

const Cart = () => {
  const [showModal,setShowModal] =useState(false);

  const triggerModel=()=>{
    setShowModal(true)
  }
  //get Current user
  const GetCurrentUser = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          getDoc(doc(fs, 'users', user.uid)).then((snapshot) => {
            setUser(snapshot.data().Fullname);
          });
        } else {
          setUser(null);
        }
      });
    }, []);

    return user;
  };
  const user = GetCurrentUser();

  //state of cart products
  const [cartProducts,setCartProducts] = useState([]);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          onSnapshot(collection(fs,'Cart' + user.uid),(snapshot)=>{
              const newCartProduct = snapshot.docs.map((doc)=>({
                  ID: doc.id,
                  ...doc.data(),
              }));
              setCartProducts(newCartProduct);
          })
          }
        else {
          console.log('user is not signed in to retrive cart');
        }
      });
  },[])

  // console.log(cartProducts);

  let Product;
  //cart Product increase function
  const cartProductIncrease = (cartProduct)=>{
    // console.log(cartProduct);
    Product = cartProduct;
    Product.qty = Product.qty + 1;
    Product.TotalProductPrice = Product.qty * Product.price;
    //update firestore collection
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateDoc(doc(collection(fs,'Cart' + user.uid),cartProduct.ID),Product).then(()=>{
          console.log("Increment Added")
        })
        }
      else {
        console.log('user is not logged in to increment');
      }
    });
  }

    ////cart Product increase function
  const cartProductDecrease = (cartProduct)=>{
    // console.log(cartProduct);
    Product = cartProduct;
    if(Product.qty > 1){
      Product.qty = Product.qty - 1;
      Product.TotalProductPrice = Product.qty * Product.price;
      //update firestore collection
      onAuthStateChanged(auth, (user) => {
        if (user) {
          updateDoc(doc(collection(fs,'Cart' + user.uid),cartProduct.ID),Product).then(()=>{
            console.log("Decrement Added")
          })
          }
        else {
          console.log('user is not logged in to increment');
        }
      });
    }
  }

  // getting the qty from cartProducts in a seperate array
  const qty = cartProducts.map(cartProduct=>{
    return cartProduct.qty;
})

// reducing the qty in a single value
const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

const totalQty = qty.reduce(reducerOfQty,0);

// console.log(totalQty);

    // getting the TotalProductPrice from cartProducts in a seperate array
    const price = cartProducts.map((cartProduct)=>{
      return cartProduct.TotalProductPrice;
  })

  // reducing the price in a single value
  const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;

  const totalPrice = price.reduce(reducerOfPrice,0);

  const [totalProducts, setTotalProducts]=useState(0);
  // getting cart products   
  useEffect(()=>{        
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(collection(fs,'Cart' + user.uid),(snapshot)=>{
            setTotalProducts(snapshot.docs.length);
        })
        }
    });     
  },[]) 
  
  //hide modal function
  const hideModal=()=>{
    setShowModal(false);
  }

  return (
    <>
      <Navbar user={user} totalProducts={totalProducts}/>
      <br />
      <br />
      {cartProducts.length <1 && (
        <div className="container-fluid d-flex justify-content-center align-items-center"><h1>Your cart is Empty......</h1></div>
      )}
      {cartProducts.length > 0 && (
        <div className='bg-light'>
        <div className='container-fluid '>
          <div className='row'>
            <div className='col-md-10 col-11 mx-auto'>
              <div className='row mt-5 gx-3'>
                {/* left side div */}
                <div className='col-md-12 col-lg-8 col-11 mx-auto main_cart mb-lg-0 mb-5'>
                  <div className='card shadow-lg p-4'>
                    <h2 className='py-4 fw-bold'>Cart ({cartProducts.length} items)</h2>
                    <CartProducts cartProducts={cartProducts} cartProductIncrease={cartProductIncrease} cartProductDecrease={cartProductDecrease}/>
                  </div>
                </div>
                {/* right side div */}
                <diiv className='col-md-12 col-lg-4 col-11 mx-0 mt-lg-0 mt-md-5'>
                  <div className='right_side p-3 shadow-lg bg-white'>
                    <h2 className='product_name mb-5'>Cart Summery</h2>
                    <div className='price_indiv d-flex justify-content-between'>
                      <p>Total Quantity:</p>
                      <p>
                        <span>{totalQty}</span> Nos.
                      </p>
                    </div>
                    <div className='price_indiv d-flex justify-content-between'>
                      <p>Product amount</p>
                      <p>
                        Rs. <span>{totalPrice}</span>
                      </p>
                    </div>
                    <div className='price_indiv d-flex justify-content-between'>
                      <p>Shipping Charge</p>
                      <p>
                        Rs. <span>100.00</span>
                      </p>
                    </div>
                    <hr />
                    <div className='total_amt d-flex justify-content-between fw-bold'>
                      <p>Total amount(including VAT)</p>
                      <p>
                        Rs. <span>{totalPrice + 100}</span>
                      </p>
                    </div>
                    <button className='btn btn-primary text-uppercase ' onClick={()=>triggerModel()}>
                      Cash On Delivery
                    </button>
                  </div>
                  <div className='mt-3 shadow-lg p-3 bg-white '>
                    <div className='pt-4'>
                      <h5 className='mb-4'>Expected Delivery Date</h5>
                      <p>September 27th 2021 - September 29th 2021</p>
                    </div>
                  </div>
                </diiv>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) }
      {showModal === true && (
        <Modal TotalPrice={totalPrice + 100} totalQty={totalQty} hideModal={hideModal}/>
      )}
      
    </>
  );
};

export default Cart;