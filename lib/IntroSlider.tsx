import React from "react";
import {
  View,
  Dimensions,
  Text,
  Animated,
  Image,
  ScrollView,
  FlatList,
  ImageProps,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
} from "react-native";

const { width, height } = Dimensions.get("screen");
const IMAGE_WIDTH = width * 0.65;
type IntroSliderData = {
  title: string | Function;
  description?: string | Function;
  image?: string | number;
};
type IntroSliderProps = {
  data: Array<IntroSliderData>;
  onEnd: Function;
  imageProps: ImageProps;
  titleStyle: TextStyle;
  descriptionStyle: TextStyle;
  containerStyle: ViewStyle;
  indicatorColor?: string;
  indicatorSize?: number;
  renderNextButton: (currentIndex: number) => any;
  renderEndButton: Function;
};
const IntroSlider = ({
  data,
  onEnd,
  imageProps,
  descriptionStyle,
  titleStyle,
  containerStyle,
  indicatorColor = "#000",
  indicatorSize = 12,
  renderNextButton,
  renderEndButton,
}: IntroSliderProps) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollRef = React.useRef<FlatList<any>>();
  const animation = React.useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    Animated.spring(animation, {
      useNativeDriver: false,
      toValue: scrollX,
    }).start();
  }, []);
  const handleNext = React.useCallback(() => {
    if (activeIndex === data.length - 1) {
      onEnd();
    } else {
      setActiveIndex(activeIndex + 1);
      scrollRef.current.scrollToIndex({ index: activeIndex + 1 });
    }
  }, [activeIndex, data]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF", ...containerStyle }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Animated.FlatList
          ref={scrollRef}
          keyExtractor={(_, i) => String(i)}
          data={data}
          horizontal
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          decelerationRate="fast"
          bounces={false}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(e) => {
            const activeValue = e.nativeEvent.contentOffset.x;
            let div = Math.abs(Math.ceil(activeValue / width));
            if (div < 0 || div > data.length - 1 || div === activeIndex) return;
            setActiveIndex(div);
          }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={({ item }: { item: IntroSliderData }) => {
            return (
              <View
                style={{
                  width,
                  alignItems: "center",
                  paddingHorizontal: 15,
                }}
              >
                {!!item.image && (
                  <Image
                    source={
                      typeof item.image === "number"
                        ? item.image
                        : { uri: item.image }
                    }
                    resizeMode="contain"
                    style={{
                      width: IMAGE_WIDTH,
                      height: IMAGE_WIDTH * 0.8,
                      marginVertical: height * 0.05,
                    }}
                    {...imageProps}
                  />
                )}
                <View>
                  {typeof item.title === "function" && <>{item.title()}</>}
                  {typeof item.title !== "function" && (
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: "600",
                        marginBottom: 20,
                        ...titleStyle,
                      }}
                    >
                      {item.title}
                    </Text>
                  )}
                  {typeof item.description === "function" && (
                    <>{item.description()}</>
                  )}
                  {typeof item.description !== "function" &&
                    !!item.description && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: "rgba(0,0,0,.7)",
                          ...descriptionStyle,
                        }}
                      >
                        {item.description}
                      </Text>
                    )}
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
      <View
        style={{
          width,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <Indicators
          indicatorSize={indicatorSize}
          indicatorColor={indicatorColor}
          data={data}
          animation={animation}
        />
        <TouchableOpacity
          style={{ backgroundColor: "transparent" }}
          onPress={handleNext}
        >
          {activeIndex === data.length - 1 &&
            renderEndButton &&
            renderEndButton()}
          {activeIndex !== data.length - 1 &&
            renderNextButton &&
            renderNextButton(activeIndex)}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IntroSlider;

type IndicatorProps = {
  indicatorColor: string;
  data: Array<IntroSliderData>;
  animation: Animated.Value;
  indicatorSize: number;
};
function Indicators({
  animation,
  data,
  indicatorColor,
  indicatorSize,
}: IndicatorProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const opacity = animation.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: "clamp",
        });
        const scale = animation.interpolate({
          inputRange,
          outputRange: [1, 1.1, 1],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={index}
            style={{
              width: indicatorSize,
              height: indicatorSize,
              borderRadius: indicatorSize / 2,
              backgroundColor: indicatorColor,
              opacity: opacity,
              transform: [{ scale }],
              marginHorizontal: 5,
            }}
          />
        );
      })}
    </View>
  );
}
