import React, { Component } from 'react';
import { Dimensions, Linking, Text, View, TouchableOpacity } from 'react-native';
import { Paragraph, Dialog, Portal, Provider, Button, Divider } from 'react-native-paper';
import Checklist from './inspectionComponents/checklist';
import Camera from './inspectionComponents/camera';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

class TrailerInspection extends Component {
  constructor(props){
    super(props);
    this.state = {
      taskList: [],
      currentTaskIdx: 0,
      currentTask: null,
      completedDialog: false
    }
  }
  componentDidMount() {
    const { orderEvent } = this.props;
    let list = [];
    switch (orderEvent.stopEvent.trim()) {
      case 'DRL' || 'HPL':
        list = [
          {
            title: 'Damages Checklist',
            damages: false,
            completed: false,
            taskType: 'checkbox',
            otherActions: []
          },
          {
            title: 'Roadside Upload',
            damages: false,
            completed: false,
            taskType: 'camera',
            otherActions: [
              {
                actionType: 'reportDamages',
                actionValue: null
              }
            ]
          },
          {
            title: 'Curbside Upload',
            damages: false,
            completed: false,
            taskType: 'camera',
            otherActions: [
              {
                actionType: 'reportDamages',
                actionValue: null
              }
            ]
          },
          {
            title: 'Nose Upload',
            damages: false,
            completed: false,
            taskType: 'camera',
            otherActions: [
              {
                actionType: 'reportDamages',
                actionValue: null
              }
            ]
          },
          {
            title: 'Rear Upload',
            damages: false,
            completed: false,
            taskType: 'camera',
            otherActions: [
              {
                actionType: 'reportDamages',
                actionValue: null
              }
            ]
          }
        ];
        break;
      case 'HMT' || 'DMT':
        list = [
          {
            title: 'Damages Checklist',
            damages: false,
            completed: false,
            taskType: 'checkbox',
            otherActions: []
          },
          {
            title: 'Roadside Upload',
            damages: false,
            completed: false,
            taskType: 'camera',
            otherActions: [
              {
                actionType: 'reportDamages',
                actionValue: null
              }
            ]
          },
          {
            title: 'Curbside Upload',
            damages: false,
            completed: false,
            taskType: 'camera',
            otherActions: [
              {
                actionType: 'reportDamages',
                actionValue: null
              }
            ]
          },
          {
            title: 'Nose Upload',
            damages: false,
            completed: false,
            taskType: 'camera',
            otherActions: [
              {
                actionType: 'reportDamages',
                actionValue: null
              }
            ]
          },
          {
            title: 'Rear Upload',
            damages: false,
            completed: false,
            taskType: 'camera',
            otherActions: [
              {
                actionType: 'reportDamages',
                actionValue: null
              }
            ]
          },
          {
            title: 'Inside Upload',
            damages: false,
            completed: false,
            taskType: 'camera',
            otherActions: [
              {
                actionType: 'reportDamages',
                actionValue: null
              }
            ]
          },
          {
            title: 'Roadside Door Upload',
            damages: false,
            completed: false,
            taskType: 'camera',
            otherActions: [
              {
                actionType: 'reportDamages',
                actionValue: null
              }
            ]
          },
          {
            title: 'Curbside Door Upload',
            damages: false,
            completed: false,
            taskType: 'camera',
            otherActions: [
              {
                actionType: 'reportDamages',
                actionValue: null
              }
            ]
          }
        ];
        break;
      case 'LUL':
        list = [];
        break;
    }
    this.setState({ taskList: list });
  }
  render() {
    const { orderEvent } = this.props;
    const callFV = () => {
      Linking.openURL(`tel:${8883071178}`);
    }
    const setTask = (task, index) => {
      this.setState({ currentTask: { ...task, taskIndex: index } });
    }
    const clearTask = () => {
      this.setState({ currentTask: null });
    }
    const completeTask = () => {
      const updatedList = this.state.taskList.map((task, taskIdx) => {
        if (this.state.currentTaskIdx === taskIdx) {
          task.completed = true;
        }
        return task;
      })
      this.setState({ currentTask: null, taskList: updatedList, currentTaskIdx: this.state.currentTaskIdx + 1 });
    }
    const toggleCompletedDialog = () => {
      this.setState({ completedDialog: !this.state.completedDialog })
    }
    return (
      <View>
        {
          this.state.currentTask?.taskType === 'checkbox' ?
          <Checklist clearTask={clearTask} completeTask={completeTask} /> :
          this.state.currentTask?.taskType === 'camera' ?
          <Camera clearTask={clearTask} completeTask={completeTask} currentTask={this.state.currentTask} /> :
          <View style={{ padding: 10 }}>
            <View>
              <Text style={{ fontSize: '25pt', paddingLeft: 10, paddingRight: 10, marginBottom: 15, color: 'white' }}>Event Details</Text>
              <Text style={{ color: 'rgba(255,255,255,0.75)', paddingLeft: 10, paddingRight: 10, marginBottom: 5 }}>Order ID: <Text style={{ color: 'white', fontWeight: 'bold' }}>{orderEvent.orderID}</Text></Text>
              <Text style={{ color: 'rgba(255,255,255,0.75)', paddingLeft: 10, paddingRight: 10, marginBottom: 5 }}>MC Number: <Text style={{ color: 'white', fontWeight: 'bold' }}>{orderEvent.mcNumber}</Text></Text>
              <Text style={{ color: 'rgba(255,255,255,0.75)', paddingLeft: 10, paddingRight: 10, marginBottom: 5 }}>
                Event Address: <Text style={{ color: 'white', fontWeight: 'bold' }}>{`${orderEvent.stopAddress}, ${orderEvent.stopCity} ${orderEvent.stopST}`}</Text>
              </Text>
            </View>
            <Divider style={{ marginVertical: 10 }} color='rgba(255,255,255,0.5)' />
            <View style={{ color: 'white' }}>
              <Text style={{ fontSize: '25pt', paddingLeft: 10, paddingRight: 10, marginBottom: 25, color: 'white' }}>Inspection Tasks</Text>
              {
                this.state.taskList.length > 0 ?
                this.state.taskList.map((task, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (task.completed) {
                          toggleCompletedDialog();
                        } else if (this.state.currentTaskIdx >= index) {
                          setTask(task, index);
                        }
                      }}
                      key={`task${index}`}
                    >
                      <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 5,
                        paddingBottom: 5,
                        marginVertical: 5,
                        backgroundColor: this.state.currentTaskIdx < index ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)',
                        borderRadius: 3,
                        height: 35
                      }}>
                        <Text style={{ width: 160, paddingTop: 3, color: this.state.currentTaskIdx < index ? 'rgba(255,255,255,0.75)' : 'white' }}>
                          {task.title}
                        </Text>
                        <View style={{ flexGrow: 3 }} />
                        <View style={{ width: 25 }}>
                          {
                            task.taskType === 'checkbox' ?
                            <Button
                              icon='checkbox-marked'
                              textColor={this.state.currentTaskIdx < index ? 'rgba(250,200,50,0.4)' : !task.completed ? '#fac832' : 'green'}
                              labelStyle={{ fontSize: 25 }}
                            />
                            : task.taskType === 'camera' ?
                            <Button
                              icon='camera'
                              textColor={this.state.currentTaskIdx < index ? 'rgba(250,200,50,0.4)' : !task.completed ? '#fac832' : 'green'}
                              labelStyle={{ fontSize: 25 }}
                            />
                            : null
                          }
                        </View>
                        <View style={{ width: 25 }}>
                          {
                            task.otherActions.map((action, actionIdx) => {
                              return (
                                action.actionType === 'reportDamages' && task.damages ?
                                <Button
                                  key={`actionIcon${index}.${actionIdx}`}
                                  icon='error'
                                  textColor={!task.completed ? 'rgba(250,200,50,0.4)' : 'green'}
                                  labelStyle={{ fontSize: 25 }}
                                />
                                : null
                              )
                            })
                          }
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                })
                :
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '16pt', marginTop: 25 }}>
                    NO TASKS FOR THIS EVENT
                  </Text>
                  <Text style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '10pt', marginTop: 5 }}>
                    If you believe this is a mistake, please contact FreightVana for help
                  </Text>
                  <Button
                    style={{ backgroundColor: 'transparent', marginTop: 20, width: windowWidth*0.6, marginHorizontal: 'auto' }}
                    contentStyle={{ backgroundColor: '#FAC832', borderRadius: 25 }}
                    labelStyle={{ color: '#121212' }}
                    mode='contained'
                    icon='phone'
                    onPress={callFV}
                  >Contact FV</Button>
                </View>
              }
            </View>
          </View>
        }
        <Provider>
          <Portal>
            <Dialog visible={this.state.completedDialog} onDismiss={toggleCompletedDialog}>
              <Dialog.Title>Completed Task</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  You have already completed this task, if you believe there is a mistake, please call a FreightVana agent for help.
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button textColor='blue' onPress={toggleCompletedDialog}>Close</Button>
                <Button style={{ marginLeft: 10 }} textColor='blue' onPress={() => {
                  callFV();
                  toggleCompletedDialog();
                }}>Call FreightVana</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Provider>
      </View>
    );
  }
}

export default TrailerInspection;
