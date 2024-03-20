import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        username: "",
        email: "",
        fullname: "",
        avatar: ""
    },
    userLoggedIn: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoginStatus: (state, action) => {
            state.userLoggedIn = action.payload;
        }
    }
});

export const { setUser, setLoginStatus } = userSlice.actions;
export default userSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";
// // import axios from "axios"
// // nanoid -> generate unique id

// // initialState -> starting mein store kaisa dikhega
// const initialState = {
//     user: {
//         name: "",
//         email: "",
//         // avatar: "",
//         // username: "",
//         // password: "",
//         // refreshToken: ""
//     },
//     userLoggedIn: false
// }

// // Reducer - Functionality
// // Slice -> bigger version of reducer
// // export const userSlice = createSlice({
// //     name: 'user',
// //     initialState,
// //     reducers: {
// // setUser: (state, action) => {
// //     // state.user.name = action.payload.name;
// //     // state.user.email = action.payload.email;
// //     console.log(action.payload)
// //     // state.user = action.payload

// //     const { name, email } = action.payload;
// //     state.user = { name, email }
// // },
// // setLoginStatus: (state) => {
// //     state.userLoggedIn = !state.userLoggedIn;
// // }
// // }
// // })
// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         setUser: (state, action) => {
//             // const { name, email } = action.payload;
//             // console.log(action.payload.name);
//             // return {
//             //     ...state,
//             //     user: { name, email }
//             // };
//             // state.user.name = action.payload
//             // state.user.email = email

//             console.log("Reached setUser " + action.payload.assigned);
//             // return {
//             //     ...state,
//             //     user: action.payload
//             // };
//             state.user.name = action.payload.name;
//             state.user.email = action.payload.email;
//             console.log(state.user);
//         },
//         setLoginStatus: (state, action) => {
//             // console.log("Reached");
//             // state.userLoggedIn = !state.userLoggedIn;
//             console.log(state.user);
//             console.log("Reached loginstatus: ");
//             // const prevState = state.userLoggedIn
//             // return {
//             //     ...state,
//             //     userLoggedIn: !prevState
//             // };

//             state.userLoggedIn = action.payload
//         }
//     }
// });

// export const { setUser, setLoginStatus} = userSlice.actions

// // Selector -> How we get the data from our global state
// // export const selectTodos = (state) => state.todo.todos;

// export default userSlice.reducer;

//         setUserLoggedIn: (state) => {
//             state.userLoggedIn = !state.userLoggedIn
//         },
//         register: async (state, action) => {
//             // try {
//                 console.log(action.payload);
//                 // state.user = action.payload

//                 const response = await axios.post('api/user/register', action.payload )
//                 if (!response.data) {
//                     console.log("HELLO");
//                     console.log(response.message)
//                 }
//                 else {
//                     state.user = response.data
//                     state.userRegistered = true
//                 }
//             // } catch (error) {
//             //     console.log(error);
//             // }
//         },
//         login: async (state, action) => {
//             try {
//                 const response = await axios.post('user/login', { ...action.payload })
//                 if (!response.data) {
//                     throw response.message
//                 }
//                 state.user = response.data
//                 state.userLoggedIn = true
//             } catch (error) {
//                 console.log("Login unsuccessful", error);
//             }
//         },
//         logout: async (state) => {
//             try {
//                 localStorage.removeItem('token');
//                 state.user = {name:"", email:"", password:"", refreshToken:""}
//                 state.userLoggedIn = false
//             } catch (error) {
//                 console.log("Logout error: ", error);
//             }
//         }



// state.user.name = action.payload.name;
// state.user.avatar = action.payload.avatar;
// state.user.email = action.payload.email;
// // state.user.username = action.payload.username;
// state.userLoggedIn = true

// addTodo: (state, action) => {
//     const task = {
//         id: nanoid(),
//         text: action.payload,
//         completed: false
//     }
//     state.todos.push(task); // Add new item to array
// },
// removeTodo: (state, action) => {
//     // console.log(action.payload.id)
//     // Since only id is being passed as argument, payload.id will not work
//     state.todos = state.todos.filter((item) => item.id !== action.payload)
// },
// updateTodo: (state, action) => {
//     console.log(action.payload.id + " " + action.payload.text)
//     state.todos.map((item) => {
//         // if (item.id === action.payload.id){
//         item.id === action.payload.id ?
//             item.text = action.payload.text : null
//         // }
//         // console.log(item.text);
//     })
// },
// updateStatus: (state, action) => {
//     state.todos.map((item) => {
//         // if (item.id === action.payload.id){
//         item.id === action.payload ?
//             item.completed = !item.completed : null
//         // }
//         // console.log(item.text);
//     })
// }