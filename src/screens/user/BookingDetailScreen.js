import { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Linking } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import AppButton from "../../components/common/AppButton";
import AppLoader from "../../components/common/AppLoader";
import StatusChip from "../../components/common/StatusChip";
import CostBreakdownCard from "../../components/booking/CostBreakdownCard";
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows } from "../../theme";
import { bookingApi } from "../../api/bookingApi";
import { formatDateTime, getDurationLabel } from "../../utils/dateUtils";
const statusSteps = ["PENDING", "ACCEPTED", "ONGOING", "COMPLETED"];
const BookingDetailScreen = ({ navigation, route }) => {
  const { bookingId } = route.params;
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookingDetail", bookingId],
    queryFn: () => bookingApi.getBookingDetail(bookingId)
  });
  const cancelMutation = useMutation({
    mutationFn: () => bookingApi.cancelBooking(bookingId),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Booking Cancelled" });
      queryClient.invalidateQueries({ queryKey: ["bookingDetail", bookingId] });
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
    }
  });
  const booking = data?.data;
  const currentStepIndex = useMemo(() => {
    if (!booking) return 0;
    if (["CANCELLED", "REJECTED"].includes(booking.status)) return -1;
    return statusSteps.indexOf(booking.status);
  }, [booking]);
  if (isLoading) return <AppLoader message="Loading booking..." />;
  if (!booking) return <AppLoader message="Booking not found" />;
  return <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                {
    /* Header */
  }
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Booking Details</Text>
                    <StatusChip status={booking.status} />
                </View>

                {
    /* Status Stepper */
  }
                {currentStepIndex >= 0 && <View style={[styles.stepperCard, Shadows.card]}>
                        <Text style={styles.stepperTitle}>Booking Progress</Text>
                        <View style={styles.stepper}>
                            {statusSteps.map((step, index) => {
    const isCompleted = index <= currentStepIndex;
    const isCurrent = index === currentStepIndex;
    return <View key={step} style={styles.stepItem}>
                                        <View style={[styles.stepDot, isCompleted && styles.stepDotActive, isCurrent && styles.stepDotCurrent]}>
                                            {isCompleted && <Icon name="check" size={12} color={Colors.white} />}
                                        </View>
                                        <Text style={[styles.stepLabel, isCompleted && styles.stepLabelActive]}>{step}</Text>
                                        {index < statusSteps.length - 1 && <View style={[styles.stepLine, isCompleted && styles.stepLineActive]} />}
                                    </View>;
  })}
                        </View>
                    </View>}

                {
    /* Vehicle Info */
  }
                <View style={[styles.card, Shadows.card]}>
                    <Text style={styles.cardTitle}>Vehicle</Text>
                    <View style={styles.vehicleRow}>
                        <View style={styles.vehicleImageBox}>
                            <Icon name="car" size={28} color={Colors.textMuted} />
                        </View>
                        <View style={styles.vehicleInfo}>
                            <Text style={styles.vehicleName}>{booking.vehicle?.name || "Vehicle"}</Text>
                            <Text style={styles.vehicleMeta}>{booking.vehicle?.brand} {booking.vehicle?.model}</Text>
                        </View>
                    </View>
                </View>

                {
    /* Timeline */
  }
                <View style={[styles.card, Shadows.card]}>
                    <Text style={styles.cardTitle}>Booking Timeline</Text>
                    <View style={styles.timeRow}>
                        <Icon name="clock-start" size={18} color={Colors.success} />
                        <View style={styles.timeInfo}>
                            <Text style={styles.timeLabel}>Pickup</Text>
                            <Text style={styles.timeValue}>{formatDateTime(booking.pickup_time)}</Text>
                        </View>
                    </View>
                    <View style={styles.timeDivider} />
                    <View style={styles.timeRow}>
                        <Icon name="clock-end" size={18} color={Colors.danger} />
                        <View style={styles.timeInfo}>
                            <Text style={styles.timeLabel}>Drop</Text>
                            <Text style={styles.timeValue}>{formatDateTime(booking.drop_time)}</Text>
                        </View>
                    </View>
                    <Text style={styles.durationLabel}>Duration: {getDurationLabel(booking.pickup_time, booking.drop_time)}</Text>
                </View>

                {
    /* Cost */
  }
                <CostBreakdownCard
    pickupTime={booking.pickup_time}
    dropTime={booking.drop_time}
    perHourCost={parseFloat(booking.vehicle?.per_hour_cost || "0")}
    perDayCost={parseFloat(booking.vehicle?.per_day_cost || "0")}
    totalHours={parseFloat(booking.total_hours || "0")}
    totalDays={parseFloat(booking.total_days || "0")}
    totalCost={parseFloat(booking.total_cost)}
    billingMode={parseFloat(booking.total_hours || "0") <= 12 ? "HOURLY" : "DAILY"}
  />

                {
    /* Owner Contact (if accepted) */
  }
                {booking.status === "ACCEPTED" && booking.owner && <View style={[styles.card, Shadows.card, { borderLeftWidth: 3, borderLeftColor: Colors.success }]}>
                        <Text style={styles.cardTitle}>Owner Contact</Text>
                        <Text style={styles.ownerName}>{booking.owner.full_name}</Text>
                        {booking.owner.phone && <View style={styles.contactRow}>
                                <AppButton label="Call Now" onPress={() => Linking.openURL(`tel:${booking.owner?.phone}`)} icon="phone" variant="primary" size="sm" fullWidth={false} />
                                <AppButton label="WhatsApp" onPress={() => Linking.openURL(`whatsapp://send?phone=${booking.owner?.phone}`)} icon="whatsapp" variant="outline" size="sm" fullWidth={false} style={{ marginLeft: Spacing.xs }} />
                            </View>}
                    </View>}

                {
    /* Actions */
  }
                {booking.status === "PENDING" && <AppButton label="Cancel Booking" onPress={() => cancelMutation.mutate()} variant="danger" icon="close-circle" loading={cancelMutation.isPending} style={{ marginTop: Spacing.md }} />}

                {booking.status === "COMPLETED" && !booking.review && <AppButton label="Rate Your Experience" onPress={() => navigation.navigate("Review", { bookingId: booking.id, vehicleId: booking.vehicle_id })} variant="secondary" icon="star" style={{ marginTop: Spacing.md }} />}
            </ScrollView>
        </View>;
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.md, paddingBottom: Spacing.massive },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: Spacing.md, paddingTop: Spacing.lg },
  headerTitle: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.textPrimary, flex: 1, marginLeft: Spacing.sm },
  stepperCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.md },
  stepperTitle: { fontFamily: FontFamily.semiBold, fontSize: FontSize.base, color: Colors.textPrimary, marginBottom: Spacing.sm },
  stepper: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  stepItem: { alignItems: "center", flex: 1, position: "relative" },
  stepDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.border, justifyContent: "center", alignItems: "center" },
  stepDotActive: { backgroundColor: Colors.success },
  stepDotCurrent: { backgroundColor: Colors.primary, borderWidth: 2, borderColor: Colors.primaryLight },
  stepLabel: { fontFamily: FontFamily.regular, fontSize: 9, color: Colors.textMuted, marginTop: 4, textAlign: "center" },
  stepLabelActive: { color: Colors.textPrimary, fontFamily: FontFamily.medium },
  stepLine: { position: "absolute", top: 12, left: "60%", width: "80%", height: 2, backgroundColor: Colors.border },
  stepLineActive: { backgroundColor: Colors.success },
  card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.md },
  cardTitle: { fontFamily: FontFamily.semiBold, fontSize: FontSize.base, color: Colors.textPrimary, marginBottom: Spacing.sm },
  vehicleRow: { flexDirection: "row", alignItems: "center" },
  vehicleImageBox: { width: 56, height: 56, borderRadius: BorderRadius.sm, backgroundColor: Colors.surfaceVariant, justifyContent: "center", alignItems: "center" },
  vehicleInfo: { marginLeft: Spacing.sm, flex: 1 },
  vehicleName: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.textPrimary },
  vehicleMeta: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted },
  timeRow: { flexDirection: "row", alignItems: "center", paddingVertical: 6 },
  timeInfo: { marginLeft: Spacing.sm },
  timeLabel: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted },
  timeValue: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.textPrimary },
  timeDivider: { width: 1, height: 16, backgroundColor: Colors.border, marginLeft: 9 },
  durationLabel: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.primary, marginTop: Spacing.xs, textAlign: "right" },
  ownerName: { fontFamily: FontFamily.semiBold, fontSize: FontSize.base, color: Colors.textPrimary, marginBottom: Spacing.xs },
  contactRow: { flexDirection: "row", marginTop: Spacing.xs }
});
var BookingDetailScreen_default = BookingDetailScreen;
export {
  BookingDetailScreen_default as default
};
