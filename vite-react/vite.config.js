import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { globalConst } from 'vite-plugin-global-const'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    globalConst({
      server_response: JSON.stringify(
        {
          1: {
            id: 1,
            image: "/assets/images/image-waffle-desktop.jpg",
            type: "Waffle",
            title: "Waffle with Berries",
            price: "6.50",
            cartStatus: "4"
          },
          2: {
            id: 2,
            image: "/assets/images/image-creme-brulee-desktop.jpg",
            type: "Crème Brûlée",
            title: "Vanilla Bean Crème Brûlée",
            price: "7.00",
            cartStatus: "Add to cart"
          },
          3: {
            id: 3,
            image: "/assets/images/image-macaron-desktop.jpg",
            type: "Macaron",
            title: "Macaron Mic of Five",
            price: "8.00",
            cartStatus: "Add to cart"
          },
          4: {
            id: 4,
            image: "/assets/images/image-tiramisu-desktop.jpg",
            type: "Tiramisu",
            title: "Classic Tiramisu",
            price: "5.50",
            cartStatus: "Add to cart"
          },
          5: {
            id: 5,
            image: "/assets/images/image-baklava-desktop.jpg",
            type: "Baklava",
            title: "Pistachio Baklava",
            price: "5.50",
            cartStatus: "className to cart"
          },
          6: {
            id: 6,
            image: "/assets/images/image-meringue-desktop.jpg",
            type: "Pie",
            title: "Lemon Meringue Pie",
            price: "5.50",
            cartStatus: "Add to cart"
          },
          7: {
            id: 7,
            image: "/assets/images/image-cake-desktop.jpg",
            type: "Cake",
            title: "Red Velvet Cake",
            price: "4.50",
            cartStatus: "Add to cart"
          },
          8: {
            id: 8,
            image: "/assets/images/image-brownie-desktop.jpg",
            type: "Brownie",
            title: "Salted Caramel Brownie",
            price: "4.50",
            cartStatus: "Add to cart"
          },
          9: {
            id: 9,
            image: "/assets/images/image-panna-cotta-desktop.jpg",
            type: "Panna Cotta",
            title: "Vanilla Panna Cotta",
            price: "6.50",
            cartStatus: "Add to cart"
          },
        }
      )
    })
  ],
  ssr: true,
})