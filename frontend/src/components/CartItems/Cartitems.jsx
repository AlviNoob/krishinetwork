import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../context/ShopContext';

const CartItems = () => {
    const {getTotalCartAmount,updateCartItemQuantity, all_product, cartItems, removeFromCart,  } = useContext(ShopContext);

    // Calculate Subtotal

    return (
        <div className="cartitems">
            {/* Header row */}
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {/* Product rows */}
            {all_product.map((product) => {
                if (cartItems[product.id] > 0) {
                    return (
                        <div key={product.id} className="cartitems-format">
                            <img
                                src={product.image}
                                alt="Product Icon"
                                className="cart-icon-product-icon"
                            />
                            <p>{product.name}</p>
                            <p>${product.new_price}</p>
                            <input
                                type="number"
                                min="1"
                                className="cartitems-quantity-input"
                                value={cartItems[product.id]}
                                onChange={(e) => updateCartItemQuantity(product.id, e.target.value)}
                            />
                            <p>${product.new_price * cartItems[product.id]}</p>
                            <button
                                className="cart-remove-button"
                                onClick={() => {
                                    removeFromCart(product.id);
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    );
                }
                return null;
            })}

            <hr />

            {/* Cart Totals Section */}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                </div>
                <button className="checkout-button">Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default CartItems;
