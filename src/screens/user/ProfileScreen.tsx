import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useQuery } from '@tanstack/react-query';
import AppLoader from '../../components/common/AppLoader';
import AppButton from '../../components/common/AppButton';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadows, Layout } from '../../theme';
import { userApi } from '../../api/userApi';
import { useAuth } from '../../hooks/useAuth';
import { UserProfileScreenProps } from '../../types/navigation.types';

const ProfileScreen: React.FC<UserProfileScreenProps<'ProfileMain'>> = ({ navigation }) => {
    const { user, logout } = useAuth();

    const { data, isLoading } = useQuery({
        queryKey: ['userProfile'],
        queryFn: () => userApi.getProfile(),
    });

    const profile = data?.data || user;

    const menuItems = [
        { icon: 'account-edit', label: 'Edit Profile', onPress: () => navigation.navigate('EditProfile'), color: Colors.primary },
        { icon: 'bell-outline', label: 'Notifications', onPress: () => navigation.navigate('Notifications'), color: Colors.warning },
        { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => { }, color: Colors.textSecondary },
        { icon: 'shield-lock-outline', label: 'Privacy Policy', onPress: () => { }, color: Colors.textSecondary },
        { icon: 'file-document-outline', label: 'Terms of Service', onPress: () => { }, color: Colors.textSecondary },
        { icon: 'logout', label: 'Logout', onPress: logout, color: Colors.danger },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                {/* Profile Header */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        {profile?.profile_image ? (
                            <View style={styles.avatar}><Icon name="account" size={40} color={Colors.textMuted} /></View>
                        ) : (
                            <View style={styles.avatar}><Icon name="account" size={40} color={Colors.textMuted} /></View>
                        )}
                    </View>
                    <Text style={styles.name}>{profile?.full_name || 'User'}</Text>
                    <Text style={styles.phone}>{profile?.phone}</Text>
                    {profile?.email && <Text style={styles.email}>{profile.email}</Text>}
                </View>

                {/* Menu */}
                <View style={[styles.menuCard, Shadows.card]}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={item.label} style={[styles.menuItem, index < menuItems.length - 1 && styles.menuBorder]} onPress={item.onPress}>
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
    avatarContainer: { marginBottom: Spacing.sm },
    avatar: { width: Layout.avatarSizeXl, height: Layout.avatarSizeXl, borderRadius: Layout.avatarSizeXl / 2, backgroundColor: Colors.surfaceVariant, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: Colors.primary },
    name: { fontFamily: FontFamily.bold, fontSize: FontSize.xl, color: Colors.textPrimary },
    phone: { fontFamily: FontFamily.regular, fontSize: FontSize.base, color: Colors.textSecondary, marginTop: 4 },
    email: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textMuted, marginTop: 2 },
    menuCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, marginHorizontal: Spacing.md, overflow: 'hidden' },
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: Spacing.md },
    menuBorder: { borderBottomWidth: 1, borderBottomColor: Colors.divider },
    menuLabel: { fontFamily: FontFamily.medium, fontSize: FontSize.base, color: Colors.textPrimary, flex: 1, marginLeft: Spacing.sm },
});

export default ProfileScreen;
