import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store, persistor } from './store';
import RootNavigator from './navigation/RootNavigator';
import AppLoader from './components/common/AppLoader';
import { Colors } from './theme';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            refetchOnWindowFocus: false,
        },
    },
});

const App = () => {
    return (
        <GestureHandlerRootView style={styles.root}>
            <Provider store={store}>
                <PersistGate loading={<AppLoader message="Loading..." />} persistor={persistor}>
                    <QueryClientProvider client={queryClient}>
                        <SafeAreaView style={styles.container}>
                            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
                            <RootNavigator />
                        </SafeAreaView>
                        <Toast />
                    </QueryClientProvider>
                </PersistGate>
            </Provider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1 },
    container: { flex: 1, backgroundColor: Colors.background },
});

export default App;
