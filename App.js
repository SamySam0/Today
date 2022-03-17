import React, { useState } from 'react';
import { TouchableOpacity, StatusBar, StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Keyboard } from 'react-native';
import Task from './components/Task'

export default function App() {

  StatusBar.setBarStyle('dark-content', true);

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task != null) { setTaskItems([...taskItems, task]) };
    console.log(taskItems);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>

      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.secondTitle}>Today's Tasks</Text>
        <ScrollView style={styles.items} showsVerticalScrollIndicator={false}>
          { /* This is where the tasks will go */ }
          {
            taskItems.map((items, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task key={index} text={items} />
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>

      </View>

      { /* Write a task using keyboard */ }
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding": "height"}
        style={styles.writeTaskWrapper}>

          <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)}/>
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>

      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  secondTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
    maxHeight: 540,
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
    width: 250,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: .3,
    shadowColor: '#DBDBDB',
    shadowOpacity: .5,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: .3,
    shadowColor: '#DBDBDB',
    shadowOpacity: .5,
  },
  addText: {},
});
