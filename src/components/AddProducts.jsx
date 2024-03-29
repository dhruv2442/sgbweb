import React, { useState, useEffect } from 'react';
import { fs, storage } from '../config/Config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, getDocs } from '@firebase/firestore';
import { Link } from 'react-router-dom';

const AddProducts = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const [imageError, setImageError] = useState('');

  const [successMsg, setSuccessMsg] = useState('');
  const [uploadError, setUploadError] = useState('');

  const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
  const handleProductImage = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError('');
      } else {
        setImage(null);
        setImageError(
          'Please select a valid image File type (png / jpeg / jpg)'
        );
      }
    } else {
      console.log('please select your file');
    }
  };

  const handleAddProducts = (e) => {
    e.preventDefault();
    //   console.log(title,category,price);
    //   console.log(image);

    const uploadTask = uploadBytesResumable(
      ref(storage, `product-image/${image.name}`),
      image
    );
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        setUploadError(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(collection(fs, 'Products'), {
            title: title,
            category: category,
            price: Number(price),
            downloadURL,
          })
            .then(() => {
              setSuccessMsg('Product added successfuly');
              setTitle('');
              setCategory('');
              setPrice('');
              document.getElementById('file').value = '';
              setImageError('');
              setUploadError('');
              setTimeout(() => {
                setSuccessMsg('');
              }, 3000);
            })
            .catch((error) => setUploadError(error.message));
        });
      }
    );
  };

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
  return (
    <>
      <div className='container'>
        <br></br>
        <br></br>
        <h1>Add Products</h1>
        <hr></hr>
        {successMsg && (
          <>
            <div className='success-msg'>{successMsg}</div>
            <br></br>
          </>
        )}
        <form
          autoComplete='off'
          className='form-group'
          onSubmit={handleAddProducts}
        >
          <label>Product Title</label>
          <input
            type='text'
            className='form-control'
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
          <br />
          <br />

          <label for='inputState' class='form-label'>
            Category
          </label>
          <select
            id='inputState'
            class='form-select'
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
            required
          >
            <option selected>Choose Category</option>
            <option>Homepage</option>
            <option>Sweets</option>
            <option>Namkeen</option>
          </select>
          <br />
          <br />
          <label>Product Price per Kg</label>
          <input
            type='number'
            className='form-control'
            required
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          ></input>
          <br />
          <br />
          <label>Upload Product Image</label>
          <input
            type='file'
            id='file'
            className='form-control'
            required
            onChange={handleProductImage}
          ></input>

          {imageError && (
            <>
              <br></br>
              <div className='error-msg'>{imageError}</div>
            </>
          )}
          <br />
          <br />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type='submit' className='btn btn-success btn-md'>
              SUBMIT
            </button>
          </div>
        </form>
        {uploadError && (
          <>
            <br></br>
            <div className='error-msg'>{uploadError}</div>
          </>
        )}
      </div>
      <div className='container mt-2'>
        <div className='table-responsive'>
          <table class='table table-bordered border-dark table-hover'>
            <thead className="bg-success text-light">
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Product</th>
                <th scope='col'>Price / Kg</th>
                <th scope='col'> Image </th>
              </tr>
            </thead>
            <tbody>
              {products.map((obj,index) => {
                return (
                  <tr className="tbl-data">
                    <th scope='row'>{index + 1}</th>
                    <td>{obj.title}</td>
                    <td>{obj.price}</td>
                    <td><Link to={obj.downloadURL} target="_blank" rel="noopener noreferrer">image link</Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
