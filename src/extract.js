// noinspection SpellCheckingInspection

export default function (data) {

    const EVENTS = data['VCALENDAR'][0]['VEVENT'];

    return EVENTS.map(E => {

        const start = parseDate(E['DTSTART;VALUE=DATE']);
        const end = parseDate(E['DTEND;VALUE=DATE']);

        const summary = E['SUMMARY'];
        const location = E['LOCATION'];

        return { start, end, summary, location }

    });
}

function parseDate(date) {
    const d = date.split("T")[0];
    const year = d.slice(0, 4);
    const month = d.slice(4, 6);
    const day = d.slice(6, 8);
    return `${year}-${month}-${day}`;
}