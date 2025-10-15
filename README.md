# ARTIFEX GROUP - Architecture Website

Bu loyiha ARTIFEX GROUP kompaniyasi uchun yaratilgan modern arxitektura veb-sayti. Loyihada admin panel, project management, SEO optimization va PostgreSQL database ishlatilgan.

## 🚀 Texnologiyalar

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: PostgreSQL (Neon), Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI, shadcn/ui
- **File Storage**: AWS S3
- **Email**: Resend
- **SEO**: Structured Data, Open Graph, Twitter Cards

## 📋 Xususiyatlar

### Foydalanuvchilar uchun:

- Modern va responsive dizayn
- Hero section with statistics & partner logos
- Who We Are section with team images
- What We Do services showcase
- Philosophy & Partnerships sections
- Projects gallery (database-driven)
- News section
- Contact form with email integration
- Location & About sections
- Fully optimized for SEO
- Progressive Web App (PWA) support

### Admin uchun:

- Secure login system
- Project CRUD operatsiyalari
- Image upload to AWS S3
- Publish/unpublish projects
- Featured projects management
- Hero images management
- Who We Are images management
- News management
- Categories management
- Real-time statistics

### SEO Features:

- ✅ Comprehensive meta tags
- ✅ Open Graph & Twitter Cards
- ✅ JSON-LD Structured Data (Schema.org)
- ✅ Dynamic sitemap.xml
- ✅ robots.txt configuration
- ✅ Semantic HTML5 markup
- ✅ Image optimization (WebP, AVIF)
- ✅ Fast loading performance
- ✅ Mobile-first responsive design
- ✅ Accessibility (ARIA labels, skip links)
- ✅ Security headers
- ✅ PWA manifest
- ✅ Canonical URLs

## 🛠 O'rnatish

### 1. Repository ni clone qiling

```bash
git clone <repository-url>
cd artifex-group
```

### 2. Dependencies o'rnatish

```bash
npm install
# yoki
yarn install
# yoki
pnpm install
```

### 3. Environment variables sozlash

`.env.local` faylini yarating va quyidagilarni kiriting:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/artifex_db?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-very-secret-key-here"

# Admin credentials
ADMIN_EMAIL="admin@artifex.com"
ADMIN_PASSWORD="admin123"
```

### 4. Database sozlash

#### PostgreSQL o'rnatish (agar yo'q bo'lsa):

```bash
# macOS (Homebrew)
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# Windows
# PostgreSQL rasmiy saytidan yuklab oling
```

#### Database yaratish:

```bash
createdb artifex_db
```

#### Prisma migration va seed:

```bash
# Database schema yaratish
npx prisma migrate dev --name init

# Sample data va admin user yaratish
npm run db:seed
```

### 5. Development server ishga tushirish

```bash
npm run dev
```

Sayt `http://localhost:3000` da ochiladi.

## 📁 Loyiha tuzilishi

```
artifex-group/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   ├── projects/          # Project pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions
├── prisma/               # Database schema and migrations
├── public/               # Static files
└── types/                # TypeScript types
```

## 🔐 Admin Panel

Admin panelga kirish:

1. `http://localhost:3000/admin/login` ga o'ting
2. Default credentials:
   - Email: `admin@artifex.com`
   - Password: `admin123`

### Admin imkoniyatlari:

- **Dashboard**: Statistika va umumiy ma'lumotlar
- **Projects**: CRUD operatsiyalar
- **Image Management**: Rasm yuklash va boshqarish
- **Publishing**: Projectlarni publish/unpublish qilish
- **Featured**: Asosiy projectlarni belgilash

## 🗄 Database Schema

### User Table

- `id`, `email`, `password`, `name`, `role`
- Roles: `USER`, `ADMIN`

### Project Table

- `id`, `title`, `description`, `imageUrl`, `slug`
- `published`, `featured`, `authorId`
- `createdAt`, `updatedAt`

## 🎨 Dizayn Sistema

Loyiha **shadcn/ui** va **Tailwind CSS** ishlatadi:

- **Colors**: Custom color palette CSS variables orqali
- **Typography**: Montserrat (headings), Inter (body)
- **Components**: Reusable UI components
- **Animations**: Framer Motion

## 📱 API Endpoints

### Public Endpoints:

- `GET /api/projects/published` - Published projectlarni olish

### Admin Endpoints (Authentication kerak):

- `GET /api/projects` - Barcha projectlar
- `POST /api/projects` - Yangi project yaratish
- `GET /api/projects/[id]` - Project tafsilotlari
- `PUT /api/projects/[id]` - Project yangilash
- `DELETE /api/projects/[id]` - Project o'chirish

## 🚀 Production Deploy

### Vercel (tavsiya etiladi):

1. Vercel account yarating
2. Repository ni connect qiling
3. Environment variables ni sozlang
4. Deploy qiling

### Environment Variables (Production):

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="very-secure-secret-for-production"
ADMIN_EMAIL="your-admin-email"
ADMIN_PASSWORD="secure-admin-password"
```

## 🔧 Development

### Database boshqaruvi:

```bash
# Prisma Studio ochish
npm run db:studio

# Migration yaratish
npx prisma migrate dev --name your-migration-name

# Database reset
npx prisma migrate reset
```

### Code linting:

```bash
npm run lint
```

## 🤝 Contributing

1. Fork repository
2. Feature branch yarating
3. Commit qiling
4. Pull request yuboring

## 📄 License

MIT License

---

**ARTIFEX GROUP** - Architecture is about experience, not only visual
