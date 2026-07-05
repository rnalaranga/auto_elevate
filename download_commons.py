import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def download(filename, path):
    url = f'https://commons.wikimedia.org/wiki/Special:FilePath/{filename}'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})
        with urllib.request.urlopen(req, context=ctx) as response:
            with open(path, 'wb') as f:
                f.write(response.read())
        print(f'Success: {path}')
    except Exception as e:
        print(f'Error downloading {url}: {e}')

download('Koch-Chemie_Logo.svg', 'public/images/brands/koch.svg')
download('W%C3%BCrth_Logo.svg', 'public/images/brands/wurth.svg')
download('Meguiar%27s_logo.svg', 'public/images/brands/meguiars.svg')
