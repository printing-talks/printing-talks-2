// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';
// 2. Define your collection(s)
const testimonialCollection = defineCollection({
  type: 'content',
  schema: z.object({
    author: z.string(),
    companyLogoUrl: z.string().optional(),
    testimonialText: z.string(),
  })
})
const productCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    isBestSeller: z.boolean(),
    types: z.array(z.string()).optional(),
    sizes: z.array(z.string()).optional(),
    img: z.string(),
    img_alt: z.string().optional(),
    // Adding the category property
    category: z.enum(['Food', 'Retail', 'Marketing', 'Office', 'Speciality', 'Misc']).default('Misc')
  })
});

const articleCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(), // Title is a string
    author: z.string(), // Author is a string
    publishDate: z.date(), // Publish Date must be a date
    lastUpdated: z.date().optional(), // Last Updated is an optional date
    tags: z.array(z.string()).optional(), // Tags is an optional array of strings
    summary: z.string().optional(), // Summary is an optional string
    thumbnailUrl: z.string().optional(), // Thumbnail URL is an optional string
    category: z.enum(['Technology', 'Health', 'Business', 'Lifestyle', 'Entertainment', 'Science', 'Misc']).default('Misc'), // Category with default value if not provided
  })
});


// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
const collections = {
  'testimonials': testimonialCollection,
  'products': productCollection,
  'articles': articleCollection,
};

module.exports = collections;