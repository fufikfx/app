import Foundation
import SwiftUI
import WebKit

struct TerminalWebView: NSViewRepresentable {
    let telemetryPort: String?

    func makeNSView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.defaultWebpagePreferences.allowsContentJavaScript = true

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.allowsBackForwardNavigationGestures = false
        webView.setValue(false, forKey: "drawsBackground")

        loadHTML(into: webView)
        return webView
    }

    func updateNSView(_ nsView: WKWebView, context: Context) {
        // No-op; content is static unless process restarts.
    }

    private func loadHTML(into webView: WKWebView) {
        let resourceName = "terminal_work-3-crypto"
        let fileExt = "html"

        let fileURL =
            Bundle.main.url(forResource: resourceName, withExtension: fileExt) ??
            Bundle.module.url(forResource: resourceName, withExtension: fileExt)

        guard let htmlURL = fileURL else {
            webView.loadHTMLString("<h3>Missing resource: \(resourceName).\(fileExt)</h3>", baseURL: nil)
            return
        }

        var finalURL = htmlURL
        if let p = telemetryPort?.trimmingCharacters(in: .whitespacesAndNewlines),
           !p.isEmpty,
           var comps = URLComponents(url: htmlURL, resolvingAgainstBaseURL: false) {
            var q = comps.queryItems ?? []
            q.append(URLQueryItem(name: "telemetryPort", value: p))
            comps.queryItems = q
            finalURL = comps.url ?? htmlURL
        }

        webView.loadFileURL(finalURL, allowingReadAccessTo: htmlURL.deletingLastPathComponent())
    }
}
