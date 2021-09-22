import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss()
    setTaskItems([...taskItems, task])
    setTask(null)
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)
  };

  return (
    <View style={ styles.container }>
      <ScrollView
        contentContainerStyle={ {flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        {/* Today's tasks */}
        <View style={ styles.tasksWrapper }>
          <Text style={ styles.sectionTitle }>Today's Tasks</Text>
          {/* This is where the tasks will go! */}
          <View style={ styles.items }>
            {
              taskItems.map( (item, index) => {
                return (
                  <TouchableOpacity Key= { index } onPress={ () => completeTask(index) }>
                    <Task text={ item } />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      </ScrollView>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
        style={ styles.writeTaskWrapper }
      >
        <TextInput style={ styles.input } placeholder={'Write a Task!'} value={ task } onChangeText={ (text) => setTask(text) }/>
        <TouchableOpacity onPress={ () => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  }, 
  addWrapper: {
    width: 60,
    height: 60, 
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
