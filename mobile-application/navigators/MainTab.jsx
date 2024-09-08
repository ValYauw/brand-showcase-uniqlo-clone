import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import ProductsStack from '../navigators/ProductsStack';
import Categories from '../views/Categories';
import Wishlist from '../views/Wishlist';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Products" 
        component={ProductsStack} 
        options={sharedTabOptions('home')}
      >
      </Tab.Screen>
      <Tab.Screen 
        name="Category" 
        component={Categories} 
        options={sharedTabOptions('text-search', 'material')}
      />
      <Tab.Screen 
        name="Wishlist" 
        component={Wishlist} 
        options={sharedTabOptions('heart')}
      />
    </Tab.Navigator>
  )
}

const sharedTabOptions = (icon, iconType) => ({
  tabBarIcon: ({ focused, color, size }) => {
    if (iconType === 'material') {
      return (
        <MaterialCommunityIcons 
          name={icon} 
          size={24} 
          color={focused ? "black" : "#c2c2c2"} 
        />
      );
    } else {
      return (
        <Ionicons
          name={icon}
          color={focused ? "black" : "#c2c2c2"}
          size={size}
        />
      );
    }
  }
})
