module.exports = {
    apps: [
      {
        name: 'index.js',            // Application ka naam
        script: 'index.js',         // Run hone wali file ka naam
        watch: true,                // Watch mode enable karein
        ignore_watch: ['node_modules', 'logs'], // Ignore folders
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  