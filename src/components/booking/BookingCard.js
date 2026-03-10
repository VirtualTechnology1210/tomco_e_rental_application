import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StatusChip from "../common/StatusChip";
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows } from "../../theme";
import { formatDateTime, getDurationLabel } from "../../utils/dateUtils";
import { formatCurrency } from "../../utils/costUtils";
const BookingCard = ({ booking, onPress, role = "user", onAccept, onReject }) => {
  const vehicleName = booking.vehicle?.name || "Vehicle";
  const vehicleImage = booking.vehicle?.images?.[0]?.image_url;
  return <TouchableOpacity style={[styles.card, Shadows.card]} onPress={onPress} activeOpacity={0.85}>
            <View style={styles.row}>
                <View style={styles.imageBox}>
                    {vehicleImage ? <Image source={{ uri: vehicleImage }} style={styles.image} resizeMode="cover" /> : <Icon name="car" size={28} color={Colors.textMuted} />}
                </View>
                <View style={styles.info}>
                    <Text style={styles.vehicleName} numberOfLines={1}>{vehicleName}</Text>
                    {role === "owner" && booking.user && <Text style={styles.userName}>👤 {booking.user.full_name}</Text>}
                    <Text style={styles.time} numberOfLines={1}>
                        {formatDateTime(booking.pickup_time)}
                    </Text>
                    <Text style={styles.duration}>
                        Duration: {getDurationLabel(booking.pickup_time, booking.drop_time)}
                    </Text>
                </View>
                <View style={styles.rightCol}>
                    <StatusChip status={booking.status} size="sm" />
                    <Text style={styles.cost}>{formatCurrency(booking.total_cost)}</Text>
                </View>
            </View>

            {role === "owner" && booking.status === "PENDING" && onAccept && onReject && <View style={styles.actions}>
                    <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn]} onPress={onReject}>
                        <Icon name="close" size={16} color={Colors.danger} />
                        <Text style={[styles.actionText, { color: Colors.danger }]}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionBtn, styles.acceptBtn]} onPress={onAccept}>
                        <Icon name="check" size={16} color={Colors.white} />
                        <Text style={[styles.actionText, { color: Colors.white }]}>Accept</Text>
                    </TouchableOpacity>
                </View>}
        </TouchableOpacity>;
};
const styles = StyleSheet.create({
  card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.sm, marginBottom: Spacing.sm },
  row: { flexDirection: "row", alignItems: "flex-start" },
  imageBox: { width: 60, height: 60, borderRadius: BorderRadius.sm, backgroundColor: Colors.surfaceVariant, justifyContent: "center", alignItems: "center", overflow: "hidden" },
  image: { width: 60, height: 60 },
  info: { flex: 1, marginLeft: Spacing.sm },
  vehicleName: { fontFamily: FontFamily.semiBold, fontSize: FontSize.base, color: Colors.textPrimary },
  userName: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  time: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 4 },
  duration: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  rightCol: { alignItems: "flex-end", justifyContent: "space-between", minHeight: 50 },
  cost: { fontFamily: FontFamily.bold, fontSize: FontSize.base, color: Colors.primary, marginTop: Spacing.xs },
  actions: { flexDirection: "row", justifyContent: "flex-end", marginTop: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.divider },
  actionBtn: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 8, borderRadius: BorderRadius.sm, marginLeft: Spacing.xs },
  rejectBtn: { backgroundColor: Colors.dangerLight },
  acceptBtn: { backgroundColor: Colors.success },
  actionText: { fontFamily: FontFamily.semiBold, fontSize: FontSize.sm, marginLeft: 4 }
});
var BookingCard_default = BookingCard;
export {
  BookingCard_default as default
};
