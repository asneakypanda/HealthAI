import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, Button } from 'react-native';

interface PlanItemProps {
    plan: string;
    name: string;
    onUpdate: (text: string) => void;
    onDelete: () => void;
}

const PlanItem: React.FC<PlanItemProps> = ({ plan, name, onUpdate, onDelete }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [editText, setEditText] = useState(plan);

    // Update internal state when external plan changes
    useEffect(() => {
        setEditText(plan);
    }, [plan]);

    const handleSave = () => {
        onUpdate(editText);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>{name}</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.textInput}
                        multiline
                        value={editText}
                        onChangeText={setEditText}
                    />
                    <Button title="Save" onPress={handleSave} />
                    <Button title="Delete" color="red" onPress={onDelete} />
                    <Button title="Cancel" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 50,
        width: '90%', // Set modal width to 90% of the screen width
        maxHeight: '90%' // Set modal max height to 90% of the screen height
    },
    textInput: {
        height: '80%', // Increase the height to take 80% of the modal view
        width: '100%', // Increase the width to take full width of the modal view
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    }
});

export default PlanItem;
