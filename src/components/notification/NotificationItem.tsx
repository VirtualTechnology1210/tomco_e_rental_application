import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius } from '../../theme';
import { NotificationItem } from '../../types/api.types';
import { formatRelativeTime } from '../../utils/dateUtils';

const notifIcons: Record<string, { icon: string; color: string }> = {
    BOOKING_REQUEST: { icon: 'bell-ring', color: Colors.warning },
    BOOKING_ACCEPTED: { icon: 'check-circle', color: Colors.success },
    BOOKING_REJECTED: { icon: 'close-circle', color: Colors.danger },
    SYSTEM: { icon: 'information', color: Colors.primary },
    PAYMENT: { icon: 'cash', color: Colors.success },
};

interface NotificationItemCardProps {
    notification: NotificationItem;
    onPress: () => void;
}

const NotificationItemCard: React.FC<NotificationItemCardProps> = ({ notification, onPress }) => {
    const { icon, color } = notifIcons[notification.type] || notifIcons.SYSTEM;

    return (
        <TouchableOpacity
            style={[styles.container, !notification.is_read && styles.unread]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {!notification.is_read && <View style={styles.unreadBar} />}
            <View style={[styles.iconBox, { backgroundColor: `${color}20` }]}>
                <Icon name={icon} size={20} color={color} />
            </View>
            <View style={styles.content}>
                <Text style={[styles.title, !notification.is_read && styles.titleUnread]} numberOfLines={1}>
                    {notification.title}
                </Text>
                {notification.body && (
                    <Text style={styles.body} numberOfLines={2}>{notification.body}</Text>
                )}
                <Text style={styles.time}>{formatRelativeTime(notification.created_at)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: Colors.surface,
        padding: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: Colors.divider,
        position: 'relative',
    },
    unread: { backgroundColor: Colors.primaryLight },
    unreadBar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        backgroundColor: Colors.primary,
    },
    iconBox: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: Spacing.sm },
    content: { flex: 1 },
    title: { fontFamily: FontFamily.medium, fontSize: FontSize.base, color: Colors.textPrimary },
    titleUnread: { fontFamily: FontFamily.bold },
    body: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
    time: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 4 },
});

export default NotificationItemCard;
