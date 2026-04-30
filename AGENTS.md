# AGENTS.md - Discord Bot Template

## Build/Lint/Test Commands

### Development
- `npm run dev` - Run bot in development mode with ts-node
- `npm run dev:reload` - Run with nodemon for auto-reload
- `npm run build` - Compile TypeScript to JavaScript (outputs to `./dist/`)
- `npm start` - Run compiled bot from `./dist/`

### Linting
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Run ESLint with auto-fix

### Testing
- No test framework is currently configured in this project
- To add tests, consider jest, vitest, or similar frameworks
- Example test command (once configured): `npm test` or `npm test -- path/to/file.test.ts`

### Type Checking
- `npx tsc --noEmit` - Run TypeScript compiler for type checking without emitting files

## Code Style Guidelines

### Imports

**Import Order (enforced by eslint-plugin-perfectionist):**
1. Node.js builtin modules (`path`, `fs`) - use `node:` prefix (e.g., `node:path`, `node:fs`)
2. External packages (`discord.js`, `winston`)
3. Internal modules (absolute imports from `src/`)
4. Parent directory imports
5. Sibling file imports
6. Index/file imports

**Import Format:**
```typescript
import path from "node:path"
import fs from "node:fs"

import * as discord from "discord.js"
import winston from "winston"

import { createScopedLogger } from "../../utils/logger"
import { Command } from "../interfaces/command"
import { Client } from "../index"
```

- Use blank lines between import groups
- Use `import * as` for discord.js to namespace all exports
- Use named imports for internal modules
- Avoid default imports except for configured packages

### Formatting

- **Prettier** is enforced via eslint-plugin-prettier
- **ESLint** config: `eslint.config.mjs`
- Run `npm run lint:fix` to auto-format code
- Trailing commas: preserve
- Semicolons: required
- Quotes: double quotes (default)

### Types

- **TypeScript** with strict mode enabled (`"strict": true` in tsconfig.json)
- Target: ES2016
- Module system: CommonJS (`"module": "commonjs"`)
- Always use explicit type annotations for function parameters and return types
- Export interfaces and types for reusable structures
- Use `ExtendedInteraction` for command interactions (extends `discord.CommandInteraction`)

```typescript
// Example type definitions
type RunFunc = (interaction: ExtendedInteraction) => Promise<any>

export interface Command extends discord.ChatInputApplicationCommandData {
    name: string
    description: string
    run: RunFunc
}
```

### Naming Conventions

- **Files**: kebab-case (e.g., `ping.ts`, `interaction-create.ts`, `command.interface.ts`)
- **Directories**: kebab-case (e.g., `client/`, `commands/`, `events/`)
- **Interfaces**: PascalCase with descriptive names (e.g., `Command`, `Event`, `ExtendedInteraction`)
- **Types**: PascalCase (e.g., `RunFunc`)
- **Enums**: PascalCase with singular form (e.g., `EventType`)
- **Variables/Functions**: camelCase (e.g., `commandName`, `handleCommands`)
- **Constants**: camelCase or UPPER_SNAKE_CASE for true constants
- **Classes**: PascalCase (e.g., `Client`)
- **Methods**: camelCase (e.g., `createClient`, `start`, `stop`)

### Error Handling

- Use try-catch blocks in async command/event handlers
- Log errors using the scoped logger: `createScopedLogger("scope")`
- Provide user-friendly error messages in Discord interactions
- Throw errors for invalid configurations with descriptive messages

```typescript
try {
    logger.info(`Running the command '${interaction.commandName}'.`)
    command.run(interaction)
} catch (error) {
    logger.error(error)
    await interaction.reply({
        content: `Ocorreu um erro ao tentar executar o comando \`${command.name}\`!`
    })
}
```

### Discord Bot Patterns

**Commands Structure:**
- Place commands in `src/client/commands/<category>/<command-name>.ts`
- Export a `command` object with `name`, `description`, `type`, and `run` function
- Use `discord.ApplicationCommandType.ChatInput` for slash commands

**Events Structure:**
- Place events in `src/client/events/<event-name>.ts`
- Export an `event` object with `name`, `type` (`"on"`, `"once"`, `"off"`), and `run` function
- Event types defined in `src/enums/event-type.enum.ts`

**Client Pattern:**
- Use factory function `createClient()` instead of direct instantiation
- Client class extends `discord.Client` with custom properties (`commands`, `slashCommands`)
- Handlers in `src/client/handlers/` automatically load commands and events

### Configuration

- Environment variables loaded via `@marcuth/env` package
- Config helper at `src/client/helpers/config.helper.ts`
- Required env vars: `DISCORD_BOT_TOKEN`, `DISCORD_ADMIN_ID`, `DISCORD_APPLICATION_ID`, `DISCORD_PUBLIC_KEY`

### Logging

- Use `winston` for logging with scoped loggers
- Import: `import { createScopedLogger } from "../../utils/logger"`
- Create scoped logger: `const logger = createScopedLogger("scope-name")`
- Log levels: `logger.error()`, `logger.info()`, `logger.warn()`, `logger.debug()`
- Logs output to console and files in `logs/` directory
