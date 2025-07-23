# CSRF Bypass Techniques
## Content-Type Bypass
Some backends only check for application/x-www-form-urlencoded:
```
Content-Type: text/plain
```
OR
```
Content-Type: application/json
```
→ May bypass filters if not validating content type strictly.
## CORS Misconfiguration + CSRF
If target uses Access-Control-Allow-Origin: * with cookies:

* Can trigger CSRF via fetch() or XMLHttpRequest.
* Especially dangerous if credentials included (credentials: include).

  ## Missing SameSite Cookies
  If cookies are set without SameSite=Strict or Lax:
  ```
  Set-Cookie: session=abc123; Path=/;
  ```
→ CSRF is possible via normal <form> or JS requests.
## Custom Headers Not Required

If the app does not check for Origin / Referer:
 * Basic HTML forms can exploit CSRF easily:
 ```
   <form action="https://target.com/transfer" method="POST">
  <input type="hidden" name="amount" value="1000">
  <input type="hidden" name="to" value="attacker">
  <input type="submit">
</form>
```
## GET-Based Actions
* If critical actions (like logout, delete, change email) use GET requests:
```
<img src="https://target.com/delete-account"> 
```
## Cache Poisoning with CSRF
* Poison cache via crafted request
* Victim loads poisoned response, triggers CSRF passively

## Multi-Step CSRF

* If action requires multiple steps (token, confirm), automate them:
```
fetch('https://target.com/init')
  .then(() => fetch('https://target.com/confirm'));
```
## Bypassing Token-Based Protections

If CSRF tokens are:

* Predictable
* Leaked
* Replace with Null
* Delete the Token
* Reused
* Not tied to user session

Example: csrf_token=12345
→ Replay the same token across users

## Open Redirect + CSRF
If there's an open redirect:

* Lure user to a CSRF-hosting page that redirects to action
* Helps bypass referrer checks

References:
https://portswigger.net/web-security/csrf/

https://owasp.org/www-community/attacks/csrf

https://www.cobalt.io/blog/csrf-bypasses

https://bugbase.ai/blog/how-to-bypass-csrf-protection

https://www.intigriti.com/researchers/blog/hacking-tools/csrf-a-complete-guide-to-exploiting-advanced-csrf-vulnerabilities

https://johnermac.github.io/notes/ewptx/csrf/

https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html

