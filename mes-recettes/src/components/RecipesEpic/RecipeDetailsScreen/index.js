import React from "react";
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, ScrollView, FlatList } from "react-native";
import store from '../../../redux/store';

const RecipesDetailsScreen = ({ route, navigation }) => {
  const { dispatch } = store;

  const item = route.params.itemkey

  const recipe = store.getState().recipesList.find(r => r.id === item);

  console.log(recipe);


  // Use only distincts ingredients
  const ingredients = [];
  if (recipe.extendedIngredients && recipe.extendedIngredients.length) {
    for(let i=0, f=[], l=recipe.extendedIngredients.length;  i<l; i++) {
        if(f[recipe.extendedIngredients[i].id]) continue;
        f[recipe.extendedIngredients[i].id] = true;
        ingredients.push(recipe.extendedIngredients[i]);
    }
  }

  // Use only distincts instructions steps
  const instructions = [];
  if (recipe.analyzedInstructions 
      && recipe.analyzedInstructions.length 
      && recipe.analyzedInstructions[0].steps 
      && recipe.analyzedInstructions[0].steps.length) {
        for(let i=0, f=[], l=recipe.analyzedInstructions[0].steps.length; i<l; i++) {
            if(f[recipe.analyzedInstructions[0].steps[i].number]) continue;
            f[recipe.analyzedInstructions[0].steps[i].number] = true;
            instructions.push(recipe.analyzedInstructions[0].steps[i]);
        }
  }


  // INGREDIENTS
  // For extendedIngredients...
  // extendedIngredients.name
  // extendedIngredients.image
  // extendedIngredients.measures.metric.amount
  // extendedIngredients.measures.metric.unitShort

  // INSTRUCTIONS
  // For analyzedInstructions...
  // analyzedInstructions.steps.step

  //https://spoonacular.com/cdn/ingredients_100x100/[...]


  // recipe.analyzedInstructions[0].steps.map((step) => {
  //   console.log(step.step)
  // });

  return (
    <View style={styles.container}>
        <Text style={styles.mainTitle}>{recipe.title}</Text>
        <Image source={{ uri: recipe.image }} style={styles.img} />
        <Text style={styles.summary}>{recipe.summary.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
        <Text style={styles.lowTitle}> Ingredients: </Text>
        <FlatList data={ingredients} style={styles.lists} contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) =>
            <View style={styles.ingredient}>
              <Image source={{ uri: "https://spoonacular.com/cdn/ingredients_100x100/" + item.image }} style={styles.tinyImg} />
              <View style={styles.ingredientDesc}>
                <Text style={styles.ingredientName}>{item.name}</Text>
                <Text>{item.measures.metric.amount}{item.measures.metric.unitShort}</Text>
              </View>
            </View>
          }
          keyExtractor={(item) => "ingredient_" + item.id} />
          <Text style={styles.lowTitle}> Instructions: </Text>
        <FlatList data={instructions} style={styles.lists} contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) =>
            <View style={styles.instruction}>
              <View  style={styles.instructionNumberContainer}><Text style={styles.instructionNumber}>{item.number + '.'}</Text></View>
              <Text style={styles.instructionName}>{item.step}</Text>
            </View>
          }
          keyExtractor={(item) => "step_" + item.number} />

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  lists: {
    flex: 1,
    paddingBottom: 1,
    height: "fit-content",
    marginBottom: 25
  },
  ingredient: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10
  },
  ingredientDesc: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  ingredientName: {
    fontWeight: 'bold',
    textTransform: "capitalize"
  },
  instruction: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "flex-start",
    textAlign: "left",
  },
  instructionNumberContainer: {
    maxWidth: 60,
    width: 60,
    paddingLeft: 20,
    textAlign: "left",
  },
  instructionName: {
    // paddingLeft: 50
  },
  instructionNumber: {
    fontWeight: 'bold',
  },
  mainTitle: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lowTitle: {
    fontSize: 20,
    marginBottom: 15,
    width: "100%"
  },
  img: {
    height: 200,
    width: '50%',
    maxHeight: 200,
    maxWidth: "50%",
  },
  tinyImg: {
    height: 30,
    width: 30,
    marginRight: 20
  },
  summary: {
    fontStyle: 'italic',
    fontSize: 13,
    margin: 30,
    lineHeight: 17,
  }
});


const mapToProps = (state) => {
  return {
    data: state.recipesDetailsScreen
  }
};

export default connect(mapToProps)(RecipesDetailsScreen);
