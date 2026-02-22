import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import ChatMessage from '../components/ChatMessage';
import { Send, Loader2, MessageCircle } from 'lucide-react';

export default function Community() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMessages();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (text: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.sendMessage(text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      setMessage('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessageMutation.mutate(message);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl">
          <img
            src="/assets/generated/community-dogs.dim_800x500.png"
            alt="Community"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-green-900/60 flex items-center">
            <div className="container mx-auto px-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Community Chat</h1>
              <p className="text-lg text-emerald-50">Connect with fellow pet owners across Kerala</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-emerald-50/30 to-white">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              </div>
            ) : messages && messages.length > 0 ? (
              <>
                {messages.map((msg, index) => (
                  <ChatMessage key={index} message={msg} />
                ))}
                <div ref={messagesEndRef} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageCircle className="h-16 w-16 text-emerald-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Start the Conversation</h3>
                <p className="text-gray-600">Be the first to share your thoughts with the community!</p>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-emerald-100 p-4 bg-white">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                disabled={sendMessageMutation.isPending}
              />
              <button
                type="submit"
                disabled={sendMessageMutation.isPending || !message.trim()}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {sendMessageMutation.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span className="hidden sm:inline">Send</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
