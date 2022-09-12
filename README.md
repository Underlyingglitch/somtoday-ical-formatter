# somtoday-ical-formatter

NodeJS script om de iCal gegevens van SomToday om te zetten naar een leesbaar format. De gegevens worden vervolgens in ICS format gestuurd naar een webadres met een POST request.

De nieuwe gegevens worden iedere 15 minuten uit SomToday opgehaald.

## Dit project wordt niet actief onderhouden!
Omdat ik mijn aandacht heb gevestigd op een groter project omtrent SomToday zal ik dit project niet langer onderhouden. Meer informatie [hier](https://github.com/FusionApp-Project)

## Hoe te gebruiken

### Stel de webserver in

De gegevens worden naar de RETURN_URL gestuurd als een POST request met de data onder de 'rooster' POST variabele. In `webhandler.php` is een voorbeeld gegeven om deze gegevens naar een lokaal 'rooster.ics' bestand te schrijven, wat vervolgens beschikbaar is voor andere apparaten onder hetzelfde domein.

LET OP: Dit is een zeer simpel PHP script waarbij geen enkele rekening is gehouden met beveiliging. Alle data die onder de 'rooster' POST variabele naar de server gestuurd worden zal ongefilterd naar 'rooster.ics' geschreven worden, met alle mogelijke gevolgen van dien.

### Run de formatter

Via NodeJS CLI

1. `git clone https://github.com/underlyingglitch/somtoday-ical-formatter`
2. `npm install`
3. `cp .env.template .env`
4. Wijzig variabelen in .env
5. `npm run`

Via Docker CLI (not recommended)

1. `docker pull underlyingglitch/somtoday-ical-formatter`
2. `docker run underlyingglitch/somtoday-ical-formatter -e ICAL_URL=... -e RETURN_URL=...`

Via docker-compose (recommended)

1. `git clone https://github.com/underlyingglitch/somtoday-ical-formatter`
2. `cp .env.template .env`
3. Wijzig variabelen in .env
4. `docker-compose up -d`

## Disclaimer

Let op: dit is een prive project. Er is geen officiele ondersteuning van SomToday voor dit project. De gebruiker is ten alle tijden zelf verantwoordelijk voor het gebruik van deze software.

Dit script werkt mogelijk niet op andere roosters, afhankelijk van hoe jouw school deze heeft ingesteld. Als jouw school een andere indeling gebruikt, dan kan het zijn dat er geen of onjuiste gegevens worden gepubliceerd door deze formatter.
