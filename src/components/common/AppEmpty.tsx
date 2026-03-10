import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';

interface AppEmptyProps {
    icon?: string;
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const AppEmpty: React.FC<AppEmptyProps> = ({ icon = 'inbox-outline', title, subtitle, action }) => (
    <View style={styles.container}>
        <Icon name={icon} size={64} color={Colors.textMuted} />
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {action && <View style={styles.action}>{action}</View>}
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: Spacing.xxl, paddingVertical: Spacing.massive },
    title: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.textPrimary, marginTop: Spacing.md, textAlign: 'center' },
    subtitle: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted, marginTop: Spacing.xs, textAlign: 'center' },
    action: { marginTop: Spacing.lg },
});

export default AppEmpty;
