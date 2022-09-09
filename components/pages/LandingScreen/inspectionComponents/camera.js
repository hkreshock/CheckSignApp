import React, { Component } from 'react';
import axios from 'axios';
import { Dimensions, View, TouchableOpacity, Image, Text } from 'react-native';
// import { Camera, CameraType } from 'expo-camera';
// import { Icon, Button } from 'react-native-elements';

// Main Component

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

class CameraComponent extends Component {
    // Inside your Component set you constructor / state with type and permissions
    constructor(props){
      super(props);
      this.state = {
        hasPermission: null,
        // CameraType refers to front or back camera, just add ".front" or ".back" to the type
        type: CameraType.back,
        mode: 'camera',
        document: null
      }
    }
    // On mount check for permission to get access to the user's camera  
    // componentDidMount() {
    //   // Define the async permission function to be called within the component did mount
    //   const permissionFunction = async () => {
    //     const { status } = await Camera.requestCameraPermissionsAsync();
    //     // If access is granted update the state 
    //     this.setState({ hasPermission: status === 'granted' });
    //   }
    //   permissionFunction();
    // }
    render() {
        const { clearTask, currentTask, completeTask } = this.props;
        // If permissions aren't checked, return an empty <View />
        if (this.state.hasPermission === null) {
          return <View />;
        }
        // If permissions are denied, return a message saying just that <View />
        if (this.state.hasPermission === false) {
          return <Text>No access to camera</Text>;
        }
        const snap = async () => {
          if (this.camera) {
            // this.camera is a reference to the Camera frontend component, which has built in functions like "takePictureAsync()"
            let photo = await this.camera.takePictureAsync();
            this.setState({ document: photo.uri });
          }
        };
        const completeActiveTask = () => {
            completeTask();
        }
        return (
          <div>
            {/* <View style={{ height: windowHeight * .2, position: 'absolute' }}>
              <View style={{ height: 40, top: 2 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Icon name='chevron-left' color='white' size={25} style={{ marginTop: '10px' }} onPress={clearTask} />
                  <Button
                    onPress={clearTask}
                    titleStyle={{ color: 'white', fontSize: 16 }}
                    title='Back'
                    type='standard'
                  />
                </View>
              </View>
            </View>
            {
                this.state.document ?
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '30px', marginTop: windowHeight*0.075, borderRadius: '5px' }}>
                        <Image
                            style={{ height: windowHeight*0.4, width: windowWidth*0.6 }}
                            source={{ uri: this.state.document }}
                        />
                    </div>
                    <div style={{ marginTop: windowHeight*0.1 }}>
                        <Button
                          titleStyle={{ color: '#121212', fontWeight: 'bold' }}
                          containerStyle={{ width: windowWidth*0.8, backgroundColor: '#FAC832', borderRadius: 25 }}
                          disabled={!this.state.document}
                          type='standard'
                          title={`Submit ${currentTask.title}`}
                          onPress={completeActiveTask}
                        />
                    </div>
                </div>
                :
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ height: windowHeight*0.75, width: windowWidth*0.9, marginTop: windowHeight*0.05 }}>
                      {
                          // The camera component can only be used in one place at one time on the app,
                          // so try to conditionally render the camera only when it's in use
                          this.state.mode === 'camera' ?
                          <View style={{ height: '100%', width: '100%' }}>
                            <Camera
                            // set a ref on the camera so you can activate "camera" based methods
                              ref={ref => { this.camera = ref }}
                              type={this.state.type}
                              on
                            >
                                <div style={{ position: 'absolute', bottom: 10, left: '40%' }}>
                                  <TouchableOpacity
                                    onPress={snap}>
                                    <Icon name="radio-button-checked" size={75} color="rgba(18, 18, 18, 0.7)" />
                                  </TouchableOpacity>
                                </div>
                            </Camera>
                          </View>
                          : null
                      }
                    </div>
                </div>
            } */}
          </div>
        );
    }
}

export default CameraComponent;
