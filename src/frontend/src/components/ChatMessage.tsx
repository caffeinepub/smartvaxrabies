import { ChatMessage as ChatMessageType } from '../backend';
import { User } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const formatTime = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrincipal = (principal: string) => {
    if (principal.length > 12) {
      return `${principal.slice(0, 6)}...${principal.slice(-4)}`;
    }
    return principal;
  };

  const principalString = message.sender.toString();
  const colors = [
    'from-emerald-500 to-green-500',
    'from-green-500 to-teal-500',
    'from-teal-500 to-cyan-500',
    'from-emerald-600 to-green-600',
    'from-green-600 to-teal-600',
  ];
  const colorIndex = principalString.charCodeAt(0) % colors.length;

  return (
    <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center flex-shrink-0`}>
        <User className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-gray-900 text-sm">
            {formatPrincipal(principalString)}
          </span>
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
        </div>
        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-emerald-100">
          <p className="text-gray-800 break-words">{message.message}</p>
        </div>
      </div>
    </div>
  );
}
