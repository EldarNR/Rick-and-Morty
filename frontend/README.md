# Rick and Morty Frontend

This is a React + TypeScript frontend for the Rick and Morty Explorer.
It uses Vite, SCSS Modules, and React Router.

## Setup

1.  Navigate to this directory: `cd frontend`
2.  Install dependencies (if not already): `npm install`
3.  Start the dev server: `npm run dev`

## Backend

Ensure the FastAPI backend is running on `http://localhost:8000`.
From the root of the project:
`uvicorn app.main:app --reload`

## Features

-   **Modular Design**: Components, Pages, and Styles are separated.
-   **SCSS Modules**: Scoped styling with rich variables and mixins.
-   **Routing**: `react-router-dom` v6 with nested routes.
-   **Reusable UI**: Cards, Pagination, Navbar.
-   **Animations**: `framer-motion` for smooth transitions.
-   **Type Safety**: Full TypeScript interfaces.

## Structure

-   `src/api`: Axios client and API calls.
-   `src/components`: Reusable UI components.
-   `src/layout`: Layout wrappers (Navbar, Footer).
-   `src/pages`: Page views (List, Detail).
-   `src/styles`: Global variables, mixins, and reset.
-   `src/types`: TypeScript definitions.
