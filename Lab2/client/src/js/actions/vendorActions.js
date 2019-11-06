import actionTypes from "../constants/index";
import axios from "axios";

const getRestaurant = payload => {
    return dispatch => {
        return axios.get(`http://ec2-3-82-232-60.compute-1.amazonaws.com:3001/restaurant/${payload.restaurant_id}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.SET_RESTAURANT,
                        payload: response.data
                    })
                }
            })
    }
}

const getMenu = payload => {
    return dispatch => {
        return axios.get(`http://ec2-3-82-232-60.compute-1.amazonaws.com:3001/restaurant/menu/${payload.restaurant_id}`).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_MENU,
                    payload: {
                        menu: response.data
                    }
                })
            }
        })
    }
}

const getRestaurantOrders = payload => {
    return dispatch => {
        return axios.get(`http://ec2-3-82-232-60.compute-1.amazonaws.com:3001/order/restaurant/${payload._id}`).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_ORDERS,
                    payload: response.data
                })
            }
        })
    }
}

const changeStatus = payload => {
    return dispatch => {
        return axios.put(`http://ec2-3-82-232-60.compute-1.amazonaws.com:3001/order/update/${payload._id}`, {
            status: payload.status
        }).then(response => {
            if (response === 200) {
                dispatch({
                    type: actionTypes.SET_ORDERS,
                    payload: response.data
                })
            }
        })
    }
}

const getOrderDetails = payload => {
    return dispatch => {
        return axios
            .get(`http://ec2-3-82-232-60.compute-1.amazonaws.com:3001/order/${payload.order_id}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.SET_ORDER_DETAILS,
                        payload: response.data
                    });
                }
            });
    };
}

const getBuyerOrders = payload => {
    return dispatch => {
        return axios
            .get(`http://ec2-3-82-232-60.compute-1.amazonaws.com:3001/order/buyer/${payload._id}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.SET_ORDERS,
                        payload: response.data
                    });
                }
            });
    };
};

const editSection = payload => {
    return dispatch => {
        return axios.put("http://ec2-3-82-232-60.compute-1.amazonaws.com:3001/restaurant/menu/section", payload).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_MENU,
                    payload: {
                        menu: response.data
                    }
                })
            }
        })
    }
}

const deleteSection = payload => {
    return dispatch => {
        return axios
            .put("http://ec2-3-82-232-60.compute-1.amazonaws.com:3001/restaurant/menu/section/delete", payload)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.SET_MENU,
                        payload: {
                            menu: response.data
                        }
                    });
                }
            });
    };
};

const uploadRestaurantImage = payload => {
    return dispatch => {
        return axios
            .post(`http://ec2-3-82-232-60.compute-1.amazonaws.com:3001/upload/image`, payload)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.SET_RESTAURANT_PIC,
                        payload: response.data
                    });
                }
            });
    };
};

export {
    getRestaurant,
    getMenu,
    getRestaurantOrders,
    changeStatus,
    getOrderDetails,
    getBuyerOrders,
    editSection,
    deleteSection,
    uploadRestaurantImage
};