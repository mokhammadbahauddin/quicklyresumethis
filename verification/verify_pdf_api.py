import requests
import json

def verify_pdf_api():
    url = "http://localhost:3001/api/generate-pdf"
    
    mock_data = {
        "resumeData": {
            "personalInfo": {"fullName": "PDF Tester", "email": "pdf@test.com", "phone": "123"},
            "experience": [{"jobTitle": "Tester", "company": "Test Co", "startDate": "2020", "endDate": "2021"}],
            "skills": ["PDF"]
        },
        "template": "creative"
    }
    
    try:
        response = requests.post(url, json=mock_data)
        if response.status_code == 200 and response.headers['Content-Type'] == 'application/pdf':
            print(f"SUCCESS: PDF generated. Size: {len(response.content)} bytes")
            # Save it to check manually if needed (I can't open it but seeing size > 0 is good)
            with open("verification/test_creative.pdf", "wb") as f:
                f.write(response.content)
        else:
            print(f"FAILURE: Status {response.status_code}, Body: {response.text}")
    except Exception as e:
        print(f"EXCEPTION: {e}")

if __name__ == "__main__":
    verify_pdf_api()
