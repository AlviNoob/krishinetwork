import React, { useContext } from 'react'; 
import './ProductDisplay.css'; 
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = (props) => { 
    const { product } = props; 
    const { addToCart } = useContext(ShopContext);

    return ( 
        <div className="productdisplay"> 
            <div className="productdisplay-left"> 
                <div className="productdisplay-img-list"> 
                    <img src={product.image} alt="Thumbnail 1" />
                    <img src={product.image} alt="Thumbnail 2" /> 
                    <img src={product.image} alt="Thumbnail 3" /> 
                    <img src={product.image} alt="Thumbnail 4" />  
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt="Main Image" />
                </div> 
            </div> 
            <div className="productdisplay-right">
                <h1>{product.name}</h1> 
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    A lighthouse..... {/* Consider replacing this with actual description data */}
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                  
                </div>
                <button onClick={() => { addToCart(product.id); }}>ADD TO CART</button>
            </div> 
        </div> 
    );
};

export default ProductDisplay;
