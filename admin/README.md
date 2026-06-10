# Admin Dashboard Skeleton

This folder represents the structure of the Administrative Dashboard for the Cardiology Clinic.

## Role & Features
1. **Authentication System**: Secures the panel via Supabase JWT auth, restricting entry to validated medical and reception staff.
2. **Bookings Management**: Reads the `bookings` table from Supabase, enabling administrators to verify date availability, check patient concern notes, change appointment status (`pending`, `confirmed`, `cancelled`), and archive past records.
3. **Customer Database**: Displays unique customer profiles with phone numbers and emails to streamline communication.
4. **Settings Panel**: Allows configurations for notifications, reminder emails, and general operating hours.

## Key Design Patterns
- **Auth Guard Component**: Protects dashboard routes from unauthorized redirection.
- **Supabase Realtime Sync**: Integrates with PostgreSQL listeners to sync state in real time as patients complete forms.
