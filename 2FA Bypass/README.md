# 2FA Bypass Techniques
##  Email/OTP Weakness
* Reuse of same OTP for multiple attempts (no invalidation)
* Rate-limiting not enforced → OTP bruteforce
* OTP/2FA code leaked in response headers or error messages
* OTP sent to email that attacker has access to (no email verification)
## Missing 2FA on Sensitive Endpoints
* 2FA not required during password reset, email change, or login from new device
* Bypass 2FA flow by hitting authenticated endpoints directly
## CORS / Referer Leaks
* CORS misconfig allows OTP interception via origin spoofing
* Referer header leaks 2FA tokens when redirected
## Response Tampering
* Intercept & modify 2FA verification response using Burp → force success
* Server trusts client-side validation only
## Case -1
<p>
  when the user prompted for login after entering credentials, the app asks for otp the capturing the request while entering the otp revealed the JWT(JSON WEB TOKEN) was leaked before entering the otp. Eventually allows an attacker to  accesss all endpoints via token this is classic 2fa bypass that often seen in web apps.
</p>
