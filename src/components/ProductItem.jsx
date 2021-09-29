import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductItem = ({item,addToCart}) => {

  const handleAddToCart = () =>{
    addToCart(item);
  }
    const {id,downloadURL,title,price} = item;
    return (
        <div class='main_card' key={id}>
        <div class='imgBx'>
          <LazyLoadImage effect="blur" className="pr_img" src={downloadURL} alt='product' placeholderSrc={process.env.PUBLIC_URL + "logo.png"} />
        </div>
        <div class='details'>
          <div class='pr_name'>{title}</div>

          <div class='qty1'>
            <p>Price:</p>
            <p>{price}</p>
          </div>
        </div>

        <div class='atc' onClick={handleAddToCart}>
          <button>Add to Cart <i class="fas fa-cart-plus"></i></button>
        </div>
      </div>
    )
}

export default ProductItem
