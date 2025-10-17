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
  const { id, selectedColor, selectedSize, quantity } = action.payload;

  const itemPresent = state.cart.find(
    (item) =>
      item.id === id &&
      item.selectedColor === selectedColor &&
      item.selectedSize === selectedSize
  );

  if (itemPresent) {
    itemPresent.quantity += Number(quantity); 
  } else {
    state.cart.push({ ...action.payload }); 
  }

  saveCartToStorage(state.cart);
},


    removeFromCart: (state, action) => {
  const { id, selectedColor, selectedSize } = action.payload;
  state.cart = state.cart.filter(
    (item) =>
      !(item.id === id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize)
  );
  saveCartToStorage(state.cart);
},

    incrementQuantity: (state, action) => {
  const item = state.cart.find(
    (i) =>
      i.id === action.payload.id &&
      i.selectedColor === action.payload.selectedColor &&
      i.selectedSize === action.payload.selectedSize
  );
  if (item) item.quantity++;
  saveCartToStorage(state.cart);
},

decrementQuantity: (state, action) => {
  const itemIndex = state.cart.findIndex(
    (i) =>
      i.id === action.payload.id &&
      i.selectedColor === action.payload.selectedColor &&
      i.selectedSize === action.payload.selectedSize
  );

  if (itemIndex >= 0) {
    const item = state.cart[itemIndex];
    if (item.quantity === 1) {
      state.cart.splice(itemIndex, 1);
    } else {
      item.quantity--;
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
