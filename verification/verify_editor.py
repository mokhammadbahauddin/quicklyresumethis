from playwright.sync_api import sync_playwright
import json
import time

def verify_editor():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        print("Navigating to Home...")
        page.goto("http://localhost:3000")

        # Mock Data
        mock_data = {
            "personalInfo": {
                "fullName": "Test User",
                "email": "test@example.com",
                "phone": "123-456-7890",
                "location": "Test City"
            },
            "experience": [
                {
                    "jobTitle": "Software Engineer",
                    "company": "Tech Corp",
                    "startDate": "2020-01-01",
                    "endDate": "Present",
                    "description": "Building cool things.",
                    "achievements": ["Launched app"]
                }
            ],
            "education": [],
            "skills": ["Python", "JavaScript"]
        }

        print("Injecting session data...")
        page.evaluate(f"sessionStorage.setItem('resumeData', JSON.stringify({json.dumps(mock_data)}));")

        print("Navigating to Editor...")
        page.goto("http://localhost:3000/edit")
        page.wait_for_load_state("networkidle")

        # Verify Editor Loaded
        try:
            page.wait_for_selector("text=Resume Content", timeout=5000)
            print("Editor loaded successfully: 'Resume Content' found.")
        except:
            print("Editor failed to load or 'Resume Content' not found.")
            page.screenshot(path="verification/editor_fail.png")
            browser.close()
            return

        # Screenshot Editor
        page.screenshot(path="verification/editor_loaded.png")
        print("Screenshot saved: verification/editor_loaded.png")

        # Verify Download Button
        download_btn = page.get_by_role("button", name="Download PDF")
        if download_btn.is_visible():
             print("Download button visible.")

        # Test Limit logic
        print("Testing Download Limit (Mocking 3 downloads)...")
        # We must set BOTH downloadCount and lastDownloadMonth to prevent reset
        page.evaluate("""
            localStorage.setItem('downloadCount', '3');
            localStorage.setItem('lastDownloadMonth', new Date().getMonth().toString());
        """)

        # Click Download
        print("Clicking Download...")
        download_btn.click()

        # Check for Modal
        try:
            page.wait_for_selector("text=Upgrade to Premium", timeout=3000)
            print("Upgrade Modal appeared as expected.")
            page.screenshot(path="verification/upgrade_modal.png")
            print("Screenshot saved: verification/upgrade_modal.png")
        except:
            print("Upgrade Modal did NOT appear.")
            page.screenshot(path="verification/modal_fail.png")

        browser.close()

if __name__ == "__main__":
    verify_editor()
