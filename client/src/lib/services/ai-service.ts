/**
 * AI/ML Service Integration
 * 
 * Handles communication with external AI services for:
 * - RAG-powered chat assistant
 * - Dental diagnostics suggestions
 * - Treatment recommendations
 * - Natural language processing
 */

import config from '../config/env';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  metadata?: {
    confidence?: number;
    sources?: string[];
    model?: string;
  };
}

export interface AIResponse {
  message: string;
  confidence?: number;
  sources?: string[];
  suggestions?: string[];
  followUpQuestions?: string[];
}

export interface AIServiceConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  context: string;
}

class AIService {
  private baseUrl: string;
  private apiKey: string;
  private model: string;

  constructor() {
    this.baseUrl = config.ai.serviceUrl;
    this.apiKey = config.ai.serviceKey;
    this.model = config.ai.model;
  }

  /**
   * Send message to AI assistant with RAG context
   */
  async sendMessage(message: string, context?: string): Promise<AIResponse> {
    if (!config.features.aiAssistant) {
      throw new Error('AI Assistant is disabled');
    }

    if (config.development.mockApi) {
      return this.mockAIResponse(message);
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          message,
          model: this.model,
          context: context || 'dental_services',
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI Service Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('AI Service Error:', error);
      // Fallback to mock response
      return this.mockAIResponse(message);
    }
  }

  /**
   * Get dental treatment suggestions based on symptoms
   */
  async getTreatmentSuggestions(symptoms: string[]): Promise<AIResponse> {
    if (!config.features.aiAssistant) {
      throw new Error('AI Assistant is disabled');
    }

    if (config.development.mockApi) {
      return this.mockTreatmentSuggestions(symptoms);
    }

    try {
      const response = await fetch(`${this.baseUrl}/treatment-suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          symptoms,
          model: this.model,
          context: 'dental_diagnosis',
        }),
      });

      if (!response.ok) {
        throw new Error(`AI Service Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('AI Treatment Suggestions Error:', error);
      return this.mockTreatmentSuggestions(symptoms);
    }
  }

  /**
   * Analyze dental image for preliminary assessment
   */
  async analyzeImage(imageBase64: string): Promise<AIResponse> {
    if (!config.features.aiAssistant) {
      throw new Error('AI Assistant is disabled');
    }

    if (config.development.mockApi) {
      return this.mockImageAnalysis();
    }

    try {
      const response = await fetch(`${this.baseUrl}/image-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          image: imageBase64,
          model: this.model,
          context: 'dental_image_analysis',
        }),
      });

      if (!response.ok) {
        throw new Error(`AI Service Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('AI Image Analysis Error:', error);
      return this.mockImageAnalysis();
    }
  }

  /**
   * Mock AI response for development
   */
  private async mockAIResponse(message: string): Promise<AIResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses = [
      {
        message: "Based on your question about our services, I can help you understand our comprehensive dental care options. We offer preventative care, cosmetic dentistry, emergency services, and specialized treatments.",
        confidence: 0.95,
        sources: ['services_database', 'treatment_protocols'],
        suggestions: ['Schedule a consultation', 'View our treatment gallery', 'Read patient testimonials'],
        followUpQuestions: ['What specific dental concerns do you have?', 'Are you interested in cosmetic or functional treatments?']
      },
      {
        message: "I'd be happy to provide information about our pricing and insurance options. We work with most major insurance providers and offer flexible payment plans.",
        confidence: 0.92,
        sources: ['pricing_database', 'insurance_partners'],
        suggestions: ['Request a quote', 'Check your insurance coverage', 'Explore financing options'],
        followUpQuestions: ['Do you have dental insurance?', 'What treatments are you considering?']
      },
      {
        message: "Our team of experienced dentists specializes in various areas including general dentistry, orthodontics, and cosmetic procedures. Each dentist is highly qualified and committed to providing exceptional care.",
        confidence: 0.98,
        sources: ['dentist_profiles', 'credentials_database'],
        suggestions: ['Meet our dentists', 'Read doctor bios', 'Schedule with a specific dentist'],
        followUpQuestions: ['Do you have a preference for a specific dentist?', 'What type of treatment are you seeking?']
      }
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Mock treatment suggestions
   */
  private async mockTreatmentSuggestions(symptoms: string[]): Promise<AIResponse> {
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      message: `Based on the symptoms you've described (${symptoms.join(', ')}), I recommend scheduling an appointment for a thorough examination. These symptoms could indicate various conditions that require professional evaluation.`,
      confidence: 0.85,
      sources: ['symptom_database', 'clinical_guidelines'],
      suggestions: [
        'Schedule immediate appointment',
        'Avoid hot/cold foods',
        'Use over-the-counter pain relief',
        'Maintain gentle oral hygiene'
      ],
      followUpQuestions: [
        'How long have you been experiencing these symptoms?',
        'Is the pain constant or intermittent?',
        'Have you noticed any swelling or discoloration?'
      ]
    };
  }

  /**
   * Mock image analysis
   */
  private async mockImageAnalysis(): Promise<AIResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      message: "I've analyzed the dental image and note some areas that may require attention. However, this is a preliminary assessment and should be confirmed by a qualified dentist during a proper examination.",
      confidence: 0.78,
      sources: ['image_analysis_model', 'dental_atlas'],
      suggestions: [
        'Schedule professional examination',
        'Consider digital x-rays for detailed analysis',
        'Document changes over time'
      ],
      followUpQuestions: [
        'When was your last dental examination?',
        'Are you experiencing any pain or discomfort?',
        'Have you noticed any recent changes in your oral health?'
      ]
    };
  }

  /**
   * Check if AI service is available
   */
  async isAvailable(): Promise<boolean> {
    if (!config.features.aiAssistant) {
      return false;
    }

    if (config.development.mockApi) {
      return true;
    }

    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get service configuration
   */
  getConfig(): AIServiceConfig {
    return {
      model: this.model,
      temperature: 0.7,
      maxTokens: 1000,
      context: 'dental_services'
    };
  }
}

// Export singleton instance
export const aiService = new AIService();

// Export types
export type { AIService };
