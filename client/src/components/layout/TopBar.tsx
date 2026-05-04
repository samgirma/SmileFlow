/**
 * TopBar — Clinic top navigation with patient search and notifications.
 */
import { useState } from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AppointmentModal } from '@/components/dashboard/AppointmentModal';

export function TopBar() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
        {/* Sidebar collapse trigger */}
        <SidebarTrigger className="-ml-1" />

        {/* Patient search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patients, charts, appointments..."
            className="pl-9 bg-muted/50 border-transparent focus:border-border focus:bg-card"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          {/* Quick book button */}
          <Button size="sm" onClick={() => setShowBooking(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Book Appointment</span>
          </Button>

          {/* Notifications */}
          <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full p-0 text-[10px] flex items-center justify-center">
              3
            </Badge>
          </button>
        </div>
      </header>

      {/* Appointment booking modal */}
      <AppointmentModal open={showBooking} onOpenChange={setShowBooking} />
    </>
  );
}