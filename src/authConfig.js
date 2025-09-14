
const msalConfig = {
  auth: {
    clientId: "<YOUR_SPA_CLIENT_ID_FROM LIFEBLOOD TENANT>",
    // tenant-specific authority (NOT /common)
    authority: "https://login.microsoftonline.com/<YOUR_LIFEBLOOD_TENANT_ID>",
    // keep EXACTLY the same as in Azure > App registration > Authentication (SPA)
    redirectUri: window.location.origin + "/",  
    postLogoutRedirectUri: window.location.origin + "/",
  },
  cache: {
    cacheLocation: "localStorage",               // survives page reloads nicely in SPAs
    storeAuthStateInCookie: false,
  },
};

// For sign-in only; no admin consent needed
export const loginRequest = { scopes: ["openid", "profile", "email"] };

export default msalConfig;
