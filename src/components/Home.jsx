import React, { useEffect, useState } from 'react';
import { auth, fs } from '../config/Config';
import { onAuthStateChanged } from '@firebase/auth';
import Navbar from './Navbar';
import Products from './Products';
import { doc, getDoc, getDocs, collection ,setDoc} from '@firebase/firestore';
// import { Route, Switch } from 'react-router';

const Home = (props) => {


  //get current user uid
  const GetUserUid = () => {
    const [uid, setUid] = useState(null);
    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
            setUid(user.uid);
        } else {
          setUid(null);
        }
      });
    },[]);
    return uid;
  }

  const uid = GetUserUid();

  //get current user function
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
  console.log(user);

  //state of products
  const [products, setProducts] = useState([]);

  //getting Products function
  const getProducts = async () => {
    const productsArray = [];
    const querySnapshot = await getDocs(collection(fs, 'Products'));
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      data.ID = doc.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === querySnapshot.docs.length) {
        setProducts(productsArray);
      }
      //   console.log(doc.id, " => ", doc.data());
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  let Product;
  const addToCart = (product)=> {
    if(uid !== null){
      console.log(product);
      Product = product;
      Product['qty'] = 1;
      // Product['itemPrice'] = Product.itemQty*Product.price; 
      Product['TotalProductPrice'] = Product.price * Product.qty;
      setDoc(doc(fs, 'Cart' + uid,product.ID), Product).then(()=>{
        window.alert(`${product.title} successfully added to cart`)
    })
  }
    else{
      props.history.push('/login');
    }
  }

  return (
    <div>
      <Navbar user={user} />
      <br />
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
    </div>
  );
};

export default Home;
