import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppButton from '../../components/common/AppButton';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows } from '../../theme';
import { AuthScreenProps } from '../../types/navigation.types';
import { UserRole } from '../../types/auth.types';
import { useDispatch } from 'react-redux';
import { setSelectedRole } from '../../store/slices/authSlice';
import { AppDispatch } from '../../store';

const roles: Array<{ role: UserRole; icon: string; title: string; subtitle: string; accent: string }> = [
    { role: 'USER', icon: 'car-key', title: 'I want to RENT a vehicle', subtitle: 'Search, book, and ride vehicles near you', accent: Colors.primary },
    { role: 'VEHICLE_OWNER', icon: 'key-variant', title: 'I want to LIST my vehicle', subtitle: 'Earn money by renting out your vehicles', accent: Colors.ownerAccent },
];

const RoleSelectScreen: React.FC<AuthScreenProps<'RoleSelect'>> = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selected, setSelected] = useState<UserRole | null>(null);

    const handleContinue = () => {
        if (!selected) return;
        dispatch(setSelectedRole(selected));
        navigation.navigate('Login', { role: selected });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
            <View style={styles.header}>
                <Text style={styles.title}>Welcome to E-Rental</Text>
                <Text style={styles.subtitle}>How would you like to use E-Rental?</Text>
            </View>

            <View style={styles.cards}>
                {roles.map((item) => (
                    <TouchableOpacity
                        key={item.role}
                        style={[
                            styles.card, Shadows.card,
                            selected === item.role && { borderColor: item.accent, borderWidth: 2 },
                        ]}
                        onPress={() => setSelected(item.role)}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.iconBox, { backgroundColor: `${item.accent}15` }]}>
                            <Icon name={item.icon} size={36} color={item.accent} />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                        </View>
                        <View style={[styles.radio, selected === item.role && { borderColor: item.accent }]}>
                            {selected === item.role && <View style={[styles.radioInner, { backgroundColor: item.accent }]} />}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.footer}>
                <AppButton
                    label="Continue"
                    onPress={handleContinue}
                    disabled={!selected}
                    iconRight="arrow-right"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: Spacing.xl },
    header: { marginTop: Spacing.massive, marginBottom: Spacing.xxl },
    title: { fontFamily: FontFamily.bold, fontSize: FontSize.xxl, color: Colors.textPrimary },
    subtitle: { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: Colors.textSecondary, marginTop: Spacing.xs },
    cards: { flex: 1, justifyContent: 'center' },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.md, borderWidth: 1.5, borderColor: Colors.transparent },
    iconBox: { width: 64, height: 64, borderRadius: BorderRadius.md, justifyContent: 'center', alignItems: 'center', marginRight: Spacing.md },
    cardContent: { flex: 1 },
    cardTitle: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.textPrimary },
    cardSubtitle: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted, marginTop: 2 },
    radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center' },
    radioInner: { width: 12, height: 12, borderRadius: 6 },
    footer: { paddingBottom: Spacing.xxxl },
});

export default RoleSelectScreen;
