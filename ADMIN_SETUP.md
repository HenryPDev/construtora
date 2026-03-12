# Admin Panel Setup Guide

## Overview
The admin panel has been successfully implemented with full CRUD operations for managing properties (houses/projects).

## Features Implemented

### 1. Authentication
- **Login Page**: `/admin/login`
- **Credentials**:
  - User: `admin`
  - Password: `admin123`
  - (Configured in `.env` file)
- **Session**: Browser localStorage with Base64 token

### 2. Admin Pages
- **Dashboard**: `/admin/dashboard` - Overview with quick stats and actions
- **Manage Properties**: `/admin/casas` - List all properties with actions
- **Create New**: `/admin/casas/novo` - Form to create new property
- **Edit Property**: `/admin/casas/[slug]/editar` - Form to edit existing property

### 3. Property Management Features
- **Create**: Full form with all fields (title, description, images, location, etc.)
- **Read**: List view with filtering and sorting options
- **Update**: Edit existing properties with slug validation
- **Delete**: Confirmation modal before deletion
- **Validation**:
  - Slug uniqueness check via API
  - Automatic slug generation from title
  - Required fields: slug, title, description, image
  - Optional fields: location, area, bedrooms, bathrooms, etc.

### 4. Form Fields
**Required:**
- Title - Name of the property
- Description - Detailed description
- Image URL - Main image
- Slug - Unique identifier (auto-generated or manual)

**Optional:**
- Location - Area/city
- Area - Square meters
- Bedrooms - Number of bedrooms
- Bathrooms - Number of bathrooms
- Style - Architectural style
- Year Delivery - Year of completion
- Status - Available, In Construction, Sold, Rental
- Has Pool - Checkbox
- Is Furnished - Checkbox
- Images - Multiple additional images

### 5. Design
- Dark theme: `#070707`, `#0d0d0d` backgrounds
- Gold accents: `rgba(196,160,80,1)`
- Fonts: Oswald (body), Cormorant (headings)
- Responsive sidebar navigation
- Mobile-friendly interface

## Getting Started

### Prerequisites
1. Backend running on `http://localhost:3005`
2. Database with houses table configured
3. Node.js and npm installed
4. Lucide React icons package (already included)

### Running the Application

**Frontend Development:**
```bash
cd /c/Users/Henry/Documents/GitHub/construtora
npm run dev
```
Access at `http://localhost:3000`

**Backend Development:**
```bash
cd /c/Users/Henry/Documents/GitHub/backend-construtora
npm run dev
```
Runs on `http://localhost:3005`

## Testing Checklist

### 1. Authentication
- [ ] Navigate to `/admin/login`
- [ ] Try invalid credentials (should fail)
- [ ] Login with `admin` / `admin123`
- [ ] Should redirect to `/admin/dashboard`
- [ ] Click "Sair" (Logout) - should redirect to login
- [ ] Try accessing `/admin/dashboard` without login - should redirect to login

### 2. Dashboard
- [ ] View total houses count
- [ ] See quick action buttons
- [ ] Navigate to manage properties from dashboard

### 3. List Properties (`/admin/casas`)
- [ ] See all properties listed in table
- [ ] See columns: Title, Location, Status, Actions
- [ ] View button (👁️) - opens property in new tab at `/catalogo/[slug]`
- [ ] Edit button (✏️) - navigates to edit page
- [ ] Delete button (🗑️) - opens confirmation modal

### 4. Create New Property (`/admin/casas/novo`)
- [ ] Fill in all required fields
- [ ] Slug auto-generates from title
- [ ] Manual slug editing works
- [ ] Slug validation prevents duplicate slugs
- [ ] Add multiple images (add/remove buttons work)
- [ ] Select status from dropdown
- [ ] Toggle pool and furnished checkboxes
- [ ] Submit form
- [ ] Success message appears
- [ ] Redirects to list after 1.5 seconds
- [ ] New property appears in the list

