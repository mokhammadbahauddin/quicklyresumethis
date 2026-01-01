from playwright.sync_api import sync_playwright
import json
import time

def verify_share():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        
        print("Navigating to Edit Page (port 3003)...")
        page.goto("http://localhost:3003")
        
        # Inject Data
        mock_data = {
            "personalInfo": {"fullName": "Share Tester", "email": "share@test.com", "phone": "123"},
            "experience": [],
            "education": [],
            "skills": ["Sharing"]
        }
        page.evaluate(f"sessionStorage.setItem('resumeData', JSON.stringify({json.dumps(mock_data)}));")
        page.goto("http://localhost:3003/edit")
        page.wait_for_load_state("networkidle")

        # Click Share
        try:
            # Try to find the button by text content "Share"
            page.get_by_text("Share", exact=True).click()
            time.sleep(1)
            # Check for "Copied!" text
            if page.get_by_text("Copied!").is_visible():
                print("Share functionality verified: 'Copied!' appeared.")
            else:
                print("Share functionality failed: 'Copied!' not found.")
                
            page.screenshot(path="verification/share_test.png")
        except Exception as e:
            print(f"Error clicking share: {e}")
            page.screenshot(path="verification/share_fail.png")

        browser.close()

if __name__ == "__main__":
    verify_share()
