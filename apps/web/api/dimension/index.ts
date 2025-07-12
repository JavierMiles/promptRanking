import type { Dimension } from '@repo/types';

export const dimensions: Dimension[] = [
  {
    id: 'coherence',
    name: 'Coherence',
    description: 'How well-structured and logical the response is',
    color: 'blue'
  },
  {
    id: 'grammar',
    name: 'Grammar',
    description: 'Correctness of grammar and language usage',
    color: 'green'
  },
  {
    id: 'helpfulness',
    name: 'Helpfulness',
    description: 'How useful and actionable the response is',
    color: 'purple'
  },
  {
    id: 'relevance',
    name: 'Relevance',
    description: 'How well the response addresses the prompt',
    color: 'orange'
  },
  {
    id: 'accuracy',
    name: 'Accuracy',
    description: 'Factual correctness of the information provided',
    color: 'red'
  },
  {
    id: 'safety',
    name: 'Safety',
    description: 'How safe and appropriate the response is',
    color: 'yellow'
  }
];