function check {
   diff -q $1 $1.old
}

# TODO: diff config-mashlib.json from community solid recipes

diff ../node_modules/@solid/community-server/dist/identity/configuration/IdentityProviderFactory.js ../dist/IdentityProviderFactory3.js >  IdentityProviderFactory.diff
check IdentityProviderFactory.diff

diff ../node_modules/@solid/community-server/config/identity/handler/provider-factory/identity.json ../config/identity.json >  identity.json.diff
check identity.json.diff

diff ../node_modules/@solid/community-server/config/identity/handler/default.json ../config/identity_handler.json >  identity_handler.json.diff
check identity_handler.json.diff

diff ../node_modules/@solid/community-server/config/util/resource-locker/memory.json ../config/memory.json >  memory.json.diff
check memory.json.diff

# Patches to be applied

if cmp -s ../node_modules/oidc-provider/lib/actions/grants/refresh_token.js refresh_token.js; then
	echo refresh token patch already applied
else
	diff -u ../node_modules/oidc-provider/lib/actions/grants/refresh_token.js refresh_token.js > refresh_token.js.diff
	check refresh_token.js.diff
	patch ../node_modules/oidc-provider/lib/actions/grants/refresh_token.js refresh_token.js.diff
fi
