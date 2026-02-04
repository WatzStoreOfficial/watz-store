// This file is our master database of all products.
// The 'image' property is now an array of image links.

const allProducts = [
    {
        id: 1,
        name: 'Jujutsu Kaisen Sticker Sheet',
        price: 250,
        images: [
            'https://i.imgur.com/your-jjk-image-1.jpg', // Main image
            'https://i.imgur.com/your-jjk-image-2.jpg', // Thumbnail 1
            'https://i.imgur.com/your-jjk-image-3.jpg', // Thumbnail 2
            'https://i.imgur.com/your-jjk-image-4.jpg'  // Thumbnail 3
        ],
        description: 'A high-quality vinyl sticker sheet featuring your favorite characters from Jujutsu Kaisen! Perfect for decorating laptops, journals, and water bottles. Includes 20 unique, waterproof stickers.'
    },
    {
        id: 2,
        name: 'Ghibli Washi Tape Set',
        price: 300,
        images: [
            'https://i.imgur.com/your-ghibli-image-1.jpg', // Main image
            'https://i.imgur.com/your-ghibli-image-2.jpg'  // Thumbnail 1
        ],
        description: 'Bring the magic of Studio Ghibli to your crafts with this beautiful washi tape set. Features iconic characters and patterns from beloved films. Each roll is 10 meters long.'
    },
    {
        id: 3,
        name: 'Chainsaw Man Pochita Keychain',
        price: 450,
        images: [
            'https://i.imgur.com/your-pochita-image-1.jpg' // Main image (can have just one)
        ],
        description: 'Carry the best boy with you everywhere! This adorable acrylic keychain of Pochita is double-sided, durable, and comes with a sturdy star-shaped clasp. A must-have for any Chainsaw Man fan.'
    },
    {
        id: 4,
        name: 'Spy x Family Anya Pin',
        price: 350,
        images: [
            'https://i.imgur.com/your-anya-image-1.jpg', // Main image
            'https://i.imgur.com/your-anya-image-2.jpg', // Thumbnail 1
            'https://i.imgur.com/your-anya-image-3.jpg'  // Thumbnail 2
        ],
        description: 'Waku waku! Show off your love for Spy x Family with this elegant enamel pin of Anya Forger. Features a high-quality finish with two rubber clutches on the back to keep it secure.'
    }
    // Add new products here in the same format
];