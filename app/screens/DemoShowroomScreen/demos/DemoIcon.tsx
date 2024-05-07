/* eslint-disable react/jsx-key */
import React from "react"
import { QuizComponent } from "app/components/Quiz"
import { Demo } from "../DemoShowroomScreen"






export const DemoIcon: Demo = {
  name: "", // Fixed: Assign a string value to 'name'
  description: "", // Add a description if needed
  data: [
    <QuizComponent />, // Wrap QuizComponent in a JSX element
  ],
}
