import { useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { useQuery, useMutation } from "@tanstack/react-query";
import DatePicker from "react-native-date-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import AppButton from "../../components/common/AppButton";
import AppLoader from "../../components/common/AppLoader";
import CostBreakdownCard from "../../components/booking/CostBreakdownCard";
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows } from "../../theme";
import { vehicleApi } from "../../api/vehicleApi";
import { bookingApi } from "../../api/bookingApi";
import { formatDateTime, getDurationLabel } from "../../utils/dateUtils";
import { calculateCost } from "../../utils/costUtils";
const BookingFormScreen = ({ navigation, route }) => {
  const { vehicleId } = route.params;
  const [pickupDate, setPickupDate] = useState(new Date(Date.now() + 36e5));
  const [dropDate, setDropDate] = useState(new Date(Date.now() + 36e5 * 4));
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showDropPicker, setShowDropPicker] = useState(false);
  const { data: vehicleData, isLoading } = useQuery({
    queryKey: ["vehicleDetail", vehicleId],
    queryFn: () => vehicleApi.getVehicleDetail(vehicleId)
  });
  const vehicle = vehicleData?.data;
  const costBreakdown = useMemo(() => {
    if (!vehicle) return null;
    return calculateCost(
      pickupDate.toISOString(),
      dropDate.toISOString(),
      parseFloat(vehicle.per_hour_cost),
      parseFloat(vehicle.per_day_cost)
    );
  }, [vehicle, pickupDate, dropDate]);
  const createBookingMutation = useMutation({
    mutationFn: () => bookingApi.createBooking({
      vehicle_id: vehicleId,
      pickup_time: pickupDate.toISOString(),
      drop_time: dropDate.toISOString()
    }),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Booking Requested! \u{1F389}", text2: "Waiting for owner approval" });
      navigation.getParent()?.navigate("Bookings", { screen: "BookingHistory" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Booking Failed", text2: error.response?.data?.message || "Something went wrong" });
    }
  });
  if (isLoading || !vehicle) return <AppLoader message="Loading..." />;
  return <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Book Vehicle</Text>
                </View>

                {
    /* Vehicle Summary */
  }
                <View style={[styles.card, Shadows.card]}>
                    <Text style={styles.vehicleName}>{vehicle.name}</Text>
                    <Text style={styles.vehicleMeta}>{vehicle.brand} {vehicle.model} · {vehicle.type}</Text>
                </View>

                {
    /* Pickup Time */
  }
                <Text style={styles.label}>Pickup Date & Time</Text>
                <TouchableOpacity style={[styles.dateButton, Shadows.card]} onPress={() => setShowPickupPicker(true)}>
                    <Icon name="clock-start" size={20} color={Colors.success} />
                    <Text style={styles.dateText}>{formatDateTime(pickupDate.toISOString())}</Text>
                    <Icon name="chevron-right" size={20} color={Colors.textMuted} />
                </TouchableOpacity>

                {
    /* Drop Time */
  }
                <Text style={styles.label}>Drop Date & Time</Text>
                <TouchableOpacity style={[styles.dateButton, Shadows.card]} onPress={() => setShowDropPicker(true)}>
                    <Icon name="clock-end" size={20} color={Colors.danger} />
                    <Text style={styles.dateText}>{formatDateTime(dropDate.toISOString())}</Text>
                    <Icon name="chevron-right" size={20} color={Colors.textMuted} />
                </TouchableOpacity>

                {
    /* Duration */
  }
                <View style={styles.durationRow}>
                    <Icon name="timer" size={18} color={Colors.primary} />
                    <Text style={styles.durationText}>Duration: {getDurationLabel(pickupDate.toISOString(), dropDate.toISOString())}</Text>
                </View>

                {
    /* Cost Breakdown */
  }
                {costBreakdown && <CostBreakdownCard
    pickupTime={pickupDate.toISOString()}
    dropTime={dropDate.toISOString()}
    perHourCost={parseFloat(vehicle.per_hour_cost)}
    perDayCost={parseFloat(vehicle.per_day_cost)}
    totalHours={costBreakdown.total_hours}
    totalDays={costBreakdown.total_days}
    totalCost={costBreakdown.total_cost}
    billingMode={costBreakdown.billing_mode}
  />}

                <View style={styles.noteCard}>
                    <Icon name="information-outline" size={18} color={Colors.warning} />
                    <Text style={styles.noteText}>The owner will review and accept/reject your booking request.</Text>
                </View>

                <AppButton
    label="Confirm Booking Request"
    onPress={() => createBookingMutation.mutate()}
    loading={createBookingMutation.isPending}
    icon="check-circle"
    variant="secondary"
    style={{ marginTop: Spacing.md }}
  />
            </ScrollView>

            <DatePicker modal open={showPickupPicker} date={pickupDate} onConfirm={(d) => {
    setPickupDate(d);
    setShowPickupPicker(false);
  }} onCancel={() => setShowPickupPicker(false)} minimumDate={/* @__PURE__ */ new Date()} />
            <DatePicker modal open={showDropPicker} date={dropDate} onConfirm={(d) => {
    setDropDate(d);
    setShowDropPicker(false);
  }} onCancel={() => setShowDropPicker(false)} minimumDate={pickupDate} />
        </View>;
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.md, paddingBottom: Spacing.massive },
  header: { flexDirection: "row", alignItems: "center", paddingTop: Spacing.lg, marginBottom: Spacing.md },
  headerTitle: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.textPrimary, marginLeft: Spacing.sm },
  card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.md },
  vehicleName: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.textPrimary },
  vehicleMeta: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted, marginTop: 2 },
  label: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: Spacing.xxs },
  dateButton: { flexDirection: "row", alignItems: "center", backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.md },
  dateText: { fontFamily: FontFamily.medium, fontSize: FontSize.base, color: Colors.textPrimary, flex: 1, marginLeft: Spacing.sm },
  durationRow: { flexDirection: "row", alignItems: "center", marginBottom: Spacing.md },
  durationText: { fontFamily: FontFamily.semiBold, fontSize: FontSize.base, color: Colors.primary, marginLeft: Spacing.xs },
  noteCard: { flexDirection: "row", alignItems: "flex-start", backgroundColor: Colors.warningLight, borderRadius: BorderRadius.md, padding: Spacing.sm },
  noteText: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary, marginLeft: Spacing.xs, flex: 1 }
});
var BookingFormScreen_default = BookingFormScreen;
export {
  BookingFormScreen_default as default
};
