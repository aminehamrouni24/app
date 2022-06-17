import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./navigation/tabs";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./stores/rootReducer";
import Splash from "./screens/Splash";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Authentication from "./screens/Authentication";
import OnBoarding from "./screens/OnBoarding";
import NfcTag from "./screens/NfcTag";

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Splash"}
        >

          <Stack.Screen name="MainLayout" component={Tabs} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Authentication" component={Authentication} />
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="NfcTag" component={NfcTag} />








        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
