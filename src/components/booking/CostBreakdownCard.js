import { View, Text, StyleSheet } from "react-native";
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows } from "../../theme";
import { formatCurrency } from "../../utils/costUtils";
const CostBreakdownCard = ({
  perHourCost,
  perDayCost,
  totalHours,
  totalDays,
  totalCost,
  billingMode,
  commissionPercent = 10
}) => {
  const subtotal = totalCost;
  const commission = parseFloat((subtotal * commissionPercent / 100).toFixed(2));
  const grandTotal = parseFloat((subtotal + commission).toFixed(2));
  return <View style={[styles.card, Shadows.card]}>
            <Text style={styles.title}>Cost Breakdown</Text>

            <View style={styles.row}>
                <Text style={styles.label}>Billing Mode</Text>
                <Text style={styles.value}>{billingMode === "HOURLY" ? "\u23F0 Hourly" : "\u{1F4C5} Daily"}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Duration</Text>
                <Text style={styles.value}>
                    {billingMode === "HOURLY" ? `${Math.ceil(totalHours)} hour${Math.ceil(totalHours) !== 1 ? "s" : ""}` : `${Math.ceil(totalDays)} day${Math.ceil(totalDays) !== 1 ? "s" : ""}`}
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Rate</Text>
                <Text style={styles.value}>
                    {billingMode === "HOURLY" ? `${formatCurrency(perHourCost)}/hr` : `${formatCurrency(perDayCost)}/day`}
                </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
                <Text style={styles.label}>Subtotal</Text>
                <Text style={styles.value}>{formatCurrency(subtotal)}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Platform Fee ({commissionPercent}%)</Text>
                <Text style={styles.value}>{formatCurrency(commission)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatCurrency(grandTotal)}</Text>
            </View>
        </View>;
};
const styles = StyleSheet.create({
  card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.md },
  title: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.textPrimary, marginBottom: Spacing.sm },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 6 },
  label: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary },
  value: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.textPrimary },
  divider: { height: 1, backgroundColor: Colors.divider, marginVertical: Spacing.xs },
  totalLabel: { fontFamily: FontFamily.bold, fontSize: FontSize.md, color: Colors.textPrimary },
  totalValue: { fontFamily: FontFamily.bold, fontSize: FontSize.lg, color: Colors.primary }
});
var CostBreakdownCard_default = CostBreakdownCard;
export {
  CostBreakdownCard_default as default
};
