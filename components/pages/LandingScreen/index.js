import React, { Component } from 'react';
// import axios from 'axios';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
// import { Text, Icon } from 'react-native-elements';
import MoreScreen from '../MoreScreen/index';
import HeaderComponent from '../../header/index';
import { Button } from 'react-native-paper';
import OrderInterface from './orderInterface';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MOBILE_API_URL = 'https://api.freightvana.io/app/tracking';

// Main Component

class LandingScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      navigationPages: [
        {
          title: 'Home',
          icon: 'home',
          type: 'font-awesome'
        },
        {
          title: 'More',
          icon: 'dots-horizontal',
        },
      ],
      currentPage: 'Home',
      tableView: true,
    }
  }
  render() {
    const { userLoggedIn, toggleLogin, setPhone, setVerificationId } = this.props.extraData;
    const toggleCurrentPage = (page) => {
      this.setState({ currentPage: page })
    }
    return (
      <View style={{ backgroundColor: '#202020', height: windowHeight }}>
        <View style={{ height: windowHeight * .875 }}>
            <HeaderComponent />
            {
                this.state.currentPage === 'Home' ?
                <OrderInterface userLoggedIn={userLoggedIn} />
                :
                this.state.currentPage === 'More' ?
                <MoreScreen userLoggedIn={userLoggedIn} toggleLogin={toggleLogin} setPhone={setPhone} setVerificationId={setVerificationId} />
                : null
            }
        </View>
        <View style={{ height: windowHeight * .125, flexDirection: 'row', justifyContent: 'space-around' }}>
          {
            this.state.navigationPages.map(page => {
              return (
                <TouchableOpacity onPress={() => {toggleCurrentPage(page.title)}} key={`pageParent${page.title}`}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Button
                      labelStyle={{ fontSize: 30 }}
                      style={{ marginLeft: 10 }}
                      icon={page.icon}
                      textColor={this.state.currentPage === page.title ? 'white' : 'rgba(255,255,255,.55)'}
                      onPress={() => {toggleCurrentPage(page.title)}}
                    />
                    <Text style={{ color: this.state.currentPage === page.title ? 'white' : 'rgba(255,255,255,.55)', fontSize: 12, marginTop: 5 }}>
                      {page.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    );
  }
}

export default LandingScreen;
