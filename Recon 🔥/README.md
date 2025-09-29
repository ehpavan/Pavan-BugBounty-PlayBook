# Subdomain Enumeration
## Automated Tools
```
subfinder -d example.com -all -recursive -o subfinder.txt
assetfinder --subs-only example.com > assetfinder.txt
findomain -t example.com | tee findomain.txt
amass enum -passive -d example.com > amass_passive.txt
amass enum -active -d example.com > amass_active.txt
```
>  Note: Configure API keys for more accurate results.
# Public Sources
 #### Certificate Transparency & Archives
 ```
# crt.sh
curl -s "https://crt.sh/?q=domain.com&output=json" | jq -r '.[].name_value' | sort -u > crtsh.txt

# Wayback Machine
curl -s "http://web.archive.org/cdx/search/cdx?url=*.domain.com/*&output=text&fl=original&collapse=urlkey" \
| sed -e 's_https*://__' -e "s/\/.*//" | sort -u > wayback.txt
```
 #### Censys API (Needs API ID & Secret)
 ```
censys subdomains domain.com --json > censys.txt
# or using censys CLI
censys search "parsed.names: domain.com" --fields parsed.names --format json > censys.txt
```
#### SecurityTrails API (Free key required)
```
curl -s "https://api.securitytrails.com/v1/domain/domain.com/subdomains?apikey=YOUR_API_KEY" \
| jq -r '.subdomains[]' | sed 's/$/.domain.com/' > securitytrails.txt
```
## GitHub Subdomains
```
github-subdomains -d domain.com -t [GITHUB_TOKEN]
```
> Tool by: gwen001/github-subdomains

## Merge & Clean
``
cat *.txt | sort -u > final.txt
``
### Permutations + DNS Resolution 
```
echo domain.com | alterx -enrich | dnsx
echo domain.com | alterx -pp word=/path/to/wordlist.txt | dnsx
```
## Brute-force Subdomains (ffuf)
```
ffuf -u "https://FUZZ.domain.com" -w wordlist.txt -mc 200,301,302
```
## ASN & IP Discovery
```
asnmap -d domain.com | dnsx -silent -resp-only
amass intel -org "Company Name"
amass intel -active -asn [ASN_NUMBER]
```
## Discover IPs via APIs
``
curl -s "https://www.virustotal.com/vtapi/v2/domain/report?apikey=$your-key&domain=$your-domain" \ | jq -r '.resolutions[]?.ip_address'
``
## Discover Live Hosts
```
cat final.txt | httpx-toolkit -ports 80,443,8000,8080,8888 -threads 200 -silent > alive.txt
```
## Visual Recon
``
cat alive.txt | aquatone -ports 80,443,8000,8080,8443
``

# URL Collection & Analysis
##  Active Crawling
```
katana -u livesubdomains.txt -d 2 -o urls.txt
cat urls.txt | hakrawler -u >> urls.txt
```
 ## Passive Crawling
 ```
cat livesubdomains.txt | gau | sort -u >> urls.txt
cat livesubdomains.txt | waybackurls | sort -u >> urls.txt
urlfinder -d tesla.com | sort -u >> urls.txt
echo example.com | gau --mc 200 | urldedupe >> urls.txt
```
## Filter Interesting URLs
```
cat urls.txt | grep -Ei "\.php|\.asp|\.aspx"
```
# Sensitive File Discovery

From Url we collected, it often contains the sensitive information such as (backups, credentials, config files, logs) it leads to impactful sensitive information and poses signifant damage to oraginization.

```
cat allurls.txt | grep -E "\.xls|\.xml|\.xlsx|\.json|\.pdf|\.sql|\.doc|\.docx|\.pptx|\.txt|\.zip|\.tar\.gz|\.tgz|\.bak|\.7z|\.rar|\.log|\.cache|\.secret|\.db|\.backup|\.yml|\.gz|\.config|\.csv|\.yaml|\.md|\.md5"
cat allurls.txt | grep -E "\.(xls|xml|xlsx|json|pdf|sql|doc|docx|pptx|txt|zip|tar\.gz|tgz|bak|7z|rar|log|cache|secret|db|backup|yml|gz|config|csv|yaml|md|md5|tar|xz|7zip|p12|pem|key|crt|csr|sh|pl|py|java|class|jar|war|ear|sqlitedb|sqlite3|dbf|db3|accdb|mdb|sqlcipher|gitignore|env|ini|conf|properties|plist|cfg)$"
site:*.example.com (ext:doc OR ext:docx OR ext:odt OR ext:pdf OR ext:rtf OR ext:ppt OR ext:pptx OR ext:csv OR ext:xls OR ext:xlsx OR ext:txt OR ext:xml OR ext:json OR ext:zip OR ext:rar OR ext:md OR ext:log OR ext:bak OR ext:conf OR ext:sql)
```

# Directory & File Bruteforcing
it often reveals the sensitive directories and files thats opens door for more critical bugs like SQL, RCE, SSRF etc.
misconfigured domains and endpoints that often not accessed by oridinary users

