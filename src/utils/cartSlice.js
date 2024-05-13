import { createSlice, current } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name: "cart",                        
    initialState: {
      items: [],
    },
    reducers: {


      addItem: (state, action) => {
        state.items.push({...action.payload,...action.payload.card.info,quantity:1});

    },
    incrQuantity: (state, action) => {
        state.items = state.items.map((item) => (item.id === action.payload) ? { ...item, quantity: item.quantity + 1 } : item)
    },
    decrQuantity: (state, action) => {
        state.items = state.items.map((item) => (item.id === action.payload) ? { ...item, quantity: item.quantity - 1 } : item)
    }
    ,
    removeItem: (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
    }
    ,
        clearCart: (state, action) => {
        //RTK - either Mutate the existing  state or return a new State
        // state.items.length = 0; // originalState = []
  
        return { items: [] }; // this new object will be replaced inside originalState = { items: [] }
      },
    emptyItems: (state) => {
        state.items = [];
    }
},

});

export const { addItem, incrQuantity, decrQuantity, removeItem, emptyItems, clearCart } = cartSlice.actions;
  //     addItem: (state, action) => {
  //       // Redux Toolkit uses immer BTS
  //       state.items.push(action.payload);
  //     },
  //     removeItem: (state, action) => {
  //       state.items.pop();
  //     },
  //     //originalState = {items: ["pizza"]}
  //     clearCart: (state, action) => {
  //       //RTK - either Mutate the existing  state or return a new State
  //       // state.items.length = 0; // originalState = []
  
  //       return { items: [] }; // this new object will be replaced inside originalState = { items: [] }
  //     },
  //   },
  // });
  
  // export const { addItem, removeItem, clearCart } = cartSlice.actions;
  
  export default cartSlice.reducer;