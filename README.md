# HOUSE OF MOJARI

Premium handcrafted Mojari e-commerce platform for women and men — inspired by Rajasthani royal heritage.

**Tagline:** Crafted for Her & Him · Walk the Heritage · Tradition in Every Step

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes
- **Database:** Local JSON files in `./data/` (free, no signup)
- **Auth:** JWT (HTTP-only cookies) for admin panel
- **Images:** Cloudinary
- **Checkout:** WhatsApp order flow (no payment gateway)
- **State:** Zustand (cart, wishlist, theme)
- **Hosting:** Vercel-ready

## Features

### Customer
- Cinematic animated homepage with hero, collections, craftsmanship story
- Product listing with filters (size, color, category, price)
- Product detail with image zoom, size/color selectors
- Cart with persistent local storage
- WhatsApp checkout flow
- Wishlist, search, dark/light mode
- Instagram gallery, testimonials

### Admin
- Protected dashboard with analytics
- Product CRUD with Cloudinary image upload
- Order management
- Banner & category management
- Featured product toggle

## Getting Started

### 1. Clone & Install

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in:

| Variable | Description |
|----------|-------------|
| `JWT_SECRET` | Random secret for admin JWT |
| `ADMIN_EMAIL` | Admin login email (optional) |
| `ADMIN_PASSWORD` | Admin login password (optional) |
| `CLOUDINARY_*` | Optional — for admin image uploads |
| `WHATSAPP_NUMBER` | Business WhatsApp number (country code, no +) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Same number for client-side links |
| `NEXT_PUBLIC_SITE_URL` | Site URL for metadata |

**No database signup needed.** All data is stored in the `data/` folder on your computer.

### 3. Seed Database (optional)

On **first admin login**, sample data is created automatically. Or run manually:

```bash
npm run seed
```

This creates:
- Admin account
- 6 sample products
- 5 categories
- 1 homepage banner

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Deploy to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Deploy

### Cloudinary Setup (optional)
Only needed if you upload product images from the admin panel.

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Copy cloud name, API key, and secret to env vars

**Note:** Vercel serverless deploys don't persist local JSON files. For production hosting, use a VPS or switch to a hosted database later.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages & API routes
│   ├── api/              # Backend API endpoints
│   ├── admin/            # Admin dashboard
│   ├── products/         # Product pages
│   ├── checkout/         # WhatsApp checkout
│   └── ...
├── components/           # React components
│   ├── admin/
│   ├── cart/
│   ├── checkout/
│   ├── home/
│   ├── layout/
│   ├── products/
│   └── ui/
├── lib/                  # Utilities, DB, Cloudinary, WhatsApp
├── models/               # Mongoose schemas
├── store/                # Zustand stores
└── types/                # TypeScript types
scripts/
└── seed.ts               # Database seeder
```

## WhatsApp Checkout Flow

1. Customer adds products to cart
2. Fills name, phone, address on checkout
3. Clicks "Place Order via WhatsApp"
4. Order saved to MongoDB
5. WhatsApp opens with pre-filled order message
6. Business confirms payment & delivery on WhatsApp

## Troubleshooting

### npm install fails on OneDrive (ENOENT / TAR_ENTRY_ERROR / EPERM)

If the project lives under `OneDrive`, sync can corrupt or lock `node_modules` during install.

**Fix (pick one):**
1. **Pause OneDrive sync**, close all terminals and Cursor, then delete `node_modules` and run install again
2. **Move the project** outside OneDrive (e.g. `C:\Projects\Mojari`) and reinstall there — recommended
3. In OneDrive settings, **exclude** the `node_modules` folder from sync

### npm postinstall errors (`ERR_INVALID_ARG_TYPE` on sharp/esbuild)

On Windows with Node 22 + npm 11, native postinstall scripts can fail. Use:

```powershell
npm install --ignore-scripts
```

Then run the app normally with `npm run dev`.

### `npm run dev` exits immediately with no output

Your `node_modules` is incomplete or corrupted. Delete `node_modules`, reinstall (see above), then try again.

After a clean install, verify with:

```bash
npm run build
```

## License

Private — HOUSE OF MOJARI
