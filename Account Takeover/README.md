 # Account Takeover (ATO) Bypasses
## Reset Token Abuse

* Reuse password reset token across multiple accounts (no email validation)
* Guessable or predictable reset tokens (numeric, base64)
* Password reset email points to attacker-controlled domain (open redirect chain)
* Misconfigured CORS on reset endpoint (leak token)
* Token sent to email but not invalidated after first use

## Insecure Email Change
* No re-authentication required before changing email
* Change email without password verification → attacker updates to their own
* Race condition in email change → victim gets locked out

## Username/Email Enumeration
* Error messages expose valid usernames during login/reset
* Slight difference in response time or structure

## OAuth Misconfig
* Bind victim account with attacker OAuth (Google, Facebook, etc.)
* Account hijack via unverified email from OAuth provider

## Session Fixation
* Attacker sets session ID before login → session persists after login

## Logic Bugs
* Update password using old password with no validation
* JWT kid injection / insecure deserialization (leads to auth bypass)

# JWT-Based Authentication Bypass Techniques

## `alg: none` Attack
* Some servers accept JWTs with "alg": "none" (no signature validation).
```
{
  "alg": "none",
  "typ": "JWT"
}
```
* Remove the signature part and modify payload to escalate privileges (e.g., "role": "admin").
* Works only if server fails to reject unsigned tokens.
## Algorithm Confusion (RS256 ➝ HS256)

* If server uses RS256 (asymmetric) but verifies token with HS256 (symmetric):
   * Replace alg: RS256 → alg: HS256
   * Use the public key as the secret key to sign a fake token
```
{
  "alg": "HS256",
  "typ": "JWT"
}
```
## Kid Header Injection
* kid (Key ID) is used to fetch the key.
* Supply a path or object to access unintended files or endpoints (SSRF/LFI):
```
  {
  "kid": "../../../../../../etc/passwd"
}
```
# Weak Secret Brute-Forcing
8 If server uses HS256 with weak/shared secret:
* Brute force the secret using tools like JWT Tool or jwt-cracker.

# Expired Token Still Accepted
* If server does not validate the exp claim or doesn't revoke old tokens, attacker can reuse them.

# Forged Claims
* Server trusts unverified claims like isAdmin: true, uid: 1, etc.
* Modify payload and re-sign if secret or verification is weak/missing.
