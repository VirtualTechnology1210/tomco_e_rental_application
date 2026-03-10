import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows } from '../../theme';
import { formatCurrency, formatCompactCurrency } from '../../utils/costUtils';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: string;
    iconColor?: string;
    bgColor?: string;
    isCurrency?: boolean;
    onPress?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
    title, value, icon, iconColor = Colors.primary, bgColor = Colors.primaryLight,
    isCurrency = false, onPress,
}) => {
    const formattedValue = isCurrency ? formatCompactCurrency(value) : String(value);

    const content = (
        <View style={[styles.card, Shadows.card]}>
            <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
                <Icon name={icon} size={22} color={iconColor} />
            </View>
            <Text style={styles.value}>{formattedValue}</Text>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    if (onPress) {
        return <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.wrapper}>{content}</TouchableOpacity>;
    }

    return <View style={styles.wrapper}>{content}</View>;
};

const styles = StyleSheet.create({
    wrapper: { width: '48%', marginBottom: Spacing.sm },
    card: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.md, alignItems: 'center' },
    iconBox: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.xs },
    value: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.textPrimary },
    title: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2, textAlign: 'center' },
});

export default StatCard;
