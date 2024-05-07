import React, { FC } from "react"
import { RouteProp } from '@react-navigation/native';
import { TextStyle, ViewStyle, ScrollView } from "react-native"
import { Screen, Text } from "../components"
import { spacing } from "../theme"
import PlanItem from "app/components/Plan";


type DemoCommunityParams = {
  DemoCommunity: {
    dietPlan?: string;
  };
};

// Use RouteProp to strongly type the route prop
type DemoCommunityScreenProps = RouteProp<DemoCommunityParams, 'DemoCommunity'>;



export const DemoCommunityScreen: FC<{ route: DemoCommunityScreenProps }> = ({ route }) => {
  // Safely extract dietPlan with default value
  const dietPlan = route.params?.dietPlan || "No diet plan provided.";
  
  const handleUpdateDietPlan = (newPlan: string) => {
    console.log("Updated Diet Plan:", newPlan);
    // Update the plan in your state management or backend here
  };

  const handleDeleteDietPlan = () => {
    console.log("Diet Plan Deleted");
    // Handle the deletion of the diet plan in your state management or backend here
  };

  return (
      <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
        <Text preset="heading" text="Diet Plan:" style={$title} />
        <ScrollView>
        <PlanItem
          plan={dietPlan}
          name="Plan 1"
          onUpdate={handleUpdateDietPlan}
          onDelete={handleDeleteDietPlan}
        />
      </ScrollView>

      </Screen>
    );
  };

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
}



