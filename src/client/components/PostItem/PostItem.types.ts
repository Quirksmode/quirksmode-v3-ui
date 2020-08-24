import { BlogPostsEntity } from 'client/pages/PageBlog/PageBlog.types';

export interface PostItemProps {
  post: BlogPostsEntity;
  size: 'Small' | 'Medium';
  lineClamp?: string | null;
}
