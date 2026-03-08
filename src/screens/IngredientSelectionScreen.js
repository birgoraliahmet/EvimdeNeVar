import React, { useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity,
    SafeAreaView, SectionList
} from 'react-native';
import ingredientsData from '../data/ingredients.json';

export default function IngredientSelectionScreen({ navigation }) {
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    // Transform data for SectionList
    const sections = ingredientsData.map(category => ({
        title: category.name,
        data: category.items,
    }));

    const toggleIngredient = (id) => {
        setSelectedIngredients(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const renderItem = ({ item }) => {
        const isSelected = selectedIngredients.includes(item.id);
        return (
            <TouchableOpacity
                style={[styles.itemContainer, isSelected && styles.itemSelected]}
                onPress={() => toggleIngredient(item.id)}
            >
                <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerInfo}>
                <Text style={styles.headerSubtitle}>
                    Elinizdeki malzemeleri seçin, size uygun tarifleri bulalım.
                </Text>
                <Text style={styles.selectedCount}>
                    Seçilen Malzeme: {selectedIngredients.length}
                </Text>
            </View>

            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={styles.listContent}
                stickySectionHeadersEnabled={false}
                // render inner items cleanly
                numColumns={2}
                columnWrapperStyle={{ flexWrap: 'wrap', flexDirection: 'row', paddingHorizontal: 10 }}
            // SectionList doesn't support numColumns directly like FlatList 
            // A workaround is to wrap items in rows inside the map or use FlatList 
            // But for simplicity, we will just render items as full width rows or wrap them.
            // Actually SectionList flat items are better rendered normally, we'll style itemContainer to look like chips.
            />

            {selectedIngredients.length > 0 && (
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => navigation.navigate('RecipeList', { selectedHeaders: selectedIngredients })}
                >
                    <Text style={styles.fabText}>Tarif Bul ({selectedIngredients.length})</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerInfo: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ebebeb',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    selectedCount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    listContent: {
        paddingBottom: 100, // Space for FAB
    },
    sectionHeader: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        marginTop: 10,
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    itemContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemSelected: {
        backgroundColor: '#FFcfcf', // Light red/pink indicating selected
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    itemTextSelected: {
        fontWeight: 'bold',
        color: '#d32f2f',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: '#FF6B6B',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    fabText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
