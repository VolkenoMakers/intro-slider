# intro-slider

![Single select](https://raw.githubusercontent.com/VolkenoMakers/intro-slider/main/demo.gif)

## Add it to your project

- Using NPM
  `npm install @volkenomakers/intro-slider`
- or:
- Using Yarn
  `yarn add @volkenomakers/intro-slider`

## Usage

```javascript
import React from "react";
import { View } from "react-native";
import IntroSlider from "@volkeno/intro-slider";
import { Icon, Text } from "react-native-elements";
import { SafeAreaView } from "react-native";
const data = [
  {
    title: "Le lorem ipsum est, en imprimerie,",
    description:
      "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant ",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Le lorem ipsum est, en imprimerie,",
    description:
      "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant ",
    image: "https://via.placeholder.com/150",
  },
  {
    title: () => (
      <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 20 }}>
        Title with custom component
      </Text>
    ),
    description: () => (
      <Text>
        Le lorem ipsum est, en imprimerie, une suite de mots sans signification
        utilisée à titre provisoire pour calibrer une mise en page Le lorem
        ipsum est, en imprimerie, une suite de mots sans signification utilisée
        à titre provisoire pour calibrer une mise en page Le lorem ipsum est, en
        imprimerie, une suite de mots sans signification utilisée à titre
        provisoire pour calibrer une mise en page Le lorem ipsum est, en
        imprimerie, une suite de mots sans signification utilisée à titre
        provisoire pour calibrer une mise en page Le lorem ipsum est, en
        imprimerie, une suite de mots sans signification utilisée à titre
        provisoire pour calibrer une mise en page
      </Text>
    ),
    image: "https://via.placeholder.com/150",
  },
];
const IntroSliderApp = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <IntroSlider
        data={data}
        onEnd={() => console.log("slider end")}
        titleStyle={{ fontSize: 40, color: "#0969da" }}
        indicatorColor="#0969da"
        descriptionStyle={{ fontSize: 16 }}
        containerStyle={{ backgroundColor: "#EEE", flex: 1 }}
        imageProps={{ resizeMode: "contain" }}
        renderEndButton={() => (
          <View
            style={{
              padding: 15,
              borderRadius: 35,
              overflow: "hidden",
              backgroundColor: "#000",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name="arrow-right"
              type="material-community"
              color={"#FFF"}
              size={20}
            />
          </View>
        )}
        renderNextButton={(activeIndex) => (
          <View
            style={{
              padding: 15,
              borderRadius: 35,
              overflow: "hidden",
              backgroundColor: "#0969da",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name="arrow-right"
              type="material-community"
              color={"#FFF"}
              size={20}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default IntroSliderApp;
```

## Properties

| Property name        | Type       | Description                                                 |
| -------------------- | ---------- | ----------------------------------------------------------- |
| **data**             | _Array_    | array of object with keys (title,descriptio, imge)          |
| **onEnd**            | _Function_ | callback to be called when the user click to the end button |
| **imageProps**       | _Object_   | props for the image                                         |
| **descriptionStyle** | _Object_   | Custom style for the text description                       |
| **titleStyle**       | _Object_   | Custom style for the title                                  |
| **containerStyle**   | _Object_   | Custom style for the View container                         |
| **indicatorColor**   | _String_   | color of the indicators                                     |
| **indicatorSize**    | _Number_   | size of the indicators                                      |
| **renderNextButton** | _Function_ | render the next button                                      |
| **renderEndButton**  | _String_   | render the end button                                       |

**ISC Licensed**
