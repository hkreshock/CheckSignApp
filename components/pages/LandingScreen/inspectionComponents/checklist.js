import React, { Component } from 'react';
// import { Camera, CameraType } from 'expo-camera';
import { Dimensions, View, TouchableOpacity } from 'react-native';
// import { Icon, Button } from 'react-native-elements';
import { Checkbox, TextInput, IconButton  } from 'react-native-paper';

// Main Component

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

class Checklist extends Component {
  constructor(props){
    super(props);
    this.state = {
        currentChecklistTask: 0,
        hasPermission: null,
        type: CameraType.back,
        cameraActive: false,
        defect: false,
        defectDocument: null,
        checklistTasks: [
            {
                registrationCertificate: {
                    yes: false,
                    no: false
                }
            },
            {
                lights: {
                    good: false,
                    defect: false
                },
            },
            {
                bulkHead: {
                    good: false,
                    defect: false
                },
            },
            {
                suspension: {
                    good: false,
                    defect: false
                },
            },
            {
                connectingDevices: {
                    good: false,
                    defect: false
                },
            },
            {
                landingGear: {
                    good: false,
                    defect: false
                },
            },
            {
                brakeSystems: {
                    good: false,
                    defect: false
                },
            },
            {
                mudflaps: {
                    good: false,
                    defect: false
                },
            },
            {
                wheels: {
                    good: false,
                    defect: false
                },
            },
            {
                brakeAdjustment: {
                    good: false,
                    defect: false,
                    furtherDetails: {
                        leftFrontAdjustment: {
                            good: false,
                            defect: false,
                            description: null
                        },
                        leftRearAdjustment: {
                            good: false,
                            defect: false,
                            description: null
                        },
                        rightFrontAdjustment: {
                            good: false,
                            defect: false,
                            description: null
                        },
                        rightRearAdjustment: {
                            good: false,
                            defect: false,
                            description: null
                        },
                    }
                },
            },
            {
                tires: {
                    good: false,
                    defect: false,
                    furtherDetails: {
                        leftFrontOuter: {
                            good: false,
                            defect: false,
                            description: null
                        },
                        leftFrontInner: {
                            good: false,
                            defect: false,
                            description: null
                        },
                        leftRearOuter: {
                            good: false,
                            defect: false,
                            description: null
                        },
                        leftRearInner: {
                            good: false,
                            defect: false,
                            description: null
                        },
                        rightFrontOuter: {
                            good: false,
                            defect: false,
                            description: null
                        },
                        rightFrontInner: {
                            good: false,
                            defect: false,
                            description: null
                        },
                        rightRearOuter: {
                            good: false,
                            defect: false,
                            description: null
                        },
                        rightRearInner: {
                            good: false,
                            defect: false,
                            description: null
                        },
                    }
                }
            }
        ]
    }
  }
  // On mount check for permission to get access to the user's camera  
  componentDidMount() {
    // Define the async permission function to be called within the component did mount
    const permissionFunction = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      // If access is granted update the state 
      this.setState({ hasPermission: status === 'granted' });
    }
    permissionFunction();
  }
  render() {
    const { clearTask, completeTask } = this.props;
    const formatString = (string) => {
        return string.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
    }
    const setChecked = (key, objectKey) => {
        // toggle checkbox that was interacted with
        const activeTask = this.state.checklistTasks[this.state.currentChecklistTask];
        activeTask[objectKey][key] = !activeTask[objectKey][key];

        let defect = false;
        if (key === 'defect' && activeTask[objectKey][key]) {
            defect = true;
        }

        // if this causes both checkboxes to be true, toggle the static box to false
        const keys = Object.entries(activeTask[objectKey]);
        if (keys[0][1] && keys[1][1]) {
            keys.forEach(k => {
                if (k[0] !== key && k[0] !== 'furtherDetails') {
                    activeTask[objectKey][k[0]] = !activeTask[objectKey][k[0]];
                }
            })
        }

        // set new object in state array
        const updatedList = this.state.checklistTasks.map((task, taskIdx) => {
            if (taskIdx === this.state.currentChecklistTask) {
                task = activeTask;
            }
            return task;
        });
        this.setState({ checklistTasks: updatedList, defect });
    }
    const completeActiveTask = () => {
        if (this.state.checklistTasks.length > this.state.currentChecklistTask + 1) {
            this.setState({ currentChecklistTask: this.state.currentChecklistTask + 1, defect: false, defectDocument: null })
        } else {
            completeTask();
        }
    }
    const setDamageDesciption = () => {
        const updatedList = this.state.checklistTasks.map((task, taskIdx) => {
            if (taskIdx === this.state.currentChecklistTask) {
                task.description;
            }
            return task;
        });
        this.setState({ checklistTasks: updatedList });
    }
    const openCamera = () => {
        this.setState({ cameraActive: true });
    }
    const snap = async () => {
      if (this.camera) {
        // this.camera is a reference to the Camera frontend component, which has built in functions like "takePictureAsync()"
        let photo = await this.camera.takePictureAsync();
        this.setState({ defectDocument: photo.uri, cameraActive: false });
      }
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
            this.state.cameraActive ?
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ height: windowHeight*0.75, width: windowWidth*0.9, marginTop: windowHeight*0.05 }}>
                  {
                    // The camera component can only be used in one place at one time on the app,
                    // so try to conditionally render the camera only when it's in use
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
                  }
                </div>
            </div>
            :
            <div style={{ padding: '25px 10px' }}>
                { 
                    JSON.stringify(Object.values(this.state.checklistTasks[this.state.currentChecklistTask])[0]).includes('defect') ?
                    <div style={{ fontSize: '17pt', padding: '10px', marginTop: windowHeight*0.1, color: 'white', textAlign: 'center' }}>
                        What is the current status on the { formatString(Object.keys(this.state.checklistTasks[this.state.currentChecklistTask])[0]) }?
                    </div>
                    :
                    <div style={{ fontSize: '17pt', padding: '10px', marginTop: windowHeight*0.1, color: 'white', textAlign: 'center' }}>
                        Do you have a { formatString(Object.keys(this.state.checklistTasks[this.state.currentChecklistTask])[0]) }?
                    </div>
                }
                {
                    Object.entries(Object.values(this.state.checklistTasks[this.state.currentChecklistTask])[0]).map(val => {
                        return (
                            <div key={val[0]} style={{ display: 'flex', color: 'white', marginTop: '20px', padding: '0 10px' }}>
                                {
                                    val[0] !== 'furtherDetails' ?
                                    <>
                                        <Checkbox
                                          status={val[1] ? 'checked' : 'unchecked'}
                                          color='#fac832'
                                          onPress={() => {
                                            setChecked(val[0], Object.keys(this.state.checklistTasks[this.state.currentChecklistTask])[0]);
                                          }}
                                        />
                                        <span style={{ marginLeft: '10px', marginTop: '10px' }}>
                                            { `${val[0][0].toUpperCase()}${val[0].slice(1, val[0].length)}` }
                                        </span>
                                    </> : null
                                }
                            </div>
                        )
                    })
                }
                <div style={{
                    marginTop: windowHeight*0.05,
                    display: 'flex',
                    background: 'rgba(255,255,255,0.1)',
                    padding: '10px',
                    flexDirection: 'column'
                }}>
                    {
                        this.state.currentChecklistTask !== 0 ?
                        <div>
                            <h4 style={{ color: 'rgba(255,255,255,0.8)', margin: '5px' }}>Defect</h4>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <h5 style={{ color: 'rgba(255,255,255,0.6)', margin: '5px', paddingTop: '10px' }}>Please provide an image of the defect</h5>
                                <IconButton
                                    disabled={!Object.entries(
                                      this.state.checklistTasks[this.state.currentChecklistTask][Object.keys(this.state.checklistTasks[this.state.currentChecklistTask])[0]]
                                    )[1][1]}
                                    containerColor='rgba(250,200,50,0.1)'
                                    icon='camera'
                                    size={20}
                                    iconColor='#fac832'
                                    onPress={openCamera}
                                />
                                <Icon
                                    name='check'
                                    color={this.state.defectDocument ? 'green' : 'rgba(255,255,255,0.25)'}
                                    size={30}
                                    style={{ marginTop: '5px' }}
                                />
                            </div>
                        </div>
                        : null
                    }
                    <TextInput
                      style={{ width: windowWidth*0.8, backgroundColor: 'rgba(255,255,255,0.8)', alignSelf: 'center', marginBottom: '10px' }}
                      mode='outlined'
                      multiline
                      numberOfLines={3}
                      placeholderTextColor='white'
                      disabled={!Object.entries(
                        this.state.checklistTasks[this.state.currentChecklistTask][Object.keys(this.state.checklistTasks[this.state.currentChecklistTask])[0]]
                      )[1][1]}
                      outlineColor='rgba(250,200,50,0.4)'
                      activeOutlineColor='#fac832'
                      label='Reason / Description (optional)'
                      value={this.state.checklistTasks[this.state.currentChecklistTask].description}
                      onChangeText={text => setDamageDesciption(text)}
                    />
                </div>
                <div style={{ marginTop: windowHeight*0.05, display: 'flex', justifyContent: 'center' }}>
                    <Button
                      titleStyle={{ color: '#121212', fontWeight: 'bold' }}
                      containerStyle={{ width: windowWidth*0.8, backgroundColor: '#FAC832', borderRadius: 25 }}
                      disabled={
                        (!Object.entries(
                            this.state.checklistTasks[this.state.currentChecklistTask][Object.keys(this.state.checklistTasks[this.state.currentChecklistTask])[0]]
                        )[0][1] && 
                        !Object.entries(
                            this.state.checklistTasks[this.state.currentChecklistTask][Object.keys(this.state.checklistTasks[this.state.currentChecklistTask])[0]]
                        )[1][1]) || (this.state.defect && !this.state.defectDocument)
                      }
                      type='standard'
                      title={this.state.checklistTasks.length > this.state.currentChecklistTask + 1 ? 'Next Check' : 'Complete Damages Checklist'}
                      onPress={completeActiveTask}
                    />
                </div>
            </div>
        } */}
      </div>
    );
  }
}

export default Checklist;
