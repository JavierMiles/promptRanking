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
  ],

  // Machine learning prompt
  'machinelearning': [
    {
      id: 'gpt-ml-1',
      modelName: 'gpt-4',
      text: 'Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. It uses algorithms to identify patterns in data and make predictions or decisions. Machine learning powers many modern technologies, from recommendation systems to autonomous vehicles, and continues to advance rapidly with new techniques like deep learning.',
      promptId: 'machinelearning'
    },
    {
      id: 'claude-ml-1',
      modelName: 'claude',
      text: 'Machine learning represents a paradigm shift in how we approach problem-solving with computers. Instead of writing explicit rules, we provide algorithms with data and let them discover patterns and relationships. This approach has revolutionized fields from healthcare to finance, enabling systems that can recognize images, understand language, and make complex predictions with remarkable accuracy.',
      promptId: 'machinelearning'
    },
    {
      id: 'grok-ml-1',
      modelName: 'grok',
      text: 'Machine learning is the science of getting computers to act without being explicitly programmed. It focuses on developing algorithms that can access data and use it to learn for themselves. The process involves training models on historical data to make predictions or decisions, leading to systems that can improve their performance over time through experience.',
      promptId: 'machinelearning'
    },
    {
      id: 'gemini-ml-1',
      modelName: 'gemini',
      text: 'Machine learning is a branch of artificial intelligence that provides systems the ability to automatically learn and improve from experience. It uses statistical techniques to give computers the ability to "learn" without being explicitly programmed, focusing on the development of computer programs that can access data and use it to learn for themselves.',
      promptId: 'machinelearning'
    }
  ],

  // Blockchain prompt
  'blockchain': [
    {
      id: 'gpt-blockchain-1',
      modelName: 'gpt-4',
      text: 'Blockchain is a distributed digital ledger that records transactions across a network of computers in a way that is secure, transparent, and tamper-resistant. Each block contains a list of transactions, and once recorded, the data in any given block cannot be altered retroactively without altering all subsequent blocks. This technology underpins cryptocurrencies like Bitcoin and has applications in supply chain management, voting systems, and digital identity.',
      promptId: 'blockchain'
    },
    {
      id: 'claude-blockchain-1',
      modelName: 'claude',
      text: 'Blockchain technology represents a revolutionary approach to data management and trust. It creates a decentralized, distributed ledger that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography. This design ensures that once information has been recorded, it cannot be changed without the consensus of the network, making it ideal for applications requiring transparency and immutability.',
      promptId: 'blockchain'
    },
    {
      id: 'grok-blockchain-1',
      modelName: 'grok',
      text: 'Blockchain is a type of distributed ledger technology that maintains a continuously growing list of records, called blocks, that are linked and secured using cryptography. Each block typically contains a cryptographic hash of the previous block, a timestamp, and transaction data. This design makes it extremely difficult to alter historical data, providing a high level of security and trust in digital transactions.',
      promptId: 'blockchain'
    },
    {
      id: 'gemini-blockchain-1',
      modelName: 'gemini',
      text: 'Blockchain is a decentralized digital ledger technology that enables secure, transparent, and tamper-proof record-keeping across a distributed network. It consists of a chain of blocks, each containing transaction data and a cryptographic hash linking it to the previous block. This architecture ensures data integrity and eliminates the need for trusted intermediaries in digital transactions.',
      promptId: 'blockchain'
    }
  ],

  // Cybersecurity prompt
  'cybersecurity': [
    {
      id: 'gpt-cyber-1',
      modelName: 'gpt-4',
      text: 'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money from users, or interrupting normal business processes. Effective cybersecurity requires a comprehensive approach that includes technology, processes, and people working together to create multiple layers of defense.',
      promptId: 'cybersecurity'
    },
    {
      id: 'claude-cyber-1',
      modelName: 'claude',
      text: 'Cybersecurity encompasses the technologies, processes, and practices designed to protect networks, devices, programs, and data from attack, damage, or unauthorized access. It involves implementing security measures to prevent, detect, and respond to cyber threats, ensuring the confidentiality, integrity, and availability of information systems. This field is constantly evolving as new threats emerge and technology advances.',
      promptId: 'cybersecurity'
    },
    {
      id: 'grok-cyber-1',
      modelName: 'grok',
      text: 'Cybersecurity is the discipline dedicated to protecting digital systems, networks, and data from malicious attacks and unauthorized access. It involves implementing various security measures, including firewalls, encryption, and access controls, to safeguard information assets. The field requires continuous vigilance and adaptation as cyber threats become increasingly sophisticated and pervasive.',
      promptId: 'cybersecurity'
    },
    {
      id: 'gemini-cyber-1',
      modelName: 'gemini',
      text: 'Cybersecurity is the practice of defending computers, servers, mobile devices, electronic systems, networks, and data from malicious attacks. It encompasses a range of security measures designed to protect against various types of cyber threats, including malware, phishing, and data breaches. Effective cybersecurity requires a multi-layered approach that addresses both technical and human factors.',
      promptId: 'cybersecurity'
    }
  ],

  // Data science prompt
  'datascience': [
    {
      id: 'gpt-data-1',
      modelName: 'gpt-4',
      text: 'Data science is an interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data. It combines statistics, mathematics, computer science, and domain expertise to analyze complex data sets and make data-driven decisions. Data science is used across industries to solve problems, predict trends, and optimize processes.',
      promptId: 'datascience'
    },
    {
      id: 'claude-data-1',
      modelName: 'claude',
      text: 'Data science represents the convergence of multiple disciplines to extract meaningful insights from data. It involves collecting, cleaning, analyzing, and interpreting large volumes of data to inform decision-making and solve complex problems. The field combines statistical analysis, machine learning, and domain expertise to transform raw data into actionable intelligence that drives innovation and efficiency.',
      promptId: 'datascience'
    },
    {
      id: 'grok-data-1',
      modelName: 'grok',
      text: 'Data science is the art and science of extracting valuable insights from data through systematic analysis and interpretation. It encompasses a broad range of techniques including statistical analysis, machine learning, and data visualization to uncover patterns, trends, and relationships in complex datasets. This field enables organizations to make informed decisions and predictions based on empirical evidence.',
      promptId: 'datascience'
    },
    {
      id: 'gemini-data-1',
      modelName: 'gemini',
      text: 'Data science is a multidisciplinary approach to analyzing and interpreting complex data sets to extract meaningful insights and support decision-making. It combines expertise in statistics, programming, and domain knowledge to process large volumes of information and identify patterns that can inform business strategies, scientific research, and policy development.',
      promptId: 'datascience'
    }
  ],

  // Internet of Things prompt
  'iot': [
    {
      id: 'gpt-iot-1',
      modelName: 'gpt-4',
      text: 'The Internet of Things (IoT) refers to the network of physical objects embedded with sensors, software, and other technologies that enable them to connect and exchange data with other devices and systems over the internet. These connected devices can range from simple household items to complex industrial machinery, creating a vast network of interconnected systems that can monitor, control, and optimize various processes.',
      promptId: 'iot'
    },
    {
      id: 'claude-iot-1',
      modelName: 'claude',
      text: 'The Internet of Things represents a paradigm shift in how we interact with technology, creating a network of interconnected devices that can communicate and share data autonomously. These smart devices, equipped with sensors and connectivity, can monitor environmental conditions, track performance metrics, and execute automated responses, enabling unprecedented levels of automation and efficiency across industries.',
      promptId: 'iot'
    },
    {
      id: 'grok-iot-1',
      modelName: 'grok',
      text: 'The Internet of Things is a system of interrelated computing devices, mechanical and digital machines, objects, animals, or people that are provided with unique identifiers and the ability to transfer data over a network without requiring human-to-human or human-to-computer interaction. This technology enables seamless communication between devices and systems.',
      promptId: 'iot'
    },
    {
      id: 'gemini-iot-1',
      modelName: 'gemini',
      text: 'The Internet of Things encompasses the network of physical devices, vehicles, buildings, and other objects embedded with electronics, software, sensors, and network connectivity that enables these objects to collect and exchange data. This interconnected ecosystem allows for intelligent automation and real-time monitoring across various applications and industries.',
      promptId: 'iot'
    }
  ],

  // Virtual reality prompt
  'virtualreality': [
    {
      id: 'gpt-vr-1',
      modelName: 'gpt-4',
      text: 'Virtual Reality (VR) is a technology that creates a simulated environment that users can interact with using special electronic equipment, such as a headset with a screen or gloves fitted with sensors. VR immerses users in a computer-generated world that can be similar to or completely different from the real world, providing an interactive experience that can be used for entertainment, education, training, and therapy.',
      promptId: 'virtualreality'
    },
    {
      id: 'claude-vr-1',
      modelName: 'claude',
      text: 'Virtual Reality represents a revolutionary approach to human-computer interaction, creating immersive digital environments that users can explore and manipulate in real-time. By combining advanced display technology, motion tracking, and spatial audio, VR systems can transport users to entirely new worlds or enhance their understanding of existing ones, opening possibilities for entertainment, education, and professional applications.',
      promptId: 'virtualreality'
    },
    {
      id: 'grok-vr-1',
      modelName: 'grok',
      text: 'Virtual Reality is a computer-generated simulation of a three-dimensional environment that can be interacted with in a seemingly real or physical way by a person using special electronic equipment. This technology creates an immersive experience that can replicate real-world scenarios or create entirely fictional environments, enabling new forms of entertainment, learning, and professional development.',
      promptId: 'virtualreality'
    },
    {
      id: 'gemini-vr-1',
      modelName: 'gemini',
      text: 'Virtual Reality is an immersive technology that creates a computer-simulated environment that users can interact with through specialized hardware like headsets and controllers. VR technology can simulate real-world experiences or create entirely fictional environments, providing users with a sense of presence in digital spaces that can be used for gaming, training, education, and therapeutic applications.',
      promptId: 'virtualreality'
    }
  ],

  // Renewable energy prompt
  'renewableenergy': [
    {
      id: 'gpt-renewable-1',
      modelName: 'gpt-4',
      text: 'Renewable energy comes from natural sources that are constantly replenished, such as sunlight, wind, rain, tides, waves, and geothermal heat. Unlike fossil fuels, these energy sources are sustainable and produce little to no greenhouse gas emissions. Renewable energy technologies include solar panels, wind turbines, hydroelectric dams, and geothermal power plants, which are becoming increasingly cost-effective and widely adopted worldwide.',
      promptId: 'renewableenergy'
    },
    {
      id: 'claude-renewable-1',
      modelName: 'claude',
      text: 'Renewable energy represents a fundamental shift toward sustainable power generation that harnesses naturally replenishing resources. These energy sources, including solar, wind, hydroelectric, and geothermal power, offer a clean alternative to fossil fuels while providing reliable electricity generation. The adoption of renewable energy technologies is accelerating as costs decrease and efficiency improves, driving the global transition toward a more sustainable energy future.',
      promptId: 'renewableenergy'
    },
    {
      id: 'grok-renewable-1',
      modelName: 'grok',
      text: 'Renewable energy encompasses power generation technologies that utilize naturally replenishing resources such as sunlight, wind, water, and geothermal heat. These sustainable energy sources produce minimal environmental impact compared to traditional fossil fuels and are becoming increasingly competitive in terms of cost and efficiency. The widespread adoption of renewable energy is crucial for addressing climate change and ensuring long-term energy security.',
      promptId: 'renewableenergy'
    },
    {
      id: 'gemini-renewable-1',
      modelName: 'gemini',
      text: 'Renewable energy refers to power generated from natural resources that are continuously replenished, such as solar radiation, wind, flowing water, and geothermal heat. These sustainable energy sources produce minimal greenhouse gas emissions and environmental impact, making them essential for combating climate change and achieving energy independence. Renewable energy technologies continue to advance, becoming more efficient and cost-effective.',
      promptId: 'renewableenergy'
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
