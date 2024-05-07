// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        // description: z.string(),
        author: z.string(),
        tags: z.array(z.string())
    })
});

const draftssCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        author: z.string(),
        tags: z.array(z.string())
    })
});

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        author: z.string(),
        image: z.string(),
        tags: z.array(z.string())
    })
});

const thoughtsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        author: z.string(),
        tags: z.array(z.string())
    })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
    posts: postsCollection,
    projects: projectsCollection,
    thoughts: thoughtsCollection,
};