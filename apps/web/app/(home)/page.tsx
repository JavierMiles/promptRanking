'use client';

import { useState, useEffect } from 'react';
import { Textbox } from "@repo/ui/textbox";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Dropdown } from "@repo/ui/dropdown";
import { useChampionshipStore, useModelsStore } from '@repo/store';

import { getModelResponses } from '@/api/model';
import { dimensions } from '@/api/dimension';
import type { ModelName, Dimension } from '@repo/types';
import { Models } from '@repo/types';


const ALL_MODELS: ModelName[] = Object.keys(Models) as ModelName[];
const options = ALL_MODELS.map(model => ({
  value: model,
  label: Models[model]
}));
const ALL_DIMENSIONS = dimensions.map(dim => ({ value: dim.id, label: dim.name }));

export default function Home() {
  const [prompt, setPrompt] = useState('programming');
  const [selectedModels, setSelectedModels] = useState<ModelName[]>(ALL_MODELS);
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>(ALL_DIMENSIONS.map(dim => dim.value));
  const [loading, setLoading] = useState(false);

  const { setResponses, responses, clearResponses } = useModelsStore();
  const { clearChampionship } = useChampionshipStore();

  useEffect(() => {
    clearResponses();
    clearChampionship();
  }, [clearResponses, clearChampionship]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || selectedModels.length === 0 || selectedDimensions.length === 0) return;

    setLoading(true);

    const { data } = await getModelResponses(prompt, selectedModels);

    const realDimensions = selectedDimensions.map(dim => dimensions.find(d => d.id === dim)).filter(Boolean) as Dimension[];

    setResponses(data, prompt, realDimensions);

    setLoading(false);
  };

  const handleScrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleModelToggle = (modelName: string) => {
    const model = modelName as ModelName;
    setSelectedModels(prev => 
      prev.includes(model) 
        ? prev.filter(m => m !== model)
        : [...prev, model]
    );
  };

  const handleDimensionToggle = (dimensionId: string) => {
    setSelectedDimensions(prev => 
      prev.includes(dimensionId) 
        ? prev.filter(d => d !== dimensionId)
        : [...prev, dimensionId]
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Prompt Battle Arena!
        </h1>
        <p className="text-lg text-gray-300">
          There can be only one!
        </p>
      </header>

      <div
        className={`
          fixed bottom-8 right-8 flex flex-row gap-4
          transition-opacity duration-300
          ${responses.length ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <Button
          label="Fight!"
          icon="swords"
          size="lg"
          disabled={!responses.length}
          href="/arena"
        />
        <Button
          icon="arrow_downward_alt"
          variant="secondary"
          size="lg"
          shape="circle"
          onClick={handleScrollToBottom}
        />
      </div>

      <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Textbox
            value={prompt}
            onChange={setPrompt}
            placeholder="e.g., Explain quantum computing in simple terms..."
            disabled={loading}
          />

          <div className="text-center grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dropdown
              placeholder="Select models"
              options={options}
              selectedValues={selectedModels}
              onSelectionChange={handleModelToggle}
              multiple={true}
            />

            <Dropdown
              options={ALL_DIMENSIONS}
              selectedValues={selectedDimensions}
              onSelectionChange={handleDimensionToggle}
              multiple={true}
            />

            <Button 
              label={loading ? "Generating..." : "Find Fighters"}
              icon="mystery"
              type="submit"
              disabled={!prompt.trim() || selectedModels.length === 0 || selectedDimensions.length === 0}
              loading={loading}
            />
          </div>
        </form>

        <div className={`h-full overflow-hidden ${responses.length ? 'max-h-500' : 'max-h-0'} transition-all duration-1500 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10`}>
          {responses.map((response) => (
            <Card 
              key={response.id} 
              variant="default"
              className="text-gray-400 hover:text-gray-300 hover:bg-gray-900"
            >
              <p className="leading-relaxed">
                {response.text}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
