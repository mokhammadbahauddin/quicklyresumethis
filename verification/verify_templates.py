from playwright.sync_api import sync_playwright
import json
import time

def verify_templates():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # USE PORT 3001
        print("Navigating to Editor...")
        page.goto("http://localhost:3001")

        mock_data = {
            "personalInfo": {"fullName": "Template Tester", "email": "test@test.com", "phone": "123"},
            "experience": [{"jobTitle": "Tester", "company": "Test Co", "startDate": "2020", "endDate": "2021", "achievements": ["Test"]}],
            "education": [],
            "skills": ["Testing"]
        }
        page.evaluate(f"sessionStorage.setItem('resumeData', JSON.stringify({json.dumps(mock_data)}));")
        page.goto("http://localhost:3001/edit")
        page.wait_for_load_state("networkidle")

        templates = ['modern', 'minimal', 'tech', 'creative', 'academic']

        for tmpl in templates:
            print(f"Testing template: {tmpl}")
            try:
                # Use exact match on the lowercase text
                page.get_by_role("button", name=tmpl, exact=True).click()
                time.sleep(1) # Wait for render

                # Take screenshot
                page.screenshot(path=f"verification/template_{tmpl}.png")
                print(f"Captured verification/template_{tmpl}.png")
            except Exception as e:
                print(f"Failed to switch to {tmpl}: {e}")
                try:
                    page.get_by_text(tmpl, exact=True).click()
                    time.sleep(1)
                    page.screenshot(path=f"verification/template_{tmpl}_fallback.png")
                    print(f"Captured verification/template_{tmpl}_fallback.png")
                except Exception as e2:
                     print(f"Fallback failed: {e2}")

        browser.close()

if __name__ == "__main__":
    verify_templates()
