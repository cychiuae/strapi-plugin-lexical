export default [
  {
    method: 'GET',
    path: '/search/:model/:field',
    handler: 'lexicalSearch.search',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'GET',
    path: '/get/:collectionName/:documentId',
    handler: 'lexicalSearch.get',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'GET',
    path: '/identify/:collectionName',
    handler: 'lexicalSearch.identify',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'GET',
    path: '/features',
    handler: 'lexicalFeatures.getFeatures',
    config: {
      policies: [],
      auth: false,
    },
  },
];
