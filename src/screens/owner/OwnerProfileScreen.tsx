import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows, Layout } from '../../theme';
import { OwnerProfileScreenProps } from '../../types/navigation.types';

const OwnerProfileScreen: React.FC<OwnerProfileScreenProps<'OwnerProfileMain'>> = ({ navigation }) => {
    const { user, logout } = useAuth();

    const menuItems = [
        { icon: 'account-edit', label: 'Edit Profile', onPress: () => navigation.navigate('OwnerEditProfile'), color: Colors.ownerAccent },
        { icon: 'shield-check', label: 'Owner Verification', onPress: () => navigation.navigate('OwnerProfileSetup'), color: Colors.primary },
        { icon: 'cash-multiple', label: 'Earnings', onPress: () => navigation.navigate('Earnings'), color: Colors.success },
        { icon: 'bell-outline', label: 'Notifications', onPress: () => navigation.navigate('OwnerNotifications'), color: Colors.warning },
        { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => { }, color: Colors.textSecondary },
        { icon: 'logout', label: 'Logout', onPress: logout, color: Colors.danger },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.profileSection}>
                    <View style={styles.avatar}><Icon name="account" size={40} color={Colors.textMuted} /></View>
                    <Text style={styles.name}>{user?.full_name || 'Owner'}</Text>
                    <Text style={styles.phone}>{user?.phone}</Text>
                    <View style={styles.roleBadge}><Icon name="key-variant" size={14} color={Colors.ownerAccent} /><Text style={styles.roleText}>Vehicle Owner</Text></View>
                </View>
                <View style={[styles.menuCard, Shadows.card]}>
                    {menuItems.map((item, i) => (
                        <TouchableOpacity key={item.label} style={[styles.menuItem, i < menuItems.length - 1 && styles.menuBorder]} onPress={item.onPress}>
                            <Icon name={item.icon} size={22} color={item.color} />
                            <Text style={[styles.menuLabel, item.label === 'Logout' && { color: Colors.danger }]}>{item.label}</Text>
                            <Icon name="chevron-right" size={20} color={Colors.textMuted} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    scroll: { paddingBottom: Spacing.massive },
    profileSection: { alignItems: 'center', paddingTop: Spacing.xxxl, paddingBottom: Spacing.xl },
    avatar: { width: Layout.avatarSizeXl, height: Layout.avatarSizeXl, borderRadius: Layout.avatarSizeXl / 2, backgroundColor: Colors.ownerAccentLight, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: Colors.ownerAccent },
    name: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.textPrimary, marginTop: Spacing.sm },
    phone: { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: Colors.textSecondary, marginTop: 4 },
    roleBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.ownerAccentLight, paddingHorizontal: 12, paddingVertical: 4, borderRadius: BorderRadius.full, marginTop: Spacing.xs },
    roleText: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.ownerAccent, marginLeft: 4 },
    menuCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, marginHorizontal: Spacing.md },
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: Spacing.md },
    menuBorder: { borderBottomWidth: 1, borderBottomColor: Colors.divider },
    menuLabel: { fontFamily: FontFamily.medium, fontSize: FontSize.base, color: Colors.textPrimary, flex: 1, marginLeft: Spacing.sm },
});

export default OwnerProfileScreen;
