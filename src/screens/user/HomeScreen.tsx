import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, RefreshControl, StatusBar } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import VehicleCard from '../../components/vehicle/VehicleCard';
import AppLoader from '../../components/common/AppLoader';
import AppEmpty from '../../components/common/AppEmpty';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows, VehicleTypeIcons, Layout } from '../../theme';
import { vehicleApi } from '../../api/vehicleApi';
import { RootState } from '../../store';
import { UserHomeScreenProps } from '../../types/navigation.types';
import { CACHE_TIMES, VEHICLE_TYPES, SEARCH_RADIUS_DEFAULT } from '../../utils/constants';
import { Vehicle, VehicleType } from '../../types/vehicle.types';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

const vehicleFilters: Array<{ label: string; value: VehicleType | 'ALL'; icon: string }> = [
    { label: 'All', value: 'ALL', icon: 'format-list-bulleted' },
    ...VEHICLE_TYPES.map((t) => ({ label: t.charAt(0) + t.slice(1).toLowerCase(), value: t, icon: VehicleTypeIcons[t] })),
];

const HomeScreen: React.FC<UserHomeScreenProps<'HomeMain'>> = ({ navigation }) => {
    const { user } = useAuth();
    const location = useSelector((state: RootState) => state.location);
    const unreadCount = useSelector((state: RootState) => state.notifications.unreadCount);
    const [selectedType, setSelectedType] = useState<VehicleType | 'ALL'>('ALL');

    const lat = location.latitude || 17.385;
    const lng = location.longitude || 78.4867;

    const { data, isLoading, refetch, isRefetching } = useQuery({
        queryKey: ['nearbyVehicles', lat, lng, selectedType],
        queryFn: () => vehicleApi.searchVehicles({
            lat, lng, radius_km: SEARCH_RADIUS_DEFAULT,
            type: selectedType === 'ALL' ? undefined : selectedType,
            limit: 20,
        }),
        staleTime: CACHE_TIMES.vehicleSearch,
    });

    const vehicles: Vehicle[] = data?.data || [];

    const renderVehicle = useCallback(({ item }: { item: Vehicle }) => (
        <View style={styles.cardWrapper}>
            <VehicleCard vehicle={item} onPress={() => navigation.navigate('VehicleDetail', { vehicleId: item.id })} variant="user" />
        </View>
    ), [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hello, {user?.full_name?.split(' ')[0] || 'there'} 👋</Text>
                    <TouchableOpacity style={styles.locationRow}>
                        <Icon name="map-marker" size={16} color={Colors.secondary} />
                        <Text style={styles.locationText}>{location.cityName || 'Set Location'}</Text>
                        <Icon name="chevron-down" size={16} color={Colors.textMuted} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.bellContainer} onPress={() => navigation.getParent()?.navigate('Profile', { screen: 'Notifications' })}>
                    <Icon name="bell-outline" size={24} color={Colors.textPrimary} />
                    {unreadCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <TouchableOpacity style={[styles.searchBar, Shadows.card]} activeOpacity={0.8}
                onPress={() => navigation.getParent()?.navigate('Search', { screen: 'VehicleSearch' })}>
                <Icon name="magnify" size={22} color={Colors.textMuted} />
                <Text style={styles.searchPlaceholder}>Search vehicles, brands...</Text>
            </TouchableOpacity>

            {/* Vehicle Type Filter */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
                {vehicleFilters.map((filter) => (
                    <TouchableOpacity
                        key={filter.value}
                        style={[styles.filterChip, selectedType === filter.value && styles.filterChipActive]}
                        onPress={() => setSelectedType(filter.value)}
                    >
                        <Icon name={filter.icon} size={18} color={selectedType === filter.value ? Colors.white : Colors.textSecondary} />
                        <Text style={[styles.filterText, selectedType === filter.value && styles.filterTextActive]}>{filter.label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Vehicle List */}
            <Text style={styles.sectionTitle}>Available Near You</Text>

            {isLoading ? (
                <AppLoader message="Finding vehicles..." />
            ) : vehicles.length === 0 ? (
                <AppEmpty icon="car-off" title="No vehicles found" subtitle="Try changing filters or expanding your search radius" />
            ) : (
                <FlatList
                    data={vehicles}
                    renderItem={renderVehicle}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={Colors.primary} />}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.md, paddingTop: Spacing.xl, paddingBottom: Spacing.sm },
    greeting: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.textPrimary },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    locationText: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.textSecondary, marginHorizontal: 4 },
    bellContainer: { position: 'relative', padding: Spacing.xs },
    badge: { position: 'absolute', top: 2, right: 2, backgroundColor: Colors.danger, borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
    badgeText: { fontFamily: FontFamily.bold, fontSize: 10, color: Colors.white },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.md, marginHorizontal: Spacing.md, padding: Spacing.sm, marginBottom: Spacing.sm },
    searchPlaceholder: { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: Colors.textMuted, marginLeft: Spacing.xs, flex: 1 },
    filterRow: { paddingHorizontal: Spacing.md, paddingTop: Spacing.xs, paddingBottom: Spacing.sm },
    filterChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.full, paddingHorizontal: 14, paddingVertical: 8, marginRight: Spacing.xs, borderWidth: 1, borderColor: Colors.border },
    filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
    filterText: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.textSecondary, marginLeft: 6 },
    filterTextActive: { color: Colors.white },
    sectionTitle: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.textPrimary, paddingHorizontal: Spacing.md, marginTop: Spacing.xs, marginBottom: Spacing.xs },
    list: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.huge },
    cardWrapper: { marginBottom: 4 },
});

export default HomeScreen;
