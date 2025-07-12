export declare const Models: {
    readonly 'gpt-4': "GPT-4";
    readonly claude: "Claude";
    readonly grok: "Grok";
    readonly gemini: "Gemini";
};
export type ModelName = keyof typeof Models;
export interface ModelResponse {
    id: string;
    modelName: ModelName;
    text: string;
    promptId: string;
}
export interface Prompt {
    id: string;
    text: string;
    createdAt: Date;
    responses: ModelResponse[];
}
export interface PromptData {
    prompt: Prompt;
    responses: ModelResponse[];
}
//# sourceMappingURL=models.d.ts.map