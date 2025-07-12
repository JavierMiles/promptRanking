# Prompt Ranking Championship

AI model evaluation platform for comparing models across different dimensions in championship-style battles.

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation & Run
```bash
# Install dependencies
pnpm install

# Build packages
pnpm build

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`

## Usage

1. **Home Page**: Enter a prompt and select models/dimensions
2. **Arena**: Battle models head-to-head across dimensions
3. **Results**: View rankings and performance analytics
4. **Admin**: Access all saved championships

## Project Structure

```
promptRanking/
├── apps/web/              # Main Next.js app
├── packages/
│   ├── ui/               # Shared UI components
│   ├── store/            # State management
│   ├── types/            # TypeScript definitions
│   └── tailwind-config/  # Styling
```

## Development

```bash
# Start dev server
pnpm dev

# Build all packages
pnpm build

# Run linting
pnpm lint
```

## Technologies

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Build**: Turborepo
- **Language**: TypeScript
