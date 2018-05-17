importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
workbox.googleAnalytics.initialize({
  parameterOverrides: {
    dimension1: 'offline',
    hitFilter: (params) => {
      const queueTimeInSeconds = Math.round(params.get('qt') / 1000);
      params.set('metric1', queueTimeInSeconds);
    }
  },
});
