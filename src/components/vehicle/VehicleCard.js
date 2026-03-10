import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StatusChip from "../common/StatusChip";
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows, VehicleTypeIcons } from "../../theme";
import { formatCurrency } from "../../utils/costUtils";
const VehicleCard = ({ vehicle, onPress, variant = "user", onToggleAvailability }) => {
  const primaryImage = vehicle.primary_image || vehicle.images?.find((i) => i.is_primary)?.image_url || vehicle.images?.[0]?.image_url;
  return <TouchableOpacity style={[styles.card, Shadows.card]} onPress={onPress} activeOpacity={0.85}>
            <View style={styles.imageContainer}>
                {primaryImage ? <Image source={{ uri: primaryImage }} style={styles.image} resizeMode="cover" /> : <View style={styles.placeholderImage}>
                        <Icon name={VehicleTypeIcons[vehicle.type] || "car"} size={40} color={Colors.textMuted} />
                    </View>}
                <View style={styles.typeBadge}>
                    <Icon name={VehicleTypeIcons[vehicle.type] || "car"} size={12} color={Colors.white} />
                    <Text style={styles.typeText}>{vehicle.type}</Text>
                </View>
                {variant === "user" && vehicle.distance_km !== void 0 && <View style={styles.distanceBadge}>
                        <Icon name="map-marker" size={12} color={Colors.secondary} />
                        <Text style={styles.distanceText}>{vehicle.distance_km} km</Text>
                    </View>}
            </View>

            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={1}>{vehicle.name}</Text>

                {vehicle.brand && <Text style={styles.brand} numberOfLines={1}>
                        {vehicle.brand} {vehicle.model && `\xB7 ${vehicle.model}`} {vehicle.year && `\xB7 ${vehicle.year}`}
                    </Text>}

                <View style={styles.bottomRow}>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>{formatCurrency(vehicle.per_hour_cost)}</Text>
                        <Text style={styles.priceUnit}>/hr</Text>
                        <Text style={styles.priceDivider}>|</Text>
                        <Text style={styles.price}>{formatCurrency(vehicle.per_day_cost)}</Text>
                        <Text style={styles.priceUnit}>/day</Text>
                    </View>

                    {variant === "user" && vehicle.avg_rating && <View style={styles.ratingRow}>
                            <Icon name="star" size={14} color={Colors.rating} />
                            <Text style={styles.rating}>{vehicle.avg_rating}</Text>
                            {vehicle.total_reviews !== void 0 && <Text style={styles.reviewCount}>({vehicle.total_reviews})</Text>}
                        </View>}
                </View>

                {variant === "owner" && <View style={styles.ownerRow}>
                        <StatusChip status={vehicle.status} size="sm" />
                        <View style={styles.availabilityDot}>
                            <View style={[styles.dot, { backgroundColor: vehicle.availability ? Colors.online : Colors.offline }]} />
                            <Text style={styles.availText}>{vehicle.availability ? "Available" : "Unavailable"}</Text>
                        </View>
                    </View>}
            </View>
        </TouchableOpacity>;
};
const styles = StyleSheet.create({
  card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, marginBottom: Spacing.sm, overflow: "hidden" },
  imageContainer: { height: 160, backgroundColor: Colors.surfaceVariant, position: "relative" },
  image: { width: "100%", height: "100%" },
  placeholderImage: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.surfaceVariant },
  typeBadge: { position: "absolute", top: Spacing.xs, left: Spacing.xs, flexDirection: "row", alignItems: "center", backgroundColor: "rgba(0,0,0,0.6)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: BorderRadius.sm },
  typeText: { fontFamily: FontFamily.medium, fontSize: FontSize.xs, color: Colors.white, marginLeft: 4 },
  distanceBadge: { position: "absolute", bottom: Spacing.xs, right: Spacing.xs, flexDirection: "row", alignItems: "center", backgroundColor: Colors.surface, paddingHorizontal: 8, paddingVertical: 4, borderRadius: BorderRadius.sm },
  distanceText: { fontFamily: FontFamily.semiBold, fontSize: FontSize.xs, color: Colors.secondary, marginLeft: 2 },
  content: { padding: Spacing.sm },
  name: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.textPrimary },
  brand: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted, marginTop: 2 },
  bottomRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: Spacing.xs },
  priceRow: { flexDirection: "row", alignItems: "baseline" },
  price: { fontFamily: FontFamily.bold, fontSize: FontSize.base, color: Colors.primary },
  priceUnit: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted, marginLeft: 2 },
  priceDivider: { color: Colors.textMuted, marginHorizontal: 6 },
  ratingRow: { flexDirection: "row", alignItems: "center" },
  rating: { fontFamily: FontFamily.semiBold, fontSize: FontSize.sm, color: Colors.textPrimary, marginLeft: 3 },
  reviewCount: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted, marginLeft: 2 },
  ownerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: Spacing.xs },
  availabilityDot: { flexDirection: "row", alignItems: "center" },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 4 },
  availText: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textSecondary }
});
var VehicleCard_default = VehicleCard;
export {
  VehicleCard_default as default
};
