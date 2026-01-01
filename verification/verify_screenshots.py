from playwright.sync_api import sync_playwright
import time

def capture_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        print("Capturing Landing Page...")
        page.goto("http://localhost:3005")
        page.screenshot(path="verification/screenshot_landing.png", full_page=True)

        print("Capturing Login Page...")
        page.goto("http://localhost:3005/login")
        page.screenshot(path="verification/screenshot_login.png")

        print("Capturing Signup Page...")
        page.goto("http://localhost:3005/signup")
        page.screenshot(path="verification/screenshot_signup.png")

        print("Capturing Dashboard (Redirect)...")
        page.goto("http://localhost:3005/dashboard")
        time.sleep(1) # Allow redirect logic
        page.screenshot(path="verification/screenshot_dashboard_redirect.png")

        browser.close()

if __name__ == "__main__":
    capture_screenshots()
