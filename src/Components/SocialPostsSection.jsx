import React from 'react';
import { ArrowUpRight, Calendar, Heart, MessageCircle, Share2, Repeat2 } from 'lucide-react';

const SocialPostsSection = () => {
  const posts = [
    {
      platform: 'Twitter/X',
      handle: '@MehHomTV',
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MehHomTV",
      content: '⚽ FULL TIME: Manchester City 2-1 Arsenal. Haaland with the winner in the 88th minute! What a match! 🔥 #PremierLeague #MCIARS',
      likes: '4.2K',
      retweets: '1.8K',
      time: '2h',
      hasImage: false
    },
    {
      platform: 'Instagram',
      handle: '@mehhom_tv',
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MehHom",
      content: '🌍 CAF Champions League TONIGHT! Zamalek vs Al Ahly — the Cairo Derby. Don\'t miss it, 8PM on MehHom! 🔴⚪',
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=400&fit=crop",
      time: '4h',
      likes: '12.7K',
      retweets: '890',
      hasImage: true
    },
    {
      platform: 'Twitter/X',
      handle: '@MehHomTV',
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MehHomTV",
      content: '🏀 LeBron James is UNREAL. 34 points, 12 assists in overtime to keep the Lakers alive! The king still reigns 👑 #NBAPlayoffs',
      likes: '8.9K',
      retweets: '3.2K',
      time: '5h',
      hasImage: false
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 overflow-x-hidden">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* CTA Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-slate-800 to-slate-900" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 px-6 sm:px-8 md:px-12 py-10 md:py-16">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  Never miss <span className="text-red-500">a match</span>
                </h2>
                <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
                  Watch live sports, catch replays, and stay updated with MehHom TV — available 24/7 across all platforms.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
               <a href="/livetv" >
                <button className="group w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 transform hover:scale-105">
                  <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
                  Watch Live Now
                </button>
                </a>
                <a href="/programs">
                <button className="flex w-full items-center justify-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:bg-slate-700/50">
                  <Calendar size={18} />
                  View Schedule
                </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Feed Section */}
        <div>
          {/* Header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-red-500 text-xs font-bold uppercase tracking-widest block mb-2">Social Media</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Follow MehHom</h2>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300">
              @MehHomTV
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 border border-slate-700 hover:border-slate-600 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/50 cursor-pointer hover:bg-slate-800/70">
                
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={post.avatar}
                    alt={post.handle}
                    className="w-10 h-10 rounded-full object-cover border border-slate-600"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{post.handle}</p>
                    <p className="text-xs text-slate-400">
                      {post.platform} · {post.time}
                    </p>
                  </div>
                  <MessageCircle size={16} className="text-slate-400 group-hover:text-red-500 transition-colors" />
                </div>

                {/* Post Content */}
                <p className="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-4">
                  {post.content}
                </p>

                {/* Post Image */}
                {post.hasImage && post.image && (
                  <div className="relative h-40 rounded-xl overflow-hidden mb-4 shadow-lg">
                    <img
                      src={post.image}
                      alt="Social media post image"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                )}

                {/* Post Engagement */}
                <div className="flex items-center gap-4 text-xs text-slate-400 border-t border-slate-700 pt-4">
                  <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors duration-300 group/btn">
                    <Heart size={14} className="group-hover/btn:fill-red-500" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-green-400 transition-colors duration-300">
                    <Repeat2 size={14} />
                    <span>{post.retweets}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors duration-300 ml-auto">
                    <Share2 size={14} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocialPostsSection;