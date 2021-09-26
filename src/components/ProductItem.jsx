import React from 'react'

const ProductItem = ({item,addToCart}) => {

  const handleAddToCart = () =>{
    addToCart(item);
  }
    const {id,downloadURL,title,price} = item;
    return (
        <div class='main_card' key={id}>
        <div class='imgBx'>
          <img src={downloadURL} alt='product' srcset='' />
        </div>
        <div class='details'>
          <div class='pr_name'>{title}</div>

          <div class='qty1'>
            <p>Price:</p>
            <p>{price}</p>
          </div>
        </div>

        <div class='atc' onClick={handleAddToCart}>
          <button>Add to Cart</button>
        </div>
      </div>
    )
}

export default ProductItem
