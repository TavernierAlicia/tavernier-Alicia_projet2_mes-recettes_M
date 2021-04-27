import React, { useState } from "react";
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from 'axios';

import { connect } from 'react-redux';
import store from '../../../redux/store';
import { setList, getList } from '../../../redux/actions';




const RecipesListScreen = ({navigation}) => {
  const { dispatch } = store;

  const [dataList, setDataList] = useState([]); 

  const apiKey = "97f8a29cb34c4805a55b61511671b9fe";
  // const apiKey = "dd68efc2f07d44a5878a99ee6f503e27";

  const url = 'https://api.spoonacular.com/recipes/random?apiKey=' + apiKey + '&number=20';
  
  
  if (!store.getState().recipesList.length) {
    axios.get(url).then(res => {
      const tempList = res && res.data && res.data.recipes ? res.data.recipes : [];
        dispatch(setList(tempList));
        setTimeout(_ => setDataList(tempList), 500);
    }); 
  }
  

  return (
    <View style={styles.container}>
      <FlatList style={styles.listItem}
        data={dataList}
        keyExtractor={ (item) => "recipe_" + item.id }
        renderItem={({item}) => 
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Recipe Details', {itemkey: item.id})}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <Text>{item.title}</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    paddingLeft: 20
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  img: {
    height: 50,
    width: 50,
    marginRight: 30,
  }
});

const mapToProps = (state) => {
  return {
    data: state.recipesListScreen
  }
};

export default connect(mapToProps)(RecipesListScreen);
