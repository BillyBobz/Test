import express from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * Social Features System
 * Author: BillyBobz
 * Trip sharing, following travelers, and social interactions
 */

const router = express.Router();

interface SocialTrip {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  description: string;
  destinations: string[];
  images: string[];
  isPublic: boolean;
  likes: number;
  likedBy: string[];
  comments: Comment[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  author: string;
}

interface UserFollow {
  followerId: string;
  followingId: string;
  createdAt: string;
  author: string;
}

// In-memory storage (replace with database in production)
let socialTrips: SocialTrip[] = [
  {
    id: uuidv4(),
    userId: 'user1',
    userName: 'BillyBobz',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    title: 'Amazing 2-Week European Adventure',
    description: 'Just completed an incredible journey through 8 European countries! The food, culture, and people were absolutely amazing. Highly recommend this route for first-time Europe travelers.',
    destinations: ['Paris', 'Rome', 'Barcelona', 'Amsterdam', 'Prague'],
    images: [
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52',
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62'
    ],
    isPublic: true,
    likes: 47,
    likedBy: ['user2', 'user3', 'user4'],
    comments: [
      {
        id: uuidv4(),
        userId: 'user2',
        userName: 'TravelExplorer',
        content: 'This looks incredible! How was the budget for this trip?',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        author: 'BillyBobz Social System'
      }
    ],
    tags: ['europe', 'backpacking', 'culture', 'food'],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    author: 'BillyBobz Social Platform'
  }
];

let userFollows: UserFollow[] = [];

// Get public trips feed - by BillyBobz
router.get('/feed/:userId', (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    // Get trips from followed users and public trips
    const following = userFollows
      .filter(f => f.followerId === userId)
      .map(f => f.followingId);
    
    const feedTrips = socialTrips
      .filter(trip => trip.isPublic && (following.includes(trip.userId) || trip.userId === userId))
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    const startIndex = (Number(page) - 1) * Number(limit);
    const paginatedTrips = feedTrips.slice(startIndex, startIndex + Number(limit));

    res.json({
      success: true,
      trips: paginatedTrips,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: feedTrips.length,
        hasMore: startIndex + Number(limit) < feedTrips.length
      },
      createdBy: 'BillyBobz'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch social feed'
    });
  }
});

// Share a trip publicly - by BillyBobz
router.post('/trips/share', (req: express.Request, res: express.Response) => {
  try {
    const { 
      userId, 
      userName, 
      userAvatar,
      title, 
      description, 
      destinations, 
      images = [], 
      tags = [] 
    } = req.body;

    const socialTrip: SocialTrip = {
      id: uuidv4(),
      userId,
      userName,
      userAvatar,
      title,
      description,
      destinations,
      images,
      isPublic: true,
      likes: 0,
      likedBy: [],
      comments: [],
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: 'BillyBobz Social Platform'
    };

    socialTrips.push(socialTrip);

    res.json({
      success: true,
      trip: socialTrip,
      message: 'Trip shared successfully!',
      sharedBy: 'BillyBobz'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to share trip'
    });
  }
});

// Like/unlike a trip - by BillyBobz
router.post('/trips/:tripId/like', (req: express.Request, res: express.Response) => {
  try {
    const { tripId } = req.params;
    const { userId } = req.body;

    const trip = socialTrips.find(t => t.id === tripId);
    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }

    const isLiked = trip.likedBy.includes(userId);
    
    if (isLiked) {
      // Unlike
      trip.likedBy = trip.likedBy.filter(id => id !== userId);
      trip.likes = Math.max(0, trip.likes - 1);
    } else {
      // Like
      trip.likedBy.push(userId);
      trip.likes += 1;
    }

    trip.updatedAt = new Date().toISOString();

    res.json({
      success: true,
      trip,
      action: isLiked ? 'unliked' : 'liked',
      updatedBy: 'BillyBobz'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update like status'
    });
  }
});

// Add comment to trip - by BillyBobz
router.post('/trips/:tripId/comments', (req: express.Request, res: express.Response) => {
  try {
    const { tripId } = req.params;
    const { userId, userName, userAvatar, content } = req.body;

    const trip = socialTrips.find(t => t.id === tripId);
    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }

    const comment: Comment = {
      id: uuidv4(),
      userId,
      userName,
      userAvatar,
      content,
      createdAt: new Date().toISOString(),
      author: 'BillyBobz Social System'
    };

    trip.comments.push(comment);
    trip.updatedAt = new Date().toISOString();

    res.json({
      success: true,
      comment,
      trip,
      commentedBy: 'BillyBobz'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add comment'
    });
  }
});

