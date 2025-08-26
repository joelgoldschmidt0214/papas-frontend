/**
 * Survey API Client
 * アンケート関連のAPI通信を管理
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface SurveyResponse {
  survey_id: number;
  title: string;
  question_text?: string;
  points: number;
  deadline?: string;
  target_audience: string;
  created_at: string;
  response_count: number;
}

export interface SurveyResponseSubmission {
  choice: 'agree' | 'disagree';
  comment?: string;
}

export interface SurveyResponseResult {
  message: string;
  survey_id: number;
  response_id: number;
  choice: string;
}

export interface SurveyStatistics {
  survey_id: number;
  survey_title: string;
  total_responses: number;
  choice_statistics: {
    [key: string]: {
      count: number;
      percentage: number;
    };
  };
  responses_with_comments: number;
  response_rate_info: {
    total_responses: number;
    target_audience: string;
  };
}

export interface SurveyComment {
  response_id: number;
  choice: 'agree' | 'disagree';
  comment: string;
  submitted_at: string;
  is_anonymous: boolean;
}

export interface SurveyCommentsResponse {
  survey_id: number;
  survey_title: string;
  comments: SurveyComment[];
  total_comments: number;
}

/**
 * アンケート回答を投稿
 */
export async function submitSurveyResponse(
  surveyId: number,
  choice: 'agree' | 'disagree',
  comment?: string
): Promise<SurveyResponseResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/surveys/${surveyId}/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        choice,
        comment: comment || null,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || '回答の送信に失敗しました');
    }

    return await response.json();
  } catch (error) {
    console.error('Survey submission error:', error);
    throw error;
  }
}

/**
 * アンケートの集計結果を取得
 */
export async function getSurveyStatistics(surveyId: number): Promise<SurveyStatistics> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/surveys/${surveyId}/responses`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || '集計データの取得に失敗しました');
    }

    return await response.json();
  } catch (error) {
    console.error('Survey statistics error:', error);
    throw error;
  }
}

/**
 * アンケート一覧を取得
 */
export async function getSurveys(): Promise<SurveyResponse[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/surveys`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'アンケート一覧の取得に失敗しました');
    }

    return await response.json();
  } catch (error) {
    console.error('Get surveys error:', error);
    throw error;
  }
}

/**
 * 特定のアンケートを取得
 */
export async function getSurvey(surveyId: number): Promise<SurveyResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/surveys/${surveyId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'アンケートの取得に失敗しました');
    }

    return await response.json();
  } catch (error) {
    console.error('Get survey error:', error);
    throw error;
  }
}

/**
 * アンケートのコメント付き回答を取得
 */
export async function getSurveyComments(surveyId: number): Promise<SurveyCommentsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/surveys/${surveyId}/comments`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'コメントの取得に失敗しました');
    }

    return await response.json();
  } catch (error) {
    console.error('Get survey comments error:', error);
    throw error;
  }
}
