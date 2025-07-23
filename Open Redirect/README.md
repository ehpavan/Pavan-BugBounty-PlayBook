
# Open Redirect Bypass Techniques

## Common Payload Variants:
```
https://example.com/redirect?url=//evil.com

https://example.com/redirect?url=http://evil.com

https://example.com/redirect?url=https://evil.com

https://example.com/redirect?url=evil.com

https://example.com/redirect?next=//evil.com

https://example.com/redirect?dest=//evil.com

https://example.com/redirect?continue=https://evil.com

https://example.com/redirect?redirect_uri=evil.com
```
## Bypass Techniques
### Protocol-relative bypass
``
//evil.com
``
###  URL encoding
```
%2F%2Fevil.com
http:%2F%2Fevil.com
```
### Obfuscated schemas
```
hTtP://evil.com
HtTpS://evil.com
```
###  Null byte (%00)
``
https://example.com/redirect?url=http://evil.com%00.example.com
``
### Open redirect within allowed domain (confuse validation)
```
https://example.com@evil.com
https://evil.com%23.example.com
https://evil.com%2F..example.com
```
### Use whitespaces or control characters
```
https://example.com/redirect?url=http://evil.com%09
https://example.com/redirect?url=http://evil.com%0d%0a
```
### Use “@” in URL
``
https://example.com/redirect?url=https://trusted.com@evil.com
``
## Redirection through hash fragment
```
https://example.com/redirect#http://evil.com
https://example.com/redirect?url=/redirect#http://evil.com
```
### Use of intermediate redirectors
```
https://www.google.com/url?q=https://evil.com
https://facebook.com/l.php?u=https://evil.com
```
### Base64 encoding tricks OR other encodings
```
https://example.com/redirect?data=aHR0cHM6Ly9ldmlsLmNvbQ==
```




