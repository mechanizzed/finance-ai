export type UserInfoProps = {
  user: {
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null | undefined;
    createdAt: Date;
    updatedAt: Date;
    id: string;
  };
};
