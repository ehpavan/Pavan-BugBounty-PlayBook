# INFORMATION DISCLOSURE (WHERE TO LOOK)
##  Apache Default Pages:
- /server-status
- /server-info
- /cgi-bin/

 ## PHP Info Pages:
- phpinfo.php
- info.php
- php.php
 Tip: Look for `phpinfo()` function exposing paths, configs, environment variables

##  Git & SVN Leftovers:
- /.git/config
- /.svn/entries
 Use: GitTools or GitDumper to extract code

##  .env Files:
- /.env
 Common leak: DB creds, SMTP, API keys

##  Backup Files:
- index.php~ 
- login.php.bak
- .zip or .tar.gz files
 Bruteforce common file extensions or use wayback

##  Robots.txt / Sitemap.xml:
- Disallowed paths may lead to sensitive areas
- Sometimes admin panels, staging, test files are listed

 ## Exposed JS Files:
 Look for:
- `apiKey =`
- `accessToken`
- `client_id`
- Hardcoded URLs
- Internal endpoints like `/api/v1/admin`

## Error Messages (Verbose):
- Stack traces
- SQL errors
- Framework errors
  Send broken input, observe error response

## Headers Disclosure:
- `X-Powered-By: PHP/7.4.3`
- `Server: Apache`
 Use tools like Wappalyzer or `curl -I`

## Config & Log Files:
- config.json / config.php / settings.py
- /logs/error.log / debug.log

## Directory Listing Enabled:
- Browse folders directly
- Look for backup, db dumps, config, etc.

## Source Code Disclosure:
- View source + JS review
- Try appending `.bak`, `.txt`, `.old` to file names

## Commented Secrets in HTML or JS:
<!-- admin login is down -->
// TODO: remove API_KEY = "xyz"

## API Docs / Swagger / Postman:
- /swagger
- /api-docs
- /postman.json
 Can reveal endpoints, tokens, parameters

 ## Third-Party Services:
- Firebase
- AWS S3 Buckets
 Open firebase: `https://<app>.firebaseio.com/.json`

## Wayback Machine / Archive.org:
 Old endpoints or leaked files
Use: `waybackrobots.py` or `gau` + `waybackurls`


