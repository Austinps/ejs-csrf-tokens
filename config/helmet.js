export const helmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.example.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
};
