// Google Maps API integration for Transify

/**
 * Calculate distance between two addresses using Google Distance Matrix API
 * @param {Object} origin - { lat, lng } or address string
 * @param {Object} destination - { lat, lng } or address string
 * @returns {Promise<Object>} { distance: number (km), duration: number (minutes), status: string }
 */
export async function calculateDistance(origin, destination) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        console.warn("Google Maps API key not configured, using fallback calculation");
        return fallbackDistanceCalculation(origin, destination);
    }

    try {
        // Format origins and destinations
        const originStr = formatLocation(origin);
        const destStr = formatLocation(destination);

        const url = new URL("https://maps.googleapis.com/maps/api/distancematrix/json");
        url.searchParams.append("origins", originStr);
        url.searchParams.append("destinations", destStr);
        url.searchParams.append("key", apiKey);
        url.searchParams.append("mode", "driving");
        url.searchParams.append("units", "metric");

        const response = await fetch(url.toString());
        const data = await response.json();

        if (data.status !== "OK") {
            throw new Error(`Google Maps API error: ${data.status}`);
        }

        const element = data.rows[0]?.elements[0];

        if (element?.status !== "OK") {
            throw new Error(`Route not found: ${element?.status}`);
        }

        return {
            distance: element.distance.value / 1000, // Convert meters to km
            duration: element.duration.value / 60, // Convert seconds to minutes
            status: "success",
        };
    } catch (error) {
        console.error("Distance calculation error:", error);
        return fallbackDistanceCalculation(origin, destination);
    }
}

/**
 * Format location for Google Maps API
 */
function formatLocation(location) {
    if (typeof location === "string") {
        return location;
    }

    if (location.lat && location.lng) {
        return `${location.lat},${location.lng}`;
    }

    // Construct address string
    const parts = [
        location.street,
        location.lga,
        location.city || "Kano",
        location.state || "Kano State",
        location.country || "Nigeria",
    ].filter(Boolean);

    return parts.join(", ");
}

/**
 * Fallback distance calculation using Haversine formula
 * Used when Google Maps API is unavailable
 */
function fallbackDistanceCalculation(origin, destination) {
    // If we don't have coordinates, return estimated distance
    if (!origin.lat || !origin.lng || !destination.lat || !destination.lng) {
        return {
            distance: 10, // Default 10km
            duration: 20, // Default 20 minutes
            status: "estimated",
        };
    }

    const R = 6371; // Earth's radius in km
    const dLat = toRad(destination.lat - origin.lat);
    const dLng = toRad(destination.lng - origin.lng);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(origin.lat)) * Math.cos(toRad(destination.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return {
        distance: Math.round(distance * 10) / 10, // Round to 1 decimal
        duration: Math.round(distance * 2), // Estimate 2 minutes per km
        status: "haversine",
    };
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Get address suggestions using Google Places Autocomplete
 * Restricted to Kano State, Nigeria
 */
export async function getAddressSuggestions(input) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return [];
    }

    try {
        const url = new URL("https://maps.googleapis.com/maps/api/place/autocomplete/json");
        url.searchParams.append("input", input);
        url.searchParams.append("key", apiKey);
        url.searchParams.append("components", "country:ng"); // Restrict to Nigeria
        url.searchParams.append("location", "12.0022,8.5919"); // Kano center
        url.searchParams.append("radius", "50000"); // 50km radius

        const response = await fetch(url.toString());
        const data = await response.json();

        if (data.status !== "OK") {
            return [];
        }

        return data.predictions.map(prediction => ({
            placeId: prediction.place_id,
            description: prediction.description,
            mainText: prediction.structured_formatting.main_text,
            secondaryText: prediction.structured_formatting.secondary_text,
        }));
    } catch (error) {
        console.error("Address suggestions error:", error);
        return [];
    }
}

/**
 * Get place details (coordinates) from place ID
 */
export async function getPlaceDetails(placeId) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return null;
    }

    try {
        const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
        url.searchParams.append("place_id", placeId);
        url.searchParams.append("key", apiKey);
        url.searchParams.append("fields", "geometry,formatted_address,address_components");

        const response = await fetch(url.toString());
        const data = await response.json();

        if (data.status !== "OK") {
            return null;
        }

        const result = data.result;

        // Extract LGA from address components
        const lga = result.address_components.find(
            component => component.types.includes("administrative_area_level_2")
        )?.long_name;

        return {
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
            formattedAddress: result.formatted_address,
            lga,
        };
    } catch (error) {
        console.error("Place details error:", error);
        return null;
    }
}
