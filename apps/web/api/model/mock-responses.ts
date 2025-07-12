import type { ModelResponse, ModelName } from '@repo/types';

export const mockResponses: Record<string, ModelResponse[]> = {
  // Quantum computing prompt
  'quantum': [
    {
      id: 'gpt-quantum-1',
      modelName: 'gpt-4',
      text: 'Quantum computing is like having a super-powered calculator that can solve problems that would take regular computers thousands of years. Instead of using regular bits (0s and 1s), quantum computers use "qubits" that can be both 0 and 1 at the same time. This allows them to explore many possible solutions simultaneously, making them incredibly fast for certain types of problems like cryptography, drug discovery, and complex simulations.',
      promptId: 'quantum'
    },
    {
      id: 'claude-quantum-1',
      modelName: 'claude',
      text: 'Think of quantum computing as a computer that can be in multiple states at once. While traditional computers process information as binary digits (bits) that are either 0 or 1, quantum computers use quantum bits (qubits) that can exist in a superposition of states. This means they can perform calculations on multiple possibilities simultaneously, making them exponentially faster for specific problems like factoring large numbers, optimizing complex systems, and simulating molecular interactions.',
      promptId: 'quantum'
    },
    {
      id: 'grok-quantum-1',
      modelName: 'grok',
      text: 'Quantum computing represents a fundamental shift in how we process information. Unlike classical computers that process data sequentially, quantum computers leverage the principles of quantum mechanics to process information in parallel across multiple states. This quantum parallelism enables exponential speedup for specific algorithms, particularly in areas like optimization, machine learning, and scientific simulation.',
      promptId: 'quantum'
    },
    {
      id: 'gemini-quantum-1',
      modelName: 'gemini',
      text: 'Quantum computing harnesses the strange properties of quantum mechanics to create computers that can solve certain problems exponentially faster than classical computers. By exploiting quantum phenomena like superposition and entanglement, these machines can process vast amounts of information simultaneously, opening new possibilities for cryptography, materials science, and artificial intelligence.',
      promptId: 'quantum'
    }
  ],
  
  // AI prompt
  'ai': [
    {
      id: 'gpt-ai-1',
      modelName: 'gpt-4',
      text: 'Artificial Intelligence (AI) is technology that enables machines to perform tasks that typically require human intelligence. This includes learning from experience, recognizing patterns, making decisions, and solving problems. AI systems can process vast amounts of data quickly and identify insights that humans might miss. From virtual assistants to recommendation systems, AI is already part of our daily lives and continues to advance rapidly.',
      promptId: 'ai'
    },
    {
      id: 'claude-ai-1',
      modelName: 'claude',
      text: 'Artificial Intelligence represents the frontier of computer science, where machines are designed to mimic human cognitive functions. These systems can learn from data, adapt to new situations, and perform tasks that traditionally required human intervention. AI encompasses everything from simple rule-based systems to complex neural networks that can recognize images, understand language, and even create art. The technology is transforming industries from healthcare to transportation.',
      promptId: 'ai'
    },
    {
      id: 'grok-ai-1',
      modelName: 'grok',
      text: 'Artificial Intelligence is the simulation of human intelligence in machines. These systems are designed to think, learn, and problem-solve like humans, but with the ability to process information at incredible speeds and scale. AI technologies range from narrow applications that perform specific tasks to general AI that can handle multiple types of problems. The field is rapidly evolving, with new breakthroughs in machine learning, natural language processing, and computer vision.',
      promptId: 'ai'
    },
    {
      id: 'gemini-ai-1',
      modelName: 'gemini',
      text: 'Artificial Intelligence is the development of computer systems capable of performing tasks that typically require human intelligence. These include learning, reasoning, problem-solving, perception, and language understanding. AI systems can analyze patterns in data, make predictions, and automate complex processes. The technology is revolutionizing fields from medicine to finance, creating new possibilities for human-machine collaboration.',
      promptId: 'ai'
    }
  ],
  
  // Climate change prompt
  'climate': [
    {
      id: 'gpt-climate-1',
      modelName: 'gpt-4',
      text: 'Climate change refers to long-term shifts in global weather patterns and average temperatures. Human activities, particularly the burning of fossil fuels, have significantly increased greenhouse gas concentrations in the atmosphere. This traps heat and causes the planet to warm, leading to rising sea levels, more extreme weather events, and disruptions to ecosystems. Addressing climate change requires reducing emissions and adapting to its effects.',
      promptId: 'climate'
    },
    {
      id: 'claude-climate-1',
      modelName: 'claude',
      text: 'Climate change is the gradual alteration of Earth\'s climate system due to human activities and natural processes. The primary driver is the accumulation of greenhouse gases in the atmosphere, which act like a blanket trapping heat. This warming affects weather patterns, ocean currents, and ecosystems worldwide. The consequences include melting ice caps, more frequent extreme weather, and threats to biodiversity. Solutions involve transitioning to renewable energy and sustainable practices.',
      promptId: 'climate'
    },
    {
      id: 'grok-climate-1',
      modelName: 'grok',
      text: 'Climate change represents one of the most pressing challenges of our time, characterized by significant alterations in Earth\'s climate patterns. The primary cause is human activity, particularly the emission of greenhouse gases from burning fossil fuels. These changes manifest in rising global temperatures, shifting precipitation patterns, and increased frequency of extreme weather events. The impacts are far-reaching, affecting agriculture, biodiversity, and human settlements worldwide.',
      promptId: 'climate'
    },
    {
      id: 'gemini-climate-1',
      modelName: 'gemini',
      text: 'Climate change encompasses the long-term transformation of Earth\'s climate system, driven primarily by human activities that increase atmospheric greenhouse gas concentrations. This warming effect disrupts natural climate patterns, leading to more frequent and intense weather extremes, sea level rise, and ecosystem changes. The global nature of this challenge requires coordinated international efforts to reduce emissions and build resilience.',
      promptId: 'climate'
    }
  ],
  
  // Programming prompt
  'programming': [
    {
      id: 'gpt-programming-1',
      modelName: 'gpt-4',
      text: 'Programming is the art of giving instructions to computers to perform specific tasks. It involves writing code in programming languages that computers can understand and execute. Good programming requires logical thinking, problem-solving skills, and attention to detail. Programs can range from simple scripts to complex applications that power websites, mobile apps, and enterprise systems.',
      promptId: 'programming'
    },
    {
      id: 'claude-programming-1',
      modelName: 'claude',
      text: 'Programming is the process of creating sets of instructions that tell a computer how to perform a task. It combines creativity with logic, as programmers must break down complex problems into smaller, manageable steps. Programming languages serve as the bridge between human thought and machine execution, allowing us to build everything from simple calculators to sophisticated artificial intelligence systems.',
      promptId: 'programming'
    },
    {
      id: 'grok-programming-1',
      modelName: 'grok',
      text: 'Programming is the craft of designing and building computer software by writing code in specific programming languages. It requires analytical thinking to decompose complex problems into logical sequences that computers can execute. Programming combines technical skills with creative problem-solving, enabling developers to create applications that solve real-world problems and enhance human capabilities.',
      promptId: 'programming'
    },
    {
      id: 'gemini-programming-1',
      modelName: 'gemini',
      text: 'Programming is the systematic approach to creating software by writing instructions that computers can understand and execute. It involves translating human logic into machine-readable code using programming languages. This discipline requires both technical expertise and creative thinking, as programmers design solutions that can range from simple automation scripts to complex systems that power modern technology.',
      promptId: 'programming'
    }
  ]
};

