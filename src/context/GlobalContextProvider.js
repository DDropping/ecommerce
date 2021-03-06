import React from "react"

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initialState = {
  isCartPreview: false,
  cart: [],
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      }
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item, index) => index !== action.payload),
      }
    case "TOGGLE_CART_PREVIEW":
      return {
        ...state,
        isCartPreview: action.payload,
      }
    default:
      throw new Error("Bad Action Type")
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider
