import SwiftUI

@main
struct CryptoTerminalApp: App {
    var body: some Scene {
        WindowGroup("Crypto Terminal") {
            ContentView()
                .frame(minWidth: 1100, minHeight: 720)
        }
        .windowResizability(.contentMinSize)
    }
}
