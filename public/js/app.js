require('dotenv').config();

const APIController = (function() {

    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    const _getToken = async () => {
        
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;

    }

    const _getRecentlyPlayed = async (token) => {
            
        const result = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token }
        });

        const data = await result.json();
        return data.items;

    }

    const _getTopTracks = async (token) => {
                
        const result = await fetch('https://api.spotify.com/v1/me/top/tracks', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token }
        });

        const data = await result.json();
        return data.items;

    }

    const _getTopArtists = async (token) => {
            
        const result = await fetch('https://api.spotify.com/v1/me/top/artists', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token }
        });

        const data = await result.json();
        return data.items;

    }

    return {
        getToken() {
            return _getToken();
        },
        getRecentlyPlayed(token) {
            return _getRecentlyPlayed(token);
        },
        getTopTracks(token) {
            return _getTopTracks(token);
        },
        getTopArtists(token) {
            return _getTopArtists(token);
        }
    }

})();

// UI Module
const UIController = (function() {

    const DOMElements = {
        recentlyPlayed: 'recent',
        topTracks: 'topTracks',
        topArtists: 'topArtists'
    }

    const _recentlyPlayed = document.getElementById(DOMElements.recentlyPlayed);
    const _topTracks = document.getElementById(DOMElements.topTracks);
    const _topArtists = document.getElementById(DOMElements.topArtists);

    

})();