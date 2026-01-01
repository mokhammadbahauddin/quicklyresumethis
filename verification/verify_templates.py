from playwright.sync_api import sync_playwright
import json
import time

def verify_templates():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        
        # USE PORT 3003
        print("Navigating to Editor...")
        page.goto("http://localhost:3003")
        
        mock_data = {
            "personalInfo": {"fullName": "Performance Tester", "email": "perf@test.com", "phone": "123"},
            "experience": [{"jobTitle": "Speedster", "company": "Fast Co", "startDate": "2020", "endDate": "2021", "achievements": ["Optimized everything"]}],
            "education": [],
            "skills": ["Optimization"]
        }
        page.evaluate(f"sessionStorage.setItem('resumeData', JSON.stringify({json.dumps(mock_data)}));")
        page.goto("http://localhost:3003/edit")
        page.wait_for_load_state("networkidle")

        # Verify PDF Viewer
        page.screenshot(path="verification/final_optimized_preview.png")
        print("Captured verification/final_optimized_preview.png")

        if page.query_selector("iframe"):
             print("PDF Viewer iframe detected.")
        else:
             print("Warning: PDF Viewer iframe NOT detected (might be loading or failed).")

        browser.close()

if __name__ == "__main__":
    verify_templates()
