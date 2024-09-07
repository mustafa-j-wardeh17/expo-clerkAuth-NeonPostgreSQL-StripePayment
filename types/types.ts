export interface ProductType {
    product_id: string; // Unique identifier for the product
    title: string; // Title of the product
    description: string; // Description of the product
    thumbnail: string; // URL of the thumbnail image
    images: string[]; // Array of image URLs
    rate: number; // Rating of the product
    sizes: number[]; // Array of available sizes
    price: number; // Price of the product
}
