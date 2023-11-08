from app import app  
import os

if __name__ == '__main__':
    host = '0.0.0.0'
    port = int(os.environ.get('PORT', 8080))  
    app.run(host=host, port=port)
