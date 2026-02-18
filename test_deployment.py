#!/usr/bin/env python3
"""
Test script to verify Vercel deployment connectivity
Run this after deploying to check if everything is working
"""

import requests
import os
from urllib.parse import urljoin

def test_deployment():
    # Get the Vercel URLs from environment or use defaults
    client_url = os.environ.get('VERCEL_CLIENT_URL', 'https://your-client-url.vercel.app')
    server_url = os.environ.get('VERCEL_SERVER_URL', 'https://your-server-url.vercel.app')
    
    print("🔍 Testing Vercel Deployment")
    print("=" * 50)
    print(f"Client URL: {client_url}")
    print(f"Server URL: {server_url}")
    print()
    
    # Test 1: Server root endpoint
    print("1. Testing server root endpoint...")
    try:
        response = requests.get(server_url, timeout=10)
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            print("   ✅ Server is accessible")
        else:
            print(f"   ❌ Server returned status {response.status_code}")
    except Exception as e:
        print(f"   ❌ Server connection failed: {e}")
    
    # Test 2: Login API endpoint
    print("\n2. Testing login API endpoint...")
    try:
        login_url = urljoin(server_url, '/accounts/api/login/')
        response = requests.get(login_url, timeout=10)
        print(f"   Status: {response.status_code}")
        if response.status_code in [200, 405]:  # 405 is expected for GET on POST-only endpoint
            print("   ✅ Login API is accessible")
        else:
            print(f"   ❌ Login API returned unexpected status {response.status_code}")
    except Exception as e:
        print(f"   ❌ Login API connection failed: {e}")
    
    # Test 3: CORS Headers
    print("\n3. Testing CORS headers...")
    try:
        login_url = urljoin(server_url, '/accounts/api/login/')
        response = requests.options(login_url, timeout=10)
        allow_origin = response.headers.get('Access-Control-Allow-Origin', 'Not set')
        allow_credentials = response.headers.get('Access-Control-Allow-Credentials', 'Not set')
        print(f"   Access-Control-Allow-Origin: {allow_origin}")
        print(f"   Access-Control-Allow-Credentials: {allow_credentials}")
        if allow_origin != 'Not set':
            print("   ✅ CORS headers present")
        else:
            print("   ❌ CORS headers missing")
    except Exception as e:
        print(f"   ❌ CORS test failed: {e}")
    
    print("\n" + "=" * 50)
    print("💡 Next steps:")
    print("1. Visit your client URL and go to /debug-api")
    print("2. Check Vercel server logs for any errors")
    print("3. Verify all environment variables are set correctly")

if __name__ == "__main__":
    test_deployment()