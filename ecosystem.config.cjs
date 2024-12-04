module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'index.js',
      watch: true, // Enable watch mode
      ignore_watch: ['node_modules', 'logs'], // Ignore unnecessary folders
      watch_options: {
        followSymlinks: false,
        usePolling: true, // Enable polling to detect file changes more reliably
      },
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};