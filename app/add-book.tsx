import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';

export default function AddBookScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [rating, setRating] = useState(0);


  const requestPermissions = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraPermission.status !== 'granted' || galleryPermission.status !== 'granted') {
      Alert.alert(
        'Permisos necesarios',
        'Necesitamos permisos para acceder a la cámara y galería'
      );
      return false;
    }
    return true;
  };

  const openCamera = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setModalVisible(false);

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const openGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setModalVisible(false);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleGuardarBorrador = () => {
    console.log('Guardando borrador...', { image, titulo, rating });
  };

  const handleAgregar = () => {
    console.log('Agregando libro...', { image, titulo, rating });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/images/Logo.png')} 
          style={styles.logo}
        />
      </View>
        <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Alex Avila</Text>
        </View>

        <TouchableOpacity 
          style={styles.imageContainer}
          onPress={() => setModalVisible(true)}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.bookImage} />
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Título del libro</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.label}>Puntuación</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity 
                  key={star}
                  onPress={() => setRating(star)}
                >
                  <Text style={styles.star}>
                    {star <= rating ? '★' : '☆'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Detalles del libro */}
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Genero del libro</Text>
            <Text style={styles.detailLabel}>Editorial</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Lenguaje</Text>
            <Text style={styles.detailLabel}>Fecha de Publicación</Text>
          </View>
          <Text style={styles.detailLabel}>Autor</Text>
        </View>

        {/* Descripción */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.descriptionPlaceholder}>
            DESCRIPCION DEL LIBRO NO MAYOR A 500 CARACTERES
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Link href= { "/" }>
          <Text style={styles.cancelButtonText}>✕ cancelar</Text>
          </Link>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleGuardarBorrador}
        >
          <Text style={styles.saveButtonText}>✓ Guardar Borrador</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAgregar}
        >
          <Text style={styles.addButtonText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar imagen</Text>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={openCamera}
            >
              <Text style={styles.modalButtonText}>📷 Tomar foto</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={openGallery}
            >
              <Text style={styles.modalButtonText}>🖼️ Elegir de galería</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8F3E8',
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badge: {
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: '#7B5FFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginTop: 10,
    overflow: 'hidden',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 60,
    color: '#000',
    fontWeight: '300',
  },
  bookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 5,
  },
  star: {
    fontSize: 20,
    color: '#FFD700',
    marginHorizontal: 2,
  },
  details: {
    marginTop: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
  },
  descriptionContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 15,
  },
  descriptionLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  descriptionPlaceholder: {
    fontSize: 12,
    color: '#999',
    lineHeight: 18,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignSelf:'center',
    marginTop: 20,
    width:300,
    paddingHorizontal: 40,
    gap:7
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#90EE90',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 14,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    color: '#FFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#F0F0F0',
    padding: 18,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  modalCancelButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 10,
  },
  modalCancelText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});