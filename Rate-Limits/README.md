# Rate Limit / API Rate Limit Bypass Techniques

## Change Request Headers

Rotate User-Agent, Referer, Origin

Use random X-Forwarded-For, X-Real-IP, Client-IP
## DownGrade Or UpGrade the HTTP version
-> from http1.1 - http2.0
-> from http2.0 - http1.1
-> from http1.0 - http 2.0
-> from http2.0 - http3.0
-> from http1.1 - http1.0

## Alter URL Slightly

Add junk params: ?, ?a=1, #, ?random=xyz

Change endpoint path: /api/v1/ → /api/v2/

## HTTP Method Switching

Use POST, GET, PUT, OPTIONS (some filters are method-specific)

## Use Multiple Authentication Tokens

Rotate tokens for same user

Use anonymous + authenticated tokens together

## Change IP (if possible)

Use Tor, VPN, proxies, Burp Collaborator tunnels

## Concurrent Requests

Send multiple requests at once to overload or confuse filters

## Delay & Timing

Test slow bursts or time-based sliding window bypass

## Remove or Modify Authorization Header

Remove Authorization: header

Try malformed or invalid tokens

## Custom Headers Injection

Inject unexpected headers: X-Api-Version, X-RateLimit-Bypass, etc.

## Cache Poisoning

Abuse CDN or proxy caching to bypass limits

## Parameter Pollution

Example: ?user=admin&user=guest may confuse logic

## Don't Ignore Early 429 or 401 Responses
→ Keep the scan running! Some applications only show 200 OK for the correct OTP even after rate-limiting others. So don’t stop too early.
## Batch OTPs in JSON Body
→ Instead of sending single OTPs, try:
```
{
  "otp": [123456, 654321, 111111, 999999]
}
```