// Follow/unfollow user - by BillyBobz
router.post('/users/:targetUserId/follow', (req: express.Request, res: express.Response) => {
  try {
    const { targetUserId } = req.params;
    const { userId } = req.body;

    if (userId === targetUserId) {
      return res.status(400).json({
        success: false,
        error: 'Cannot follow yourself'
      });
    }

    const existingFollow = userFollows.find(
      f => f.followerId === userId && f.followingId === targetUserId
    );

    if (existingFollow) {
      // Unfollow
      userFollows = userFollows.filter(
        f => !(f.followerId === userId && f.followingId === targetUserId)
      );
      
      res.json({
        success: true,
        action: 'unfollowed',
        message: 'User unfollowed successfully',
        updatedBy: 'BillyBobz'
      });
    } else {
      // Follow
      const follow: UserFollow = {
        followerId: userId,
        followingId: targetUserId,
        createdAt: new Date().toISOString(),
        author: 'BillyBobz Social System'
      };

      userFollows.push(follow);

      res.json({
        success: true,
        action: 'followed',
        message: 'User followed successfully',
        follow,
        followedBy: 'BillyBobz'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update follow status'
    });
  }
});

// Get user's followers and following - by BillyBobz
router.get('/users/:userId/connections', (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.params;

    const followers = userFollows
      .filter(f => f.followingId === userId)
      .map(f => f.followerId);

    const following = userFollows
      .filter(f => f.followerId === userId)
      .map(f => f.followingId);

    res.json({
      success: true,
      connections: {
        followers: followers.length,
        following: following.length,
        followersList: followers,
        followingList: following
      },
      generatedBy: 'BillyBobz'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user connections'
    });
  }
});

// Search trips by tags or destinations - by BillyBobz
router.get('/trips/search', (req: express.Request, res: express.Response) => {
  try {
    const { query, tags, destinations } = req.query;

    let filteredTrips = socialTrips.filter(trip => trip.isPublic);

    if (query) {
      const searchQuery = (query as string).toLowerCase();
      filteredTrips = filteredTrips.filter(trip =>
        trip.title.toLowerCase().includes(searchQuery) ||
        trip.description.toLowerCase().includes(searchQuery) ||
        trip.userName.toLowerCase().includes(searchQuery)
      );
    }

    if (tags) {
      const searchTags = (tags as string).split(',').map(tag => tag.trim().toLowerCase());
      filteredTrips = filteredTrips.filter(trip =>
        trip.tags.some(tag => searchTags.includes(tag.toLowerCase()))
      );
    }

    if (destinations) {
      const searchDestinations = (destinations as string).split(',').map(dest => dest.trim().toLowerCase());
      filteredTrips = filteredTrips.filter(trip =>
        trip.destinations.some(dest => searchDestinations.includes(dest.toLowerCase()))
      );
    }

    filteredTrips.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    res.json({
      success: true,
      trips: filteredTrips,
      count: filteredTrips.length,
      searchedBy: 'BillyBobz'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to search trips'
    });
  }
});

// Get trending destinations and tags - by BillyBobz
router.get('/trending', (req: express.Request, res: express.Response) => {
  try {
    const recentTrips = socialTrips.filter(trip => 
      trip.isPublic && 
      new Date(trip.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000 // Last 30 days
    );

    // Count destinations
    const destinationCounts = recentTrips
      .flatMap(trip => trip.destinations)
      .reduce((acc, dest) => {
        acc[dest] = (acc[dest] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    // Count tags
    const tagCounts = recentTrips
      .flatMap(trip => trip.tags)
      .reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const trendingDestinations = Object.entries(destinationCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([destination, count]) => ({ destination, count }));

    const trendingTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));

    res.json({
      success: true,
      trending: {
        destinations: trendingDestinations,
        tags: trendingTags,
        totalTrips: recentTrips.length
      },
      generatedBy: 'BillyBobz Analytics'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trending data'
    });
  }
});

export default router;