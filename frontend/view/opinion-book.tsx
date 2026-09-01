import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
} from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from "../components/navbar";

type OpinionBookScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OpinionBook'>;

interface Props {
  navigation: OpinionBookScreenNavigationProp;
}

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  userLevel: string;
  rating: number;
  comment: string;
  date: string;
}

export default function OpinionBookScreen({ navigation }: Props) {
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("Opiniones");

  const reviews: Review[] = [
    {
      id: "1",
      userName: "Adriana Lopez",
      userAvatar: "https://i.pravatar.cc/150?img=45",
      userLevel: "Medium Booker✓",
      rating: 4,
      comment: '"Me encantó, me hizo llorar!....."',
      date: "Dec 12th",
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <View
            key={star}
            style={[
              styles.starCircle,
              star <= rating && styles.starCircleActive,
            ]}
          >
            <Text style={styles.starText}>⭐</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#92e2dbff", "#FFECEC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Navbar />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.bookSection}>
          <Image
            style={styles.bookCover}
             source={{
              uri: "data:image/jpeg;base64,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",
            }}
            resizeMode="cover"
          />
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Libros</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>220k</Text>
              <Text style={styles.statLabel}>Seguidores</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50</Text>
              <Text style={styles.statLabel}>seguidos</Text>
            </View>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.bookAuthor}>Juan_23</Text>
            <Text style={styles.userLevel}>Beginner Booker✓</Text>
            {renderStars(4)}
          </View>
        </View>
        <View style={styles.tabs}>
          {["Opiniones", "Libros", "Seguidores"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>
            La Casa en la Montaña - James Brown 2025
          </Text>
          <Text style={styles.bookDescription}>
            La familia Brown llega a Kansas buscando un nuevo rumbo para sus
            vidas, pero todo cambia con la aparición de Joe. Pronto deberán
            tomar decisiones drásticas y ubicar su nuevo hogar...
          </Text>
          <Text style={styles.language}>
            Language: <Text style={styles.languageValue}>Español</Text>
          </Text>
        </View>
        <View style={styles.reviewsSection}>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image
                  style={styles.reviewAvatar}
                  source={{ uri: review.userAvatar }}
                />
                <View style={styles.reviewUserInfo}>
                  <Text style={styles.reviewUserName}>{review.userName}</Text>
                  <Text style={styles.reviewUserLevel}>{review.userLevel}</Text>
                  <View style={styles.reviewStars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <View
                        key={star}
                        style={[
                          styles.reviewStarCircle,
                          star <= review.rating &&
                            styles.reviewStarCircleActive,
                        ]}
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
          <View style={styles.addCommentSection}>
            <Text style={styles.addCommentLabel}>Ingresar un comentario</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Escribe tu opinión..."
              placeholderTextColor="#999"
              value={comment}
              onChangeText={setComment}
              multiline
            />
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: 200,
    marginTop: 30,
    padding: 30,
    gap: 8,
  },
  content: {
    flex: 1,
  },
  bookSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  bookCover: {
    width: 120,
    height: 180,
    borderRadius: 12,
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: "row",
    gap: 40,
    marginBottom: 15,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  statLabel: {
    fontSize: 11,
    color: "#333",
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 10,
  },
  bookAuthor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 13,
    color: "#333",
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 5,
  },
  starCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
  },
  starCircleActive: {
    backgroundColor: "#FFD700",
  },
  starText: {
    fontSize: 12,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tabText: {
    fontSize: 13,
    color: "#666",
  },
  tabTextActive: {
    color: "#000",
    fontWeight: "bold",
  },
  bookDetails: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    marginTop: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  bookDescription: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    marginBottom: 10,
  },
  language: {
    fontSize: 13,
    color: "#666",
  },
  languageValue: {
    fontWeight: "bold",
    color: "#000",
  },
  reviewsSection: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    marginTop: 10,
  },
  reviewCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    marginRight: 12,
  },
  reviewUserInfo: {
    flex: 1,
  },
  reviewUserName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  reviewUserLevel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  reviewStars: {
    flexDirection: "row",
    gap: 3,
  },
  reviewStarCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#EEE",
  },
  reviewStarCircleActive: {
    backgroundColor: "#FFD700",
  },
  reviewDate: {
    fontSize: 11,
    color: "#999",
  },
  reviewComment: {
    fontSize: 14,
    color: "#333",
    fontStyle: "italic",
  },
  addCommentSection: {
    marginTop: 20,
  },
  addCommentLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  commentInput: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    minHeight: 80,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#DDD",
    marginBottom: 15,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});