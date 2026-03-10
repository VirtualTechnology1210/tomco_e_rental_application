import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, RefreshControl } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationItemCard from '../../components/notification/NotificationItem';
import AppLoader from '../../components/common/AppLoader';
import AppEmpty from '../../components/common/AppEmpty';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';
import { notificationApi } from '../../api/notificationApi';
import { UserProfileScreenProps } from '../../types/navigation.types';
import { NotificationItem } from '../../types/api.types';

const NotificationsScreen: React.FC<UserProfileScreenProps<'Notifications'>> = ({ navigation }) => {
    const queryClient = useQueryClient();
    const { data, isLoading, refetch, isRefetching } = useQuery({
        queryKey: ['notifications'],
        queryFn: () => notificationApi.getNotifications({ limit: 50 }),
    });
    const markReadMutation = useMutation({
        mutationFn: () => notificationApi.markAllRead(),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
    });
    const notifications: NotificationItem[] = data?.data || [];
    const renderItem = useCallback(({ item }: { item: NotificationItem }) => (
        <NotificationItemCard notification={item} onPress={() => { }} />
    ), []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>Notifications</Text>
                <TouchableOpacity onPress={() => markReadMutation.mutate()}>
                    <Text style={styles.markRead}>Mark all read</Text>
                </TouchableOpacity>
            </View>
            {isLoading ? <AppLoader /> : notifications.length === 0 ? (
                <AppEmpty icon="bell-off-outline" title="No notifications" subtitle="You're all caught up!" />
            ) : (
                <FlatList data={notifications} renderItem={renderItem} keyExtractor={(i) => i.id}
                    refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={Colors.primary} />} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingTop: Spacing.xl, paddingBottom: Spacing.sm },
    title: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.textPrimary, flex: 1, marginLeft: Spacing.sm },
    markRead: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.primary },
});

export default NotificationsScreen;
