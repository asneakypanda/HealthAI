import React, { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { Button } from "./Button"; // import your custom Button component
import DropDownPicker from 'react-native-dropdown-picker';
import { getAiResponse } from './openAiService';
import { navigate } from "/Users/ethantarrer/HealthAI/app/navigators/navigationUtilities";

export const QuizComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [dietRestrictions, setDietRestrictions] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [fitnessGoals, setFitnessGoals] = useState("");
  const [workoutTime, setWorkoutTime] = useState("");
  const [height, setHeight] = useState("");
  const [workoutStyle, setWorkoutStyle] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [weightAccess, setWeightAccess] = useState([
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ]); 

  const handleOnSubmit = async () => {
    const prompt = `
        Age: ${age},
        Weight: ${weight},
        Height: ${height},
        Target Weight: ${targetWeight},
        Dietary Restrictions: ${dietRestrictions},
        Fitness Goals: ${fitnessGoals},
        Workout Time: ${workoutTime},
        Workout Style: ${workoutStyle},
        Access to free weights: ${value}
        Please generate a personalized diet and workout plan based on the above information and ensure
        the headers "Diet Plan:" and "Exercise Plan:" are included in the response. Format the exercise
        plan as a list of exercises with the number of sets and reps for each exercise Sunday to Saturday.
        Format the diet plan as a list of meals for each day of the week as well Sunday to Saturday.
    `;
    const response = await getAiResponse(prompt);
    const [dietPlan, exercisePlan] = parseResponse(response || "");
    navigate('DemoCommunity', { dietPlan });
    navigate('DemoPodcastList', { exercisePlan });
};

const parseResponse = (response: string): [string, string] => {
    // Define the markers for each plan
    const dietPlanMarker = "Diet Plan:";
    const exercisePlanMarker = "Exercise Plan:";

    // Find the positions of each plan in the response
    const dietPlanStart = response.indexOf(dietPlanMarker);
    const exercisePlanStart = response.indexOf(exercisePlanMarker);

    // Extract each plan based on the positions found
    const dietPlan = dietPlanStart !== -1 && exercisePlanStart !== -1 
                     ? response.slice(dietPlanStart + dietPlanMarker.length, exercisePlanStart)
                     : "No diet plan provided.";
    const exercisePlan = exercisePlanStart !== -1 
                         ? response.slice(exercisePlanStart + exercisePlanMarker.length)
                         : "No exercise plan provided.";

    return [dietPlan.trim(), exercisePlan.trim()];
};


  return (
    <View>
      <Button text="Take Quiz Now!" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.modalText}>Please answer the following questions:</Text>
            <Text>What is your age?</Text>
            <TextInput
              style={styles.input}
              onChangeText={setAge}
              value={age}
              keyboardType="numeric"
            />
            <Text>What is your weight? (in lbs)</Text>
            <TextInput
              style={styles.input}
              onChangeText={setWeight}
              value={weight}
              keyboardType="numeric"
            />
            <Text>What is your height?</Text>
            <TextInput
              style={styles.input}
              onChangeText={setHeight}
              value={height}
              keyboardType="numbers-and-punctuation"
            />
            <Text>What is your target weight?</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTargetWeight}
              value={targetWeight}
              keyboardType="numeric"
            />
            <Text>What are your dietary restrictions?</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDietRestrictions}
              value={dietRestrictions}
              keyboardType="default"
            />
            <Text>What are your fitness goals?</Text>
            <TextInput
              style={styles.input}
              onChangeText={setFitnessGoals}
              value={fitnessGoals}
              keyboardType="default"
            />
            <Text>If you have a set amount of minutes in a day to workout please type that number below. If it depends on the day leave it blank.</Text>
            <TextInput
              style={styles.input}
              onChangeText={setWorkoutTime}
              value={workoutTime}
              keyboardType="numeric"
            />
            <Text>What form of exercise do you prefer? Calisthenics? Weightlifting? Both? Something else?</Text>
            <TextInput
              style={styles.input}
              onChangeText={setWorkoutStyle}
              value={workoutStyle}
              keyboardType="default"
            />
            <Text>Do you have access to free weights?</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={weightAccess}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setWeightAccess}
            />
            <Button
              text="Submit"
              onPress={() => {
                console.log(`Age: ${age}, Weight: ${weight}, Height: ${height}, 
                Target Weight: ${targetWeight}, Dietary Restrictions: ${dietRestrictions}, 
                Fitness Goals: ${fitnessGoals}, Workout Time: ${workoutTime}, 
                Workout Style: ${workoutStyle}, Free Weight Access: ${value}`);
                setModalVisible(!modalVisible);
                handleOnSubmit();
              }}
            />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: '90%', // Adjust width to fit within screen bounds
    maxHeight: '80%', // Limit the height of the modal
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden' // Ensures the shadow and borderRadius are respected
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#000',
  },
});