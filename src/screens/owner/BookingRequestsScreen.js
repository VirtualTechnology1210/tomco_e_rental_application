import { useCallback, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, RefreshControl } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import BookingCard from "../../components/booking/BookingCard";
import AppLoader from "../../components/common/AppLoader";
import AppEmpty from "../../components/common/AppEmpty";
import { Colors, FontFamily, FontSize, Spacing, BorderRadius } from "../../theme";
import { bookingApi } from "../../api/bookingApi";
const tabs = [
  { label: "Pending", value: "PENDING" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "All", value: "ALL" }
];
const BookingRequestsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("PENDING");
  const queryClient = useQueryClient();
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["ownerBookings", activeTab],
    queryFn: () => bookingApi.getOwnerBookings({ status: activeTab === "ALL" ? void 0 : activeTab, limit: 50 })
  });
  const acceptMutation = useMutation({
    mutationFn: (id) => bookingApi.acceptBooking(id),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Booking Accepted \u2705" });
      queryClient.invalidateQueries({ queryKey: ["ownerBookings"] });
    }
  });
  const rejectMutation = useMutation({
    mutationFn: (id) => bookingApi.rejectBooking(id, "Rejected by owner"),
    onSuccess: () => {
      Toast.show({ type: "info", text1: "Booking Rejected" });
      queryClient.invalidateQueries({ queryKey: ["ownerBookings"] });
    }
  });
  const bookings = data?.data || [];
  const renderItem = useCallback(({ item }) => <BookingCard
    booking={item}
    onPress={() => navigation.navigate("BookingRequestDetail", { bookingId: item.id })}
    role="owner"
    onAccept={() => acceptMutation.mutate(item.id)}
    onReject={() => rejectMutation.mutate(item.id)}
  />, [navigation, acceptMutation, rejectMutation]);
  return <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}><Text style={styles.title}>Booking Requests</Text></View>
            <View style={styles.tabRow}>
                {tabs.map((t) => <TouchableOpacity key={t.value} style={[styles.tab, activeTab === t.value && styles.tabActive]} onPress={() => setActiveTab(t.value)}>
                        <Text style={[styles.tabText, activeTab === t.value && styles.tabTextActive]}>{t.label}</Text>
                    </TouchableOpacity>)}
            </View>
            {isLoading ? <AppLoader /> : bookings.length === 0 ? <AppEmpty icon="inbox-outline" title="No requests" subtitle={`No ${activeTab.toLowerCase()} bookings`} /> : <FlatList
    data={bookings}
    renderItem={renderItem}
    keyExtractor={(i) => i.id}
    contentContainerStyle={styles.list}
    refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
  />}
        </View>;
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.md, paddingTop: Spacing.xl, paddingBottom: Spacing.sm },
  title: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.textPrimary },
  tabRow: { flexDirection: "row", paddingHorizontal: Spacing.md, marginBottom: Spacing.sm },
  tab: { paddingHorizontal: 12, paddingVertical: 8, marginRight: 8, borderRadius: BorderRadius.full, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  tabActive: { backgroundColor: Colors.ownerAccent, borderColor: Colors.ownerAccent },
  tabText: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.textSecondary },
  tabTextActive: { color: Colors.white },
  list: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.huge }
});
var BookingRequestsScreen_default = BookingRequestsScreen;
export {
  BookingRequestsScreen_default as default
};
