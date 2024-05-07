import React, { FC } from "react"
import { RouteProp } from '@react-navigation/native';
import { TextStyle, ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import { spacing } from "../theme"
import PlanItem from "app/components/Plan";

type DemoPodcastListParams = {
  DemoPodcastList: {
    exercisePlan?: string;
  };
};

// Use RouteProp to strongly type the route prop
type DemoPodcastListScreenProps = RouteProp<DemoPodcastListParams, 'DemoPodcastList'>;

export const DemoPodcastListScreen: FC<{ route: DemoPodcastListScreenProps }> = ({ route }) => {
    // Safely extract dietPlan with default value
  const exercisePlan = route.params?.exercisePlan || "No exercise plan provided.";
  
  const handleUpdateExercisePlan = (newPlan: string) => {
    console.log("Updated Exercise Plan:", newPlan);
    // Update the plan in your state management or backend here
  };

  const handleDeleteExercisePlan = () => {
    console.log("Exercise Plan Deleted");
    // Handle the deletion of the diet plan in your state management or backend here
  };

    return (
      <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
        <Text preset="heading" text="Exercise Plan:" style={$title} />
        <PlanItem
          plan={exercisePlan}
          name="Plan 1"
          onUpdate={handleUpdateExercisePlan}
          onDelete={handleDeleteExercisePlan}
        />

      </Screen>
    )
  }

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
}





