const exploreData = [
  {
    id: 1,
    name: "Splice T-Shirts",
    price: "$62.40",
    rating: 4.9,
    reviews: 214,
    sizes: ["S", "M", "L", "XL"],
    image: 
       "https://png.pngtree.com/png-clipart/20240905/original/pngtree-flowers-t-shirt-bundle-png-image_15940365.png"
    ,
    colors: ["#D7E8FF", "#C3FFD8", "#F9D6D6"],
    description:
      "The Splice T-Shirt is crafted from ultra-soft, breathable cotton with a premium stitched finish. Designed for all-day comfort and modern aesthetics, it features a dual-tone color blend that adds a fresh vibe to your casual wardrobe. Perfect for summer outings or relaxed weekends, this T-shirt offers both durability and effortless style.",
    shop: "Splice Apparel",
    category: "Tops",
  },
  {
    id: 2,
    name: "Nike Dunk Retro",
    price: "$70.60",
    rating: 4.8,
    reviews: 189,
    sizes: ["6", "7", "8", "9", "10", "11"],
    image: 
       "https://png.pngtree.com/png-vector/20240927/ourmid/pngtree-nike-shoes-transparent-png-image_13928616.png"
    ,
    colors: ["#FFFFFF", "#000000", "#FDD835"],
    description:
      "The Nike Dunk Retro brings back the legendary ‘80s basketball icon with a streetwear-ready twist. Featuring premium leather overlays and a cushioned midsole, this shoe combines comfort with classic style. Whether you’re skating, walking, or styling up your fit, the Dunk Retro guarantees unmatched versatility and timeless appeal.",
    shop: "Nike Official",
    category: "Shoe",
  },
  {
    id: 3,
    name: "Urban Cargo Pants",
    price: "$58.20",
    rating: 4.7,
    reviews: 163,
    sizes: ["28", "30", "32", "34", "36"],
    image: 
       "https://png.pngtree.com/png-vector/20240731/ourmid/pngtree-trendy-camouflage-pants-png-image_13310472.png"
    ,
    colors: ["#9E9E9E", "#3E3E3E", "#CFCFCF"],
    description:
      "Engineered for both functionality and fashion, the Urban Cargo Pants feature multiple utility pockets, adjustable waistbands, and a relaxed tapered fit. Made from durable cotton-blend fabric, these cargos offer flexibility and comfort whether you’re on an outdoor adventure or going for a casual urban look.",
    shop: "Urban Threads",
    category: "Dress",
  },
  {
    id: 4,
    name: "AeroFit Hoodie",
    price: "$84.90",
    rating: 4.9,
    reviews: 247,
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: 
       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHw4iW1rELuXlochocwzDl5BIDJSgNuLj5cw&s"
    ,
    colors: ["#1E1E1E", "#4A90E2", "#BDBDBD"],
    description:
      "Stay warm and stylish with the AeroFit Hoodie, designed with a lightweight fleece interior and a modern streetwear silhouette. The breathable yet insulating fabric keeps you comfortable in any season. With premium stitching, adjustable drawstrings, and a soft-touch texture, this hoodie blends performance and everyday comfort effortlessly.",
    shop: "AeroFit Store",
    category: "Hoodie",
  },
  {
    id: 5,
    name: "Classic Polo Tee",
    price: "$64.00",
    rating: 4.6,
    reviews: 132,
    sizes: ["S", "M", "L", "XL"],
    image: 
       "https://png.pngtree.com/template/20250615/ourmid/pngtree-polo-batik-t-shirt-image_2051185.jpg"
    ,
    colors: ["#C5E1A5", "#FFCDD2", "#BBDEFB"],
    description:
      "The Classic Polo Tee offers a perfect blend of comfort and style. Crafted from high-quality cotton fabric, it’s ideal for both formal and casual settings. The ribbed collar and minimal branding keep it classy yet modern.",
    shop: "Elite Wear",
    category: "Tops",
  },
  {
    id: 6,
    name: "Air Street Sneakers",
    price: "$78.90",
    rating: 4.8,
    reviews: 205,
    sizes: ["6", "7", "8", "9", "10", "11"],
    image: 
       "https://png.pngtree.com/png-vector/20250205/ourmid/pngtree-3d-air-jordan-sneaker-png-image_15400621.png"
    ,
    colors: ["#FFFFFF", "#FFEB3B", "#03A9F4"],
    description:
      "Air Street Sneakers combine lightweight comfort with bold aesthetics. Featuring soft foam soles and breathable mesh uppers, they deliver all-day comfort and unmatched street-style appeal.",
    shop: "Urban Kicks",
    category: "Shoe",
  },
  {
    id: 7,
    name: "Explorer Cargo Pants",
    price: "$59.50",
    rating: 4.7,
    reviews: 174,
    sizes: ["28", "30", "32", "34", "36"],
    image: 
       "https://png.pngtree.com/png-vector/20250122/ourmid/pngtree-cargo-pant-for-men-png-image_15304970.png"
    ,
    colors: ["#8D8D8D", "#2C2C2C", "#CCCCCC"],
    description:
      "Built for adventure, the Explorer Cargo Pants feature durable cotton fabric and practical pocket layouts. Ideal for both travel and everyday use, these cargos redefine rugged style.",
    shop: "Outdoor Co.",
    category: "Dress",
  },
  {
    id: 8,
    name: "Comfy Zip Hoodie",
    price: "$82.00",
    rating: 4.8,
    reviews: 226,
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: 
       "https://png.pngtree.com/png-vector/20240619/ourmid/pngtree-choosing-the-perfect-hoodie-comfort-and-fashion-combined-png-image_12777266.png"
    ,
    colors: ["#2E2E2E", "#607D8B", "#CFD8DC"],
    description:
      "The Comfy Zip Hoodie is made for everyday wear, combining warmth and flexibility. Its ultra-soft fleece interior and minimal aesthetic make it a wardrobe essential.",
    shop: "ComfyWear",
    category: "Hoodie",
  },
  {
    id: 9,
    name: "Slim Fit Tee",
    price: "$55.20",
    rating: 4.6,
    reviews: 192,
    sizes: ["S", "M", "L", "XL"],
    image: 
       "https://png.pngtree.com/png-vector/20240719/ourmid/pngtree-gym-fitness-t-shirts-design-it-never-gets-easier-you-just-png-image_12979741.png"
    ,
    colors: ["#BBDEFB", "#C8E6C9", "#FFCDD2"],
    description:
      "Designed for modern minimalists, the Slim Fit Tee delivers a tailored fit with soft cotton texture. Ideal for layering or solo wear, it keeps your casual style clean and sharp.",
    shop: "Minimal Street",
    category: "Tops",
  },
  {
    id: 10,
    name: "Retro High Sneakers",
    price: "$88.40",
    rating: 4.9,
    reviews: 239,
    sizes: ["6", "7", "8", "9", "10", "11"],
    image: 
       "https://png.pngtree.com/png-clipart/20250501/original/pngtree-classic-red-high-top-converse-sneakers-png-image_20921573.png"
,
    colors: ["#FFFFFF", "#FF5722", "#212121"],
    description:
      "Retro High Sneakers bring a vintage vibe to your streetwear lineup. With high ankle support, cushioned soles, and a bold retro palette, these sneakers are a statement piece for any look.",
    shop: "RetroFlex",
    category: "Shoe",
  },
];

export default exploreData;
