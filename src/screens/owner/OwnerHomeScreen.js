import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, RefreshControl } from "react-native";
import { useQuery } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StatCard from "../../components/owner/StatCard";
import BookingCard from "../../components/booking/BookingCard";
import VehicleCard from "../../components/vehicle/VehicleCard";
import AppLoader from "../../components/common/AppLoader";
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows } from "../../theme";
import { bookingApi } from "../../api/bookingApi";
import { vehicleApi } from "../../api/vehicleApi";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
const OwnerHomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const unreadCount = useSelector((s) => s.notifications.unreadCount);
  const { data: dashData, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["ownerDashboard"],
    queryFn: () => bookingApi.getDashboard()
  });
  const { data: bookingsData } = useQuery({
    queryKey: ["ownerBookings", "PENDING"],
    queryFn: () => bookingApi.getOwnerBookings({ status: "PENDING", limit: 3 })
  });
  const { data: vehiclesData } = useQuery({
    queryKey: ["ownerVehicles"],
    queryFn: () => vehicleApi.getOwnerVehicles({ limit: 5 })
  });
  const dash = dashData?.data;
  const pendingBookings = bookingsData?.data || [];
  const vehicles = vehiclesData?.data || [];
  if (isLoading) return <AppLoader message="Loading dashboard..." />;
  return <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={Colors.ownerAccent} />} contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Welcome, {user?.full_name?.split(" ")[0]} 🔑</Text>
                        <Text style={styles.subtitle}>Vehicle Owner Dashboard</Text>
                    </View>
                    <TouchableOpacity style={styles.bellContainer} onPress={() => navigation.getParent()?.navigate("OwnerProfile", { screen: "OwnerNotifications" })}>
                        <Icon name="bell-outline" size={24} color={Colors.textPrimary} />
                        {unreadCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{unreadCount > 9 ? "9+" : unreadCount}</Text></View>}
                    </TouchableOpacity>
                </View>

                {user?.status === "PENDING" && <View style={styles.pendingBanner}><Icon name="clock-outline" size={18} color={Colors.warning} /><Text style={styles.pendingText}>Verification Pending</Text></View>}

                <View style={styles.statsGrid}>
                    <StatCard title="Total Vehicles" value={dash?.total_vehicles || 0} icon="car-multiple" iconColor={Colors.primary} bgColor={Colors.primaryLight} />
                    <StatCard title="Active Bookings" value={dash?.pending_bookings || 0} icon="calendar-clock" iconColor={Colors.warning} bgColor={Colors.warningLight} />
                    <StatCard title="Completed" value={dash?.completed_bookings || 0} icon="check-circle" iconColor={Colors.success} bgColor={Colors.successLight} />
                    <StatCard title="Total Earnings" value={dash?.total_earnings || 0} icon="cash" iconColor={Colors.ownerAccent} bgColor={Colors.ownerAccentLight} isCurrency />
                </View>

                {pendingBookings.length > 0 && <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>New Booking Requests</Text>
                            <TouchableOpacity onPress={() => navigation.getParent()?.navigate("Requests")}>
                                <Text style={styles.viewAll}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        {pendingBookings.map((b) => <BookingCard key={b.id} booking={b} onPress={() => navigation.getParent()?.navigate("Requests", { screen: "BookingRequestDetail", params: { bookingId: b.id } })} role="owner" />)}
                    </View>}

                {vehicles.length > 0 && <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>My Vehicles</Text>
                            <TouchableOpacity onPress={() => navigation.getParent()?.navigate("Vehicles")}>
                                <Text style={styles.viewAll}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity style={[styles.addCard, Shadows.card]} onPress={() => navigation.getParent()?.navigate("Vehicles", { screen: "AddVehicle" })}>
                                <Icon name="plus-circle" size={36} color={Colors.ownerAccent} />
                                <Text style={styles.addText}>Add Vehicle</Text>
                            </TouchableOpacity>
                            {vehicles.slice(0, 3).map((v) => <View key={v.id} style={styles.vehicleHScroll}>
                                    <VehicleCard vehicle={v} onPress={() => navigation.getParent()?.navigate("Vehicles", { screen: "EditVehicle", params: { vehicleId: v.id } })} variant="owner" />
                                </View>)}
                        </ScrollView>
                    </View>}
            </ScrollView>
        </View>;
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: Spacing.massive },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: Spacing.md, paddingTop: Spacing.xl, paddingBottom: Spacing.sm },
  greeting: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.textPrimary },
  subtitle: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.ownerAccent, marginTop: 2 },
  bellContainer: { position: "relative", padding: Spacing.xs },
  badge: { position: "absolute", top: 2, right: 2, backgroundColor: Colors.danger, borderRadius: 10, width: 18, height: 18, justifyContent: "center", alignItems: "center" },
  badgeText: { fontFamily: FontFamily.bold, fontSize: 10, color: Colors.white },
  pendingBanner: { flexDirection: "row", alignItems: "center", backgroundColor: Colors.warningLight, marginHorizontal: Spacing.md, padding: Spacing.sm, borderRadius: BorderRadius.sm, marginBottom: Spacing.sm },
  pendingText: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.warning, marginLeft: Spacing.xs },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", paddingHorizontal: Spacing.md },
  section: { paddingHorizontal: Spacing.md, marginTop: Spacing.md },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: Spacing.sm },
  sectionTitle: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.textPrimary },
  viewAll: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.ownerAccent },
  addCard: { width: 140, height: 140, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, justifyContent: "center", alignItems: "center", marginRight: Spacing.sm, borderWidth: 1.5, borderColor: Colors.ownerAccent, borderStyle: "dashed" },
  addText: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.ownerAccent, marginTop: Spacing.xs },
  vehicleHScroll: { width: 260, marginRight: Spacing.sm }
});
var OwnerHomeScreen_default = OwnerHomeScreen;
export {
  OwnerHomeScreen_default as default
};
