import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from '@/components/navbar';


interface Chat {
  id: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
}

interface Story {
  id: string;
  userName: string;
  userAvatar: string;
}

export default function Messaging() {
  const stories: Story[] = [
    { id: '1', userName: 'James H.', userAvatar: 'https://i.pravatar.cc/150?img=12' },
    { id: '2', userName: 'June29', userAvatar: 'https://i.pravatar.cc/150?img=45' },
    { id: '3', userName: 'Emerilion9', userAvatar: 'https://i.pravatar.cc/150?img=33' },
    { id: '4', userName: 'PatriciaLanyer', userAvatar: 'https://i.pravatar.cc/150?img=20' },
    { id: '5', userName: 'Emeli_Resling', userAvatar: 'https://i.pravatar.cc/150?img=47' },
  ];
  const chats: Chat[] = [
    {
      id: '1',
      userName: 'Alicia',
      userAvatar: 'https://i.pravatar.cc/150?img=25',
      lastMessage: 'Que gran libro sacsste!',
      time: 'Hace 1 h',
    },
    {
      id: '2',
      userName: 'Carolina_23',
      userAvatar: 'https://i.pravatar.cc/150?img=45',
      lastMessage: 'Me encantó tu reseña de .."',
      time: 'Hace 3 h',
    },
    {
      id: '3',
      userName: 'BookClub_VE',
      userAvatar: 'https://i.pravatar.cc/150?img=60',
      lastMessage: 'Reunión este sábado .."',
      time: 'Hace 2 h',
    },
    {
      id: '4',
      userName: 'Maria_reads',
      userAvatar: 'https://i.pravatar.cc/150?img=31',
      lastMessage: '¿Ye leiste el último de.."',
      time: 'Hace 5 h',
    },
    {
      id: '5',
      userName: 'Carlos_books',
      userAvatar: 'https://i.pravatar.cc/150?img=68',
      lastMessage: '"Tienes razón sobre el.."',
      time: 'Hace 3 h',
    },
    {
      id: '6',
      userName: 'Andrea Pizarro',
      userAvatar: 'https://i.pravatar.cc/150?img=16',
      lastMessage: '"Tienes razón sobre el.."',
      time: 'Hace 7 h',
    },
    {
      id: '7',
      userName: 'Andrea Pizarro',
      userAvatar: 'https://i.pravatar.cc/150?img=16',
      lastMessage: '"Tienes razón sobre el.."',
      time: 'Hace 8 h',
    },
  ];

  const renderStory = ({ item }: { item: Story }) => (
    <TouchableOpacity style={styles.storyItem}>
      <View style={styles.storyAvatarContainer}>
        <Image
          style={styles.storyAvatar}
          source={{ uri: item.userAvatar }}
        />
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {item.userName}
      </Text>
    </TouchableOpacity>
  );

  const renderChat = (chat: Chat) => (
    <TouchableOpacity key={chat.id} style={styles.chatItem}>
      <Image
        style={styles.chatAvatar}
        source={{ uri: chat.userAvatar }}
      />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{chat.userName}</Text>
        <Text style={styles.chatMessage} numberOfLines={1}>
          {chat.lastMessage}
        </Text>
      </View>
      <Text style={styles.chatTime}>{chat.time}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#7dc5c0', '#e8f4f3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
       <Navbar/>
      </View>
      <View style={styles.storiesSection}>
        <FlatList
          horizontal
          data={stories}
          renderItem={renderStory}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesList}
        />
      </View>
      <View style={styles.chatsSection}>
        <ScrollView
          style={styles.chatsList}
          showsVerticalScrollIndicator={false}
        >
          {chats.map(renderChat)}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    marginTop:30,
    padding:30,
    gap: 8,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
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
  hamburger: {
    gap: 3,
  },
  line: {
    width: 20,
    height: 2.5,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  storiesSection: {
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  storiesList: {
    paddingHorizontal: 15,
    gap: 15,
  },
  storyItem: {
    alignItems: 'center',
    width: 70,
  },
  storyAvatarContainer: {
    padding: 3,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#FF6B9D',
    marginBottom: 5,
  },
  storyAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  storyName: {
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
  },
  chatsSection: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
  },
  chatsList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  chatAvatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  chatMessage: {
    fontSize: 14,
    color: '#666',
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
});