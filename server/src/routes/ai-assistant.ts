import express from 'express';
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';

/**
 * AI Travel Assistant Route
 * Author: BillyBobz
 * Enhanced travel planning with AI-powered conversations and recommendations
 */

const router = express.Router();

// Initialize OpenAI (will use mock responses if no API key provided)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: string;
  metadata?: any;
}

interface TravelContext {
  currentTrip?: any;
  userPreferences?: any;
  conversationHistory: ChatMessage[];
  destinations: any[];
}

// Mock AI responses for demonstration (by BillyBobz)
const mockAIResponses = {
  greeting: "Hello! I'm your AI Travel Assistant created by BillyBobz. I'm here to help you plan the perfect trip! Tell me about your travel dreams - where would you like to go, what's your budget, and what kind of experiences are you looking for?",
  
  planning: [
    "That sounds like an amazing trip! Based on your preferences, I'd recommend considering the weather, local festivals, and peak tourist seasons. Would you like me to create a detailed itinerary?",
    "Great choice! I can help you optimize your travel route, suggest must-see attractions, and find the best local restaurants. What's most important to you - culture, adventure, relaxation, or food?",
    "Perfect! Let me analyze the best time to visit and create a budget breakdown. I'll also suggest some hidden gems that most tourists miss!"
  ],
  
  optimization: [
    "I've analyzed your itinerary and found some opportunities to save time and money. Would you like me to suggest alternative routes or timing adjustments?",
    "Your current plan looks good, but I noticed you have some rushed days. Let me spread out your activities for a more relaxed experience.",
    "I can help you optimize this trip by grouping nearby attractions and suggesting the best transportation options."
  ],
  
  budget: [
    "Based on your budget, I can suggest ways to save money without compromising your experience. Would you like budget-friendly alternatives for accommodation or dining?",
    "Here's a breakdown of estimated costs and some tips to stretch your budget further while still having an amazing time!",
    "I found some great deals and money-saving opportunities for your trip. Let me show you how to get the most value."
  ]
};

// Chat endpoint - by BillyBobz
router.post('/chat', async (req, res) => {
  try {
    const { message, context, conversationHistory = [] } = req.body;

    let aiResponse: string;

    if (openai) {
      // Use real OpenAI API if available
      const systemPrompt = `You are an expert AI Travel Assistant created by BillyBobz. You help users plan amazing trips with personalized recommendations. Be helpful, enthusiastic, and provide practical travel advice. Always consider budget, preferences, and practical logistics.`;
      
      const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.map((msg: ChatMessage) => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        { role: 'user', content: message }
      ];

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages as any,
        max_tokens: 500,
        temperature: 0.7,
      });

      aiResponse = completion.choices[0]?.message?.content || 'I apologize, but I encountered an error. Please try again!';
    } else {
      // Use mock responses for demonstration
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || conversationHistory.length === 0) {
        aiResponse = mockAIResponses.greeting;
      } else if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('money')) {
        aiResponse = mockAIResponses.budget[Math.floor(Math.random() * mockAIResponses.budget.length)];
      } else if (lowerMessage.includes('optimize') || lowerMessage.includes('improve') || lowerMessage.includes('better')) {
        aiResponse = mockAIResponses.optimization[Math.floor(Math.random() * mockAIResponses.optimization.length)];
      } else {
        aiResponse = mockAIResponses.planning[Math.floor(Math.random() * mockAIResponses.planning.length)];
      }
    }

    const responseMessage: ChatMessage = {
      id: uuidv4(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date().toISOString(),
      metadata: { author: 'BillyBobz', model: openai ? 'gpt-3.5-turbo' : 'mock' }
    };

    res.json({
      success: true,
      message: responseMessage,
      suggestions: [
        "Tell me more about your travel preferences",
        "Help me plan a detailed itinerary",
        "Suggest budget-friendly options",
        "Find hidden gems and local experiences"
      ]
    });
  } catch (error) {
    console.error('AI Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate AI response',
      message: {
        id: uuidv4(),
        type: 'ai',
        content: "I'm sorry, I'm having trouble right now. Please try again in a moment!",
        timestamp: new Date().toISOString(),
        metadata: { author: 'BillyBobz', error: true }
      }
    });
  }
});

