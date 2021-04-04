export interface IProfile {
    username: string;
    phone: string
}

export interface IArticle {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: Date;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
    author: IProfile;
}

export interface IComment {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    body: string;
    author: IProfile;
}

export interface IUser {
    username: string;
    phone: string
}

export interface IErrors {
    [key: string]: string[];
}
