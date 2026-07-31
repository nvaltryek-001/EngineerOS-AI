export interface TechnicalSkill {
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ResumeAnalysisResult {
  atsScore: number;
  technicalSkills: TechnicalSkill[];
  softSkills: string[];
  missingKeywords: string[];
  improvementSuggestions: string[];
}

export async function analyzeResume(file: File): Promise<ResumeAnalysisResult> {
  const formData = new FormData();
  formData.append('resume', file);

  try {
    const response = await fetch('/api/resume/analyze', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to analyze resume');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
}
