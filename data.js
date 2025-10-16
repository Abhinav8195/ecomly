const products = [
  {
    id: 1,
    name: "Splice T-Shirts",
    price: "$62.40",
    rating: 4.9,
    reviews: 214,
    sizes: ["S", "M", "L", "XL"],
    image: require("./assets/product/tshirt.png"),
    colors: ["#D7E8FF", "#C3FFD8", "#F9D6D6"],
    description:
      "The Splice T-Shirt is crafted from ultra-soft, breathable cotton with a premium stitched finish. Designed for all-day comfort and modern aesthetics, it features a dual-tone color blend that adds a fresh vibe to your casual wardrobe. Perfect for summer outings or relaxed weekends, this T-shirt offers both durability and effortless style.",
    shop: "Splice Apparel",
  },
  {
    id: 2,
    name: "Nike Dunk Retro",
    price: "$70.60",
    rating: 4.8,
    reviews: 189,
    sizes: ["6", "7", "8", "9", "10", "11"],
    image: require("./assets/product/shoes.png"),
    colors: ["#FFFFFF", "#000000", "#FDD835"],
    description:
      "The Nike Dunk Retro brings back the legendary ‘80s basketball icon with a streetwear-ready twist. Featuring premium leather overlays and a cushioned midsole, this shoe combines comfort with classic style. Whether you’re skating, walking, or styling up your fit, the Dunk Retro guarantees unmatched versatility and timeless appeal.",
    shop: "Nike Official",
  },
  {
    id: 3,
    name: "Urban Cargo Pants",
    price: "$58.20",
    rating: 4.7,
    reviews: 163,
    sizes: ["28", "30", "32", "34", "36"],
    image: require("./assets/product/cargo.png"),
    colors: ["#9E9E9E", "#3E3E3E", "#CFCFCF"],
    description:
      "Engineered for both functionality and fashion, the Urban Cargo Pants feature multiple utility pockets, adjustable waistbands, and a relaxed tapered fit. Made from durable cotton-blend fabric, these cargos offer flexibility and comfort whether you’re on an outdoor adventure or going for a casual urban look.",
    shop: "Urban Threads",
  },
  {
    id: 4,
    name: "AeroFit Hoodie",
    price: "$84.90",
    rating: 4.9,
    reviews: 247,
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: require("./assets/product/hoodie.png"),
    colors: ["#1E1E1E", "#4A90E2", "#BDBDBD"],
    description:
      "Stay warm and stylish with the AeroFit Hoodie, designed with a lightweight fleece interior and a modern streetwear silhouette. The breathable yet insulating fabric keeps you comfortable in any season. With premium stitching, adjustable drawstrings, and a soft-touch texture, this hoodie blends performance and everyday comfort effortlessly.",
    shop: "AeroFit Store",
  },
];

export default products;
