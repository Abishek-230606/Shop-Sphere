# ShopSphere - Premium E-Commerce Platform

ShopSphere is a premium online shopping destination built with React, offering customers a seamless, intuitive, and secure shopping experience. It is a fully responsive, client-side application designed with modern aesthetics and smooth interactions.

## 🌟 Key Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices.
- **Modern UI/UX Style** - Sleek dark mode elements, warm gold accent hues (`var(--accent-gold)`), and smooth micro-animations.
- **Instant Search with Clear Control** - Interactive navigation search bar containing a clean click-to-clear (`✕`) option.
- **Shop Catalog** - Responsive product catalog showcasing modern items with brand cards and add-to-cart controls.
- **Returns & Orders** - Dedicated orders and return portal page.
- **Minimalist Styling** - Handcrafted styling variables built using clean Vanilla CSS.

## 📋 Project Structure

```
shopsphere/
├── public/
│   └── index.html                 # Main HTML entry point
├── src/
│   ├── api/
│   │   ├── client.js              # Base API configuration
│   │   ├── product.js             # Product APIs (fetch list/by ID)
│   │   └── contact.js             # Contact support APIs
│   ├── components/
│   │   ├── Navbar.js              # Header navigation bar with search & mini-cart preview
│   │   ├── Navbar.css             # Navigation styling
│   │   ├── productcard.js         # Reusable Product Card component
│   │   └── productcard.css        # Product card styling
│   ├── pages/
│   │   ├── Home.js                # Core landing page
│   │   ├── Home.css               # Home page styling
│   │   ├── Shop.js                # Product search catalog
│   │   ├── shop.css               # Shop catalog styling
│   │   ├── About.js               # Company information
│   │   ├── Contact.js             # Customer support
│   │   ├── Cart.js                # Shopping cart overview
│   │   ├── ReturnsOrders.js       # Returns & Orders portal
│   │   └── StaticPage.css         # Shared page styling
│   ├── App.js                     # Main App container & routing
│   ├── App.css                    # Global application layout wrappers
│   └── index.js                   # React entry point
└── package.json                   # Configurations and dependencies
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16.x or newer recommended)
- **npm** or **yarn** package manager

### Installation Steps

1. **Navigate to the project folder**
   ```bash
   cd Shop-Sphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the API Server** (to serve mock product catalog data)
   ```bash
   npm run server
   ```

4. **Start the React Application** (in a separate terminal)
   ```bash
   npm start
   ```

   The application will automatically launch in your default browser at `http://localhost:3000`.

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Runs the app in development mode with hot reload |
| `npm run server` | Starts local json-server database (`db.json`) on port 5000 |
| `npm run build` | Creates optimized production build files in `build/` |
| `npm test` | Launches the testing utility environment |

## 📄 Pages Overview

| Page | Description | Status |
|------|-------------|--------|
| **Home** | Premium landing page featuring dynamic carousels, custom trust indicators, and category cards. | ✅ Live |
| **Shop** | Real-time mock API integration loading products with interactive search filters and cards. | ✅ Live |
| **About** | Company profile, core values, statistics, and organizational history timeline. | ✅ Live |
| **Contact** | Support contact information and FAQs. | 🔜 Coming Soon |
| **Cart** | Cart management page displaying items, subtotals, and custom checkout flows. | ✅ Live |

## 🔄 Roadmap

### Phase 1 (Completed)
- ✅ Core application structure
- ✅ Navigation and routing
- ✅ Responsive design
- ✅ Home page with hero section

### Phase 2 (Completed)
- 🔜Created json mock api to list products with following params
  -product_name,
  -sku,
  -price,
  -description,
  -brand
- 🔜Contact us details added json api

### Phase 3 (Coming Soon)
- 🔜Design the following pages with bootstrap or material UI
   - Shop page with listing of pages with pagination and add to cart button
   - User clicks on add to cart it will add to the cart, using react context or react redux
   - User click on view cart , will redirect to cart page with addtion or subtraction of quantities with total summary
- 🔜Created json mock api to list products with following params
    -product_name,
    -sku,
    -price,
    -description,
    -brand
- 🔜Contact us details added json api

### Phase 3 (Completed)
- 🔜Design the following pages with bootstrap or material UI
   - Shop page with listing of pages with pagination and add to cart button
   - User clicks on add to cart it will add to the cart, using react context or react redux
   - User click on view cart , will redirect to cart page with addtion or subtraction of quantities with total summary

### Phase 4 (Coming Soon)
- 🔜Design contact us page with following input fields with proper   validation and save as json data using axios or fetch
 - 1)Name 
 - 2)Email 
 - 3)Phone
 - 4)Subject 
 - 5)Message 

## 🛠️ Technologies Used

- **React 18** - Front-end JavaScript UI building library
- **React Router v6** - Client-side page navigation routing
- **Vanilla CSS** - Design system tokens (colors, animations, sizes)
- **json-server** - Local mock API backend server configuration

## 📞 Support & Contact

- **Email**: jsabishek236@gmail.com

---

**Version**: 3.0.0
