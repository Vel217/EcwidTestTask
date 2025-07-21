# Ecwid Vue TypeScript Storefront

A fully-typed modular Vue 3 + TypeScript storefront application that integrates with the Ecwid REST API. This single-page application features product browsing, category navigation, and shopping cart functionality with local storage persistence.

## Features

- **Product Catalog**: Browse products and categories from Ecwid store
- **Category Navigation**: Navigate through categories and subcategories
- **Product Details**: View detailed product information and specifications
- **Shopping Cart**: Add products to cart with local storage persistence
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **TypeScript**: Fully typed for better developer experience
- **Modular Architecture**: Clean, feature-based project structure

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Routing**: Vue Router 4
- **Internationalization (i18n)**: vue-i18n 11
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Testing**: Vitest + Vue Test Utils

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ecwid-storefront
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production (with type checking)
- `npm run preview` – Preview production build locally
- `npm run test` – Run unit tests in watch mode
- `npm run test:run` – Run unit tests once (no watch)
- `npm run type-check` – Run TypeScript type checking only
- `npm run deploy` – Build and deploy to GitHub Pages
- `npm run lint:fix` – Run ESLint with auto-fix
- `npm run format` – Format code with Prettier

## Project Structure

```
src/
├── api/              # API services and configuration
├── assets/           # Static assets and CSS
├── components/       # Reusable Vue components
├── composables/      # Vue composables (cart logic)
├── i18n/             # Translation dictionary
├── pages/            # Route page components
├── router/           # Vue Router configuration
├── stores/           # State management
├── types/            # TypeScript type definitions
├── utils/            # Utils
└── main.ts          # Application entry point
```

## Key Features Implementation

### Cart Management

- Shopping cart state is managed using Vue composables
- Cart data persists in localStorage
- Real-time cart item count in header

### Routing

- `/` - Home page with categories and products
- `/category/:id` - Category page with subcategories and products
- `/product/:id` - Product details page
- `/cart` - Shopping cart page

### Components

- **ProductCard**: Displays product with image, name, price, and add to cart button
- **CategoryCard**: Shows category with image and product count
- **CartIcon**: Shopping cart icon with item count badge

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Testing

Run unit tests:

```bash
npm run test
```

The project includes unit tests for the cart management logic.

## Deployment

**Live URL:** [https://vel217.github.io/EcwidTestTask/](https://vel217.github.io/EcwidTestTask/)

To deploy the latest version:

```bash
npm run deploy
```
