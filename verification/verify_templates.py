from playwright.sync_api import sync_playwright
import json
import time

def verify_templates():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # USE PORT 3002
        print("Navigating to Editor...")
        page.goto("http://localhost:3002")

        mock_data = {
            "personalInfo": {"fullName": "Template Tester", "email": "test@test.com", "phone": "123"},
            "experience": [{"jobTitle": "Tester", "company": "Test Co", "startDate": "2020", "endDate": "2021", "achievements": ["Test"]}],
            "education": [],
            "skills": ["Testing"]
        }
        page.evaluate(f"sessionStorage.setItem('resumeData', JSON.stringify({json.dumps(mock_data)}));")
        page.goto("http://localhost:3002/edit")
        page.wait_for_load_state("networkidle")

        # Just verify page loaded
        page.screenshot(path="verification/final_pdf_preview.png")
        print("Captured verification/final_pdf_preview.png")

        # Check if PDF Viewer container exists
        # iframe or embed is usually used by PDFViewer
        # But @react-pdf/renderer creates an iframe
        if page.query_selector("iframe"):
             print("PDF Viewer iframe detected.")
        else:
             print("Warning: PDF Viewer iframe NOT detected (might be loading or failed).")

        browser.close()

if __name__ == "__main__":
    verify_templates()
