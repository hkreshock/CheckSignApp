import axios from 'axios';
import React, { Component } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import ContactHelpSplash from './contactHelpSplash';
import { Buffer } from 'buffer';
import TrailerInspection from './trailerInspection';
import localStorageFuntions from '../../../local_modules/localStorage';

const windowWidth = Dimensions.get('window').width;

// const MOBILE_API_URL = 'https://api.freightvana.io/app/tracking';
// const MOBILE_API_URL = 'http://localhost:3000';
const MOBILE_API_URL = 'https://12ee-184-184-148-42.ngrok.io';

class OrderInterface extends Component {
  constructor(props){
    super(props);
    this.state = {
      orderID: '',
      mcNumber: '',
      searching: false,
      noResultSplash: false,
      searchResults: null
    }
  }
  grabLocalData = async () => {
    const activeOrder = await localStorageFuntions.getActiveOrder();
    return activeOrder;
  }
  componentDidMount() {
    this.grabLocalData().then((activeOrder) => {
      if (activeOrder?.orderID) {
        this.setState({ searchResults: activeOrder });
      }
    });
  }
  render() {
    const { data } = this.props.userLoggedIn;

    const setOrderID = (val) => {
      this.setState({ orderID: val });
    }
    const setMCNumber = (val) => {
      this.setState({ mcNumber: val });
    }
    const searchForOrder = async () => {
      this.setState({ searching: true });
      
      const token = Buffer.from(`${data.to}:${data.sid}`).toString('base64');
      try {
        const { data } = await axios.get(`${MOBILE_API_URL}/loads/searchOrder?orderNumber=${this.state.orderID}&mcNumber=${this.state.mcNumber}`, { headers: {
          'Authorization': `Basic ${token}`
        }});
        this.setState({ searching: false, searchResults: data });
        localStorageFuntions.setActiveOrder(data);
      } catch (err) {
        toggleSplash();
        this.setState({ searching: false });
      }
    }
    const toggleSplash = () => {
      this.setState({ noResultSplash: !this.state.noResultSplash });
    }
    return (
      <>
        {
          this.state.noResultSplash ?
          <ContactHelpSplash toggleSplash={toggleSplash} />
          :
          this.state.searchResults ?
          <TrailerInspection orderEvent={this.state.searchResults} />
          :
          <>
            <Text style={{ marginBottom: 25, color: 'white', alignSelf: 'center', marginTop: 75, fontWeight: 'bold', fontSize: '25pt' }}>
              Search for an order
            </Text>
            <View style={{
              width: windowWidth*0.8,
              display: 'flex',
              alignItems: 'center',
              marginTop: 40,
              backgroundColor: 'rgba(255,255,255,0.1)',
              alignSelf: 'center',
              padding: 15,
              borderRadius: 10
            }}>
              <TextInput
                label='Order ID'
                value={this.state.orderID}
                onChangeText={value => {setOrderID(value)}}
                placeholder='XXXXX'
                keyboardType='number-pad'
                style={{ width: windowWidth*0.7 }}
                selectionColor='white'
                maxLength={5}
                theme={{
                  colors: {
                    placeholder: 'white', text: 'white', primary: 'white',
                    underlineColor: 'transparent', background: '#003489'
                  }
                }}
              />
              <TextInput
                label='MC Number'
                value={this.state.mcNumber}
                onChangeText={value => {setMCNumber(value)}}
                placeholder='XXXXXXXX'
                keyboardType='number-pad'
                style={{ width: windowWidth*0.7, marginTop: 10 }}
                selectionColor='white'
                maxLength={8}
                theme={{
                  colors: {
                    placeholder: 'white', text: 'white', primary: 'white',
                    underlineColor: 'transparent', background: '#003489'
                  }
                }}
              />
              <Button
                mode='contained'
                onPress={searchForOrder}
                loading={this.state.searching}
                disabled={this.state.orderID.length < 4 || !this.state.mcNumber}
                style={{ width: windowWidth * .35, backgroundColor: '#FAC832', borderRadius: 25, marginTop: 20 }}
                textColor='#121212'
              >SEARCH</Button>
            </View>
          </>
        }
      </>
    );
  }
}

export default OrderInterface;
