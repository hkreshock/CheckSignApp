import React, { Component } from 'react';
import { Dimensions, Linking, View, Text } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

class ContactHelpSplash extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    const { toggleSplash } = this.props;
    const callFV = () => {
        Linking.openURL(`tel:${8883071178}`);
    }
    return (
      <View>
        <Appbar.Header style={{ backgroundColor: 'transparent' }}>
          <Appbar.BackAction iconColor='white' onPress={toggleSplash} />
        </Appbar.Header>
        <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', marginTop: 60, marginBottom: 30, fontSize: '22pt', textAlign: 'center' }}>
            The <Text style={{ fontWeight: 'bold' }}>Order ID</Text> and <Text style={{ fontWeight: 'bold' }}>MC</Text> you entered did not match any active loads
          </Text>
          <Button icon='alert-circle' textColor='#FAC832' labelStyle={{ fontSize: 50, marginLeft: 1 }} />
          <Text style={{ color: 'rgba(255,255,255,0.8)', marginTop: 30, marginBottom: 30, fontSize: '16pt' }}>
            Contact one of our agents for help
          </Text>
          <Button
            mode='contained'
            onPress={callFV}
            style={{ width: windowWidth * .35, backgroundColor: '#FAC832', borderRadius: 25 }}
            icon='phone'
            textColor='#121212'
          >Contact FV</Button>
        </View>
      </View>
    );
  }
}

export default ContactHelpSplash;
