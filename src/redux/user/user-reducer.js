import { UserActionTypes } from './user-types';

const INITITIAL_STATE = {
   currentUser: null
}

const userReducer = (state = INITITIAL_STATE, action) => {
   switch (action.type) {
      case UserActionTypes.SET_CURRENT_USER:
         return {
            ...state,
            currentUser: action.payload
         }
      case UserActionTypes.CLEAR_CURRENT_USER:
         return {
            ...INITITIAL_STATE
         }
      default:
         return state;
   }
};

export default userReducer;
