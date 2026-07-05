import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def download(url, path):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'})
        with urllib.request.urlopen(req, context=ctx) as response:
            with open(path, 'wb') as f:
                f.write(response.read())
        print(f'Success: {path}')
    except Exception as e:
        print(f'Error downloading {url}: {e}')

download('https://upload.wikimedia.org/wikipedia/commons/4/44/Koch-Chemie_Logo.svg', 'public/images/brands/koch.svg')
download('https://upload.wikimedia.org/wikipedia/commons/9/91/W%C3%BCrth_Logo.svg', 'public/images/brands/wurth.svg')
download('https://upload.wikimedia.org/wikipedia/commons/d/d4/3M_wordmark.svg', 'public/images/brands/3m.svg')
download('https://upload.wikimedia.org/wikipedia/commons/6/69/Meguiar%27s_logo.svg', 'public/images/brands/meguiars.svg')
download('https://www.theultimatefinish.co.uk/Images/BrandLogos/GTechniq.png', 'public/images/brands/gtechniq.png')
