import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, FontFamily, FontSize, BorderRadius, Layout, Spacing } from '../../theme';

interface AppInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    leftIcon?: string;
    rightIcon?: string;
    onRightIconPress?: () => void;
    multiline?: boolean;
    numberOfLines?: number;
    hint?: string;
    disabled?: boolean;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'decimal-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    maxLength?: number;
    containerStyle?: ViewStyle;
    onBlur?: () => void;
}

const AppInput: React.FC<AppInputProps> = ({
    label, value, onChangeText, error, placeholder, secureTextEntry = false,
    leftIcon, rightIcon, onRightIconPress, multiline = false, numberOfLines = 1,
    hint, disabled = false, keyboardType = 'default', autoCapitalize = 'sentences',
    maxLength, containerStyle, onBlur,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isSecureVisible, setIsSecureVisible] = useState(!secureTextEntry);

    const borderColor = error ? Colors.danger : isFocused ? Colors.primary : Colors.border;

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.label, error && { color: Colors.danger }]}>{label}</Text>
            <View style={[styles.inputContainer, { borderColor }, disabled && styles.disabled]}>
                {leftIcon && (
                    <Icon name={leftIcon} size={20} color={Colors.textMuted} style={styles.leftIcon} />
                )}
                <TextInput
                    style={[
                        styles.input,
                        leftIcon && { paddingLeft: 0 },
                        multiline && { height: numberOfLines * 22, textAlignVertical: 'top' },
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder || label}
                    placeholderTextColor={Colors.textMuted}
                    secureTextEntry={secureTextEntry && !isSecureVisible}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    editable={!disabled}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setIsFocused(false);
                        onBlur?.();
                    }}
                />
                {secureTextEntry && (
                    <TouchableOpacity onPress={() => setIsSecureVisible(!isSecureVisible)} style={styles.rightIcon}>
                        <Icon name={isSecureVisible ? 'eye-off' : 'eye'} size={20} color={Colors.textMuted} />
                    </TouchableOpacity>
                )}
                {rightIcon && !secureTextEntry && (
                    <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
                        <Icon name={rightIcon} size={20} color={Colors.textMuted} />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
            {hint && !error && <Text style={styles.hint}>{hint}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: Spacing.md },
    label: {
        fontFamily: FontFamily.medium,
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        marginBottom: Spacing.xxs,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.surface,
        minHeight: Layout.inputHeight,
        paddingHorizontal: Spacing.sm,
    },
    input: {
        flex: 1,
        fontFamily: FontFamily.regular,
        fontSize: FontSize.base,
        color: Colors.textPrimary,
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.xs,
    },
    leftIcon: { marginRight: Spacing.xs },
    rightIcon: { padding: Spacing.xxs },
    error: {
        fontFamily: FontFamily.regular,
        fontSize: FontSize.xs,
        color: Colors.danger,
        marginTop: Spacing.xxs,
    },
    hint: {
        fontFamily: FontFamily.regular,
        fontSize: FontSize.xs,
        color: Colors.textMuted,
        marginTop: Spacing.xxs,
    },
    disabled: { backgroundColor: Colors.surfaceVariant, opacity: 0.6 },
});

export default AppInput;
