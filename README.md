Custom Community Solid Server setup that overrides config files and some components

Uses hardcoded paths - it is made available only as an example

For changes included, see check/ folder:
- IdentityProviderFactory issues refresh_token with consent=none, https://github.com/solid/community-server/issues/1058 (Note this includes a patch to oidc-provider)
- IdentityProviderFactory returns json output, https://github.com/solid/community-server/issues/1061
- deviceFlow is enabled
- PutOperationHandler returns metadata. See https://github.com/solid/community-server/issues/632
- Override idtoken expiry
- Override resource lock timeout

