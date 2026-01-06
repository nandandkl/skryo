# Skryo

Skryo is an AI-powered handwriting analysis tool that evaluates the neatness of your handwriting on a scale of 1 to 10. By leveraging Google's Gemini AI, it provides instant scoring and personalized feedback to help you improve.

## Features

-   **Instant Analysis**: Upload an image of your handwriting and get feedback in seconds.
-   **AI Scoring**: Powered by Google's Gemini 2.5 Flash model for accurate assessment.
-   **Detailed Feedback**: Receives a neatness score (1-10) and a brief explanation of the rating.
-   **Modern UI**: Built with a clean, responsive interface using Next.js and Tailwind CSS.
-   **Privacy Focused**: Images are processed securely and not permanently stored.

## Tech Stack

-   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Components**: [Radix UI](https://www.radix-ui.com/) / [shadcn/ui](https://ui.shadcn.com/)
-   **AI Model**: [Google Gemini API](https://ai.google.dev/) (`gemini-2.5-flash`)
-   **icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

-   Node.js 18+ installed
-   A Google Cloud project with the Gemini API enabled and an API key.

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/nandandkl/skryo.git
    cd skryo
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

3.  Set up environment variables:

    Create a `.env.local` file in the root directory and add your Gemini API key:

    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

4.  Run the development server:

    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

1.  **Upload**: Select an image of handwritten text from your device.
2.  **Process**: The image is sent securely to the backend API.
3.  **Analyze**: Python/Node.js backend sends the image to Google's Gemini AI with a specific prompt to evaluate neatness.
4.  **Result**: The AI returns a JSON response with a score and explanation, which is displayed on the result card.
