/**
 * AppointmentModal — Booking modal for scheduling new appointments.
 * Uses react-hook-form for form state, ready for JSON POST to PHP.
 *
 * TODO [PHP]: On submit, call createAppointment() from api-service.ts
 * which POSTs to Laravel's /api/appointments endpoint.
 */
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createAppointment } from '@/lib/api-service';
import { CalendarDays, Clock } from 'lucide-react';

interface AppointmentFormData {
  patientName: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  dentist: string;
  notes: string;
}

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppointmentModal({ open, onOpenChange }: AppointmentModalProps) {
  const { register, handleSubmit, reset, setValue } = useForm<AppointmentFormData>({
    defaultValues: {
      patientName: '',
      date: '',
      time: '',
      duration: '30',
      type: 'consultation',
      dentist: '',
      notes: '',
    },
  });

  const onSubmit = async (data: AppointmentFormData) => {
    // TODO [PHP]: Sends JSON to POST /api/appointments via apiService
    await createAppointment(data as unknown as Record<string, unknown>);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Book Appointment
          </DialogTitle>
          <DialogDescription>
            Schedule a new patient visit. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Patient Name */}
          <div className="space-y-2">
            <Label htmlFor="patientName">Patient Name *</Label>
            <Input
              id="patientName"
              placeholder="Search or enter patient name"
              {...register('patientName', { required: true })}
            />
          </div>

          {/* Date & Time row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <div className="relative">
                <Input id="date" type="date" {...register('date', { required: true })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input id="time" type="time" className="pl-9" {...register('time', { required: true })} />
              </div>
            </div>
          </div>

          {/* Procedure Type & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Procedure Type *</Label>
              <Select onValueChange={(v) => setValue('type', v)} defaultValue="consultation">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="filling">Filling</SelectItem>
                  <SelectItem value="extraction">Extraction</SelectItem>
                  <SelectItem value="root-canal">Root Canal</SelectItem>
                  <SelectItem value="crown">Crown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Select onValueChange={(v) => setValue('duration', v)} defaultValue="30">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="45">45 min</SelectItem>
                  <SelectItem value="60">60 min</SelectItem>
                  <SelectItem value="90">90 min</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dentist */}
          <div className="space-y-2">
            <Label>Assigned Dentist *</Label>
            <Select onValueChange={(v) => setValue('dentist', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select dentist" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                <SelectItem value="dr-martinez">Dr. Martinez</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Special instructions, allergies, etc."
              rows={3}
              {...register('notes')}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Confirm Booking</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}