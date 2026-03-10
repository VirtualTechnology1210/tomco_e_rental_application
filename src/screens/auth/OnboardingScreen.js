import { useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions, StatusBar, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AppButton from "../../components/common/AppButton";
import { Colors, FontFamily, FontSize, Spacing } from "../../theme";
const { width } = Dimensions.get("window");
const slides = [
  { id: "1", icon: "map-search", title: "Find Vehicles Near You", subtitle: "Discover bikes, cars, and more available for rent in your neighborhood using GPS-powered search.", gradient: [Colors.primary, "#2196F3"] },
  { id: "2", icon: "calendar-check", title: "Book Instantly", subtitle: "Choose your pickup time, review the cost, and book with one tap. It's that simple.", gradient: ["#FF6B35", "#FF8F61"] },
  { id: "3", icon: "cash-multiple", title: "List & Earn Money", subtitle: "Own a vehicle? List it on E-Rental and start earning from idle vehicles today.", gradient: ["#6C3483", "#8E44AD"] }
];
const OnboardingScreen = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
    } else {
      navigation.replace("RoleSelect");
    }
  };
  const handleSkip = () => navigation.replace("RoleSelect");
  const renderSlide = ({ item }) => <LinearGradient colors={item.gradient} style={styles.slide}>
            <View style={styles.iconContainer}>
                <View style={styles.iconCircle}>
                    <Icon name={item.icon} size={56} color={item.gradient[0]} />
                </View>
            </View>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
        </LinearGradient>;
  return <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <FlatList
    ref={flatListRef}
    data={slides}
    renderItem={renderSlide}
    keyExtractor={(item) => item.id}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    onMomentumScrollEnd={(e) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / width);
      setActiveIndex(index);
    }}
  />

            <View style={styles.footer}>
                <View style={styles.dots}>
                    {slides.map((_, i) => <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />)}
                </View>

                <AppButton
    label={activeIndex === slides.length - 1 ? "Get Started" : "Next"}
    onPress={handleNext}
    variant="primary"
    iconRight={activeIndex < slides.length - 1 ? "arrow-right" : "rocket-launch"}
  />
            </View>
        </View>;
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  skipBtn: { position: "absolute", top: 50, right: 20, zIndex: 10, padding: Spacing.xs },
  skipText: { fontFamily: FontFamily.medium, fontSize: FontSize.base, color: Colors.white },
  slide: { width, flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: Spacing.xxl },
  iconContainer: { marginBottom: Spacing.xxxl },
  iconCircle: { width: 110, height: 110, borderRadius: 55, backgroundColor: "rgba(255,255,255,0.95)", justifyContent: "center", alignItems: "center" },
  slideTitle: { fontFamily: FontFamily.bold, fontSize: FontSize.xxl, color: Colors.white, textAlign: "center", marginBottom: Spacing.sm },
  slideSubtitle: { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: "rgba(255,255,255,0.85)", textAlign: "center", lineHeight: 24, paddingHorizontal: Spacing.md },
  footer: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xxxl, paddingTop: Spacing.lg, backgroundColor: Colors.background },
  dots: { flexDirection: "row", justifyContent: "center", marginBottom: Spacing.lg },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.border, marginHorizontal: 4 },
  dotActive: { width: 24, backgroundColor: Colors.primary }
});
var OnboardingScreen_default = OnboardingScreen;
export {
  OnboardingScreen_default as default
};
