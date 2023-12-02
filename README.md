# Lil Nous

## Introduction

An attempt of what Nous Research's UI/UX could be.

## Prerequisites

Install Docker or OrbStack (for Mac space optimization)

## Setting Up `local.env` File

1. **Create the File**: Create a file named `local.env` in the root directory of `textbook_quality`

2. **Environment Variables**:
   ```
   DATABASE_URL=postgresql://admin:admin@db/textbook
   SEARCH_BACKEND=serply
   OPENAI_KEY=<YOUR_OPENAI_API_KEY>
   SERPLY_KEY=<YOUR_SERPLY_KEY>
   ```

## Running with Docker at the root of this monorepo

```
docker compose up --build
```

Go to `localhost:3000` and start interacting!
