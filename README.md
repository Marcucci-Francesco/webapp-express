# CineVibes-Backend API
Il backend di CineVibes è un'API RESTful sviluppata in Node.js con Express, che gestisce tutte le funzionalità lato server della web app.

L'API permette di:

- Gestire un database di film, consentendo:

- Aggiunta di nuovi film.

- Eliminazione di film esistenti.

- Visualizzazione della lista completa dei film.

- Gestire i dettagli dei singoli film, restituendo:

- Titolo, descrizione, anno, genere, regista, durata, e altre informazioni rilevanti.

- Elenco aggiornato delle recensioni associate al film.

Gestire le recensioni:

- Aggiunta di nuove recensioni tramite apposito form.

- Associazione delle recensioni al relativo film.

- Fornire le informazioni necessarie al frontend per alimentare lo swiper di navigazione tra i vari titoli.

Il backend espone un insieme di endpoint REST, strutturati per garantire semplicità di integrazione con il frontend React di CineVibes.

## Tecnologie usate
- Node.js
- Express

## Requisiti Tecnici
- Gestione centralizzata degli errori e validazione delle richieste
- Node.js e Express come framework principale, per la gestione delle richieste HTTP e la creazione delle API RESTful.