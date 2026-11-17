import { z } from 'zod'

/**
 * ONE schema, used in three places:
 *   - the Server Action (the form)
 *   - the Route Handler (the HTTP API, testable in Insomnia)
 *   - the type of a validated product
 *
 * This is the same validation you wrote by hand in Express, but declared once
 * instead of repeated in every controller.
 */
export const productSchema = z.object({
  name: z.string().trim().min(2, 'The name must be at least 2 characters'),
  slug: z
    .string()
    .trim()
    .min(2, 'The slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers and hyphens'),
  description: z.string().trim().min(10, 'Write at least 10 characters'),
  // Form fields arrive as strings. coerce turns "1299" into 1299 before validating
  price: z.coerce.number().positive('The price must be greater than 0'),
  categoryId: z.coerce.number().int().positive('Choose a category'),
  inStock: z.boolean(),
})

export type ProductInput = z.infer<typeof productSchema>

/**
 * Turns FormData into a plain object and validates it.
 * Checkboxes are special: an unchecked box isn't sent at all.
 */
export function parseProductForm(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get('name'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    price: formData.get('price'),
    categoryId: formData.get('categoryId'),
    inStock: formData.get('inStock') === 'on',
  })
}

// One error message per field, ready to show in a form
export function fieldErrors(error: z.ZodError) {
  return z.flattenError(error).fieldErrors as Partial<Record<keyof ProductInput, string[]>>
}
