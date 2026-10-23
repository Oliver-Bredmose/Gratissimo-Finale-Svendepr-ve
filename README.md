# Gratissimo

En jobportal for frivillige og foreninger. Frivillige kan søge og gemme jobs, og foreninger kan oprette annoncer og finde frivillige.

Projektet er min svendeprøve fra webudvikleruddannelsen på Tech College Aalborg (september 2026) og er **videreudviklet efter svendeprøven**.

## Funktioner

- Søgning i overskrift og tekst med filtre for region, kategori, arbejdstid, periode og hjemmearbejde
- Kategorier med antal jobs, nyheder og en slider med udtalelser
- Søgeresultater med pagination (5 pr. side), Gem / Fjern og jobkort der foldes ud
- Log ind og opret profil på én side. Login gemmes i cookies
- Opret annonce med validering og fejlbesked på hvert felt
- Min side med mine annoncer (slet) og mine favoritter (åbn og fjern)
- Tilmelding til nyhedsbrev
- Responsivt design til mobil, tablet og desktop

## Teknik

- React 19, Vite og react-router-dom 7
- SCSS modules
- js-cookie til login-cookies
- API: [gratissimo-api-sqlite](https://github.com/TCAA-Web/gratissimo-api-sqlite) (Node, Express, Prisma og SQLite)

## Kom i gang

1. Start API'et (kører på `http://localhost:4000`):

   ```bash
   cd gratissimo-api-sqlite
   npm install
   npm run dev
   ```

2. Start frontenden:

   ```bash
   npm install
   npm run dev
   ```

3. Åbn `http://localhost:5173`

Frontenden finder API'et via `VITE_PUBLIC_BASE_URL` i `.env`.

Testbrugere ligger i API'ets seed-fil (`src/seeds/userSeed.ts`).
