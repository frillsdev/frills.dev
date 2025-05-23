import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
    const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
    const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
    const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    // Step 1: Obtain Access Token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token,
        }),
    });

    if (!tokenResponse.ok) {
        return new Response(JSON.stringify({ error: 'Failed to retrieve access token' }), {
            status: 500,
        });
    }

    const { access_token } = await tokenResponse.json();

    // Step 2: Fetch Currently Playing Track
    let trackResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    let trackData = null;

    if (trackResponse.status === 204 || trackResponse.status > 400) {
        // Step 3: Fallback to Recently Played Track
        trackResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!trackResponse.ok) {
            return new Response(JSON.stringify({ error: 'Failed to retrieve track data' }), {
                status: 500,
            });
        }

        const recentData = await trackResponse.json();
        trackData = recentData.items[0]?.track;
    } else {
        const currentData = await trackResponse.json();
        trackData = currentData.item;
    }

    if (!trackData) {
        return new Response(JSON.stringify({ error: 'No track data available' }), {
            status: 404,
        });
    }

    // Step 4: Return Track Information
    const response = {
        title: trackData.name,
        artist: trackData.artists.map((artist: any) => artist.name).join(', '),
        album: trackData.album.name,
        albumImageUrl: trackData.album.images[0]?.url,
        trackUrl: trackData.external_urls.spotify,
    };

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
