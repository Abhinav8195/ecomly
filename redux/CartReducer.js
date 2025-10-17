import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ Load cart from AsyncStorage when app opens
export const loadCartFromStorage = createAsyncThunk(
  "cart/loadCartFromStorage",
  async () => {
    try {
      const storedCart = await AsyncStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.log("Error loading cart:", error);
      return [];
    }
  }
);


const saveCartToStorage = async (cart) => {
  try {
    await AsyncStorage.setItem("cartItems", JSON.stringify(cart));
  } catch (error) {
    console.log("Error saving cart:", error);
  }
};

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cart.find((item) => item.id === action.payload.id);
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      saveCartToStorage(state.cart); 
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      saveCartToStorage(state.cart);
    },

    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
      saveCartToStorage(state.cart);
    },

    decrementQuantity: (state, action) => {
      const itemPresent = state.cart.find((item) => item.id === action.payload.id);
      if (itemPresent) {
        if (itemPresent.quantity === 1) {
          state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        } else {
          itemPresent.quantity--;
        }
      }
      saveCartToStorage(state.cart);
    },

    cleanCart: (state) => {
      state.cart = [];
      saveCartToStorage(state.cart);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadCartFromStorage.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart,
} = CartSlice.actions;

export default CartSlice.reducer;
