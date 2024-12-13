htmver="0.2.3"
deno vendor "https://deno.land/x/htm@$htmver/mod.ts"
mv "./vendor/deno.land/x/htm@$htmver" htm
rm -rf ./vendor
