from playwright.sync_api import sync_playwright

def verify_auth_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        print("Navigating to Login Page (port 3004)...")
        page.goto("http://localhost:3004/login")

        # Wait for loading to finish
        page.wait_for_selector("text=Login")

        if page.get_by_role("heading", name="Login").is_visible():
            print("Login Page verified.")
        else:
            print("Login Page failed.")
            page.screenshot(path="verification/auth_fail.png")

        print("Navigating to Signup Page...")
        page.get_by_text("Sign up").click()

        page.wait_for_selector("text=Create Account")
        if page.get_by_role("heading", name="Create Account").is_visible():
            print("Signup Page verified.")
        else:
            print("Signup Page failed.")

        browser.close()

if __name__ == "__main__":
    verify_auth_ui()
