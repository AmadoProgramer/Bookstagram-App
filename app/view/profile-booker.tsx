
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from '@/components/navbar';

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  genre: string;
}

export default function Profile() {
  const books: Book[] = [
    {
      id: '1',
      title: 'Harry Potter Y la P',
      author: 'BestSeller',
      cover: 'https://images.unsplash.com/photo-1621351183012-e2f3db3a5330?w=300',
      rating: 5,
      genre: 'Fantasy',
    },
    {
      id: '2',
      title: 'Four: A Divergent Collection',
      author: 'Verónica Roth',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300',
      rating: 4,
      genre: 'Science Fiction',
    },
    {
      id: '3',
      title: 'El Gato Negro',
      author: 'Edgar Allan Poe',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300',
      rating: 3,
      genre: 'Terrorific',
    },
    {
      id: '4',
      title: 'Comer, Rezar y A.',
      author: 'Elizabeth Gilbert',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300',
      rating: 4,
      genre: 'Drama',
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Text key={star} style={styles.star}>
            {star <= rating ? '⭐' : '☆'}
          </Text>
        ))}
      </View>
    );
  };

  const renderBookCard = (book: Book) => (
    <View key={book.id} style={styles.bookCard}>
      <Image
        style={styles.bookCover}
        source={{ uri: book.cover }}
        contentFit="cover"
      />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookGenre}>{book.genre}</Text>
        {renderStars(book.rating)}
        <Text style={styles.bookAuthor}>{book.author}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#7dc5c0', '#FFECEC']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.navbar}><Navbar/></View>
        
        <View style={styles.profileSection}>
          <Image
            style={styles.avatar}
            source={require("@/assets/images/Captura de pantalla 2025-11-19 a la(s) 5.05.03 p.m. 1.png")}
          />
          
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>103</Text>
              <Text style={styles.statLabel}>Libros</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>11k</Text>
              <Text style={styles.statLabel}>Seguidores</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Seguidos</Text>
            </View>
          </View>

          <Text style={styles.userName}>Daniel 23</Text>
          
          <View style={styles.badgeContainer}>
            <Text style={styles.badge}>Expert Booker⚡</Text>
            <View style={styles.levelIndicators}>
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <View
                  key={level}
                  style={[
                    styles.levelDot,
                    level <= 4 && styles.levelDotActive,
                  ]}
                />
              ))}
            </View>
          </View>

          <Text style={styles.bio}>
            Soy un lector apasionado que le gusta la literatura de economía y proyectos de crecimiento... 📚
          </Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageButtonText}>Message Him</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.booksSection}>
          <Text style={styles.sectionTitle}>Libros Favoritos</Text>
          {books.map(renderBookCard)}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar:{
    width: 200,
    marginTop:30,
    padding:30
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: (StatusBar.currentHeight || 0) + 10,
    paddingBottom: 10,
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 14,
  },
  hamburger: {
    gap: 3,
  },
  line: {
    width: 20,
    height: 2.5,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 15,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  badge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  levelIndicators: {
    flexDirection: 'row',
    gap: 5,
  },
  levelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
  },
  levelDotActive: {
    backgroundColor: '#000',
  },
  bio: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  messageButton: {
    backgroundColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  messageButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  followButton: {
    backgroundColor: '#FFF',
    width: 45,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followIcon: {
    fontSize: 18,
  },
  moreButton: {
    backgroundColor: '#FFF',
    width: 45,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  booksSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookCover: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 15,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  bookGenre: {
    fontSize: 13,
    color: '#666',
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  star: {
    fontSize: 14,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#999',
  },
});