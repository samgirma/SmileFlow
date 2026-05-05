<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the services.
     */
    public function index()
    {
        $services = Service::all();
        
        // Return dummy data if table is empty for demonstration purposes
        if ($services->isEmpty()) {
            return response()->json([
                [
                    'id' => 1,
                    'title' => 'General Dentistry',
                    'description' => 'Comprehensive check-ups, cleanings, and preventive care to keep your smile healthy and bright.',
                    'image_url' => '/images/general-dentistry.jpg'
                ],
                [
                    'id' => 2,
                    'title' => 'Cosmetic Dentistry',
                    'description' => 'Transform your smile with our advanced cosmetic procedures, including whitening and veneers.',
                    'image_url' => '/images/cosmetic-dentistry.jpg'
                ],
                [
                    'id' => 3,
                    'title' => 'Orthodontics',
                    'description' => 'Straighten your teeth with modern orthodontic solutions like Invisalign and clear braces.',
                    'image_url' => '/images/orthodontics.jpg'
                ]
            ]);
        }

        return response()->json($services);
    }
}
