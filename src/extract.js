// noinspection SpellCheckingInspection

export default function (data) {
    const rawEvents = data['VCALENDAR'][0]['VEVENT'];
    return rawEvents
        .map(E => {
            const start = parseDate(E['DTSTART;VALUE=DATE']);
            const end = parseDate(E['DTEND;VALUE=DATE']);
            const summary = E['SUMMARY'];
            const location = E['LOCATION'];
            return {start, end, summary, location}
        })
        .filter(filter)
        .sort((a, b) => a.start.localeCompare(b.start));
}

function parseDate(date) {
    const d = date.split("T")[0];
    return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
}

function filter(e) {
    const timestamp = new Date(e.end).valueOf();
    return timestamp >= Date.now() - 30 * 864e5; // 30 days
}