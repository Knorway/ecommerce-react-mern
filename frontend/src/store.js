import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productCreateReducer,
	productDeleteReducer,
	productDetailReducer,
	productsListReducer,
	productUpdateReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
} from './reducers/userReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderListMyReducer,
	orderPayReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
	productList: productsListReducer,
	productDetail: productDetailReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderListMy: orderListMyReducer,
});

const localCartStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const localUserStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const ShippingAddressStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

const initialState = {
	cart: {
		cartItems: localCartStorage,
		shippingAddress: ShippingAddressStorage,
	},
	userLogin: { userInfo: localUserStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
