import requests
from bs4 import BeautifulSoup

class NewsScraper:
    def __init__(self, url):
        self.url = url

    def fetch_news(self):
        response = requests.get(self.url)
        if response.status_code == 200:
            return response.content
        else:
            raise Exception(f'Failed to fetch news: {response.status_code}')

    def parse_news(self, html_content):
        soup = BeautifulSoup(html_content, 'html.parser')
        headlines = soup.find_all('h2')  # Example: Adjust this selector according to the news site
        news_list = [headline.get_text() for headline in headlines]
        return news_list

    def scrape(self):
        html_content = self.fetch_news()
        return self.parse_news(html_content)

# Example usage:
# scraper = NewsScraper('https://example.com/news')
# news = scraper.scrape()
# print(news)