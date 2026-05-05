<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Store a newly created appointment in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'dentist_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'time' => 'required',
            'duration' => 'required|integer',
            'type' => 'required|string',
        ]);

        // Check if dentist is available at this time
        $conflict = Appointment::where('dentist_id', $request->dentist_id)
            ->where('date', $request->date)
            ->where(function($query) use ($request) {
                // Simplified overlap check
                $query->where('time', $request->time);
            })
            ->first();

        if ($conflict) {
            return response()->json([
                'message' => 'Dentist is not available at this time.'
            ], 422);
        }

        $appointment = Appointment::create([
            'patient_id' => $request->user()->id,
            'dentist_id' => $request->dentist_id,
            'date' => $request->date,
            'time' => $request->time,
            'duration' => $request->duration,
            'type' => $request->type,
            'status' => 'scheduled',
            'notes' => $request->notes,
        ]);

        return response()->json($appointment, 201);
    }
}
