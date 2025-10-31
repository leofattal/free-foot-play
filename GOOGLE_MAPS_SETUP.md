# Google Maps API Setup Guide

Your Google Maps API key is configured! This guide explains how to use it and what features are available.

## ✅ What's Already Built

### 1. **Field Information Page**
- **URL**: `/field-info`
- **File**: `app/field-info/page.tsx`
- Interactive Google Map showing field location
- Get Directions button (opens Google Maps app)
- Copy address button
- Parking information
- Field rules and code of conduct
- Amenities and facilities list
- Weather cancellation policy

### 2. **Google Map Component**
- **File**: `components/maps/GoogleMap.tsx`
- Reusable map component
- Interactive marker with info window
- Auto-centers on field location
- Loading state with spinner
- Error handling with fallback UI
- Fully responsive design

## Features

### Interactive Map Features
- ✅ **Custom Marker**: Shows field location with soccer field title
- ✅ **Info Window**: Clickable marker shows field name
- ✅ **Map Controls**: Zoom, Street View, Map Type controls
- ✅ **Responsive**: Works perfectly on mobile and desktop
- ✅ **Loading State**: Shows spinner while map loads
- ✅ **Error Handling**: Graceful fallback if API key is missing

### Get Directions
- **Button**: Opens Google Maps with directions from user's location
- **URL Format**: `https://www.google.com/maps/dir/?api=1&destination=LAT,LNG`
- Works on all devices and platforms

### Copy Address
- One-click copy to clipboard
- Visual confirmation alert
- Works on all modern browsers

## How to Update Field Information

### Option 1: Update in Supabase Dashboard

1. Go to your Supabase dashboard
2. Navigate to **Table Editor** → `field_information`
3. Edit the row with your actual field details:
   - `name`: Your field name
   - `address`: Full street address
   - `latitude`: GPS latitude (get from Google Maps)
   - `longitude`: GPS longitude
   - `parking_info`: Parking instructions
   - `rules`: Field rules (separate with periods)
   - `amenities`: Available facilities (separate with periods)
4. Click **Save**

### Option 2: Update via SQL

Run this in Supabase SQL Editor:

```sql
UPDATE field_information
SET
  name = 'Your Soccer Field Name',
  address = '123 Main St, City, State 12345',
  latitude = 40.7128,  -- Replace with actual latitude
  longitude = -74.0060, -- Replace with actual longitude
  parking_info = 'Your parking instructions here.',
  rules = 'Rule 1. Rule 2. Rule 3.',
  amenities = 'Amenity 1. Amenity 2. Amenity 3.'
WHERE id = (SELECT id FROM field_information LIMIT 1);
```

### How to Get Latitude & Longitude

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your field address
3. Right-click on the location
4. Click the coordinates at the top (they'll be copied!)
5. Format: `40.7128, -74.0060` (latitude, longitude)

## Environment Variables

Your `.env.local` should have:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-actual-api-key-here
```

**Important**:
- The `NEXT_PUBLIC_` prefix makes it available in the browser
- Never commit `.env.local` to Git (it's in `.gitignore`)
- For production, add the key to your Vercel/hosting environment variables

## API Key Configuration

### Current Setup
Your Google Maps API key is already configured. Make sure it has these APIs enabled:

1. **Maps JavaScript API** ✅ (Required for map display)
2. **Places API** ✅ (Required for place details)
3. **Directions API** (Optional, for advanced features)

### Security: Restrict Your API Key

**Important for Production**: Restrict your API key to prevent unauthorized use

#### Application Restrictions
In Google Cloud Console → Credentials → Your API Key:

1. **HTTP referrers (websites)**:
   - `http://localhost:3000/*` (development)
   - `https://yourdomain.com/*` (production)
   - `https://*.vercel.app/*` (if using Vercel)

#### API Restrictions
Enable only these APIs:
- Maps JavaScript API
- Places API

This prevents misuse and keeps your API costs under control.

## Usage Limits

### Google Maps Free Tier
- **Free**: $200 credit per month
- **Maps JavaScript API**: ~28,000 map loads/month free
- **Typical Usage**: Most small apps stay within free tier

### Monitor Usage
Check usage in [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Dashboard

## Using the Map Component

The `GoogleMap` component is reusable across your app:

```tsx
import GoogleMap from '@/components/maps/GoogleMap';

<GoogleMap
  latitude={34.0522}
  longitude={-118.2437}
  markerTitle="My Soccer Field"
  zoom={15}
  height="400px"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `latitude` | number | Required | GPS latitude |
| `longitude` | number | Required | GPS longitude |
| `markerTitle` | string | 'Soccer Field' | Marker popup text |
| `zoom` | number | 15 | Map zoom level (1-20) |
| `height` | string | '450px' | Map container height |

## Testing

### Test the Field Info Page

1. Make sure dev server is running:
   ```bash
   npm run dev
   ```

2. Visit: http://localhost:3000/field-info

3. You should see:
   - Interactive map with marker
   - Field address and details
   - "Get Directions" button
   - "Copy Address" button
   - Parking information
   - Field rules
   - Amenities list

### Troubleshooting

#### Map Not Loading
- **Check**: Is `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in `.env.local`?
- **Check**: Did you restart the dev server after adding the key?
- **Check**: Is Maps JavaScript API enabled in Google Cloud Console?
- **Check**: Browser console for error messages

#### "For development purposes only" Watermark
- This appears when billing is not set up in Google Cloud
- It's okay for development
- For production, enable billing in Google Cloud Console

#### Map Shows Wrong Location
- Verify latitude and longitude in database
- Remember: latitude is Y (north/south), longitude is X (east/west)
- Use Google Maps to get correct coordinates

## Advanced Features (Future)

You can extend the map with:

### Multiple Markers
Show multiple field locations:
```tsx
const fields = [
  { lat: 34.0522, lng: -118.2437, name: 'Field 1' },
  { lat: 34.0523, lng: -118.2438, name: 'Field 2' },
];
```

### Custom Marker Icons
Use soccer ball icon instead of default pin:
```tsx
const icon = {
  url: '/icons/soccer-ball.png',
  scaledSize: new google.maps.Size(40, 40),
};
```

### Directions Display
Show route on map from user location to field.

### Traffic Layer
Show real-time traffic conditions:
```tsx
const trafficLayer = new google.maps.TrafficLayer();
trafficLayer.setMap(map);
```

## Cost Optimization

### Tips to Stay in Free Tier

1. **Lazy Load**: Map only loads when page is visited
2. **Cache**: Browser caches map tiles
3. **Static Maps**: For email notifications, use Static Maps API (cheaper)
4. **Restrict API Key**: Prevents unauthorized usage
5. **Monitor**: Check usage monthly

## Next Steps

Your Field Information page is complete and ready to use!

**To make it live:**
1. Update field coordinates in Supabase (see "How to Update" above)
2. Add your actual field address
3. Customize parking instructions
4. Update field rules as needed
5. Test thoroughly on mobile and desktop

**Optional enhancements:**
- Add photos of the field
- Weather widget integration
- Directions via public transit
- Street View integration
- Multiple field locations

---

## Support

If you encounter issues:

1. Check [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
2. Verify API key permissions
3. Check browser console for errors
4. Ensure billing is enabled for production use

**Your Field Info page is ready! 🗺️⚽**
