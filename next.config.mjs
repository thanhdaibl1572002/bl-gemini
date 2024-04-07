/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        databaseURL: process.env.databaseURL,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
        measurementId: process.env.measurementId,
        geminiApiKey: process.env.geminiApiKey,
        anonymouslyUserLocalStorageKey: process.env.anonymouslyUserLocalStorageKey,
        daiblServerUrl: process.env.daiblServerUrl,
    },
};

export default nextConfig;
