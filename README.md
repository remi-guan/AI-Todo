<h3 align="center">
    AI Todo - AI-Powered Task Splitting
</h3>

<p align="center">
    <img src="https://img.shields.io/badge/Svelte-5-orange?style=for-the-badge&logo=svelte&logoColor=white" alt="Svelte 5">
    <img src="https://img.shields.io/badge/Vite-5.0-blueviolet?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/TailwindCSS-3.4-blue?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/DaisyUI-4.12-yellow?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="DaisyUI">
    <img src="https://img.shields.io/badge/Drizzle--ORM-0.34-blue?style=for-the-badge&logoColor=white" alt="Drizzle ORM">
    <img src="https://img.shields.io/badge/FontAwesome-5-blue?style=for-the-badge&logo=fontawesome&logoColor=white" alt="FontAwesome 5">
</p>

<p align="center">
  <img alt="Screenshot of AI Todo" src="./docs/screenshot.png"/>
</p>

# AI Todo — AI-Powered Task Splitting

[简体中文](docs/README_CN.md)

AI Todo is an AI-powered task management tool that takes user input and breaks it down into actionable, smaller tasks. It's designed to help users tackle large tasks efficiently by automating task breakdowns and making to-do lists more manageable.

## Features
- **AI-Driven Task Breakdown**: Automatically split complex tasks into smaller, manageable steps.
- **Effective Task Management**: Manage tasks more effectively with detailed cost and time estimations.
- **Intuitive Progress Tracking**: Visualize progress with task icons and a progress bar for completion tracking.
- **Mobile-First Design**: Designed with a mobile-first approach to ensure a great experience on all devices.
- **Internationalization (i18n)**: Supports multiple languages to cater to a global audience.

## Technologies Used

- **[Svelte 5](https://svelte.dev/)**: The next-gen frontend framework for creating highly reactive user interfaces.
- **[Bun](https://bun.sh/)**: A fast JavaScript runtime, toolkit, package manager, and bundler.
- **[Drizzle ORM](https://orm.drizzle.team/)**: A lightweight TypeScript ORM for SQL databases.
- **[Vite](https://vitejs.dev/)**: Fast and lightweight build tool for modern web development.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
- **[DaisyUI](https://daisyui.com/)**: Tailwind CSS-based component library to simplify UI building.
- **[FontAwesome](https://fontawesome.com/)**: Icon toolkit to provide scalable vector icons for better visual representation.
- **[Svelte Animation Components](https://animation-svelte.vercel.app/)**: Components for enhanced interactivity.
- **[Zod](https://zod.dev/)**: A schema validation library to validate AI output.
- **[Markdown-it](https://markdown-it.github.io/)**: Markdown parser to easily transform user input.
- **[js-yaml](https://github.com/nodeca/js-yaml)**: Used to parse YAML data structures.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/remi-guan/AI-Todo.git
   cd AI-Todo
   ```

2. Install dependencies and initialize the database:

    ```bash
    bun install
    bun --bun migrate
    ```

3. Run the development server:

    ```bash
    bun --bun dev
    ```

4. Build the project:

    ```bash
    bun --bun build
    ```

## Contributing
Contributions are welcome! Please fork the repository and open a pull request to propose improvements or fixes.

## License
This project is licensed under the MIT License — see the LICENSE file for details.