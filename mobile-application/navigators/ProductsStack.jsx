import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from '../views/Products';
import ProductDetails from "../views/ProductDetails";

const Stack = createNativeStackNavigator();

export default function ProductsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Products}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={ProductDetails}
        initialParams={{}}
      />
    </Stack.Navigator>
  );
}