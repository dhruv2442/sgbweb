import React, { useEffect, useState,createContext } from 'react';
import { auth, fs } from '../config/Config';
import { onAuthStateChanged } from '@firebase/auth';
import Navbar from './Navbar';
import { doc, getDoc, getDocs, collection ,setDoc,onSnapshot} from '@firebase/firestore';
import { Route, Switch } from 'react-router';
import HomeMain from './HomeMain';
import { All, Namkeen, Sweets } from './CategoryStuff';
import About from './About';
// import { Route, Switch } from 'react-router';

const Data = createContext();

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
      Product['pktQty'] = "1 kg";
      // Product['itemPrice'] = Product.itemQty*Product.price;
      Product['pktPrice']=Product.price;
      Product['TotalProductPrice'] = Product.pktPrice* Product.qty;
      setDoc(doc(fs, 'Cart' + uid,product.ID), Product).then(()=>{
        window.alert(`${product.title} successfully added to cart`)
    })
  }
    else{
      props.history.push('/login');
    }
  }

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

  return (
    <div>
      <Navbar user={user} totalProducts={totalProducts}/>
      <br />
      <Switch>
      <Route exact path="/" render={()=>(
        <Data.Provider value={products}>
               
        <HomeMain products={products} addToCart={addToCart}/>
              </Data.Provider>
      )}/>
      <Route  exact path="/all" render={()=>(
        <Data.Provider value={products}>
        <All products={products} addToCart={addToCart}/>
        </Data.Provider>
      )}/>
      <Route  exact path="/sweets" render={()=>(
        <Data.Provider value={products}>
        <Sweets products={products} addToCart={addToCart}/>
        </Data.Provider>
        //<div>Sweetc</div>
      )}/>
      <Route exact path="/namkeen" render={()=>(
        <Data.Provider value={products}>
        <Namkeen products={products} addToCart={addToCart}/>
        </Data.Provider>
      )}/>
      <Route exact path='/about' component={About} ></Route>

      
      </Switch>
    </div>
  );
};

export default Home;
export {Data};
