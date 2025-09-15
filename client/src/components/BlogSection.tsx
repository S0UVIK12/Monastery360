import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, User, ArrowRight, BookOpen, Star } from 'lucide-react';
import type { Blog } from '@shared/schema';

interface BlogSectionProps {
  blogs: Blog[];
  onReadMore: (blog: Blog) => void;
  featuredBlog?: Blog;
}

const categories = {
  'travel-tips': { color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300', icon: BookOpen },
  'experiences': { color: 'bg-green-500/10 text-green-700 dark:text-green-300', icon: Star },
  'culture': { color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300', icon: User },
  'guides': { color: 'bg-orange-500/10 text-orange-700 dark:text-orange-300', icon: Calendar },
};

export default function BlogSection({ blogs, onReadMore, featuredBlog }: BlogSectionProps) {
  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return 'Unknown date';
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 120) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Travel Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Monastery Journeys & Local Insights
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read authentic experiences, travel tips, and cultural insights from fellow travelers 
            and local guides exploring Sikkim's sacred heritage.
          </p>
        </div>

        {/* Featured Blog */}
        {featuredBlog && (
          <Card className="mb-12 overflow-hidden hover-elevate">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative">
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <Badge 
                  variant="secondary" 
                  className="absolute top-4 left-4 backdrop-blur-sm bg-white/90 text-black"
                >
                  Featured
                </Badge>
              </div>
              
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  {categories[featuredBlog.category as keyof typeof categories] && (
                    <Badge 
                      variant="secondary" 
                      className={`mr-3 ${categories[featuredBlog.category as keyof typeof categories].color}`}
                    >
                      {featuredBlog.category}
                    </Badge>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(featuredBlog.publishedAt)}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4" data-testid={`featured-blog-title`}>
                  {featuredBlog.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {truncateContent(featuredBlog.content, 200)}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarFallback>
                        {featuredBlog.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{featuredBlog.author}</p>
                      <p className="text-xs text-muted-foreground">Travel Writer</p>
                    </div>
                  </div>
                  
                  <Button onClick={() => onReadMore(featuredBlog)} data-testid="button-read-featured">
                    Read Story
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 6).map((blog) => (
            <Card key={blog.id} className="group hover-elevate overflow-hidden h-full flex flex-col">
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  {categories[blog.category as keyof typeof categories] && (
                    <Badge 
                      variant="secondary" 
                      className={`${categories[blog.category as keyof typeof categories].color} backdrop-blur-sm`}
                    >
                      {blog.category}
                    </Badge>
                  )}
                </div>
              </div>
              
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(blog.publishedAt)}
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" />
                  5 min read
                </div>
                
                <h4 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h4>
                
                <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                  {truncateContent(blog.content)}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="text-xs">
                        {blog.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{blog.author}</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onReadMore(blog)}
                    data-testid={`button-read-more-${blog.id}`}
                  >
                    Read More
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {blogs.length > 6 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" data-testid="button-load-more-blogs">
              Load More Stories
            </Button>
          </div>
        )}

        {/* Categories Filter */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-center">Explore by Category</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(categories).map(([category, config]) => (
              <button
                key={category}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors hover-elevate ${config.color}`}
                data-testid={`category-${category}`}
              >
                <config.icon className="w-4 h-4 mr-2" />
                {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}