// Optimize itinerary endpoint - by BillyBobz
router.post('/optimize-itinerary', async (req, res) => {
  try {
    const { itinerary, preferences, budget } = req.body;

    // Mock optimization logic (replace with real AI optimization)
    const optimizedItinerary = itinerary.map((item: any, index: number) => ({
      ...item,
      optimizedBy: 'BillyBobz AI Assistant',
      suggestions: [
        'Consider visiting during off-peak hours',
        'Combine with nearby attractions',
        'Try local transportation options'
      ][index % 3],
      estimatedSavings: Math.floor(Math.random() * 50) + 10
    }));

    res.json({
      success: true,
      optimizedItinerary,
      savings: {
        time: '2.5 hours',
        money: '$127',
        optimizedBy: 'BillyBobz'
      },
      recommendations: [
        'Group nearby attractions together',
        'Consider alternative transportation',
        'Book activities in advance for discounts'
      ]
    });
  } catch (error) {
    console.error('Itinerary optimization error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to optimize itinerary'
    });
  }
});

// Get AI suggestions endpoint - by BillyBobz
router.post('/suggestions', async (req, res) => {
  try {
    const { destination, preferences, budget, travelStyle } = req.body;

    const suggestions = {
      destinations: [
        { name: 'Hidden Beach Cove', type: 'nature', reason: 'Perfect for your love of secluded spots' },
        { name: 'Local Art District', type: 'culture', reason: 'Matches your interest in authentic experiences' },
        { name: 'Mountain Hiking Trail', type: 'adventure', reason: 'Great for your fitness level and preferences' }
      ],
      activities: [
        { name: 'Sunrise Photography Tour', cost: '$45', duration: '3 hours' },
        { name: 'Local Cooking Class', cost: '$65', duration: '4 hours' },
        { name: 'Historical Walking Tour', cost: '$25', duration: '2 hours' }
      ],
      restaurants: [
        { name: 'Mama Rosa\'s Trattoria', cuisine: 'Italian', priceRange: '$$', rating: 4.8 },
        { name: 'Street Food Market', cuisine: 'Local', priceRange: '$', rating: 4.6 },
        { name: 'Rooftop Sunset Cafe', cuisine: 'International', priceRange: '$$$', rating: 4.7 }
      ],
      tips: [
        'Visit popular attractions early morning to avoid crowds',
        'Download offline maps before exploring',
        'Try local transportation for authentic experience',
        'Book restaurants in advance during peak season'
      ],
      author: 'BillyBobz AI Assistant'
    };

    res.json({
      success: true,
      suggestions,
      personalized: true,
      confidence: 0.92
    });
  } catch (error) {
    console.error('AI suggestions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate suggestions'
    });
  }
});

// Analyze trip endpoint - by BillyBobz
router.post('/analyze-trip', async (req, res) => {
  try {
    const { tripData } = req.body;

    const analysis = {
      score: Math.floor(Math.random() * 20) + 80, // 80-100 score
      strengths: [
        'Well-balanced mix of activities',
        'Good budget allocation',
        'Realistic timeline'
      ],
      improvements: [
        'Consider adding more local experiences',
        'Allow buffer time between activities',
        'Research weather patterns for better planning'
      ],
      budgetBreakdown: {
        accommodation: '35%',
        food: '25%',
        activities: '25%',
        transportation: '15%'
      },
      recommendations: [
        'Book accommodations 2-3 weeks in advance',
        'Consider travel insurance',
        'Download essential apps before departure'
      ],
      analyzedBy: 'BillyBobz AI Travel Assistant',
      timestamp: new Date().toISOString()
    };

    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('Trip analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze trip'
    });
  }
});

export default router;