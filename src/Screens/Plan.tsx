import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated,{useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
export function Plan() {

  const [data, setData] = React.useState([
    { id: "1", title: "Item sample 1" },
    { id: "2", title: "Item  saomple 2" },
    { id: "3", title: "Item  sample 3" },
    { id: "4", title: "Item  sample 4" },
    { id: "5", title: "Item  sample 5" },
    { id: "6", title: "Item  sample 6" },
  ]);

  const width=useSharedValue(100);

  const AnimatedStyles=useAnimatedStyle(()=>({
    width:width.value+10
  }))

  const deleteItem = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const renderRightActions = (id) => {
    return (
      <TouchableOpacity
        style={styles.deleteBox}
        onPress={() => deleteItem(id)}
      >
        <Text style={{ color: "white" }}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, drag, isActive }) => {

    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}
      friction={2}
      rightThreshold={90}
      >

        <View style={[
          styles.itemContainer,
          isActive && { backgroundColor: "#eee" }
        ]}>

          <TouchableOpacity
            onLongPress={drag}
            style={styles.dragIcon}
          >
    <MaterialIcons name="drag-indicator" color="#000" size={24} />
              </TouchableOpacity>

          <Text style={styles.text}>
            {item.title}
          </Text>

        </View>

      </Swipeable>
    );
  };

  return (
    <>
    <TouchableOpacity onPress={()=>{
      width.value+=5
    }}>
    <Animated.View style={[styles.dragBox,AnimatedStyles]}>
    </Animated.View>
    </TouchableOpacity>
    <DraggableFlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onDragEnd={({ data }) => setData(data)}
      />
      </>
  );
}

const styles = StyleSheet.create({

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    marginBottom: 5,
  },

  dragIcon: {
    paddingHorizontal: 10
  },

  text: {
    fontSize: 16,
  },

  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    minWidth:"30%"
  },

  dragBox:{
    height:150,
    backgroundColor:"#a487c2"
  }

});