## Using Dirsearch
```
dirsearch -u https://example.com  --full-url --deep-recursive -r
dirsearch -u https://example.com -e php,cgi,htm,html,shtm,shtml,js,txt,bak,zip,old,conf,log,pl,asp,aspx,jsp,sql,db,sqlite,mdb,tar,gz,7z,rar,json,xml,yml,yaml,ini,java,py,rb,php3,php4,php5 --random-agent --recursive -R 3 -t 20 --exclude-status=404 --follow-redirects --delay=0.1
```
## Using FFuf 
```
ffuf -w seclists/Discovery/Web-Content/directory-list-2.3-big.txt -u https://example.com/FUZZ -fc 400,401,402,403,404,429,500,501,502,503 -recursion -recursion-depth 2 -e .html,.php,.txt,.pdf,.js,.css,.zip,.bak,.old,.log,.json,.xml,.config,.env,.asp,.aspx,.jsp,.gz,.tar,.sql,.db -ac -c -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0" -H "X-Forwarded-For: 127.0.0.1" -H "X-Originating-IP: 127.0.0.1" -H "X-Forwarded-Host: localhost" -t 100 -r -o results.json
ffuf -w seclists/Discovery/Web-Content/directory-list-2.3-big.txt -u https://ens.domains/FUZZ  -fc 401,403,404  -recursion -recursion-depth 2 -e .html,.php,.txt,.pdf -ac -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0" -r -t 60 --rate 100 -c
```
# JavaScript File Discovery and Analysis
JavaScript files often contain valuable information such as hidden API endpoints, internal functions, parameter names, hardcoded credentials, tokens, even sensitive keys and Development comments and debugging information. Analyzing these files can give deep insight into the application's logic and uncover attack surfaces that aren't visible in the frontend. It's the GOLDMINE

```
katana -list {domains.txt} -d 5 -jc | grep ".js$"  | uniq | sort
cat jsfiles.txt | grep -r -E "aws_access_key|aws_secret_key|api key|passwd|pwd|heroku|slack|firebase|swagger|aws_secret_key|aws key|password|ftp password|jdbc|db|sql|secret jet|config|admin|pwd|json|gcp|htaccess|.env|ssh key|.git|access key|secret token|oauth_token|oauth_token_secret" 
cat allurls.txt | grep -E "\.js$" | httpx-toolkit -mc 200 -content-type | grep -E "application/javascript|text/javascript" | cut -d' ' -f1 | xargs -I% curl -s % | grep -E "(API_KEY|api_key|apikey|secret|token|password)"
```
### Tools
https://github.com/003random/getJS
https://github.com/GerbenJavado/LinkFinder
https://github.com/m4ll0k/SecretFinder

# Network-Level Recon
Scan the target for open ports, running services and software versions. This helps you find vulnerable or misconfigured services that may not be visible from the web interface.
## Port Scanning with Naabu
```
naabu -list ip.txt -c 50 -nmap-cli 'nmap -sV -SC' -o naabu-full.txt
```
## Nmap full scan
```
nmap -p- --min-rate 1000 -T4 -A target.com -oA fullscan
```
## Masscan for speed
```
masscan -p0-65535 target.com --rate 100000 -oG masscan-results.txt
```
# Hidden Parameter Discovery
## Passive parameter discovery:
``arjun -u https://site.com/endpoint.php -oT arjun_output.txt -t 10 --rate-limit 10 --passive -m GET,POST --headers "User-Agent: Mozilla/5.0"``


## Active parameter discovery with wordlist:
``arjun -u https://site.com/endpoint.php -oT arjun_output.txt -m GET,POST -w /usr/share/wordlists/seclists/Discovery/Web-Content/burp-parameter-names.txt -t 10 --rate-limit 10 --headers "User-Agent: Mozilla/5.0"``

# GITHUB RECON 🔥
The companies Developers and employees leave the sesitive files, credentials, hidden-api-endpoints, secrets, Documentions etc. hence this is Great source to find many impactful leaks and Below are the payloads that WalkYouThrough discovering your find sensitive information on github,
```
"{Domain}" AND ("api_key" OR "secret" OR "password" OR "access_token" OR "client_secret" OR "private_key" OR "AWS_SECRET_ACCESS_KEY" OR "DB_PASSWORD" OR "slack_token" OR "github_token" OR "BEGIN RSA PRIVATE KEY")
```
filename: Search by specific file names (e.g. filename:.env)
extension: Filter by file type (e.g. extension:json)
path: Search within specific directories (e.g. path:/config)
org: Limit results to an organization (e.g. org:my-company)
repo: Focus on a specific repository (e.g. repo:my-project)

### Authentication & Secrets:
```
api_key
access_token
client_secret
auth_token
authorizationToken
x-api-key
secret
SECRET_KEY
secret_token
credentials
token
secure
```
### Cloud Provider Secrets:
```
AWS_SECRET_ACCESS_KEY
AWS_ACCESS_KEY_ID
aws_access_key_id
aws_secret_key
aws_token
GCP_SECRET
gcloud_api_key
firebase_url
shodan_api_key
```
### DB CREDENTIALS:
```
DB_PASSWORD
DATABASE_URL
db_password
db_pass
MYSQL_PASSWORD
POSTGRES_PASSWORD
mongo_uri
mongodb_password
```
### Service-Specific Tokens:
```
slack_token
discord_token
github_token
gitlab_token
twilio_auth_token
mailgun
stripe_secret
SF_USERNAME salesforce
```




