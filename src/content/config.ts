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

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'testimonials': testimonialCollection,
  'products': productCollection,
};