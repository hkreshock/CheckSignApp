import React, { Component } from 'react';
import { Platform, View, Dimensions, ActivityIndicator, Linking, Alert, Image, Button, ScrollView } from 'react-native';
import { List, Avatar, Appbar, Text } from 'react-native-paper';
import localStorageFuntions from '../../../local_modules/localStorage';
import privacyJSON from './privacyPolicy.json';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

// Main Component

class MoreScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
        moreOptions: [
            {
                title: 'Call',
                subtitle: 'Reach an agent at +1 (888) 307-1178',
                icon: 'phone',
                event: 'callFV',
            },
            {
                title: 'Message',
                subtitle: 'Prefer texting? No problem',
                icon: 'message',
                event: 'messageFV',
            },
            {
                title: 'Privacy Policy',
                icon: 'newspaper-variant-outline',
                event: 'openPrivacyPolicy',
            },
            {
                title: 'Log Out',
                icon: 'logout',
                event: 'logout',
            },
        ],
        greeting: 'Howdy',
        greetings: ['Howdy', 'Greetings', `'Ello`, 'Salutations', 'Ahoy', 'Aloha', 'Hello'],
        privacyPolicy: false
    }
  }
  render() {
    const { userLoggedIn, toggleLogin, setPhone, setVerificationId } = this.props;
    const { firstName } = userLoggedIn.data.userData;

    const handleEvents = (event) => {
        switch(event) {
            case 'callFV':
              Linking.openURL(`tel:${8883071178}`)
              break;
            case 'messageFV':
                Linking.openURL(`sms:${8883071178}`)
                break;
            case 'openPrivacyPolicy':
              togglePrivacyPolicy();
              break;
            case 'logout':
              logoutConfirmation();
              break;
            default:
              break;
          }
    }
    const togglePrivacyPolicy = () => {
      this.setState({ privacyPolicy: !this.state.privacyPolicy });
    }
    const logout = () => {
      localStorageFuntions.removeToken();
      toggleLogin(null);
      setPhone(null);
      setVerificationId(null);
    }
    const logoutConfirmation = () => {
      if (Platform.OS === 'web') {
        const result = window.confirm(['Logout', 'Are you sure you want to logout?'].filter(Boolean).join('\n'))
        if (result) logout();
      } else {
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: () => logout() }
          ]
        );
      }
    }
    return (
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {
          this.state.privacyPolicy ?
          <>
          <Appbar.Header style={{ backgroundColor: '#121212' }}>
            <Appbar.BackAction iconColor='white' onPress={togglePrivacyPolicy} />
            <Appbar.Content titleStyle={{ color: 'white', fontWeight: 'bold', marginRight: 45, textAlign: 'center' }} title='Privacy Policy' />
          </Appbar.Header>
          <ScrollView style={{ height: '50%', overflow: 'scroll' }}>
            <View style={{ padding: 15 }}>
            { privacyJSON.sections.map((sec, secIdx) => (
              <View key={`section${secIdx}`}>
                <Text style={{ color: 'white', fontSize: '28pt', paddingVertical: 10 }}>{sec.title}</Text>
                { sec.contentChunks.map((chunk, chunkIdx) => (
                  <View key={`chunk${chunkIdx}`}>     
                    <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: '22pt', paddingVertical: 5 }}>{chunk.title}</Text>
                    { chunk.descriptionParagraphs.map((descPar, descParIdx) => (
                      <View key={`descPar${descParIdx}`}>
                        <Text style={{ color: 'rgba(255,255,255,0.5)', paddingVertical: 2 }}>{descPar.paragraph}</Text>
                        { 
                          descPar.list.map((listItem, liIdx) => (
                            <Text style={{ color: 'rgba(255,255,255,0.5)', paddingVertical: 2 }} key={`listItem${liIdx}`}>{listItem}</Text>
                          ))
                        }
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            ))}
            </View>
          </ScrollView>
          </>
          :
          <>
            <Image
                source={require('../../../assets/triangles.png')}
                style={{ width: windowWidth, height: '45%' }}
                PlaceholderContent={<ActivityIndicator />}
            />
            <View style={{ height: windowHeight * .2, position: 'absolute' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 70, marginLeft: 25, fontSize: '28pt' }}>{this.state.greeting} {firstName}</Text>
            </View>
            <View>
                <View style={{ height: windowHeight * .08 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 25, fontSize: '18pt' }}>More...</Text>
                </View>
            </View>
            {
              this.state.moreOptions.map((option, oIdx) => (
                <List.Item
                  key={`moreOption${oIdx}`}
                  onPress={() => handleEvents(option.event)}
                  title={option.title}
                  titleStyle={{ color: 'white' }}
                  description={option.subtitle}
                  descriptionStyle={{ color: 'rgba(255,255,255,.55)' }}
                  style={{ paddingHorizontal: 25 }}
                  left={props => <Avatar.Icon style={{ backgroundColor: 'transparent', marginTop: 2 }} size={30} icon={option.icon} />}
                />
              ))
            }
          </>
        }
      </View>
    );
  }
}

export default MoreScreen;
