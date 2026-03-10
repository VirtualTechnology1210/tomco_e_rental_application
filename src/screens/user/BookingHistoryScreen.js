import { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, StatusBar } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import BookingCard from "../../components/booking/BookingCard";
import AppLoader from "../../components/common/AppLoader";
import AppEmpty from "../../components/common/AppEmpty";
import { Colors, FontFamily, FontSize, Spacing, BorderRadius } from "../../theme";
import { bookingApi } from "../../api/bookingApi";
import { CACHE_TIMES } from "../../utils/constants";
const tabs = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" }
];
const BookingHistoryScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("ALL");
  const queryClient = useQueryClient();
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["userBookings"],
    queryFn: () => bookingApi.getBookings({ limit: 50 }),
    staleTime: CACHE_TIMES.bookings
  });
  const allBookings = data?.data || [];
  const filtered = activeTab === "ALL" ? allBookings : allBookings.filter((b) => b.status === activeTab);
  const cancelMutation = useMutation({
    mutationFn: (bookingId) => bookingApi.cancelBooking(bookingId, "Cancelled by user"),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Booking Cancelled" });
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
    },
    onError: () => Toast.show({ type: "error", text1: "Failed to cancel" })
  });
  const renderBooking = useCallback(({ item }) => <BookingCard booking={item} onPress={() => navigation.navigate("BookingDetail", { bookingId: item.id })} role="user" />, [navigation]);
  return <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.title}>My Bookings</Text>
            </View>

            {
    /* Tab Bar */
  }
            <View style={styles.tabRow}>
                {tabs.map((tab) => <TouchableOpacity key={tab.value} style={[styles.tab, activeTab === tab.value && styles.tabActive]} onPress={() => setActiveTab(tab.value)}>
                        <Text style={[styles.tabText, activeTab === tab.value && styles.tabTextActive]}>{tab.label}</Text>
                    </TouchableOpacity>)}
            </View>

            {isLoading ? <AppLoader message="Loading bookings..." /> : filtered.length === 0 ? <AppEmpty icon="calendar-blank" title="No bookings yet" subtitle={activeTab !== "ALL" ? `No ${activeTab.toLowerCase()} bookings` : "Start by booking a vehicle!"} /> : <FlatList
    data={filtered}
    renderItem={renderBooking}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.list}
    refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={Colors.primary} />}
    showsVerticalScrollIndicator={false}
  />}
        </View>;
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.md, paddingTop: Spacing.xl, paddingBottom: Spacing.sm },
  title: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.textPrimary },
  tabRow: { flexDirection: "row", paddingHorizontal: Spacing.md, marginBottom: Spacing.sm },
  tab: { paddingHorizontal: 12, paddingVertical: 8, marginRight: 8, borderRadius: BorderRadius.full, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  tabActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabText: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.textSecondary },
  tabTextActive: { color: Colors.white },
  list: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.huge }
});
var BookingHistoryScreen_default = BookingHistoryScreen;
export {
  BookingHistoryScreen_default as default
};
