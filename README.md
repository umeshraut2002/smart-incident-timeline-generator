# Smart Incident Timeline Generator

Production-ready log analysis app with a Node.js backend and React + Tailwind frontend. Upload raw `.log` or `.txt` files, generate a chronological incident timeline, detect anomalies, and download a Markdown incident report.

## Architecture

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Storage: Local filesystem through a dedicated storage service abstraction
- DevOps: Dockerfiles for frontend and backend, plus `docker-compose.yml`

## Project structure

```text
backend/
  data/
    processed/
    reports/
    uploads/
  samples/
  src/
    config/
    controllers/
    middleware/
    routes/
    services/
    utils/
frontend/
  public/
  src/
    components/
    hooks/
    pages/
    services/
    utils/
```

## Backend features

- `POST /upload` uploads one `.log` or `.txt` file
- `GET /timeline/:id` returns parsed timeline data
- `GET /report/:id` downloads the generated Markdown report
- `GET /health` healthcheck endpoint
- Multiple regex-based log parsing formats
- Timeline sorting and 1-minute bucket grouping
- Anomaly detection for:
  - error spikes
  - duplicate error clustering
  - time gap detection
- Root cause hint generation

## Frontend features

- Upload page with drag-and-drop file intake
- Timeline dashboard with vertical event visualization
- Filters for log level and time range
- Red-highlighted anomaly panels
- Report view with inline Markdown preview and download action
- Local state persistence for the active incident in browser storage

## Local setup

### 1. Backend

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

Backend runs at `http://localhost:4000`.

### 2. Frontend

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Docker setup

```bash
docker compose up --build
```

Services:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## API examples

### Healthcheck

```bash
curl http://localhost:4000/health
```

### Upload a sample log

```bash
curl -X POST http://localhost:4000/upload -F "file=@samples/sample-app.log"
```

### Fetch the generated timeline

```bash
curl http://localhost:4000/timeline/<incidentId>
```

### Download the report

```bash
curl -OJ http://localhost:4000/report/<incidentId>
```

## Sample assets

- Sample log: [backend/samples/sample-app.log](/d:/devops-projects/smart-incident-timeline-generator/backend/samples/sample-app.log)
- Expected output: [backend/samples/expected-output.json](/d:/devops-projects/smart-incident-timeline-generator/backend/samples/expected-output.json)

## Notes

- Backend persistence is isolated in a storage service so S3 can be introduced later.
- The current frontend expects the backend base URL from `VITE_API_BASE_URL`.
- The optional Python analysis microservice has not been added yet.
