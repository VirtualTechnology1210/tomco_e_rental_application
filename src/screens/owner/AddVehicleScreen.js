import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import AppButton from "../../components/common/AppButton";
import AppInput from "../../components/common/AppInput";
import { Colors, FontFamily, FontSize, Spacing, BorderRadius } from "../../theme";
import { createVehicleSchema } from "../../utils/validationSchemas";
import { vehicleApi } from "../../api/vehicleApi";
import { VEHICLE_TYPES } from "../../utils/constants";
const AddVehicleScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(createVehicleSchema),
    defaultValues: { type: "CAR", latitude: 17.385, longitude: 78.4867 }
  });
  const selectedType = watch("type");
  const mutation = useMutation({
    mutationFn: (data) => vehicleApi.addVehicle(data),
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Vehicle Added! \u{1F697}", text2: "Under review by admin." });
      queryClient.invalidateQueries({ queryKey: ["ownerVehicles"] });
      navigation.goBack();
    },
    onError: (e) => {
      Toast.show({ type: "error", text1: "Failed", text2: e.response?.data?.message || "Error" });
    }
  });
  return <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : void 0}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add Vehicle</Text>
                </View>

                {
    /* Step Indicator */
  }
                <View style={styles.steps}>
                    {[1, 2].map((s) => <View key={s} style={[styles.stepDot, step >= s && styles.stepDotActive]}>
                            <Text style={[styles.stepNum, step >= s && styles.stepNumActive]}>{s}</Text>
                        </View>)}
                </View>

                {step === 1 && <View>
                        <Text style={styles.stepTitle}>Basic Info</Text>
                        <Controller control={control} name="name" render={({ field: { onChange, value } }) => <AppInput label="Vehicle Name *" value={value || ""} onChangeText={onChange} error={errors.name?.message} leftIcon="car" />} />

                        <Text style={styles.label}>Vehicle Type *</Text>
                        <View style={styles.typeGrid}>
                            {VEHICLE_TYPES.map((t) => <TouchableOpacity
    key={t}
    style={[styles.typeChip, selectedType === t && styles.typeChipActive]}
    onPress={() => setValue("type", t)}
  >
                                    <Text style={[styles.typeText, selectedType === t && styles.typeTextActive]}>{t}</Text>
                                </TouchableOpacity>)}
                        </View>

                        <Controller control={control} name="brand" render={({ field: { onChange, value } }) => <AppInput label="Brand" value={value || ""} onChangeText={onChange} leftIcon="tag" />} />
                        <Controller control={control} name="model" render={({ field: { onChange, value } }) => <AppInput label="Model" value={value || ""} onChangeText={onChange} leftIcon="tag-text" />} />
                        <Controller control={control} name="license_plate" render={({ field: { onChange, value } }) => <AppInput label="License Plate" value={value || ""} onChangeText={onChange} leftIcon="card-text" autoCapitalize="characters" />} />

                        <AppButton label="Next: Pricing" onPress={() => setStep(2)} iconRight="arrow-right" variant="primary" />
                    </View>}

                {step === 2 && <View>
                        <Text style={styles.stepTitle}>Pricing & Location</Text>
                        <Controller control={control} name="per_hour_cost" render={({ field: { onChange, value } }) => <AppInput label="Per Hour Cost (₹) *" value={value ? String(value) : ""} onChangeText={(t) => onChange(parseFloat(t) || 0)} error={errors.per_hour_cost?.message} leftIcon="cash" keyboardType="decimal-pad" />} />
                        <Controller control={control} name="per_day_cost" render={({ field: { onChange, value } }) => <AppInput label="Per Day Cost (₹) *" value={value ? String(value) : ""} onChangeText={(t) => onChange(parseFloat(t) || 0)} error={errors.per_day_cost?.message} leftIcon="cash-multiple" keyboardType="decimal-pad" />} />
                        <Controller control={control} name="location_name" render={({ field: { onChange, value } }) => <AppInput label="Location Name" value={value || ""} onChangeText={onChange} leftIcon="map-marker" placeholder="e.g. Banjara Hills, Hyderabad" />} />

                        <View style={styles.row}>
                            <TouchableOpacity style={styles.backStepBtn} onPress={() => setStep(1)}>
                                <Icon name="arrow-left" size={20} color={Colors.textPrimary} />
                                <Text style={styles.backStepText}>Back</Text>
                            </TouchableOpacity>
                        </View>

                        <AppButton label="Publish Vehicle" onPress={handleSubmit((d) => mutation.mutate(d))} loading={mutation.isPending} icon="check-circle" variant="secondary" />
                    </View>}
            </ScrollView>
        </KeyboardAvoidingView>;
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.md, paddingBottom: Spacing.massive },
  header: { flexDirection: "row", alignItems: "center", paddingTop: Spacing.lg, marginBottom: Spacing.md },
  headerTitle: { fontFamily: FontFamily.semiBold, fontSize: FontSize.md, color: Colors.textPrimary, marginLeft: Spacing.sm },
  steps: { flexDirection: "row", justifyContent: "center", marginBottom: Spacing.lg },
  stepDot: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.border, justifyContent: "center", alignItems: "center", marginHorizontal: 16 },
  stepDotActive: { backgroundColor: Colors.ownerAccent },
  stepNum: { fontFamily: FontFamily.bold, fontSize: FontSize.sm, color: Colors.textMuted },
  stepNumActive: { color: Colors.white },
  stepTitle: { fontFamily: FontFamily.semiBold, fontSize: FontSize.lg, color: Colors.textPrimary, marginBottom: Spacing.md },
  label: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: Spacing.xxs },
  typeGrid: { flexDirection: "row", flexWrap: "wrap", marginBottom: Spacing.md },
  typeChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border, marginRight: 8, marginBottom: 8 },
  typeChipActive: { backgroundColor: Colors.ownerAccent, borderColor: Colors.ownerAccent },
  typeText: { fontFamily: FontFamily.medium, fontSize: FontSize.sm, color: Colors.textSecondary },
  typeTextActive: { color: Colors.white },
  row: { marginBottom: Spacing.md },
  backStepBtn: { flexDirection: "row", alignItems: "center" },
  backStepText: { fontFamily: FontFamily.medium, fontSize: FontSize.base, color: Colors.textPrimary, marginLeft: 4 }
});
var AddVehicleScreen_default = AddVehicleScreen;
export {
  AddVehicleScreen_default as default
};
