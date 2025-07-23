# Access Control Bypass Techniques

## Horizontal Privilege Escalation (Same role → other user)

* Change user ID in URL (/user/123 → /user/124)
* Guess or enumerate object IDs
* Remove or modify ownership checks (user_id, email)
* Access other users' data via predictable URLs
* Replay same request with different user context
* Use mobile/API endpoints lacking access checks
* Use POST/PUT with another user's ID
* Change session/user cookie to another user's value
* Predictable filename access (e.g., invoice_123.pdf)

## Vertical Privilege Escalation (Low → High privilege)

* Modify roles in body/header (role=admin)
* Add isAdmin=true to request
* Direct access to /admin, /superuser, or dashboard URLs
* Access hidden features in JavaScript or DOM
* Use hardcoded or leaked admin tokens
* Remove X-User-Role: user or change it to admin
* Exploit flawed role-checking logic
* Find and exploit unused endpoints (legacy admin panels)
* Switch HTTP method (GET → POST) to bypass check

## Context-Dependent Bypasses (Logic & environment-based)
* Spoof Referer or Origin headers
* Replay requests in a different role context
* Use CSRF to make privileged actions via a victim
* Tamper X-Forwarded-For or Host headers
* Exploit dev/staging environments with weak access rules
* Privilege abuse via feature misuses (e.g., file uploads)
* Business logic flaws (e.g., cancel another user's subscription)
* Session fixation to reuse an admin session
* Leverage race conditions to bypass checks

# 403 Bypass
1. To bypass this protection - You can try appending a fake path like 
```
https://target/api/fakepath/..%2f/admin/fakepath/..%2f/users/123.
```
## Use of Header

```
GET /admin HTTP/1.1
Host: http://site.com
```
...
Access is denied

But use X-Original header like this...
```
GET /test HTTP/1.1
Host: http://site.com
X-Original-URL: /admin
```
HTTP/1.1 200 OK

### use of url encode (.)
https://host.com/path = 403 Forbidden
https://host.com/%2e/path = 200 OK
> Note use Different Encoding to bypass such restrictions



### Please Refer The Mind Map attached to Repository 
[MINDMAP FOR IDOR](https://github.com/ehpavan9x/Pavan-BugBounty-PlayBook/blob/main/Access%20Control%20Vulnerabilities/IDOR%20Techniques.png)
