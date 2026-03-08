import React, { useMemo } from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView
} from 'react-native';
import recipesData from '../data/recipes.json';

export default function RecipeListScreen({ route, navigation }) {
    // Check the passed param name, it was selectedHeaders in IngredientSelectionScreen
    const selectedIngredients = route.params?.selectedHeaders || [];

    const sortedRecipes = useMemo(() => {
        const list = recipesData.map(recipe => {
            const totalIngredients = recipe.ingredients.length;
            let matchCount = 0;

            recipe.ingredients.forEach(ing => {
                if (selectedIngredients.includes(ing.id)) {
                    matchCount++;
                }
            });

            const matchPercentage = totalIngredients > 0
                ? Math.round((matchCount / totalIngredients) * 100)
                : 0;

            return {
                ...recipe,
                matchCount,
                totalIngredients,
                matchPercentage
            };
        });

        // Sort by descending percentage
        return list.sort((a, b) => b.matchPercentage - a.matchPercentage);
    }, [selectedIngredients]);

    const renderRecipeItem = ({ item }) => {
        let matchColor = '#4CAF50'; // Green for 100%
        if (item.matchPercentage < 100 && item.matchPercentage >= 50) {
            matchColor = '#FF9800'; // Orange for >50%
        } else if (item.matchPercentage < 50) {
            matchColor = '#F44336'; // Red for <50%
        }

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
            >
                <Image
                    source={{ uri: item.image }}
                    style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                    <Text style={styles.recipeName}>{item.name}</Text>
                    <Text style={styles.recipeInfo}>
                        {item.prepTime} hazırlık • {item.cookTime} pişirme
                    </Text>
                    <View style={[styles.matchBadge, { backgroundColor: matchColor }]}>
                        <Text style={styles.matchText}>
                            %{item.matchPercentage} Eşleşme ({item.matchCount}/{item.totalIngredients})
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={sortedRecipes}
                keyExtractor={(item) => item.id}
                renderItem={renderRecipeItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Henüz bir tarif bulunamadı.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContent: {
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    cardImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 15,
    },
    recipeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    recipeInfo: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    matchBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    matchText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    }
});
