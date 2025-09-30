import type { Author } from "./author.types";
import type { Category } from "./category.types";
import type { SanityBlockContent, SanityImage } from "./root.types";

export type Post = {
    _type: "post";
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    title: string;
    slug: string;
    publishedAt?: string;
    author?: Author;
    body?: SanityBlockContent;
    categories?: Category[];
    mainImage?: SanityImage;
}