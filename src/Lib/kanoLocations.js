// Kano State Local Government Areas (LGAs)
// Total: 44 LGAs

export const KANO_LGAS = [
    { id: 1, name: "Ajingi", zone: "Kano Central" },
    { id: 2, name: "Albasu", zone: "Kano Central" },
    { id: 3, name: "Bagwai", zone: "Kano North" },
    { id: 4, name: "Bebeji", zone: "Kano Central" },
    { id: 5, name: "Bichi", zone: "Kano North" },
    { id: 6, name: "Bunkure", zone: "Kano Central" },
    { id: 7, name: "Dala", zone: "Kano Municipal" },
    { id: 8, name: "Dambatta", zone: "Kano North" },
    { id: 9, name: "Dawakin Kudu", zone: "Kano Central" },
    { id: 10, name: "Dawakin Tofa", zone: "Kano Central" },
    { id: 11, name: "Doguwa", zone: "Kano North" },
    { id: 12, name: "Fagge", zone: "Kano Municipal" },
    { id: 13, name: "Gabasawa", zone: "Kano Central" },
    { id: 14, name: "Garko", zone: "Kano South" },
    { id: 15, name: "Garun Mallam", zone: "Kano South" },
    { id: 16, name: "Gaya", zone: "Kano South" },
    { id: 17, name: "Gezawa", zone: "Kano Central" },
    { id: 18, name: "Gwale", zone: "Kano Municipal" },
    { id: 19, name: "Gwarzo", zone: "Kano Central" },
    { id: 20, name: "Kabo", zone: "Kano Central" },
    { id: 21, name: "Kano Municipal", zone: "Kano Municipal" },
    { id: 22, name: "Karaye", zone: "Kano North" },
    { id: 23, name: "Kibiya", zone: "Kano Central" },
    { id: 24, name: "Kiru", zone: "Kano Central" },
    { id: 25, name: "Kumbotso", zone: "Kano Municipal" },
    { id: 26, name: "Kunchi", zone: "Kano North" },
    { id: 27, name: "Kura", zone: "Kano Central" },
    { id: 28, name: "Madobi", zone: "Kano Central" },
    { id: 29, name: "Makoda", zone: "Kano North" },
    { id: 30, name: "Minjibir", zone: "Kano Central" },
    { id: 31, name: "Nassarawa", zone: "Kano Municipal" },
    { id: 32, name: "Rano", zone: "Kano Central" },
    { id: 33, name: "Rimin Gado", zone: "Kano Central" },
    { id: 34, name: "Rogo", zone: "Kano Central" },
    { id: 35, name: "Shanono", zone: "Kano North" },
    { id: 36, name: "Sumaila", zone: "Kano South" },
    { id: 37, name: "Takai", zone: "Kano Municipal" },
    { id: 38, name: "Tarauni", zone: "Kano Municipal" },
    { id: 39, name: "Tofa", zone: "Kano Central" },
    { id: 40, name: "Tsanyawa", zone: "Kano North" },
    { id: 41, name: "Tudun Wada", zone: "Kano Municipal" },
    { id: 42, name: "Ungogo", zone: "Kano Municipal" },
    { id: 43, name: "Warawa", zone: "Kano Central" },
    { id: 44, name: "Wudil", zone: "Kano Central" },
];

// Kano State coordinates (for map centering)
export const KANO_CENTER = {
    lat: 12.0022,
    lng: 8.5919,
};

// Nigeria bounds for restricting autocomplete
export const NIGERIA_BOUNDS = {
    north: 13.9,
    south: 4.3,
    west: 2.7,
    east: 14.7,
};

// Helper function to get LGA by name
export function getLGAByName(name) {
    return KANO_LGAS.find(lga => lga.name.toLowerCase() === name.toLowerCase());
}

// Helper function to get LGAs by zone
export function getLGAsByZone(zone) {
    return KANO_LGAS.filter(lga => lga.zone === zone);
}

// Get all unique zones
export function getZones() {
    return [...new Set(KANO_LGAS.map(lga => lga.zone))];
}
