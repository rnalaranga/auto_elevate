import urllib.request
import json
import base64
import os

def download_github_file(url, out_path):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            content = base64.b64decode(data['content'])
            with open(out_path, 'wb') as f:
                f.write(content)
            print(f'Downloaded {out_path}')
    except Exception as e:
        print(f'Failed to download {url}: {e}')

# Searching for these logos in popular svg repos
download_github_file('https://api.github.com/repos/gilbarbara/logos/contents/logos/meguiars.svg', 'public/images/brands/meguiars.svg')
download_github_file('https://api.github.com/repos/gilbarbara/logos/contents/logos/wurth.svg', 'public/images/brands/wurth.svg')
