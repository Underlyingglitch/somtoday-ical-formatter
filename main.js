const axios = require('axios').default
const CronJob = require('cron').CronJob
const ical = require('node-ical')
const ics = require('ics')
const fs = require('fs')

require('dotenv').config()

if (process.env.ICAL_URL == "changeme" || process.env.RETURN_URL == "changeme") {
    console.error("ERROR: Stel de URL's in in de ENV variabelen")
    process.exit()
}

const VAKKEN = {
    'in': "Informatica",
    'econ': "Economie",
    'net': "Nederlands",
    'nat': "Natuurkunde",
    'ml': "Mentorles",
    'wis': "Wiskunde",
    'fle': "FLE",
    'schk': "Scheikunde",
    'lo': "LO",
    'dutl': "Duits"
}

function main() {
    const url = process.env.ICAL_URL

    axios.get(url).then(r => {
        let events = ical.parseICS(r.data)
        let parsed_events = []

        for (const event of Object.values(events)) {
            if (event.type != "VEVENT") continue
            if (event.summary.includes('Act')) continue

            let desc = event.summary.split(' - ')
            let vak = get_vak(event.summary)
            let teacher = desc[2]
            let location = `Lokaal ${event.location}`
            let status = "CONFIRMED"
            let title = (desc.length == 3) ? `${vak} - ${teacher}` : event.summary
            let start = new Date(event.start)
            let end = new Date(event.end)
            let uid = event.uid.replace('somtoday.nl', 'underlyingglitch')

            let parsed_event = {
                title: title,
                location: location,
                status: status,
                start: [start.getFullYear(), start.getMonth() + 1, start.getDate(), start.getHours(), start.getMinutes()],
                end: [end.getFullYear(), end.getMonth() + 1, end.getDate(), end.getHours(), end.getMinutes()],
                description: event.summary,
                uid: uid
            }
            if (status != "CANCELLED") {
                parsed_event.alarms = [{
                    action: "display",
                    trigger: {
                        hours: 0,
                        minutes: 5,
                        before: true
                    },
                    description: "Les reminder"
                }]
            }
            parsed_events.push(parsed_event)
        }

        const { error, value } = ics.createEvents(parsed_events)
        if (error) {
            console.log(error)
            return
        }
        axios.post(process.env.RETURN_URL, {
            rooster: value
        }, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            console.log(response.data)
        }).catch(e => console.error(e))
    })
}

function get_vak(x) {
    for (const [i, [key, value]] of Object.entries(Object.entries(VAKKEN))) if (x.includes(key)) return value
}

console.log('Running somtoday-ical-formatter with arguments: ')
console.log(process.env)
// main()
new CronJob('*/15 * * * *', main, null, false, 'Europe/Amsterdam').start()