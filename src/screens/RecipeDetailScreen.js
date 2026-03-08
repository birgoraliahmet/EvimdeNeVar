import React from 'react';
import {
    View, Text, StyleSheet, ScrollView, Image, SafeAreaView
} from 'react-native';
import ingredientsData from '../data/ingredients.json';

export default function RecipeDetailScreen({ route }) {
    const { recipe } = route.params;

    // Helper to get ingredient name from ID
    const getIngredientName = (id) => {
        for (let category of ingredientsData) {
            const found = category.items.find(item => item.id === id);
            if (found) return found.name;
        }
        return id; // fallback
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Image
                    source={{ uri: recipe.image }}
                    style={styles.image}
                />

                <View style={styles.header}>
                    <Text style={styles.title}>{recipe.name}</Text>
                    <View style={styles.infoRow}>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>Hazırlık</Text>
                            <Text style={styles.infoValue}>{recipe.prepTime}</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>Pişirme</Text>
                            <Text style={styles.infoValue}>{recipe.cookTime}</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>Porsiyon</Text>
                            <Text style={styles.infoValue}>{recipe.servings}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Malzemeler</Text>
                    {recipe.ingredients.map((ing, index) => (
                        <View key={index} style={styles.ingredientRow}>
                            <Text style={styles.bulletPoint}>•</Text>
                            <Text style={styles.ingredientText}>
                                <Text style={styles.ingredientName}>{getIngredientName(ing.id)}</Text>: {ing.amount}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Hazırlanışı</Text>
                    {recipe.steps.map((step, index) => (
                        <View key={index} style={styles.stepRow}>
                            <View style={styles.stepNumberBadge}>
                                <Text style={styles.stepNumberText}>{index + 1}</Text>
                            </View>
                            <Text style={styles.stepText}>{step}</Text>
                        </View>
                    ))}
                </View>

                {/* Padding for bottom */}
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoBox: {
        alignItems: 'center',
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6B6B',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    ingredientRow: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'flex-start',
    },
    bulletPoint: {
        fontSize: 16,
        color: '#FF6B6B',
        marginRight: 10,
    },
    ingredientText: {
        fontSize: 16,
        color: '#444',
        flex: 1,
    },
    ingredientName: {
        fontWeight: 'bold',
    },
    stepRow: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    stepNumberBadge: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: '#FF6B6B',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        marginTop: 2,
    },
    stepNumberText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    stepText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
        flex: 1,
    }
});
