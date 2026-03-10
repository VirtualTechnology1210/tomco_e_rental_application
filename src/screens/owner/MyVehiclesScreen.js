import { useCallback, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, RefreshControl } from "react-native";
import { useQuery } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import VehicleCard from "../../components/vehicle/VehicleCard";
import AppLoader from "../../components/common/AppLoader";
import AppEmpty from "../../components/common/AppEmpty";
import AppButton from "../../components/common/AppButton";
import { Colors, FontFamily, FontSize, Spacing, BorderRadius } from "../../theme";
import { vehicleApi } from "../../api/vehicleApi";
const MyVehiclesScreen = ({ navigation }) => {
  const [filter, setFilter] = useState("ALL");
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["ownerVehicles"],
    queryFn: () => vehicleApi.getOwnerVehicles({ limit: 50 })
  });
  const allVehicles = data?.data || [];
  const filtered = filter === "ALL" ? allVehicles : allVehicles.filter((v) => v.status === filter);
  const renderItem = useCallback(({ item }) => <VehicleCard vehicle={item} onPress={() => navigation.navigate("EditVehicle", { vehicleId: item.id })} variant="owner" />, [navigation]);
  return <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.title}>My Vehicles</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("AddVehicle")}>
                    <Icon name="plus" size={22} color={Colors.white} />
                </TouchableOpacity>
            </View>

            <View style={styles.filterRow}>
                {["ALL", "ACTIVE", "INACTIVE", "UNDER_REVIEW"].map((f) => <TouchableOpacity key={f} style={[styles.tab, filter === f && styles.tabActive]} onPress={() => setFilter(f)}>
                        <Text style={[styles.tabText, filter === f && styles.tabTextActive]}>{f === "ALL" ? "All" : f.replace("_", " ")}</Text>
                    </TouchableOpacity>)}
            </View>

            {isLoading ? <AppLoader /> : filtered.length === 0 ? <AppEmpty
    icon="car-off"
    title="No vehicles"
    subtitle="Add your first vehicle to start earning!"
    action={<AppButton label="Add Vehicle" onPress={() => navigation.navigate("AddVehicle")} icon="plus" fullWidth={false} />}
  /> : <FlatList
    data={filtered}
    renderItem={renderItem}
    keyExtractor={(i) => i.id}
    contentContainerStyle={styles.list}
    refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
  />}
        </View>;
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: Spacing.md, paddingTop: Spacing.xl, paddingBottom: Spacing.sm },
  title: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.textPrimary },
  addBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.ownerAccent, justifyContent: "center", alignItems: "center" },
  filterRow: { flexDirection: "row", paddingHorizontal: Spacing.md, marginBottom: Spacing.sm },
  tab: { paddingHorizontal: 10, paddingVertical: 6, marginRight: 6, borderRadius: BorderRadius.full, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  tabActive: { backgroundColor: Colors.ownerAccent, borderColor: Colors.ownerAccent },
  tabText: { fontFamily: FontFamily.medium, fontSize: FontSize.xs, color: Colors.textSecondary },
  tabTextActive: { color: Colors.white },
  list: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.huge }
});
var MyVehiclesScreen_default = MyVehiclesScreen;
export {
  MyVehiclesScreen_default as default
};
