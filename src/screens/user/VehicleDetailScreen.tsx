import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppButton from '../../components/common/AppButton';
import AppLoader from '../../components/common/AppLoader';
import StatusChip from '../../components/common/StatusChip';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows, VehicleTypeIcons } from '../../theme';
import { vehicleApi } from '../../api/vehicleApi';
import { UserHomeScreenProps } from '../../types/navigation.types';
import { formatCurrency } from '../../utils/costUtils';
import { CACHE_TIMES } from '../../utils/constants';

const VehicleDetailScreen: React.FC<UserHomeScreenProps<'VehicleDetail'>> = ({ navigation, route }) => {
    const { vehicleId } = route.params;

    const { data, isLoading } = useQuery({
        queryKey: ['vehicleDetail', vehicleId],
        queryFn: () => vehicleApi.getVehicleDetail(vehicleId),
        staleTime: CACHE_TIMES.vehicleDetail,
    });

    const vehicle = data?.data;

    if (isLoading || !vehicle) return <AppLoader message="Loading vehicle..." />;

    const images = vehicle.images || [];
    const reviews = vehicle.reviews || [];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero Image Gallery */}
                <View style={styles.heroContainer}>
                    {images.length > 0 ? (
                        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                            {images.map((img) => (
                                <Image key={img.id} source={{ uri: img.image_url }} style={styles.heroImage} resizeMode="cover" />
                            ))}
                        </ScrollView>
                    ) : (
                        <View style={styles.heroPlaceholder}>
                            <Icon name={VehicleTypeIcons[vehicle.type] || 'car'} size={64} color={Colors.textMuted} />
                        </View>
                    )}
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={24} color={Colors.white} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    {/* Title Row */}
                    <View style={styles.titleRow}>
                        <View style={styles.titleLeft}>
                            <Text style={styles.vehicleName}>{vehicle.name}</Text>
                            <View style={styles.metaRow}>
                                <View style={styles.typeBadge}>
                                    <Icon name={VehicleTypeIcons[vehicle.type] || 'car'} size={14} color={Colors.primary} />
                                    <Text style={styles.typeText}>{vehicle.type}</Text>
                                </View>
                                {vehicle.brand && <Text style={styles.brandText}>{vehicle.brand} {vehicle.model}</Text>}
                            </View>
                        </View>
                        {vehicle.avg_rating && (
                            <View style={styles.ratingBox}>
                                <Icon name="star" size={18} color={Colors.rating} />
                                <Text style={styles.ratingText}>{vehicle.avg_rating}</Text>
                                <Text style={styles.reviewCountText}>({vehicle.total_reviews})</Text>
                            </View>
                        )}
                    </View>

                    {/* Location */}
                    {vehicle.location_name && (
                        <View style={styles.locationRow}>
                            <Icon name="map-marker" size={16} color={Colors.secondary} />
                            <Text style={styles.locationText}>{vehicle.location_name}</Text>
                        </View>
                    )}

                    {/* Owner */}
                    {vehicle.owner && (
                        <View style={[styles.card, Shadows.card]}>
                            <View style={styles.ownerRow}>
                                <View style={styles.ownerAvatar}>
                                    <Icon name="account" size={24} color={Colors.textMuted} />
                                </View>
                                <View>
                                    <Text style={styles.ownerName}>{vehicle.owner.full_name}</Text>
                                    <Text style={styles.ownerLabel}>Vehicle Owner</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Price */}
                    <View style={[styles.priceCard, Shadows.card]}>
                        <View style={styles.priceItem}>
                            <Text style={styles.priceLabel}>Per Hour</Text>
                            <Text style={styles.priceValue}>{formatCurrency(vehicle.per_hour_cost)}</Text>
                        </View>
                        <View style={styles.priceDivider} />
                        <View style={styles.priceItem}>
                            <Text style={styles.priceLabel}>Per Day</Text>
                            <Text style={styles.priceValue}>{formatCurrency(vehicle.per_day_cost)}</Text>
                        </View>
                    </View>

                    {/* Details chips */}
                    <View style={styles.chipsRow}>
                        {vehicle.brand && <View style={styles.chip}><Text style={styles.chipText}>{vehicle.brand}</Text></View>}
                        {vehicle.model && <View style={styles.chip}><Text style={styles.chipText}>{vehicle.model}</Text></View>}
                        {vehicle.year && <View style={styles.chip}><Text style={styles.chipText}>{vehicle.year}</Text></View>}
                        <View style={styles.chip}><Text style={styles.chipText}>{vehicle.type}</Text></View>
                    </View>

                    {/* Reviews */}
                    {reviews.length > 0 && (
                        <View style={styles.reviewsSection}>
                            <Text style={styles.sectionTitle}>Reviews ({vehicle.total_reviews})</Text>
                            {reviews.slice(0, 5).map((review) => (
                                <View key={review.id} style={styles.reviewItem}>
                                    <View style={styles.reviewHeader}>
                                        <Text style={styles.reviewerName}>{review.reviewer?.full_name}</Text>
                                        <View style={styles.starsRow}>
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Icon key={i} name={i < review.rating ? 'star' : 'star-outline'} size={14} color={Colors.rating} />
                                            ))}
                                        </View>
                                    </View>
                                    {review.comment && <Text style={styles.reviewComment}>{review.comment}</Text>}
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Sticky Bottom Bar */}
            {vehicle.availability && vehicle.status === 'ACTIVE' && (
                <View style={[styles.bottomBar, Shadows.bottomTab]}>
                    <View>
                        <Text style={styles.bottomPrice}>{formatCurrency(vehicle.per_hour_cost)}<Text style={styles.bottomPriceUnit}>/hr</Text></Text>
                    </View>
                    <AppButton label="Book Now" onPress={() => navigation.navigate('BookingForm', { vehicleId: vehicle.id })} icon="calendar-check" fullWidth={false} style={{ paddingHorizontal: 32 }} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    heroContainer: { height: 280, backgroundColor: Colors.surfaceVariant, position: 'relative' },
    heroImage: { width: 400, height: 280 },
    heroPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    backButton: { position: 'absolute', top: Spacing.xxxl, left: Spacing.md, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
    content: { padding: Spacing.md, paddingBottom: 100 },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.sm },
    titleLeft: { flex: 1 },
    vehicleName: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.textPrimary },
    metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    typeBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primaryLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: BorderRadius.sm, marginRight: Spacing.xs },
    typeText: { fontFamily: FontFamily.medium, fontSize: FontSize.xs, color: Colors.primary, marginLeft: 4 },
    brandText: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted },
    ratingBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.warningLight, paddingHorizontal: 10, paddingVertical: 6, borderRadius: BorderRadius.sm },
    ratingText: { fontFamily: FontFamily.bold, fontSize: FontSize.md, color: Colors.textPrimary, marginLeft: 4 },
    reviewCountText: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted, marginLeft: 2 },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
    locationText: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary, marginLeft: 4 },
    card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.md },
    ownerRow: { flexDirection: 'row', alignItems: 'center' },
    ownerAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surfaceVariant, justifyContent: 'center', alignItems: 'center', marginRight: Spacing.sm },
    ownerName: { fontFamily: FontFamily.semiBold, fontSize: FontSize.base, color: Colors.textPrimary },
    ownerLabel: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted },
    priceCard: { flexDirection: 'row', backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.md },
    priceItem: { flex: 1, alignItems: 'center' },
    priceLabel: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted },
    priceValue: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.primary, marginTop: 4 },
    priceDivider: { width: 1, backgroundColor: Colors.divider },
    chipsRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: Spacing.md },
    chip: { backgroundColor: Colors.surfaceVariant, paddingHorizontal: 12, paddingVertical: 6, borderRadius: BorderRadius.full, marginRight: 8, marginBottom: 8 },
    chipText: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.textSecondary },
    reviewsSection: { marginTop: Spacing.sm },
    sectionTitle: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.textPrimary, marginBottom: Spacing.sm },
    reviewItem: { backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.sm, marginBottom: Spacing.xs },
    reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    reviewerName: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.textPrimary },
    starsRow: { flexDirection: 'row' },
    reviewComment: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary },
    bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Colors.surface, padding: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.divider },
    bottomPrice: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.textPrimary },
    bottomPriceUnit: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted },
});

export default VehicleDetailScreen;