// Generate responses for any prompt
export const generateMockResponses = (prompt: string, models: ModelName[]): ModelResponse[] => {
  const promptId = prompt.toLowerCase().replace(/[^a-z]/g, '');
  
  // Define all possible responses in order
  const allResponses: ModelResponse[] = mockResponses[promptId] || [
    {
      id: `gpt-${Date.now()}-1`,
      modelName: 'gpt-4',
      text: `Here's a comprehensive response about "${prompt}": This is a detailed explanation that covers the key aspects of the topic, providing insights and examples to help you understand the concept thoroughly. The response includes relevant information and practical applications.`,
      promptId: promptId
    },
    {
      id: `claude-${Date.now()}-1`,
      modelName: 'claude',
      text: `This response offers a different angle on the topic, with additional context and alternative viewpoints. It provides complementary information that builds upon the basic understanding and explores deeper implications of "${prompt}".`,
      promptId: promptId
    },
    {
      id: `grok-${Date.now()}-1`,
      modelName: 'grok',
      text: `Here's an analytical perspective on "${prompt}": This response delves into the technical aspects and provides a systematic breakdown of the topic. It offers unique insights and practical considerations that complement other viewpoints.`,
      promptId: promptId
    },
    {
      id: `gemini-${Date.now()}-1`,
      modelName: 'gemini',
      text: `This response presents a balanced view of "${prompt}" with comprehensive coverage of the subject matter. It includes both theoretical foundations and practical applications, offering a well-rounded understanding of the topic.`,
      promptId: promptId
    }
  ];

  return allResponses.filter(response => models.includes(response.modelName));
};