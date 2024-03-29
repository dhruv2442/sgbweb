import React,{useState} from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import {fs,auth} from '../config/Config';
import {setDoc,doc,getDocs,getDoc,collection,addDoc,deleteDoc} from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Modal = ({TotalPrice,totalQty,hideModal}) => {

    const history = useHistory();

    // form states
    const [cell, setCell]=useState(null);
    const [residentialAddress, setResidentialAddress]=useState('');
    const [cartPrice]=useState(TotalPrice);
    const [cartQty]=useState(totalQty);

    // close modal
    const handleCloseModal=()=>{
        hideModal();
    }

    // cash on delivery
    const handleCashOnDelivery=async(e)=>{
        e.preventDefault();
        // console.log(cell, residentialAddress, cartPrice, cartQty);
        const uid = auth.currentUser.uid;
        const userData = await getDoc(doc(fs, 'users',uid));
        await setDoc(doc(collection(fs, 'Buyer-Personal-Info'),uid), {
            Name: userData.data().Fullname,
            Email: userData.data().email,
            CellNo: cell,
            ResidentialAddress: residentialAddress,
            CartPrice: cartPrice,
            CartQty: cartQty
        })
        const cartData = await getDocs(collection(fs,'Cart'+uid));
        console.log(cartData);
        for(var snap of cartData.docs){
            var data = snap.data();
            data.ID = snap.id;
            await addDoc(collection(fs,'Buyer-Cart' + uid),data);
            await deleteDoc(doc(fs,'Cart' + uid,snap.id));
        }
        hideModal();
        history.push('/');
        toast.success('Your order has been placed successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
    }
  return (
    <div className='shade-area'>
      <div className='modal-container'>
        <form
          className='form-group'
          onSubmit={handleCashOnDelivery}
        >
          <input
            type='number'
            className='form-control'
            placeholder='Cell No'
             required onChange={(e)=>setCell(e.target.value)} value={cell}
          />
          <br></br>
          <input
            type='text'
            className='form-control'
            placeholder='Residential Address'
            required onChange={(e)=>setResidentialAddress(e.target.value)}
            value={residentialAddress}
          />
          <br></br>
          <label>Total Quantity</label>
          <input
            type='text'
            className='form-control'
            readOnly
            required value={cartQty}
          />
          <br></br>
          <label>Total Price</label>
          <input
            type='text'
            className='form-control'
            readOnly
            required value={cartPrice}
          />
          <br></br>
          <button type='submit' className='btn btn-success btn-md'>
            Submit
          </button>
        </form>
        <div
          className='delete-icon'
          onClick={handleCloseModal}
        >
          x
        </div>
      </div>
    </div>
  );
};

export default Modal;
