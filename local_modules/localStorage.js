import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = (user) => {
  try {
    if (window?.localStorage) {
      window.localStorage.setItem('userData', JSON.stringify(user));
    } else {
      AsyncStorage.setItem('userData', JSON.stringify(user));
    }
  } catch (error) {
    console.log('Something went wrong', error);
  }
}

const removeToken = () => {
  try {
    if (window?.localStorage) {
      window.localStorage.removeItem('userData');
    } else {
      AsyncStorage.removeItem('userData');
    }
  } catch (error) {
    console.log('Something went wrong', error);
  }
}

const getToken = async () => {
  try {
    let userData;
    if (window?.localStorage) {
      userData = window.localStorage.getItem('userData');
    } else {
      userData = await AsyncStorage.getItem('userData').then(data => {
        return data;
      });
    }
    if (userData) {
      let data = JSON.parse(userData);
      return data;
    }
  } catch (error) {
    console.log('Something went wrong', error);
  }
}

const setActiveOrder = (orderDetails) => {
  try {
    if (window?.localStorage) {
      window.localStorage.setItem('activeOrder', JSON.stringify(orderDetails));
    } else {
      AsyncStorage.setItem('activeOrder', JSON.stringify(orderDetails));
    }
  } catch (error) {
    console.log('Something went wrong', error);
  }
}

const removeActiveOrder = () => {
  try {
    if (window?.localStorage) {
      window.localStorage.removeItem('activeOrder');
    } else {
      AsyncStorage.removeItem('activeOrder');
    }
  } catch (error) {
    console.log('Something went wrong', error);
  }
}

const getActiveOrder = async () => {
  try {
    let orderDetails;
    if (window?.localStorage) {
      orderDetails = window.localStorage.getItem('activeOrder');
    } else {
      orderDetails = await AsyncStorage.getItem('activeOrder').then(data => {
        return data;
      });
    }
    if (orderDetails) {
      let data = JSON.parse(orderDetails);
      return data;
    }
  } catch (error) {
    console.log('Something went wrong', error);
  }
}

export default {
    storeToken,
    removeToken,
    getToken,
    setActiveOrder,
    removeActiveOrder,
    getActiveOrder
}