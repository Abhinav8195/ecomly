import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const loadWishlistFromStorage = createAsyncThunk(
  "wishlist/loadFromStorage",
  async () => {
    const data = await AsyncStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  }
);


const saveWishlistToStorage = async (wishlist) => {
  try {
    await AsyncStorage.setItem("wishlist", JSON.stringify(wishlist));
  } catch (e) {
    console.log("Error saving wishlist to storage", e);
  }
};

export const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const itemPresent = state.wishlist.find((item) => item.id === action.payload.id);
      if (!itemPresent) {
        state.wishlist.push(action.payload);
        saveWishlistToStorage(state.wishlist);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload.id);
      saveWishlistToStorage(state.wishlist);
    },
    cleanWishlist: (state) => {
      state.wishlist = [];
      saveWishlistToStorage(state.wishlist);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadWishlistFromStorage.fulfilled, (state, action) => {
      state.wishlist = action.payload;
    });
  },
});

export const { addToWishlist, removeFromWishlist, cleanWishlist } = WishlistSlice.actions;

export default WishlistSlice.reducer;
