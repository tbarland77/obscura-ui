import React from 'react';

type StoryCardProps = {
    title: string;
    content: string;
    author: string;
    tags?: string[];
    createdAt: string;
};

export const StoryCard: React.FC<StoryCardProps> = ({ title, content, author, tags = [], createdAt }) => {
    return (
    <div className="bg-midnight text-ghost shadow-eerie p-3 sm:p-4 md:p-6 rounded-lg hover:shadow-lg transition-all duration-300 border-l-4 border-pumpkin">
      <h2 className="font-spooky text-lg sm:text-xl md:text-2xl text-pumpkin tracking-widest mb-2 hover:text-orange-400 transition-colors">
        {title}
      </h2>
      <p className="font-eerie text-fog text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
        {content}
      </p>
      <div className="border-t border-moonlight opacity-20 my-3"></div>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center text-xs text-moonlight mb-3">
        <span>By {author}</span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
      <div className="flex flex-wrap gap-1 sm:gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-blood text-ghost px-2.5 py-1.5 rounded-sm text-xs whitespace-nowrap hover:bg-orange-600 transition-colors cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};