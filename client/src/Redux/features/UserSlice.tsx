// import { createSlice } from "@reduxjs/toolkit";


// const initialState = {
//     userData :null,
//     changeName : null
// };

// const userSlice = createSlice({
//     name:'users',
//     initialState:initialState,
//     reducers:{
//         setUserData : (state, action) => {
//             state.userData = action.payload;
//         },
//         logout:(state) =>{
//             state.userData = null;
//         }
//     }
// })

// export const { setUserData, logout } = userSlice.actions
// export default userSlice.reducer

// In UserSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the user data object
interface UserData {
  name: string;
  email: string;
  phone: number,
  
}

interface UserState {
  userData: UserData | null;
  changeName: string | null;
}

const initialState: UserState = {
  userData: null,
  changeName: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = null;
    },
  },
});

export const { setUserData, logout } = userSlice.actions;
export default userSlice.reducer;
