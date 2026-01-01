from playwright.sync_api import sync_playwright

def verify_landing():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        
        print("Navigating to Landing Page (port 3003)...")
        page.goto("http://localhost:3003")
        
        # Check for new Pricing text
        if page.get_by_text("Simple, Transparent Pricing").is_visible():
            print("Pricing section visible.")
        else:
            print("Pricing section NOT found.")

        # Check for Hero
        if page.get_by_text("Build your dream resume").is_visible():
            print("Hero section visible.")
        
        page.screenshot(path="verification/landing_v2.png")
        print("Screenshot saved to verification/landing_v2.png")
        
        browser.close()

if __name__ == "__main__":
    verify_landing()
