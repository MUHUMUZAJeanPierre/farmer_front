import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFood_list] = useState([]);

    // Adding product in cart
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
        if (token) {
            try {
                const response = await axios({
                    method: "POST",
                    url: "https://backendfarmerconnect.onrender.com/cart/add",
                    data: {
                        userId: token,
                        itemId: itemId,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log("Response from server:", response.data);
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        } else {
            console.warn("No token found, item not added to cart on server.");
        }
    };

    // Removing the product from the cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemId] > 1) {
                newCart[itemId] -= 1;
            } else {
                delete newCart[itemId];
            }
            return newCart;
        });
        if (token) {
            try {
                const response = await axios({
                    method: "POST",
                    url: "https://backendfarmerconnect.onrender.com/cart/remove",
                    data: {
                        userId: token,
                        itemId: itemId,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log("Response from server:", response.data);
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        } else {
            console.warn("No token found, item not removed from cart on server.");
        }
    };

    // Get products in the cart
    const loadCartData = async () => {
        if (token) {
            try {
                const response = await axios({
                    method: "GET",
                    url: "https://backendfarmerconnect.onrender.com/cart/get",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log("Response from server:", response.data);
                setCartItems(response.data.cartData);
            } catch (error) {
                console.error("Error getting cart data:", error);
            }
        } else {
            console.warn("No token found, cannot load cart data from server.");
        }
    };

    const clearCart = () => {
        setCartItems({});
    };

    const getTotalItems = () => {
        return Object.values(cartItems).reduce((total, count) => total + count, 0);
    };

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    // Fetching food from database
    const handleFetch = async () => {
        await axios({
            method: "GET",
            url: `https://backendfarmerconnect.onrender.com/food/list`,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            setFood_list(response.data.data);
        });
    };

    useEffect(() => {
        handleFetch();
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
        }
        if (token) {
            loadCartData();
        }
        
    }, [token]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalCartAmount,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
