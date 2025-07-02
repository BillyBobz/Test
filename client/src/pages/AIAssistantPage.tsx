import React, { useState } from 'react';
import { Bot, Sparkles, MessageCircle, TrendingUp, MapPin, Calendar, DollarSign, Users } from 'lucide-react';
import AIAssistant from '../components/AIAssistant';

/**
 * AI Assistant Page
 * Author: BillyBobz
 * Showcase page for the AI Travel Assistant with features and examples
 */

const AIAssistantPage: React.FC = () => {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Natural Conversations",
      description: "Chat naturally about your travel plans and get personalized recommendations",
      example: "I want a romantic weekend in Europe under £2000"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Smart Optimization",
      description: "AI analyzes your itinerary and suggests improvements to save time and money",
      example: "How can I improve my 5-day Tokyo trip?"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Destination Insights",
      description: "Get detailed information about destinations, weather, and local customs",
      example: "What should I know about visiting Dubai in September?"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Budget Planning",
      description: "Smart budget analysis and money-saving suggestions for your trips",
      example: "Find me cheaper alternatives for this itinerary"
    }
  ];

  const exampleConversations = [
    {
      user: "I'm planning a 7-day trip to Japan in spring, I love food and culture",
      ai: "Perfect! Cherry blossom season is magical. I'd recommend Tokyo (3 days) for incredible food scenes, Kyoto (3 days) for temples and traditional culture, and day trip to Nara. Budget estimate: £2,500. Want me to create a detailed itinerary?"
    },
    {
      user: "My current Paris itinerary feels rushed, can you help?",
      ai: "Looking at your 3-day Paris plan... You have 8 attractions on day 2! Let me spread these out and add travel time. I'll also suggest lunch spots between Louvre and Eiffel Tower. Updated itinerary coming up!"
    },
    {
      user: "I need halal-friendly options for my Dubai trip",
      ai: "Dubai is perfect for halal travelers! I can recommend certified halal restaurants like Al Fanar for Emirati cuisine, prayer-friendly hotels like Jumeirah Al Seef, and cultural sites like Sheikh Zayed Grand Mosque. Would you like a detailed halal travel guide?"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Sparkles className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              AI Travel Assistant
            </h1>
            <p className="text-xl mb-4 opacity-90">
              Your intelligent travel companion powered by advanced AI
            </p>
            <p className="text-lg mb-8 opacity-75">
              Created by BillyBobz • Experience the future of travel planning
            </p>
            <button
              onClick={() => setIsAIChatOpen(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Chatting with AI
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Intelligent Features
          </h2>
          <p className="text-xl text-gray-600">
            Discover how AI can transform your travel planning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800 italic">
                  "{feature.example}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Example Conversations */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See AI in Action
            </h2>
            <p className="text-xl text-gray-600">
              Real examples of how the AI Travel Assistant helps travelers
            </p>
          </div>

          <div className="space-y-8">
            {exampleConversations.map((conversation, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8">
                  {/* User Message */}
                  <div className="flex justify-end mb-6">
                    <div className="flex space-x-3 max-w-[80%]">
                      <div className="bg-blue-600 text-white rounded-2xl p-4">
                        <p>{conversation.user}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <Users className="w-4 h-4" />
                          <span className="text-sm opacity-75">Traveler</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="flex space-x-3 max-w-[80%]">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl p-4">
                        <p className="text-gray-800">{conversation.ai}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <Sparkles className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-gray-600">BillyBobz AI Assistant</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Plan Your Perfect Trip?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let our AI assistant help you create unforgettable travel experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsAIChatOpen(true)}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Chat with AI Assistant
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors">
              View Example Trips
            </button>
          </div>
          <p className="text-sm mt-6 opacity-75">
            Powered by advanced AI technology • Created by BillyBobz
          </p>
        </div>
      </div>

      {/* AI Chat Modal */}
      <AIAssistant 
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        userContext={{
          page: 'ai-assistant',
          source: 'dedicated-page'
        }}
      />
    </div>
  );
};

export default AIAssistantPage;