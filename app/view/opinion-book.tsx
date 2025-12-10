// screens/BookOpinions.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Navbar from "@/components/navbar";

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  userLevel: string;
  rating: number;
  comment: string;
  date: string;
}

export default function BookOpinions() {
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
            source={require("@/assets/images/Captura de pantalla 2025-11-19 a la(s) 5.05.03 p.m. 1.png")}
            contentFit="cover"
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
  headerAvatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
  iconButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    height: 35,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 18,
    paddingHorizontal: 15,
    fontSize: 13,
  },
  hamburger: {
    gap: 2.5,
  },
  line: {
    width: 18,
    height: 2,
    backgroundColor: "#000",
    borderRadius: 1,
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
  bookmarkButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  bookmarkIcon: {
    fontSize: 22,
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
