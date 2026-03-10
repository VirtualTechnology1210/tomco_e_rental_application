import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLoader from '../../components/common/AppLoader';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows } from '../../theme';
import { bookingApi } from '../../api/bookingApi';
import { OwnerProfileScreenProps } from '../../types/navigation.types';
import { formatCurrency } from '../../utils/costUtils';

const EarningsScreen: React.FC<OwnerProfileScreenProps<'Earnings'>> = ({ navigation }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['earnings'],
        queryFn: () => bookingApi.getEarnings(),
    });
    const earnings = data?.data;
    if (isLoading) return <AppLoader message="Loading earnings..." />;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Earnings</Text>
                </View>

                <View style={[styles.totalCard, Shadows.card]}>
                    <Text style={styles.totalLabel}>Total Earnings</Text>
                    <Text style={styles.totalValue}>{formatCurrency(earnings?.total_earnings || 0)}</Text>
                </View>

                <Text style={styles.sectionTitle}>Monthly Breakdown</Text>
                {(earnings?.monthly_breakdown || []).map((m, i) => (
                    <View key={i} style={[styles.monthRow, Shadows.card]}>
                        <View>
                            <Text style={styles.monthLabel}>{m.month}</Text>
                            <Text style={styles.monthBookings}>{m.booking_count} bookings</Text>
                        </View>
                        <Text style={styles.monthTotal}>{formatCurrency(m.total)}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    scroll: { padding: Spacing.md, paddingBottom: Spacing.massive },
    header: { flexDirection: 'row', alignItems: 'center', paddingTop: Spacing.lg, marginBottom: Spacing.md },
    headerTitle: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.textPrimary, marginLeft: Spacing.sm },
    totalCard: { backgroundColor: Colors.ownerAccent, borderRadius: BorderRadius.lg, padding: Spacing.xl, alignItems: 'center', marginBottom: Spacing.lg },
    totalLabel: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)' },
    totalValue: { fontFamily: FontFamily.bold, fontSize: FontSize.xxxl, color: Colors.white, marginTop: Spacing.xs },
    sectionTitle: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.textPrimary, marginBottom: Spacing.sm },
    monthRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.xs },
    monthLabel: { fontFamily: FontFamily.medium, fontSize: FontSize.base, color: Colors.textPrimary },
    monthBookings: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
    monthTotal: { fontFamily: FontFamily.bold, fontSize: FontSize.md, color: Colors.ownerAccent },
});

export default EarningsScreen;
