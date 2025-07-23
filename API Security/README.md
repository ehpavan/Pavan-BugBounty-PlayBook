
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
# API Endpoint Discovery Techniques
### Inspect JavaScript Files
Scan frontend JS files for hardcoded URLs, endpoints, or parameters.

Look for .fetch(), axios, XMLHttpRequest, or $.ajax() calls.

### 2. Use Browser DevTools
Open DevTools (Network tab) and interact with the application.

Observe AJAX/XHR/WebSocket requests to reveal hidden API calls.

### 3. Analyze Mobile Apps
Decompile APK/IPA using tools like jadx, apktool, or MobSF.

Search for base URLs, endpoints, and hardcoded tokens.

### 4. Check Swagger/OpenAPI/GraphQL
Look for /swagger, /api-docs, /openapi.json, or /graphql.

These often expose full API documentation or introspection features.

### 5. Use Tools for Endpoint Fuzzing
Tools: ffuf, dirsearch, wfuzz, burp intruder.

Wordlists: SecLists, APIsec Wordlists.
Try common paths like /api/, /v1/, /v2/, /internal/.

### 6. Review Error Messages
Trigger 404s or malformed requests and analyze verbose error responses.

Errors often leak exact endpoint names, methods, or stack traces.

### 7. Explore Robots.txt / Sitemap.xml
Although rare, API endpoints may be listed in these files.

### 8. Check for Subdomain APIs
Enumerate subdomains (e.g., api.example.com, internal-api.example.com).

Use tools like Sublist3r, Amass, or crt.sh.

### 9. Capture Traffic via Proxies
Use Burp Suite, Fiddler, or MITMProxy to inspect requests from web/mobile clients.
Uncover hidden API calls made in background or triggered by actions.

### 10. Google Dorking
Use search engines to find exposed API documentation or URLs.
```
site:example.com inurl:api
site:example.com filetype:json
```

# Authentication Bypass
* Remove Authorization header or set to null
* Change auth_type or token_type parameters
* Test with expired or tampered tokens
* Try accessing endpoints via OPTIONS method (some skip auth checks)

# Header Injection
Add/modify headers like:

```
X-Forwarded-For
X-Forward-For
X-Remote-IP
X-Originating-IP
X-Remote-Addr
X-Client-IP
```
### Values:
127.0.0.1 (or anything in the 127.0.0.0/8 or ::1/128 address spaces)
localhost
**Any RFC1918 address:**
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
Link local addresses: 169.254.0.0/16

# Rate Limit / WAF Bypass
* Use multiple IPs / TOR / Proxies
* Change headers to evade fingerprinting
* Insert delays or randomize payloads
* Encode payloads or break them into chunks

# JWT / Token Bypasses
* Use `none` algorithm if not verified properly
* Use public key as HMAC secret (alg confusion)
* Re-sign expired token (if expiration not checked)
* Supply token for another app (aud claim not validated)

# Hidden/Undocumented Endpoints
* Fuzz with /internal/, /debug/, /admin-api/, /v2/, /test/
* Look for debug flags in headers or params: debug=true, dev=1
