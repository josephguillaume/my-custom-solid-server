Custom Community Solid Server setup that overrides config files and some components

Uses hardcoded paths - it is made available only as an example

For changes included, see check/ folder:
- IdentityProviderFactory issues refresh_token with consent=none, https://github.com/solid/community-server/issues/1058 (Note this includes a patch to oidc-provider)
- deviceFlow is enabled
- PutOperationHandler returns metadata. See https://github.com/solid/community-server/issues/632
- Disable markdown convertor

Necessary features currently provided natively
- Lengthen resource lock timeout to 5sec
- Lengthen clockTolerance for OIDC providee
- Lengthen idtoken expiry -> no longer needed by solid-client-authn-browser
- Returned IdentityProviderFactory json error output -> https://github.com/solid/community-server/issues/1061
- Maintain prefixes when PATCHing a Turtle representation

