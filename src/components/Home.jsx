import React, { useEffect, useState } from 'react';
import { auth, fs } from '../config/Config';
import { onAuthStateChanged } from '@firebase/auth';
import Navbar from './Navbar';
import { doc, getDoc, getDocs, collection ,setDoc} from '@firebase/firestore';
import { Route, Switch } from 'react-router';
import HomeMain from './HomeMain';
import { All, Namkeen, Sweets } from './CategoryStuff';
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
      //   console.log();
    });
  };

  // console.log(products)
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
      <Switch>
      <Route exact path="/" render={()=>(
        <HomeMain products={products} addToCart={addToCart}/>
      )}/>
      <Route  exact path="/all" render={()=>(
        <All products={products} addToCart={addToCart}/>
      )}/>
      <Route  exact path="/sweets" render={()=>(
        <Sweets products={products} addToCart={addToCart}/>
        //<div>Sweetc</div>
      )}/>
      <Route exact path="/namkeen" render={()=>(
        <Namkeen products={products} addToCart={addToCart}/>
      )}/>

      
      </Switch>
    </div>
  );
};

export default Home;
