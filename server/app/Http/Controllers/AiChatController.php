<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Service;
use App\Models\User;

class AiChatController extends Controller
{
    /**
     * Bridge for RAG Assistant
     */
    public function chat(Request $request)
    {
        $request->validate([
            'query' => 'required|string',
        ]);

        $user = $request->user();
        
        // Fetch relevant clinic context (dummy/mocked context for LLM)
        $context = [
            'user' => [
                'name' => $user->name,
                'role' => $user->role,
            ],
            'clinic_info' => 'SmileFlow is a premium dental clinic offering General Dentistry, Cosmetic Dentistry, and Orthodontics.',
            'recent_appointments' => Appointment::where('patient_id', $user->id)
                ->orderBy('date', 'desc')
                ->take(3)
                ->get(),
            'available_services' => Service::all(),
        ];

        // Format a structured JSON response to send to an LLM
        return response()->json([
            'query' => $request->query('query'),
            'context' => $context,
            'instructions' => 'Use the provided context to answer the user query as a helpful dental assistant.'
        ]);
    }
}