### 5. Edit Property (`/admin/casas/[slug]/editar`)
- [ ] Access from edit button on list
- [ ] Form pre-fills with current property data
- [ ] Can modify title (slug validation runs)
- [ ] Can add/remove images
- [ ] Can update all fields
- [ ] Submit form
- [ ] Success message appears
- [ ] Redirects to list
- [ ] Changes reflected in public catalog (`/catalogo`)

### 6. Delete Property
- [ ] Click delete button on any property
- [ ] Confirmation modal appears with property title
- [ ] Cancel button closes modal (property still exists)
- [ ] Confirm button deletes property
- [ ] Property removed from list
- [ ] Property no longer accessible at `/catalogo/[slug]`

### 7. Public Pages Integration
- [ ] Create a new property in admin
- [ ] Property appears on `/catalogo` (catalog page)
- [ ] Can view property details at `/catalogo/[slug]`
- [ ] Edit property title/description in admin
- [ ] Changes appear on public catalog
- [ ] Delete property in admin
- [ ] Property no longer visible on catalog

### 8. Form Validation
- [ ] Submit with empty required fields - shows errors
- [ ] Enter invalid URL for image - warns but allows save
- [ ] Try duplicate slug - shows error on focus
- [ ] Enter non-numeric values for area/bedrooms - prevents or converts
- [ ] Year field accepts 4-digit years

### 9. Error Handling
- [ ] Disconnect backend API - should show error
- [ ] Try to delete with error - shows error message
- [ ] Try to create with API error - shows error message
- [ ] Network timeout - shows appropriate error

### 10. Responsive Design
- [ ] Test on desktop (full sidebar visible)
- [ ] Test on tablet (responsive layout)
- [ ] Test on mobile (sidebar hidden, toggle button shows)
- [ ] Mobile: Click menu to open sidebar
- [ ] Mobile: Click outside sidebar to close
- [ ] All buttons and inputs properly sized on mobile

## API Endpoints Used

### Create House
```bash
POST http://localhost:3005/api/houses
Content-Type: application/json

{
  "slug": "my-property",
  "title": "Beautiful House",
  "description": "Detailed description",
  "image": "https://example.com/image.jpg",
  "images": ["https://example.com/image2.jpg"],
  "location": "City Name",
  "area": 250,
  "bedrooms": 3,
  "bathrooms": 2,
  "hasPool": true,
  "isFurnished": false,
  "status": "Disponível",
  "style": "Modern",
  "yearDelivery": "2025"
}
```

### Get All Houses
```bash
GET http://localhost:3005/api/houses?limit=1000
```

### Get Single House
```bash
GET http://localhost:3005/api/houses/[slug]
```

### Update House
```bash
PUT http://localhost:3005/api/houses/[slug]
Content-Type: application/json
{...updated fields...}
```

### Delete House
```bash
DELETE http://localhost:3005/api/houses/[slug]
```

## Troubleshooting

### Admin Pages Not Loading
- Check if authenticated: Try `/admin/login`
- Check browser console for errors
- Verify `.env` has correct `NEXT_PUBLIC_API_URL`

### Can't Create/Update Properties
- Verify backend is running on correct port (3005)
- Check CORS settings in backend
- Verify database is accessible
- Check browser network tab for API errors

### Images Not Displaying
- Verify image URLs are correct and accessible
- Check if URLs are valid (use https:// or http://)
- Some URLs may be blocked by CORS

### Slug Validation Always Fails
- Check API connection
- Verify slugs don't contain spaces (use hyphens instead)
- Try different slug format

## Future Enhancements
- File upload instead of URL input
- Image optimization and cropping
- Advanced filtering and search
- Batch operations
- Activity logs
- Role-based access control
- Rich text editor for descriptions

## Security Notes
- Current auth uses localStorage tokens (for development only)
- Credentials are stored in `.env` as plain text
- For production, implement proper:
  - Password hashing
  - Session management
  - CSRF protection
  - Input sanitization
  - Rate limiting
