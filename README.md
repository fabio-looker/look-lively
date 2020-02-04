# Turbo Query

An alpha-stability Looker extension that fetches and displays a query, but:
 - uses code splitting to start fetching as soon as possible
 - skips formatting on the backend and defers it to render time

## Dev Setup

- Do anything required on the Looker end to use extensions. Doc'd elsewhere
- Clone the repo 
- `npm install`
- `npm run start`
- Webpack will open a webpage, where you will have to accept the self-signed certificate
- Finally, navigate to the extension page in Looker
