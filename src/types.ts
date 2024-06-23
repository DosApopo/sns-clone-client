export interface Profile {
  id: number;
  bio: string;
  profileImageUrl: string;
  userId: number;
  user: UserType;
}

export interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: PostType[];
  profile: Profile;
}

export interface PostType {
  id: number;
  content: string;
  createAt: string;
  authorId: number;
  author: UserType;
}
