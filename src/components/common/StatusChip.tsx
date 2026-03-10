import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, FontFamily, FontSize, BorderRadius, Spacing, StatusColors } from '../../theme';

interface StatusChipProps {
    status: string;
    size?: 'sm' | 'md';
    style?: ViewStyle;
}

const StatusChip: React.FC<StatusChipProps> = ({ status, size = 'md', style }) => {
    const colorSet = StatusColors[status] || { bg: Colors.surfaceVariant, text: Colors.textSecondary };
    const fontSize = size === 'sm' ? FontSize.xs : FontSize.sm;
    const paddingH = size === 'sm' ? Spacing.xs : Spacing.sm;
    const paddingV = size === 'sm' ? 2 : 4;

    return (
        <View style={[styles.chip, { backgroundColor: colorSet.bg, paddingHorizontal: paddingH, paddingVertical: paddingV }, style]}>
            <View style={[styles.dot, { backgroundColor: colorSet.text }]} />
            <Text style={[styles.label, { color: colorSet.text, fontSize }]}>{status.replace(/_/g, ' ')}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: BorderRadius.full,
        alignSelf: 'flex-start',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    label: {
        fontFamily: FontFamily.semiBold,
        textTransform: 'capitalize',
    },
});

export default StatusChip;
