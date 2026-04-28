import SwiftUI

struct ContentView: View {
    var body: some View {
        TerminalWebView(telemetryPort: ProcessInfo.processInfo.environment["TELEMETRY_WS_PORT"])
            .ignoresSafeArea()
    }
}

